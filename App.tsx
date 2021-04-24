import React, { useEffect } from 'react'
import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
} from '@expo-google-fonts/jost'
import AppLoading from 'expo-app-loading'
import * as Notifications from 'expo-notifications'

import Routes from './src/routes'
import { Plant } from './src/lib/types'

export default function App() {
  const [fontsLoaded] = useFonts({
    Jost400: Jost_400Regular,
    Jost600: Jost_600SemiBold,
  })

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      async notification => {
        const plant = notification.request.content.data.plant as Plant

        console.log(plant)
      }
    )

    return () => subscription.remove()
  }, [])

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return <Routes />
}
