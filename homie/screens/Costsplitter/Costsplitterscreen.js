import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import costsplitter from "../../assets/costsplitter.svg";

import * as Font from "expo-font";

import React, { useState, useEffect } from "react";

// Load the font
const loadFonts = async () => {
  await Font.loadAsync({
    moon: require("../../assets/fonts/Moon.otf"),
    manrope: require("../../assets/fonts/Manrope.ttf"),
    manropeBold: require("../../assets/fonts/Manrope-Bold.ttf"),
    novatica: require("../../assets/fonts/Novatica.ttf"),
    novaticaBold: require("../../assets/fonts/Novatica-Bold.ttf"),
  });
};

export default function Costsplitterscreen({ navigation }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts().then(() => {
      setFontsLoaded(true);
    });
  }, []);

  if (!fontsLoaded) {
    return null; // or a loading screen
  }

  return (
    <View
      style={{
        padding: 57,
        height: "100%",
        paddingTop: 85,
      }}
    >
      <Text style={styles.title}>What would you like to do?</Text>
      <Text style={styles.text}>
        Here you can manage everything concerning the finances of your home. Bye
        bye financial chaos!
      </Text>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={costsplitter}
          style={{
            width: 274,
            height: 215,
            marginBottom: 65,
            alignSelf: "center",
          }}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("SplitCosts")}
          style={[styles.button]}
        >
          <Text style={styles.buttonText}>Split costs</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(AddTask)}
          style={[styles.button]}
        >
          <Text style={styles.buttonText}>View statistics</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(AddTask)}
          style={[styles.button]}
        >
          <Text style={styles.buttonText}>View invoices</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "novaticaBold",
    fontSize: 20,
    color: "#160635",
    paddingBottom: 13,
  },
  text: {
    fontFamily: "manrope",
    fontSize: 14,
    color: "#160635",
    paddingBottom: 65,
  },
  button: {
    backgroundColor: "#B900F4",
    borderRadius: 55,
    width: 342,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  buttonText: {
    fontFamily: "moon",
    fontWeight: "bold",
    color: "#ffffff",
    fontSize: 14,
  },
});
