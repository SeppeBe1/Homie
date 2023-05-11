import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import MoonFont from "../assets/fonts/Moon.otf";
import Novatica from "../assets/fonts/Novatica-Bold.woff";
import Residents from "../compontents/Residents";
import Photos from "../compontents/Photos";
import HouseRules from "../compontents/HouseRules";

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
      case "HouseRules":
        return <HouseRules />;
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
            <Text style={styles.text}>My house</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.link}>
            <Image source={editpen} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
        </ImageBackground>
      </View>

      <View style={styles.container}>
        {renderView()}
        <View style={styles.buttonContainer}>
          <Button title="Residents" onPress={() => switchView("Residents")} />
          <Button title="Photos" onPress={() => switchView("Photos")} />
          <Button
            title="House Rules"
            onPress={() => switchView("HouseRules")}
          />
        </View>
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
  text: {
    fontFamily: "novatica",
    fontSize: 20,
    color: "white",
  },
  h2: {
    fontFamily: "novatica",
    fontSize: 16,
    color: "#160635",
  },
});

export default App;
