import { View, Text } from 'react-native'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';


//Screens

import Homescreen from './screens/Homescreen';
import Costsplitterscreen from './screens/Costsplitterscreen';
import Behomiescreen from './screens/BeHomiescreen';
import CalendarScreen from './screens/Calendarscreen';

//Screen names

const Homename = 'Home';
const Costsplittername = 'Costsplitter';
const Behomiename = 'Behomie';
const Calendarname = 'Calendar';

const Tab = createBottomTabNavigator();



export default function BottomBarContainer() {
  return (
    <NavigationContainer>
        <Tab.Navigator  tabBarOptions={{ showLabel: false }}
        
        screenOptions={({ route  }) => ({
          tabBarIcon: ({ focused }) => {
            let icon;
  
            if (route.name === 'Home') {
              icon = focused
                ? require('./assets/icons/home.png')
                : require('./images/home.png');
            } else if (route.name === 'Profile') {
              icon = focused
                ? require('./images/profile-focused.png')
                : require('./images/profile.png');
            }
  
            return <Image source={icon} />;
          },
        })}
        >

        <Tab.Screen name={Homename} component={Homescreen}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <Image
                  source={require('./assets/icons/home.png')}
                  style={{ width: size, height: size }}
                  resizeMode="contain"
                />
              ),
            }}
        />

        <Tab.Screen name={Costsplittername} component={Costsplitterscreen} 
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require('./assets/icons/community.png')}
              style={{ width: size, height: size }}
              resizeMode="contain"
            />
          ),
        }}
        />

        <Tab.Screen name={Behomiename} component={Behomiescreen}
         options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require('./assets/icons/costsplit.png')}
              style={{ width: size, height: size }}
              resizeMode="contain"
            />
          ),
        }}
        />

        <Tab.Screen name={Calendarname} component={CalendarScreen}
         options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={require('./assets/icons/calendar.png')}
              style={{ width: size, height: size }}
              resizeMode="contain"
            />
          ),
        }}
        />

        </Tab.Navigator>
    </NavigationContainer>
  )
}

// const styles = StyleSheet.create({

// })