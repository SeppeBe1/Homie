import { View, Text } from 'react-native'
import React from 'react'
import {StackNavigator} from './StackNavigator'
import {TabNavigator}  from './TabNavigator';
import { NavigationContainer } from '@react-navigation/native';

import Settings from './screens/settings';
import Homescreen from './screens/Homescreen';

export default function App() {
  return (

      <StackNavigator/>
    
    )
  }

