import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Modal,
  Share,
  FlatList,
} from "react-native";
import share from "../assets/icons/share.svg";
import close from "../assets/icons/close_white.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Residents = ({ navigation }) => {
  const [showModal, setShowModal] = useState(false);
  const [photoData, setPhotoData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    getPhotos();
  }, []);

  const getPhotos = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/v1/photo/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (data.status === "success") {
        const photos = data.result.map((photo) => ({
          image: photo.image,
          description: photo.description,
          houseName: photo.houseName,
          city: photo.city,
          dateTaken: photo.dateTaken,
          houseId: photo.houseId,
        }));

        const recentPhotos = photos.slice(0, 6); // Selecteer de meest recente 6 foto's
        setPhotoData(recentPhotos);
      } else {
        console.log(data.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const selectImage = (image) => {
    setSelectedImage(image);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const shareImage = async (image) => {
    try {
      const shareOptions = {
        title: "Share Image",
        url: image,
      };
      await Share.share(shareOptions);
    } catch (error) {
      console.log(error);
    }
  };

  const renderImageRow = ({ item }) => {
    const { startIndex, images } = item;

    return (
      <View key={startIndex} style={styles.imageRow}>
        {images.map((photo, index) => (
          <TouchableOpacity
            key={startIndex + index}
            onPress={() => selectImage(photo.image)}
            style={styles.galleryImageWrapper}
          >
            <Image source={{ uri: photo.image }} style={styles.galleryImage} />
            {selectedImage === photo.image && (
              <Modal transparent={true} visible={true}>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  activeOpacity={1}
                  onPress={closeImage}
                >
                  <View style={styles.overlay}>
                    <Image
                      source={{ uri: photo.image }}
                      style={styles.enlargedImage}
                    />
                    <View style={styles.buttonImage}>
                      <TouchableOpacity
                        onPress={() => shareImage(photo.image)}
                        style={styles.shareButton}
                      >
                        <Image source={share} style={styles.photoButton} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={closeImage}>
                        <Image source={close} style={styles.photoButton} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              </Modal>
            )}
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const imagesPerRow = 3;
  const rows = Math.ceil(photoData.length / imagesPerRow);
  const imageRows = Array.from(Array(rows).keys()).map((index) => ({
    startIndex: index * imagesPerRow,
    images: photoData.slice(index * imagesPerRow, (index + 1) * imagesPerRow),
  }));

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.h3}>Our recent moments</Text>
      </View>
      <FlatList
        data={imageRows}
        renderItem={renderImageRow}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Memorywall")}
        >
          <Text style={styles.buttonText}>View memory wall</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 35,
    paddingBottom: 10,
  },
  h3: {
    fontFamily: "moon",
    fontSize: 14,
    color: "#160635",
    fontWeight: "bold",
  },
  imageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  galleryImageWrapper: {
    position: "relative",
  },
  galleryImage: {
    width: 102,
    height: 102,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(22,6,53,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  enlargedImage: {
    width: "80%",
    height: "65%",
    borderRadius: 20,
  },
  buttonImage: {
    position: "absolute",
    top: "20%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "15%",
    width: "100%",
    zIndex: 1,
  },
  photoButton: {
    width: 28,
    height: 28,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
  },
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
    fontSize: 18,
  },
  shareButton: {
    marginRight: 10,
  },
});

export default Residents;
