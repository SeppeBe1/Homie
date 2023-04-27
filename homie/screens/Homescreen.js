import { StyleSheet, Text, View, Switch } from 'react-native'
import React from 'react'

export default function Homescreen() {
  return (
    <View>
    <Text >Profile Settings</Text>
    <View style={styles.switchContainter}>
      <Text>Notifications</Text>
      <Switch />
    </View>
    <View style={styles.switchContainter}>
      <Text>Dark Mode</Text>
      <Switch/>
    </View>
    <View style={styles.switchContainter}>
      <Text>Auto-Play</Text>
       <Switch />
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
  switchContainter: {
    display: 'flex',
    flexDirection: 'row',
  },
})
