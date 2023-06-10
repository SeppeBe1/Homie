import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Text,
} from "react-native";
import arrowLeft from "../../assets/icons/arrowLeft.svg";
import backgroundImage from "../../assets/event_picture.png";
import location from "../../assets/icons/Location.svg";
import users from "../../assets/boy2.jpg";
import { withTheme } from "react-native-elements";

export default function EventDetails() {
  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.eventImage}>
        <ImageBackground source={backgroundImage} style={styles.background}>
          <View style={styles.overlay} />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.arrowContainer}
          >
            <Image source={arrowLeft} style={styles.arrowLeftIcon} />
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Houseparty in Casa Magdalena</Text>
        <Text style={styles.text}>25 december, 2022</Text>
        <View style={styles.location}>
          <Image source={location} style={styles.locationIcon} />
          <Text style={styles.text}>Casa Magdalena</Text>
        </View>
      </View>
      <View style={styles.going}>
        <Text style={styles.goingText}>Going:</Text>
        <Image source={users} style={styles.userImage} />
      </View>
      <View style={{ paddingHorizontal: "25px" }}>
        <Text style={{ fontFamily: "manrope" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          gravida tempus hendrerit. Proin finibus volutpat justo et condimentum.
          Etiam quam ex, finibus id interdum quis, aliquam ut ex. Maecenas
          efficitur sit amet elit gravida hendrerit. Ut pulvinar efficitur
          consectetur.
        </Text>
      </View>
      <View style={{ alignItems: "center", paddingTop: "50px" }}>
        <TouchableOpacity style={[styles.button]}>
          <Text style={styles.buttonText}>Join the party</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  eventImage: {
    height: 269,
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "left",
    backgroundColor: "#160635",
    height: 130,
    padding: 30,
  },
  location: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    alignItems: "center",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    height: 269,
  },

  headerText: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 5,
    fontFamily: "novatica",
    fontWeight: "bold",
    fontSize: 20,
  },
  text: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 5,
    fontFamily: "moon",
    fontSize: 15,
  },
  locationIcon: {
    width: 24,
    height: 24,
    marginRight: 4,
  },

  arrowContainer: {
    position: "absolute",
    top: 55,
    left: 25,
  },
  arrowLeftIcon: {
    width: 8,
    height: 15,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(22,6,53,0.6)",
    height: 269,
  },
  going: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 115,
    width: "100%",
    justifyContent: "flex-start",
    paddingLeft: 25,
  },
  goingText: {
    color: "#000",
    fontSize: 14,
    marginRight: 10,
    fontFamily: "moon",
    fontWeight: "bold",
  },

  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  button: {
    width: 200,
    height: 50,
    borderRadius: 55,
    backgroundColor: "#00B9F4",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontFamily: "moon",
    fontSize: "15",
  },
});
