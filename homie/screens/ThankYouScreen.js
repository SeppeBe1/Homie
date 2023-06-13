import { Text, View, StyleSheet, Image } from "react-native";
import React, { Component } from "react";
import goodbye from "../assets/goodbye.svg";

export class ThankYouScreen extends Component {
  render() {
    return (
      <View style={styles.splashContainer}>
        <Text style={styles.thankYouText}>
          You left Casa Magdalena. See you again soon, goodbye!
        </Text>
        <Image source={goodbye} style={styles.thankYouImage} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  splashContainer: {
    padding: 50,
  },
  thankYouText: {
    fontFamily: "novatica",
    fontSize: 20,
    color: "#160635",
    fontWeight: "bold",
  },
  thankYouImage: {
    width: 230,
    height: 292,
  },
});

export default ThankYouScreen;
