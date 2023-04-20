import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Houseaccount from "./screens/Houseaccount";
import Homescreen from "./screens/Homescreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Homescreen" component={Homescreen} />
      <Stack.Screen name="Houseaccount" component={Houseaccount} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
