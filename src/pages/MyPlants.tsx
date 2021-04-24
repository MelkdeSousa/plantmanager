import { formatDistance } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import React, { useEffect, useState } from 'react'
import { Alert, FlatList, Image, StyleSheet, Text, View } from 'react-native'

import { loadPlants, removePlant } from '../lib/storage'
import { Plant, StoragePlant } from '../lib/types'

import Header from '../components/Header'
import PlantCardSecondary from '../components/PlantCardSecondary'

import waterdropImage from '../assets/waterdrop.png'

import colors from '../../styles/colors'
import fonts from '../../styles/fonts'
import Load from '../components/Load'

const MyPlants = () => {
  const [myPlants, setMyPlants] = useState<Plant[]>([])
  const [loading, setLoading] = useState(true)
  const [nextWatered, setNextWatered] = useState<string>()

  const handleRemove = (plant: Plant) => {
    Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
      {
        text: 'Não 🙏🏼',
        style: 'cancel',
      },
      {
        text: 'Sim 😢',
        onPress: async () => {
          try {
            await removePlant(plant.id)
            setMyPlants(oldData => oldData.filter(item => item.id !== plant.id))
          } catch (err) {
            Alert.alert('Não foi possivel remover! \u{1F625}')
          }
        },
      },
    ])
  }

  useEffect(() => {
    const loadDataFromStorage = async () => {
      const plants = await loadPlants()

      if (!plants.length) {
        setLoading(false)

        return
      }

      const nextTime = formatDistance(
        new Date(plants[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: ptBR }
      )

      setNextWatered(`Não esqueça de regar a ${plants[0].name} à ${nextTime}.`)

      setMyPlants(plants)
      setLoading(false)
    }

    loadDataFromStorage()
  }, [])

  if (loading) {
    return <Load />
  }

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.spotlight}>
        <Image source={waterdropImage} style={styles.spotlightImage} />
        <Text style={styles.spotlightText}>{nextWatered}</Text>
      </View>

      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>Próximas regadas</Text>
        <FlatList
          data={myPlants}
          keyExtractor={({ id }) => String(id)}
          renderItem={({ item }) => (
            <PlantCardSecondary
              handleRemove={() => handleRemove(item)}
              data={item}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background,
  },

  spotlight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  spotlightImage: {
    width: 60,
    height: 60,
  },

  spotlightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
  },

  plants: {
    flex: 1,
    width: '100%',
  },

  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20,
  },
})

export default MyPlants
