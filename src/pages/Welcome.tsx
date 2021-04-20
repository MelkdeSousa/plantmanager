import React from 'react'
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { Feather } from '@expo/vector-icons'

import colors from '../../styles/colors'
import wateringImg from '../assets/watering.png'
import fonts from '../../styles/fonts'

const Welcome = () => {
  const navigation = useNavigation()

  const handleToUserIdentification = () =>
    navigation.navigate('UserIdentification')

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Gerencie {'\n'} suas plantas de {'\n'} forma fácil
        </Text>
        <Image source={wateringImg} resizeMode='contain' />

        <Text style={styles.subtitle}>
          Não esqueça mais de regar suas {'\n'} plantas. Nós cuidamos de lembrar
          você {'\n'} sempre que precisar.
        </Text>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={handleToUserIdentification}
        >
          <Feather name='chevron-right' style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: fonts.heading,
    lineHeight: 38,
    textAlign: 'center',
    color: colors.heading,
    marginTop: 34,
  },

  subtitle: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: fonts.text,
    paddingHorizontal: 20,
    color: colors.heading,
  },

  button: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
    width: 56,
  },

  buttonIcon: {
    color: colors.white,
    fontSize: 32,
  },

  image: {
    height: Dimensions.get('window').width * 0.7,
  },
})

export default Welcome
