import { View, Text } from "react-native";
import React from "react";
import { TabNavigator } from "./TabNavigator";
import { StackNavigator } from "./StackNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/login/Login";
import {
  HomescreenStack,
  BehomiescreenStack,
  CostsplitterscreenStack,
  LoginscreenStack,
} from "./StackNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <BehomiescreenStack/>
    </NavigationContainer>
  );
}
