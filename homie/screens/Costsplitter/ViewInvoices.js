import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import AddInvoice from "./AddInvoice";

import arrowLeft from "../../assets/icons/arrowLeft.svg";
import searchIcon from "../../assets/icons/search.svg";
import energy from "../../assets/energy.png";
import water from "../../assets/water.svg";
import other from "../../assets/other.png";
import invoices from "../../assets/invoices.svg";
import close from "../../assets/icons/close.svg";
import camera from "../../assets/icons/Camera.svg";
import picture from "../../assets/icons/picture.svg";

export default function ViewInvoices() {
  const navigation = useNavigation();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleUploadInvoice = () => {
    setPopupVisible(true);
  };

  const handleTakePicture = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access camera was denied!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      setSelectedImage(result.uri);
      navigation.navigate("AddInvoice", { selectedImage: result.uri });
    }
    setPopupVisible(false);
  };

  const handleSelectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media library was denied!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      setSelectedImage(result.uri);
      navigation.navigate("AddInvoice", { selectedImage: result.uri });
    }
    setPopupVisible(false);
  };

  const handleCategorySelect = (category) => {
    navigation.navigate("CategoryScreen", { category });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={arrowLeft} style={styles.arrowLeftIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Invoices</Text>
          <View style={styles.emptyIcon} />
        </View>
        <Image source={invoices} style={styles.invoicesImage} />
        <View style={styles.uploadContainer}>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={handleUploadInvoice}
          >
            <Text style={styles.uploadButtonText}>Upload invoice</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search an invoice"
            style={styles.searchInput}
          />
          <TouchableOpacity onPress={() => {}}>
            <Image source={searchIcon} style={styles.searchIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.folderContainer}>
          <Text style={styles.subtitle}>Folders</Text>
          <View style={styles.category}>
            <TouchableOpacity
              style={styles.imageContainer}
              onPress={() => handleCategorySelect("Energy")}
            >
              <ImageBackground
                source={energy}
                style={styles.image}
                imageStyle={{ borderRadius: 10 }}
              >
                <View style={styles.overlay}>
                  <Text style={styles.categoryText}>Energy</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.imageContainer}
              onPress={() => handleCategorySelect("Water")}
            >
              <ImageBackground
                source={water}
                style={styles.image}
                imageStyle={{ borderRadius: 10 }}
              >
                <View style={styles.overlay}>
                  <Text style={styles.categoryText}>Water</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.imageContainer}
              onPress={() => handleCategorySelect("Other")}
            >
              <ImageBackground
                source={other}
                style={styles.image}
                imageStyle={{ borderRadius: 10 }}
              >
                <View style={styles.overlay}>
                  <Text style={styles.categoryText}>Other</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.recentContainer}>
          <Text style={styles.subtitle}>Recent invoices</Text>
          <Text style={styles.fileItem}> filename uit database</Text>
        </View>
      </View>

      <Modal visible={isPopupVisible} transparent={true} animationType="fade">
        <TouchableWithoutFeedback onPress={() => setPopupVisible(false)}>
          <View style={styles.popupContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setPopupVisible(false)}
            >
              <Image source={close} style={styles.closeButtonIcon} />
            </TouchableOpacity>
            <View style={styles.popupContent}>
              <View style={{ paddingTop: 50 }}>
                <TouchableOpacity
                  style={styles.uploadOption}
                  onPress={handleTakePicture}
                >
                  <View style={styles.buttonContainer}>
                    <Image
                      source={camera}
                      style={{ width: 29, height: 25, marginLeft: 20 }}
                    />
                    <Text style={styles.uploadOptionText}>Take a Picture</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSelectImage}>
                  <View style={styles.buttonContainer}>
                    <Image
                      source={picture}
                      style={{ width: 29, height: 25, marginLeft: 20 }}
                    />
                    <Text style={styles.uploadOptionText}>Select an image</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#160635",
    paddingTop: 57,
    paddingBottom: 20,
    alignItems: "center",
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "85%",
    alignItems: "center",
  },
  arrowLeftIcon: {
    width: 8,
    height: 15,
  },
  headerTitle: {
    color: "#fff",
    fontFamily: "novaticaBold",
    fontSize: 20,
    textAlign: "center",
    flex: 1,
  },
  emptyIcon: {
    width: 8,
    height: 15,
  },
  invoicesImage: {
    width: 140,
    height: 85,
    marginTop: 15,
  },
  uploadContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 20,
  },
  uploadButton: {
    backgroundColor: "#B900F4",
    borderRadius: 55,
    width: 194,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  uploadButtonText: {
    fontFamily: "moon",
    fontWeight: "bold",
    color: "#ffffff",
    fontSize: 14,
  },
  uploadedImage: {
    width: 43,
    height: 43,
    marginLeft: 10,
  },
  content: {
    flex: 1,
    padding: 25,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 55,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  folderContainer: {
    paddingTop: 20,
  },
  subtitle: {
    fontFamily: "moon",
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 10,
  },
  category: {
    flexDirection: "row",
    justifyContent: "center",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 5,
    alignItems: "center",
  },
  image: {
    width: 115,
    height: 125,
  },
  fileItem: {
    backgroundColor: "white",
    borderRadius: 10,
    height: 56,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(22, 6, 53, 0.5)",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryText: {
    color: "#fff",
    fontFamily: "moon",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
    marginTop: 15,
    marginBottom: 10,
  },
  recentContainer: {
    paddingTop: 20,
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  fileItem: {
    fontFamily: "manrope",
    fontSize: 16,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  fileName: {
    fontFamily: "manrope",
    fontSize: 16,
  },
  popupContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  closeButtonIcon: {
    top: 330,
    right: 52,
    width: 24,
    height: 24,
    tintColor: "#160635",
  },
  popupContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 20,
    position: "relative",
    height: 250,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#B900F4",
    borderRadius: 30,
    width: 280,
    height: 55,
    marginTop: 20,
  },
  uploadOptionText: {
    fontFamily: "moon",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    marginLeft: 10,
  },
});
