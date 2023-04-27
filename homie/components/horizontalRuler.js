import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function horizontalRuler() {
  return (
    <View
      style={{
        borderBottomColor: 'red',
        borderBottomWidth: 2,
        marginVertical: 10,
        width: 50,
      }}
    />
  )
}