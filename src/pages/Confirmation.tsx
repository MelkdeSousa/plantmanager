import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import Button from '../components/Button'

import colors from '../../styles/colors'
import fonts from '../../styles/fonts'

interface ConfirmationParams {
  title: string
  subtitle: string
  buttonTitle: string
  icon: 'smile' | 'hug'
  nextScreen: string
}

const emojis = {
  hug: '\u{1F917}',
  smile: '\u{1F60A}',
}

const Confirmation = () => {
  const navigation = useNavigation()
  const route = useRoute()

  const {
    buttonTitle,
    icon,
    nextScreen,
    subtitle,
    title,
  } = route.params as ConfirmationParams

  const handleToPlantSelect = () => navigation.navigate(nextScreen)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>{emojis[icon]}</Text>

        <Text style={styles.title}>{title}</Text>

        <Text style={styles.subtitle}>{subtitle}</Text>

        <View style={styles.footer}>
          <Button title={buttonTitle} onPress={handleToPlantSelect} />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 30,
  },

  emoji: {
    fontSize: 78,
  },

  title: {
    fontSize: 22,
    fontFamily: fonts.heading,
    textAlign: 'center',
    color: colors.heading,
    lineHeight: 38,
    marginTop: 15,
  },

  subtitle: {
    fontFamily: fonts.text,
    textAlign: 'center',
    fontSize: 18,
    paddingVertical: 20,
    color: colors.heading,
  },

  footer: {
    width: '100%',
    paddingHorizontal: 75,
    marginTop: 20,
  },
})

export default Confirmation
