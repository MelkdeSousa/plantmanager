import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Confirmation from '../pages/Confirmation'
import UserIdentification from '../pages/UserIdentification'
import Welcome from '../pages/Welcome'

import colors from '../../styles/colors'

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
  </Stack.Navigator>
)

export default Routes
