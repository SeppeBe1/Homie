import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import MoonFont from "../assets/fonts/Moon.otf";
import moonBold from "../assets/fonts/Moon Bold.otf";
import Novatica from "../assets/fonts/Novatica.ttf";
import NovaticaBold from "../assets/fonts/Novatica-Bold.ttf";
import Manrope from "../assets/fonts/Manrope-Bold.ttf";
import Residents from "../compontents/Residents";
import Photos from "../compontents/Photos";
import Houserules from "../compontents/Houserules";
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
    novaticaBold: NovaticaBold,
    moonBold: moonBold,
  });
};

const cameraIconColor = "#00B9F4"; // Color for the camera icon
const imageIconColor = "#F57ED4"; // Color for the files icon
const App = () => {
  const navigation = useNavigation();
  const [currentView, setCurrentView] = useState("Residents");
  const [backgroundImageURI, setBackgroundImageURI] = useState(backgroundImage);
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
  const [uploadPopupVisible, setUploadPopupVisible] = useState(false);
  const handleChooseFromFiles = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to select an image.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      // Set the selected image as the background image
      setBackgroundImageURI(result.uri);
    }
    setUploadPopupVisible(false);
  };

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to take a photo.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      // Set the captured image as the background image
      setBackgroundImageURI(result.uri);
    }

    setUploadPopupVisible(false);
  };

  const UploadImagePopup = () => {
    return (
      <View>
        <TouchableOpacity
          style={styles.link}
          onPress={() => setUploadPopupVisible(true)}
        >
          <Image source={editpen} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>

        <Modal visible={uploadPopupVisible} animationType="slide " transparent>
          <View style={styles.overlay}>
            <View style={styles.modalContainer}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setUploadPopupVisible(false)}
              >
                <Image source={closeIcon} style={{ width: 24, height: 24 }} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Upload Image</Text>
              <View style={styles.uploadContainer}>
                <TouchableOpacity
                  style={styles.uploadZone}
                  onPress={handleTakePhoto}
                >
                  <AntDesign name="camera" size={40} color={cameraIconColor} />
                  <Text style={styles.uploadText}>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.uploadZone}
                  onPress={handleChooseFromFiles}
                >
                  <FontAwesome name="image" size={35} color={imageIconColor} />
                  <Text style={styles.uploadText}>Gallery</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
      <View style={styles.header}>
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
          <TouchableOpacity style={styles.link}>
            <Text style={styles.h1}>My house</Text>
          </TouchableOpacity>
          <UploadImagePopup />
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
    justifyContent: "space-between",
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
    fontFamily: "novaticaBold",
    fontSize: 16,
    color: "#160635",
    paddingVertical: 30,
    textAlign: "center",
  },
  container: {
    paddingHorizontal: 25,
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

export default App;
