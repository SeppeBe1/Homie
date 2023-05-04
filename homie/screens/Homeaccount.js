import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import MoonFont from "../assets/fonts/Moon.otf";
import Novatica from "../assets/fonts/Novatica-Bold.woff";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native";

import arrowback from "../assets/icons/Arrow_back.svg";
import editpen from "../assets/icons/Edit_pen.svg";
import backgroundImage from "../assets/grouppicture.jpg";

const loadFonts = async () => {
  await Font.loadAsync({
    moon: MoonFont,
  });
  await Font.loadAsync({
    novatica: Novatica,
  });
};

export default function Homeaccount({ navigation }) {
  useEffect(() => {
    loadFonts();
  }, []);

  return (
    <View style={{ backgroundColor: "#F5F5F5" }}>
      <ImageBackground source={backgroundImage} style={styles.background}>
        <View style={styles.overlay} />
        <View style={styles.container}>
          <TouchableOpacity style={styles.link}>
            <Image
              source={arrowback}
              style={{ width: "8px", height: "15px" }}
            />{" "}
          </TouchableOpacity>
          <TouchableOpacity style={styles.link}>
            <Text style={styles.text}>My house</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.link}>
            {" "}
            <Image source={editpen} style={{ width: "24px", height: "24px" }} />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <View>
        <Text>Additional content here</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    backgroundColor: "rgba(128,0,128,0.5)",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(22,6,53,0.6)",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 55,
    height: 229,
  },
  link: {
    fontFamily: "novatica",
  },
  text: {
    fontFamily: "novatica",
    fontSize: 20,
    color: "white",
  },
});
