import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Confirmation from '../pages/Confirmation'
import UserIdentification from '../pages/UserIdentification'
import Welcome from '../pages/Welcome'
import PlantSave from '../pages/PlantSave'
import MyPlants from '../pages/MyPlants'

import colors from '../../styles/colors'
import TabRoutes from './tab.routes'

const Stack = createStackNavigator()

const Routes = () => (
  <Stack.Navigator
    headerMode='none'
    screenOptions={{
      cardStyle: {
        backgroundColor: colors.white,
      },
    }}
  >
    <Stack.Screen name='Welcome' component={Welcome} />

    <Stack.Screen name='UserIdentification' component={UserIdentification} />

    <Stack.Screen name='Confirmation' component={Confirmation} />

    <Stack.Screen name='PlantSelect' component={TabRoutes} />

    <Stack.Screen name='PlantSave' component={PlantSave} />

    <Stack.Screen name='MyPlants' component={TabRoutes} />
  </Stack.Navigator>
)

export default Routes
