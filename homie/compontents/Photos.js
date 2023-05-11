import { Text, TouchableOpacity, View, Image, StyleSheet } from "react-native";
import React, { Component } from "react";
import girl1 from "../assets/girl.jpg";
import girl2 from "../assets/girl.jpg";
import girl3 from "../assets/girl.jpg";
import girl4 from "../assets/girl.jpg";
import girl5 from "../assets/girl.jpg";
import girl6 from "../assets/girl.jpg";

const galleryImages = [girl1, girl2, girl3, girl4, girl5, girl6];

export default class Residents extends Component {
  render() {
    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.h3}>Our recent moments</Text>
        </View>
        <View style={styles.galleryContainer}>
          {galleryImages.map((image, index) => (
            <Image key={index} source={image} style={styles.galleryImage} />
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>View memory wall</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 280,
    height: 50,
    borderRadius: 30,
    backgroundColor: "#B900F4",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontFamily: "moon",
    fontWeight: "bold",
    fontSize: "18px",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "40px",
  },
  h3: {
    fontFamily: "moon",
    fontSize: 14,
    color: "#160635",
    paddingVertical: 40,
    fontWeight: "bold",
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  galleryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 18,
  },
  galleryImage: {
    width: "102px",
    height: "102px",
    marginBottom: 10,
  },
});
