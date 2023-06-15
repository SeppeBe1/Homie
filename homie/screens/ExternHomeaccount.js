import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import MoonFont from "../assets/fonts/Moon.otf";
import Novatica from "../assets/fonts/Novatica-Bold.woff";
import Manrope from "../assets/fonts/Manrope-Bold.ttf";
import ExternResidents from "../compontents/ExternResidents";
import ExternPhotos from "../compontents/ExternPhotos";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Modal,
  Button,
} from "react-native";

import arrowback from "../assets/icons/Arrow_back.svg";
import editpen from "../assets/icons/Edit_pen.svg";
import backgroundImage from "../assets/grouppicture.jpg";
import closeIcon from "../assets/icons/close.svg";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const loadFonts = async () => {
  await Font.loadAsync({
    moon: MoonFont,
    novatica: Novatica,
    manrope: Manrope,
  });
};

export default function ExternHomeaccount({navigation}) {

  const [currentView, setCurrentView] = useState("ExternResidents");
  const [backgroundImageURI, setBackgroundImageURI] = useState(backgroundImage);

  const switchView = (view) => {
    setCurrentView(view);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  const renderView = () => {
    switch (currentView) {
      case "ExternResidents":
        return <ExternResidents navigation={navigation} />;
      case "ExternPhotos":
        return <ExternPhotos />;
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
      <View style={[styles.header, {marginBottom: '35px'}]}>
        <ImageBackground
          source={{ uri: backgroundImageURI }}
          style={styles.background}
        >
          <View style={styles.overlay} />
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={arrowback}
              style={{ width: 8, height: 15, marginRight: 10 }}
            />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: 'center', zIndex: 1 }}>
        <Text style={[styles.h1, {textAlign:'center'}]}>Casa Frankie</Text>
        </View>
        </ImageBackground>
      </View>

      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              currentView === "ExternResidents" && styles.activeButton,
            ]}
            onPress={() => switchView("ExternResidents")}
          >
            <Text
              style={[
                styles.buttonText,
                currentView === "ExternResidents" && styles.activeButtonText,
              ]}
            >
              Residents
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              currentView === "ExternPhotos" && styles.activeButton,
            ]}
            onPress={() => switchView("ExternPhotos")}
          >
            <Text
              style={[
                styles.buttonText,
                currentView === "ExternPhotos" && styles.activeButtonText,
              ]}
            >
              Photos
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
    paddingTop: 55,
    height: 225,
    paddingHorizontal: 25,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(22,6,53,0.6)",
  },
  header: {
    flexDirection: "row",
  },

  link: {
    fontFamily: "novatica",
  },

  h1: {
    fontFamily: "novatica",
    fontWeight: "700",
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  h2: {
    fontFamily: "novatica",
    fontSize: 16,
    fontWeight: "bold",
    color: "#160635",
    paddingVertical: 30,
    textAlign: "center",
  },
  container: {
    paddingHorizontal: 25,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  button: {
    height: 50,
    width: 170,
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

  modalContainer: {
    height: 180,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalTitle: {
    fontFamily: "moon",
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 8,
  },
  uploadText: {
    fontFamily: "manrope",
    fontSize: 12,
  },

  uploadZone: {
    paddingTop: 15,
    flex: 1,
    alignItems: "center",
    width: 100,
    alignContent: "space-around",
  },

  uploadContainer: {
    alignItems: "baseline",
    flex: 1,
    flexDirection: "row",
    width: 160,
  },
});