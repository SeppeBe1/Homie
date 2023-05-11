import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import MoonFont from "../assets/fonts/Moon.otf";
import Novatica from "../assets/fonts/Novatica-Bold.woff";
import Residents from "../compontents/Residents";
import Photos from "../compontents/Photos";
import Houserules from "../compontents/Houserules";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
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
            style={[
              styles.button,
              currentView === "Residents" && styles.activeButton,
            ]}
            onPress={() => switchView("Residents")}
          >
            <Text
              style={[
                styles.buttonText,
                currentView === "Residents" && styles.activeButtonText,
              ]}
            >
              Residents
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              currentView === "Photos" && styles.activeButton,
            ]}
            onPress={() => switchView("Photos")}
          >
            <Text
              style={[
                styles.buttonText,
                currentView === "Photos" && styles.activeButtonText,
              ]}
            >
              Photos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              currentView === "Houserules" && styles.activeButton,
            ]}
            onPress={() => switchView("Houserules")}
          >
            <Text
              style={[
                styles.buttonText,
                currentView === "Houserules" && styles.activeButtonText,
              ]}
            >
              Houserules
            </Text>
          </TouchableOpacity>
        </View>
        {renderView()}
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

  h1: {
    fontFamily: "novatica",
    fontWeight: "700",
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
    backgroundColor: "#F2F2F2",
    borderColor: "#D9B2EE",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  activeButton: {
    backgroundColor: "#D9B2EE",
  },
  activeButtonText: {
    color: "#FFFFFF", // Update the text color for active button
  },

  buttonText: {
    fontFamily: "Moon",
    fontWeight: "bold",
    fontSize: 14,
    color: "#D9B2EE",
  },
});

export default App;
