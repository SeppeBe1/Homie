import { View, Text } from 'react-native'
import React from 'react'
import {TabNavigator}  from './TabNavigator';
import { NavigationContainer } from '@react-navigation/native';


export default function App() {
  return (

    <NavigationContainer>
      <TabNavigator/>
      </NavigationContainer>
  
    )
  }

