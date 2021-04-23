import AsyncStorage from '@react-native-async-storage/async-storage'
import { format } from 'date-fns'
import { Plant, StoragePlant } from './types'

export const savePlant = async (plant: Plant): Promise<void> => {
  try {
    const data = await AsyncStorage.getItem('@plantmanager:plants')
    const oldPlants = data ? (JSON.parse(data) as StoragePlant) : {}

    const newPlant = {
      [plant.id]: {
        data: plant,
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
  try {
    const data = await AsyncStorage.getItem('@plantmanager:plants')
    const plants = data ? (JSON.parse(data) as StoragePlant) : {}

    const plantsSorted = Object.keys(plants)
      .map(plant => ({
        ...plants[plant].data,
        hour: format(
          new Date(plants[plant].data.dateTimeNotification),
          'HH:mm'
        ),
      }))
      .sort((a, b) =>
        Math.floor(
          new Date(a.dateTimeNotification).getTime() / 1000 -
            Math.floor(new Date(b.dateTimeNotification).getTime() / 1000)
        )
      )

    return plantsSorted
  } catch (err) {
    throw new Error(err)
  }
}
