import { View, Text, Image } from 'react-native'
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomescreenStack, BehomiescreenStack, CostsplitterscreenStack, CalendarScreenStack, LoginscreenStack } from "./StackNavigator";

const Homename = 'Home';
const Costsplittername = 'Costsplitter';
const Behomiename = 'Behomie';
const Calendarname = 'Calendar';


const Tab = createBottomTabNavigator();

// independent={true}

 export function TabNavigator() {
  return (
        <Tab.Navigator screenOptions={{headerShown: false, showLabel: false}}>

          <Tab.Screen name={Homename} component={HomescreenStack}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <Image
                source={ focused ? require('./assets/icons/homeFocused.png') : require('./assets/icons/home.png')} 
                style={{ width: size, height: size }}
                resizeMode="contain"
              />
              )}}/>

          <Tab.Screen name={Behomiename} component={BehomiescreenStack}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Image
              source={ focused ? require('./assets/icons/communityFocused.png') : require('./assets/icons/community.png')} 
              style={{ width: size, height: size }}
              resizeMode="contain"
            />
            )}}/>

          <Tab.Screen name={Costsplittername} component={CostsplitterscreenStack}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Image
              source={ focused ? require('./assets/icons/costsplitFocused.png') : require('./assets/icons/costsplit.png')} 
              style={{ width: size, height: size }}
              resizeMode="contain"
            />
            )}}/>

          <Tab.Screen name={Calendarname} component={CalendarScreenStack}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Image
              source={ focused ? require('./assets/icons/calendarFocused.png') : require('./assets/icons/calendar.png')} 
              style={{ width: 35, height: 35 }}
              resizeMode="contain"
            />
            )}}/>

        </Tab.Navigator>
  )
}
