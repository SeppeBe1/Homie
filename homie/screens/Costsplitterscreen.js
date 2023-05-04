import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/native-stack';

import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import { Header, Button } from 'react-native-elements'
import arrowLeft from '../assets/icons/arrowLeft.svg'
import editIcon from '../assets/icons/edit.svg'
import emailIcon from '../assets/icons/email.svg'
import phoneIcon from '../assets/icons/phone.svg'
import passwordIcon from '../assets/icons/password.svg'
import editFieldIcon from '../assets/icons/editField.svg'
import statusAvailable from '../assets/icons/statusAvailable.svg'
import statusBusy from '../assets/icons/statusBusy.svg'
import statusNotdisturb from '../assets/icons/statusNotdisturb.svg'
import dropdownIcon from '../assets/icons/dropdown.svg'

import * as Font from 'expo-font';

import HomieMomentPost from '../compontents/HomieMomentPost';

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