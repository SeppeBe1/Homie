import { View, Text, Image } from 'react-native'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';



//Screens

import Homescreen from './screens/Homescreen';
import Costsplitterscreen from './screens/Costsplitterscreen';
import Behomiescreen from './screens/BeHomiescreen';
import CalendarScreen from './screens/Calendarscreen';
import Homeaccount from './screens/Homeaccount';


//Screen names

const Homename = 'Home';
const Costsplittername = 'Costsplitter';
const Behomiename = 'Behomie';
const Calendarname = 'Calendar';
const Homeaccountname = 'Homeaccount';


const Tab = createBottomTabNavigator();



export default function BottomBarContainer() {
  return (
    <NavigationContainer>
        <Tab.Navigator screenOptions={{headerShown: false}} tabBarOptions={{
        showLabel: false}}>

        <Tab.Screen name={Homename} component={Homescreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Image
              source={ focused ? require('./assets/icons/homeFocused.png') : require('./assets/icons/home.png')} 
              style={{ width: size, height: size }}
              resizeMode="contain"
            />
            )}}/>

        <Tab.Screen name={Costsplittername} component={Costsplitterscreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
            source={ focused ? require('./assets/icons/communityFocused.png') : require('./assets/icons/community.png')} 
            style={{ width: size, height: size }}
            resizeMode="contain"
          />
          )}}/>

        <Tab.Screen name={Behomiename} component={Behomiescreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
            source={ focused ? require('./assets/icons/costsplitFocused.png') : require('./assets/icons/costsplit.png')} 
            style={{ width: size, height: size }}
            resizeMode="contain"
          />
          )}}/>

        <Tab.Screen name={Calendarname} component={CalendarScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
            source={ focused ? require('./assets/icons/calendarFocused.png') : require('./assets/icons/calendar.png')} 
            style={{ width: 35, height: 35 }}
            resizeMode="contain"
          />
          )}}/>

        </Tab.Navigator>
    </NavigationContainer>
  )
}

// const styles = StyleSheet.create({

// })