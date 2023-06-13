import {
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Modal,
  Share,
} from "react-native";
import React, { Component } from "react";
import girl1 from "../assets/girl.jpg";
import girl2 from "../assets/girl.jpg";
import girl3 from "../assets/girl.jpg";
import girl4 from "../assets/girl.jpg";
import girl5 from "../assets/girl.jpg";
import girl6 from "../assets/girl.jpg";
import share from "../assets/icons/share.svg";
import close from "../assets/icons/close_white.svg";

const galleryImages = [girl1, girl2, girl3, girl4, girl5, girl6];

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

  render() {
    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.h3}>Our recent moments</Text>
        </View>
        <View style={styles.galleryContainer}>
          {galleryImages.map((image, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => this.selectImage(image)}
              style={styles.galleryImageWrapper}
            >
              <Image source={image} style={styles.galleryImage} />
              {this.state.selectedImage === image && (
                <Modal transparent={true} onRequestClose={this.closeImage}>
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
                </Modal>
              )}
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>View memory wall</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  h3: {
    fontFamily: "moon",
    fontSize: 14,
    color: "#160635",
    fontWeight: "bold",
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
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
  },
  h3: {
    fontFamily: "moon",
    fontSize: 14,
    color: "#160635",
    paddingVertical: 40,
    fontWeight: "bold",
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  galleryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingTop: 20,
    gap: 18,
  },
  galleryImageWrapper: {
    position: "relative",
  },
  galleryImage: {
    width: 102,
    height: 102,
    marginBottom: 10,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(22,6,53,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
  },
  closeButtonText: {
    color: "#FFF",
    fontSize: 18,
  },
  enlargedImage: {
    width: "80%",
    height: "65%",
    borderRadius: "20px",
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
});
