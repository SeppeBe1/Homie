import React from "react";
import { View, Text, Button } from "react-native";

export default function Homeaccount({ navigation }) {
  return (
    <View>
      <Text>HOME ACCOUNT YAY</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}
