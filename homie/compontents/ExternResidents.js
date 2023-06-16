import React, { Component } from "react";
import {
  Share,
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Linking,
} from "react-native";
import addButton from "../assets/icons/add.svg";
import profileJade from "../assets/profielfoto.svg";
import profileBoy from "../assets/boy2.jpg";
import profileSeppe from "../assets/boy.jpg";
import profileYanelle from "../assets/girl.jpg";
import messenger from "../assets/icons/messenger.svg";
import whatsapp from "../assets/icons/whatsapp.svg";
import share from "../assets/icons/share.svg";
import crossIcon from "../assets/icons/close.svg";

const residentsData = [
  { name: "Me", image: profileJade },
  { name: "Boysangur", image: profileBoy },
  { name: "Yanelle", image: profileYanelle },
  { name: "Seppe", image: profileSeppe },
];

export default class Residents extends Component {
  renderResidents() {
    const { navigation } = this.props;
    return residentsData.map((resident, index) => (
      <View style={styles.residentFull} key={index}>
        <TouchableOpacity
          onPress={() => navigation.navigate("housemateprofile")}
        >
          <View style={styles.residentProfile}>
            <View style={styles.status}>
              <Image source={resident.image} style={styles.profilePicture} />
            </View>
            <Text style={{ fontSize: "16px", fontFamily: "manrope" }}>
              {item.firstname}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    ));
  }

  render() {
    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.h3}>The homies</Text>
        </View>
        {this.renderResidents()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  h3: {
    fontFamily: "moon",
    fontSize: 14,
    color: "#160635",
    paddingVertical: 20,
    fontWeight: "bold",
  },
  leave: {
    textAlign: "center",
    fontFamily: "manrope",
    color: "#FF7A7A",
    paddingTop: 29,
    textDecorationLine: "underline",
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  residentsTitle: {
    alignItems: "center",
  },
  residentFull: {
    backgroundColor: "#FAFAFA",
    marginBottom: 8,
    height: 56,
    width: "100%",
    borderRadius: "10px",
    padding: "5px",
  },
  residentProfile: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 16,
  },
  status: {
    position: "relative",
  },
  circle: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(22, 6, 53, 0.5)",
  },
  modalContainer: {
    height: 314,
    width: 342,
    marginTop: 265,
    marginLeft: 35,
    marginRight: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    position: "absolute",
  },
  closeButton: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  closeIcon: {
    width: 25,
    height: 25,
  },
});
