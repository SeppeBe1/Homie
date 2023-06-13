import React, { Component } from "react";
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

const galleryImages = [
  require("../assets/girl.jpg"),
  require("../assets/girl.jpg"),
  require("../assets/girl.jpg"),
  require("../assets/girl.jpg"),
  require("../assets/girl.jpg"),
  require("../assets/girl.jpg"),
];

export default class Residents extends Component {
  state = {
    selectedImage: null,
  };

  selectImage = (image) => {
    this.setState({ selectedImage: image });
  };

  closeImage = () => {
    this.setState({ selectedImage: null });
  };

  shareImage = async (image) => {
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

  renderImageRow = ({ item }) => {
    const { startIndex, images } = item;
    return (
      <View key={startIndex} style={styles.imageRow}>
        {images.map((image, index) => (
          <TouchableOpacity
            key={startIndex + index}
            onPress={() => this.selectImage(image)}
            style={styles.galleryImageWrapper}
          >
            <Image source={image} style={styles.galleryImage} />
            {this.state.selectedImage === image && (
              <Modal transparent={true} visible={true}>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  activeOpacity={1}
                  onPress={this.closeImage}
                >
                  <View style={styles.overlay}>
                    <Image source={image} style={styles.enlargedImage} />
                    <View style={styles.buttonImage}>
                      <TouchableOpacity
                        onPress={() => this.shareImage(image)}
                        style={styles.shareButton}
                      >
                        <Image source={share} style={styles.photoButton} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={this.closeImage}>
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

  render() {
    const { navigation } = this.props; // Added navigation prop
    const imagesPerRow = 3;
    const rows = Math.ceil(galleryImages.length / imagesPerRow);
    const imageRows = Array.from(Array(rows).keys()).map((index) => ({
      startIndex: index * imagesPerRow,
      images: galleryImages.slice(
        index * imagesPerRow,
        (index + 1) * imagesPerRow
      ),
    }));
    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.h3}>Our recent moments</Text>
        </View>
        <FlatList
          data={imageRows}
          renderItem={this.renderImageRow}
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
  }
}

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
