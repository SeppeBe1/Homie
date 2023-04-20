import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//Screens

import Homescreen from "./screens/Homescreen";
import Costsplitterscreen from "./screens/Costsplitterscreen";
import Behomiescreen from "./screens/BeHomiescreen";
import CalendarScreen from "./screens/Calendarscreen";

//Screen names

const Homename = "Home";
const Costsplittername = "Costsplitter";
const Behomiename = "Behomie";
const Calendarname = "Calendar";

const Tab = createBottomTabNavigator();

export default function BottomBarContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name={Homename} component={Homescreen} />
        <Tab.Screen name={Costsplittername} component={Costsplitterscreen} />
        <Tab.Screen name={Behomiename} component={Behomiescreen} />
        <Tab.Screen name={Calendarname} component={CalendarScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
