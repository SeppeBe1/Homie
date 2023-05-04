import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/native-stack';

import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import { Header, Button } from 'react-native-elements'
import arrowLeft from '../assets/icons/arrowLeft.svg'

import * as Font from 'expo-font';

import React, {useState, useEffect} from 'react'

// Load the font
const loadFonts = async () => {
  await Font.loadAsync({
    'moon': require('../assets/fonts/Moon.otf'),
    'manrope': require('../assets/fonts/Manrope.ttf'),
    'novatica': require('../assets/fonts/Novatica.ttf'),
    'novatica-bold': require('../assets/fonts/Novatica-Bold.ttf')
  });
}

export default function Costsplitterscreen({navigation}) {

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts().then(() => {
      setFontsLoaded(true);
    });
  }, []);

  if (!fontsLoaded) {
    return null; // or a loading screen
  }

  return (
   <View>
      <Text>Costsplitterscreen</Text>
    </View>
  )
}