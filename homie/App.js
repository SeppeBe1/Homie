import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { LoginscreenStack, HomescreenStack } from "./StackNavigator";
import Login from './screens/login/Login';
import SignUp from './screens/login/SignUp';



export default function App() {

  const Stack = createStackNavigator();
  return (

    <NavigationContainer>
      <LoginscreenStack/>
    </NavigationContainer>
);
};

