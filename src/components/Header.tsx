import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import AsyncStorage from '@react-native-async-storage/async-storage'

import userImage from '../assets/user.png'

import colors from '../../styles/colors'
import fonts from '../../styles/fonts'

const Header = () => {
  const [username, setUsername] = useState<string>()

  useEffect(() => {
    const loadUsernameFromAsyncStorage = async () => {
      const user = await AsyncStorage.getItem('@plantmanager:user')

      setUsername(JSON.parse(user) || 'Anônimo')
    }

    loadUsernameFromAsyncStorage()
  }, [username])

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.username}>{username}</Text>
      </View>
      <Image style={styles.image} source={userImage} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: getStatusBarHeight(),
  },

  greeting: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text,
  },

  username: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.heading,
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
})

export default Header
