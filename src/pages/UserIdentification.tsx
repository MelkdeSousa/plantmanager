import React, { useState } from 'react'
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'

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

const UserIdentification = () => {
  const [isFocused, setFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)
  const [name, setName] = useState<string>()

  const navigation = useNavigation()

  const handleToConfirmation = async () => {
    if (!name) return Alert.alert('Me diz como chamar você 😢')

    try {
      await AsyncStorage.setItem('@plantmanager:user', JSON.stringify(name))

      navigation.navigate('Confirmation', {
        title: 'Prontinho!',
        buttonTitle: 'Começar',
        icon: 'smile',
        subtitle:
          'Agora vamos começar a cuidar das suas plantinhas com muito cuidado.',
        nextScreen: 'PlantSelect',
      } as ConfirmationParams)
    } catch (err) {
      Alert.alert('Não foi possível salvar seu nome de usuário. 😢')
    }
  }

  const handleInputFocus = () => {
    setFocused(true)
  }

  const handleInputBlur = () => {
    setFocused(false)
    setIsFilled(!!name)
  }

  const handleInputChange = (value: string) => {
    setIsFilled(!!value)
    setName(value)
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.emoji}>{isFilled ? '😃' : '😏'}</Text>
                <Text style={styles.title}>
                  Como podemos {'\n'} chamar você?
                </Text>
              </View>

              <TextInput
                style={[
                  styles.input,
                  (isFocused || isFilled) && { borderColor: colors.green },
                ]}
                placeholder='Digite um nome'
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChangeText={handleInputChange}
              />

              <View style={styles.footer}>
                <Button title='Confirmar' onPress={handleToConfirmation} />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  content: {
    flex: 1,
    width: '100%',
  },

  form: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 54,
    alignItems: 'center',
  },

  header: {
    alignItems: 'center',
  },

  emoji: {
    fontSize: 44,
  },

  title: {
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop: 20,
  },

  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: '100%',
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: 'center',
  },

  footer: {
    width: '100%',
    marginTop: 40,
    paddingHorizontal: 20,
  },
})

export default UserIdentification
