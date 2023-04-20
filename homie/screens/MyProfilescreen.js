import { View, Text } from 'react-native'
import React from 'react'

export default function Myprofilescreen() {
  return (
    <View>
      <Text>My Profile</Text>
      <Button
        title="Go back"
        color="#841584"
        />
      <Text>Available</Text>
      <Text>Busy</Text>
      <Text>Do not disturb</Text>
      <Text>Email address</Text>
      <Text>jadeapers@telenet.be</Text>
      <Text>Phonenumber</Text>
      <Text>04 92 63 30 29</Text>
      <Text>Password</Text>
    </View>
  )
}