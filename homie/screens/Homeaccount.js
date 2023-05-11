import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import MoonFont from "../assets/fonts/Moon.otf";
import Novatica from "../assets/fonts/Novatica-Bold.woff";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
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
import addResident from "../assets/icons/add.svg";

const loadFonts = async () => {
  await Font.loadAsync({
    moon: MoonFont,
    novatica: Novatica,
  });
};

const Header = () => {
  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.overlay} />
      <View style={styles.container}>
        <TouchableOpacity style={styles.link}>
          <Image source={arrowback} style={{ width: "8px", height: "15px" }} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.link}>
          <Text style={styles.text}>My house</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link}>
          <Image source={editpen} style={{ width: "24px", height: "24px" }} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const Residents = () => {
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.h2}> Our residents</Text>
      <TouchableOpacity>
        <Text>Add resident</Text>
        <Image source={addResident} style={{ width: "20px", height: "20px" }} />
      </TouchableOpacity>
    </View>
  );
};

const Pictures = () => {
  return (
    <View style={styles.container}>
      <Header />
    </View>
  );
};

const HouseRules = () => {
  return (
    <View style={styles.container}>
      <Header />
    </View>
  );
};

const ResidentsStackNavigator = createStackNavigator({
  Residents: { screen: Residents },
});

const PicturesStackNavigator = createStackNavigator({
  Pictures: { screen: Pictures },
});

const HouseRulesStackNavigator = createStackNavigator({
  HouseRules: { screen: HouseRules },
});

const TabNavigator = createBottomTabNavigator(
  {
    Residents: { screen: ResidentsStackNavigator },
    Pictures: { screen: PicturesStackNavigator },
    HouseRules: { screen: HouseRulesStackNavigator },
  },
  {
    initialRouteName: "Residents",
  }
);

const AppContainer = createAppContainer(TabNavigator);

export default function Homeaccount({ navigation }) {
  useEffect(() => {
    loadFonts();
  }, []);

  return (
    <View style={{ backgroundColor: "#F5F5F5" }}>
      <AppContainer />
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

  h2: {
    fontFamily: "novatica",
    fontSize: 16,
    color: "#160635",
  },
});
