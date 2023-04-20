import React from "react";
import { View } from "react-native";
import AppNavigator from "./appNavigator";
import BottomBarContainer from "./BottomBarContainer";

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <BottomBarContainer />
    </View>
  );
}
