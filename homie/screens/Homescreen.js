import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { Header, Avatar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook
import { NavigationContainer } from "@react-navigation/native"; // Import NavigationContainer component
import { createStackNavigator } from "@react-navigation/stack"; // Import createStackNavigator function
import Houseaccount from "./Houseaccount";
import AppNavigator from "../AppNavigator"; // Import the AppNavigator component

const Stack = createStackNavigator(); // Create a stack navigator

export default function Homescreen() {
  const navigation = useNavigation(); // Get the navigation object using the useNavigation hook

  return (
    <View>
      <Header
        containerStyle={styles.headerContainer}
        leftComponent={
          <Avatar
            size="medium"
            rounded
            source={{
              uri: "https://i.redd.it/lmwqtxhw9st41.jpg",
            }}
          />
        }
        centerComponent={{
          text: "My App",
          style: { color: "#fff", fontSize: 20 },
        }}
        rightComponent={{ icon: "cog", type: "font-awesome", color: "#fff" }}
      />
      <View>
        <Text>Home</Text>
      </View>
      <View>
        <Text>Home Screen</Text>
        <Button
          title="Go to Houseaccount"
          onPress={() =>
            navigation.navigate("Houseaccount", {
              itemId: 123,
              itemName: "Example Item",
            })
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#160635",
    height: 215,
  },
});
