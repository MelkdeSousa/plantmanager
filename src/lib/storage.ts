import AsyncStorage from '@react-native-async-storage/async-storage'
import { format } from 'date-fns'
import * as Notifications from 'expo-notifications'

import { Plant, StoragePlant } from './types'

export const savePlant = async (plant: Plant): Promise<void> => {
  try {
    const nextTime = new Date(plant.dateTimeNotification)
    const now = new Date()

    const { times, repeat_every } = plant.frequency

    if (repeat_every === 'week') {
      const interval = Math.trunc(7 / times)
      nextTime.setDate(nextTime.getDate() + interval)
    } else {
      nextTime.setDate(nextTime.getDate() + 1)
    }

    const seconds = Math.abs(
      Math.ceil(now.getTime() - nextTime.getTime()) / 1000
    )

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Heeey 🌱',
        body: `Está na hora de cuidar da sua ${plant.name}!`,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        data: {
          plant,
        },
      },
      trigger: {
        seconds: seconds < 60 ? 20 : seconds,
        repeats: true,
      },
    })

    const data = await AsyncStorage.getItem('@plantmanager:plants')
    const oldPlants = data ? (JSON.parse(data) as StoragePlant) : {}

    const newPlant = {
      [plant.id]: {
        data: plant,
        notificationId,
      },
    }

    await AsyncStorage.setItem(
      '@plantmanager:plants',
      JSON.stringify({
        ...newPlant,
        ...oldPlants,
      })
    )
  } catch (err) {
    throw new Error(err)
  }
}

export const loadPlants = async () => {
  const data = await AsyncStorage.getItem('@plantmanager:plants')
  const plants = data ? (JSON.parse(data) as StoragePlant) : {}

  const plantsSorted = Object.keys(plants)
    .map(plant => ({
      ...plants[plant].data,
      hour: format(new Date(plants[plant].data.dateTimeNotification), 'HH:mm'),
    }))
    .sort((a, b) =>
      Math.floor(
        new Date(a.dateTimeNotification).getTime() / 1000 -
          Math.floor(new Date(b.dateTimeNotification).getTime() / 1000)
      )
    )

  return plantsSorted
}

export const removePlant = async (id: string): Promise<void> => {
  try {
    const data = await AsyncStorage.getItem('@plantmanager:plants')
    const plants = data ? (JSON.parse(data) as StoragePlant) : {}

    await Notifications.cancelScheduledNotificationAsync(
      plants[id].notificationId
    )

    delete plants[id]

    await AsyncStorage.setItem('@plantmanager:plants', JSON.stringify(plants))
  } catch (err) {
    throw new Error(err)
  }
}
