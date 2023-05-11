import { Text, TouchableOpacity, View, Image, StyleSheet } from "react-native";
import React, { Component } from "react";
import checkbox from "../assets/icons/check.svg";

export default class Houserules extends Component {
  render() {
    const houseRules = [
      "No smoking",
      "No pets allowed",
      "Quiet hours from 10 PM to 8 AM",
    ];

    return (
      <View>
        <Text style={styles.h3}>Our House Rules</Text>
        {houseRules.map((rule, index) => (
          <View key={index} style={styles.ruleContainer}>
            <Image source={checkbox} style={styles.checkbox} />
            <Text style={styles.rule}>{rule}</Text>
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  h3: {
    fontFamily: "moon",
    fontSize: 14,
    color: "#160635",
    paddingVertical: 40,
    fontWeight: "bold",
  },

  ruleContainer: {
    height: "62px",
    width: "100%",
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    borderRadius: 10,
    padding: 25,
  },
  checkbox: {
    width: 16,
    height: 11,
    marginRight: 10,
  },
  rule: {
    fontFamily: "moon",
    fontSize: 12,
    color: "#333333",
  },
});
