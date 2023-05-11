import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import MoonFont from "../assets/fonts/Moon.otf";
import Novatica from "../assets/fonts/Novatica-Bold.woff";
import Residents from "../compontents/Residents";
import Photos from "../compontents/Photos";
import HouseRules from "../compontents/Houserules";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Button,
} from "react-native";

import arrowback from "../assets/icons/Arrow_back.svg";
import editpen from "../assets/icons/Edit_pen.svg";
import backgroundImage from "../assets/grouppicture.jpg";

const loadFonts = async () => {
  await Font.loadAsync({
    moon: MoonFont,
    novatica: Novatica,
  });
};

const App = () => {
  const [currentView, setCurrentView] = useState("Residents");

  const switchView = (view) => {
    setCurrentView(view);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  const renderView = () => {
    switch (currentView) {
      case "Residents":
        return <Residents />;
      case "Photos":
        return <Photos />;
      case "Houserules":
        return <Houserules />;
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
      <View style={styles.header}>
        <ImageBackground source={backgroundImage} style={styles.background}>
          <View style={styles.overlay} />
          <TouchableOpacity style={styles.link}>
            <Image source={arrowback} style={{ width: 8, height: 15 }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.link}>
            <Text style={styles.h1}>My house</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.link}>
            <Image source={editpen} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
        </ImageBackground>
      </View>

      <View style={styles.container}>
        <Text style={styles.h2}> Casa Magdalena </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => switchView("Residents")}
          >
            <Text style={styles.buttonText}>Residents</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => switchView("Photos")}
          >
            <Text style={styles.buttonText}>Photos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => switchView("Houserules")}
          >
            <Text style={styles.buttonText}>Houserules</Text>
          </TouchableOpacity>
        </View>
        {renderView()}
      </View>
      <View>
        <TouchableOpacity style={styles.leave}> Leave House </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "rgba(128,0,128,0.5)",
    paddingTop: "55px",
    height: "225px",
    paddingHorizontal: "25px",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(22,6,53,0.6)",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  link: {
    fontFamily: "novatica",
  },

  leave: {
    textAlign: "center",
    fontFamily: "manrope",
    color: "#FF7A7A",
    paddingTop: "29px",
    textDecorationLine: "underline",
  },
  h1: {
    fontFamily: "novatica",
    fontSize: 20,
    color: "white",
  },
  h2: {
    fontFamily: "novatica",
    fontSize: 16,
    color: "#160635",
    paddingVertical: "30px",
    textAlign: "center",
  },
  container: {
    paddingHorizontal: "25px",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
  },
  button: {
    height: 50,
    width: 120,
    borderRadius: 30,
    backgroundColor: "#D9B2EE",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontFamily: "Moon",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default App;
