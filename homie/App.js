import React from "react";
import { View } from "react-native";
import BottomBarContainer from "./BottomBarContainer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AppNavigator from "./AppNavigator";
import Houseaccount from "./screens/Houseaccount";
import Homescreen from "./screens/Homescreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Homescreen">
          <Stack.Screen name="Homescreen" component={Homescreen} />
          <Stack.Screen name="Houseaccount" component={Houseaccount} />
        </Stack.Navigator>
      </NavigationContainer>
      <BottomBarContainer />
    </View>
  );
}
