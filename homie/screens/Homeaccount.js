import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Modal,
} from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import arrowback from "../assets/icons/Arrow_back.svg";
import editpen from "../assets/icons/Edit_pen.svg";
import backgroundImage from "../assets/grouppicture.jpg";
import closeIcon from "../assets/icons/close.svg";
import Residents from "../compontents/Residents";
import Photos from "../compontents/Photos";
import Houserules from "../compontents/Houserules";

const loadFonts = async () => {
  await Font.loadAsync({
    Moon: require("../assets/fonts/Moon.otf"),
    Novatica: require("../assets/fonts/Novatica.ttf"),
    ManropeBold: require("../assets/fonts/Manrope-Bold.ttf"),
    Manrope: require("../assets/fonts/Manrope.ttf"),
    NovaticaBold: require("../assets/fonts/Novatica-Bold.ttf"),
    MoonBold: require("../assets/fonts/Moon Bold.otf"),
  });
};

const App = () => {
  const navigation = useNavigation();
  const [houseId, setHouseId] = useState([]);
  const [firstname, setFirstname] = useState([]);
  const [lastname, setLastname] = useState([]);
  const [housename, setHousename] = useState([]);
  const [currentView, setCurrentView] = useState("Residents");
  const [backgroundImageURI, setBackgroundImageURI] = useState(backgroundImage);
  const [uploadPopupVisible, setUploadPopupVisible] = useState(false);

  useEffect(() => {
    loadFonts();
    getUser();
    getHouse();
  });

  const getUser = async () => {
    const userId = await AsyncStorage.getItem("userId");
    console.log(userId);

    fetch(`http://localhost:3000/api/v1/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == "failed") {
          console.log(data.status);
        } else if (data.status == "succes") {
          setFirstname(data.data.firstname);
          setLastname(data.data.lastname);
          setHouseId(data.data.houseId);
          // let profilePic = data.data.profilePic;
        }
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  const getHouse = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log(token);
      console.log(houseId);

      const response = await fetch(
        `http://localhost:3000/api/v1/house/${houseId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.status === "succes") {
        setHousename(data.data.housename);
      }
    } catch (error) {
      console.error("Error fetching house data:", error);
    }
    console.log({ housename });
  };

  const switchView = (view) => {
    setCurrentView(view);
  };

  const handleChooseFromFiles = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to select an image.");
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.cancelled) {
        setBackgroundImageURI(result.uri);
      }
    } catch (error) {
      console.error("Error choosing image from files:", error);
    }
    setUploadPopupVisible(false);
  };

  const handleTakePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera permissions to take a photo.");
        return;
      }
      const result = await ImagePicker.launchCameraAsync();
      if (!result.cancelled) {
        setBackgroundImageURI(result.uri);
      }
    } catch (error) {
      console.error("Error taking photo:", error);
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
          <Image source={editpen} style={styles.editPenIcon} />
        </TouchableOpacity>

        <Modal visible={uploadPopupVisible} animationType="slide" transparent>
          <View style={styles.overlay}>
            <View style={styles.modalContainer}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setUploadPopupVisible(false)}
              >
                <Image source={closeIcon} style={styles.closeIcon} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Upload Image</Text>
              <View style={styles.uploadContainer}>
                <TouchableOpacity
                  style={styles.uploadZone}
                  onPress={handleTakePhoto}
                >
                  <AntDesign
                    name="camera"
                    size={40}
                    color={styles.cameraIcon.color}
                  />
                  <Text style={styles.uploadText}>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.uploadZone}
                  onPress={handleChooseFromFiles}
                >
                  <FontAwesome
                    name="image"
                    size={35}
                    color={styles.filesIcon.color}
                  />
                  <Text style={styles.uploadText}>Gallery</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  const renderView = () => {
    switch (currentView) {
      case "Residents":
        return <Residents navigation={navigation} />;
      case "Photos":
        return <Photos navigation={navigation} />;
      case "Houserules":
        return <Houserules />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <ImageBackground
            source={{ uri: backgroundImageURI }}
            style={styles.background}
          >
            <View style={styles.overlay} />
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={arrowback} style={styles.arrowBackIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.link}>
              <Text style={styles.h1}>My house</Text>
            </TouchableOpacity>
            <UploadImagePopup />
          </ImageBackground>
        </View>

        <View style={styles.content}>
          <Text style={styles.h2}> {housename}</Text>
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
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
  arrowBackIcon: {
    width: 8,
    height: 15,
    marginRight: 10,
  },
  link: {
    fontFamily: "Novatica",
  },
  h1: {
    fontFamily: "Novatica",
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
  content: {
    paddingHorizontal: 25,
  },
  h2: {
    fontFamily: "NovaticaBold",
    fontSize: 16,
    color: "#160635",
    paddingVertical: 30,
    textAlign: "center",
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
    color: "#FFFFFF",
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
    fontFamily: "Moon",
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
  closeIcon: {
    width: 24,
    height: 24,
  },
  uploadText: {
    fontFamily: "Manrope",
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
  editPenIcon: {
    width: 24,
    height: 24,
  },
  cameraIcon: {
    color: "#00B9F4",
  },
  filesIcon: {
    color: "#F57ED4",
  },
});

export default App;
