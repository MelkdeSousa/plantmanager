import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import api from '../services/api'
import { Environment, Plant } from '../lib/types'

import EnvironmentButton from '../components/EnvironmentButton'
import Header from '../components/Header'
import PlantCardPrimary from '../components/PlantCardPrimary'
import Load from '../components/Load'

import colors from '../../styles/colors'
import fonts from '../../styles/fonts'

const PlantSelect = () => {
  const [environments, setEnvironments] = useState<Environment[]>([])
  const [plants, setPlants] = useState<Plant[]>([])
  const [environmentSelected, setEnvironmentSelected] = useState('all')
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [loadingMore, setLoadingMore] = useState(false)

  const navigation = useNavigation()

  const handleEnvironmentSelected = (environment: string) => {
    setEnvironmentSelected(environment)

    if (environment === 'all') {
      return setFilteredPlants(plants)
    }

    const filtered = plants.filter(plant =>
      plant.environments.includes(environment)
    )

    setFilteredPlants(filtered)
  }

  const handleToPlantSelected = (plant: Plant) => {
    navigation.navigate('PlantSave', { plant })
  }

  const fetchPlants = async () => {
    const { data } = await api.get(
      `plants?_sort=name&_order=asc&_page=${page}&_limit=8`
    )

    if (!data) return setLoading(true)

    if (page > 1) {
      setPlants(oldValue => [...oldValue, ...data])
      setFilteredPlants(oldValue => [...oldValue, ...data])
    } else {
      setPlants(data)
      setFilteredPlants(data)
    }

    setLoading(false)
    setLoadingMore(false)
  }

  const handleFetchMore = (distance: number) => {
    if (distance < 1) {
      return
    }

    setLoadingMore(true)
    setPage(oldValue => oldValue + 1)
    fetchPlants()
  }

  useEffect(() => {
    const fetchEnvironment = async () => {
      const { data } = await api.get(
        'plants_environments?_sort=title&_order=asc'
      )

      setEnvironments([
        {
          key: 'all',
          title: 'Todos',
        },
        ...data,
      ])
    }

    fetchEnvironment()
  }, [])

  useEffect(() => {
    fetchPlants()
  }, [])

  if (loading) {
    return <Load />
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />

        <Text style={styles.title}>Em qual ambiente</Text>
        <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
      </View>

      <View>
        <FlatList
          contentContainerStyle={styles.environmentList}
          data={environments}
          keyExtractor={({ key }) => String(key)}
          renderItem={({ item }) => (
            <EnvironmentButton
              title={item.title}
              active={item.key === environmentSelected}
              key={item.key}
              onPress={() => handleEnvironmentSelected(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={styles.plants}>
        <FlatList
          data={filteredPlants}
          keyExtractor={({ id }) => String(id)}
          renderItem={({ item }) => (
            <PlantCardPrimary
              data={item}
              key={item.id}
              onPress={() => handleToPlantSelected(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.plantList}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) =>
            handleFetchMore(distanceFromEnd)
          }
          ListFooterComponent={
            loadingMore ? <ActivityIndicator color={colors.green} /> : null
          }
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    padding: 30,
  },

  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15,
  },

  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading,
  },

  environmentList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    marginLeft: 32,
    marginVertical: 20,
  },

  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
  },

  plantList: {},
})

export default PlantSelect
