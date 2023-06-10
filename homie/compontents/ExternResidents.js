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
import profilePicture from "../assets/girl.jpg";
import messenger from "../assets/icons/messenger.svg";
import whatsapp from "../assets/icons/whatsapp.svg";
import share from "../assets/icons/share.svg";
import crossIcon from "../assets/icons/close.svg";

const residentsData = [
  { name: "Me" },
  { name: "Boysangur" },
  { name: "Yanelle" },
  { name: "Seppe" },
];

export default class Residents extends Component {
   
  renderResidents() {
    return residentsData.map((resident, index) => (
      <View style={styles.residentFull} key={index}>
        <View style={styles.residentProfile}>
          <View style={styles.status}>
            <Image source={profilePicture} style={styles.profilePicture} />
          </View>
          <Text style={{ fontSize: '16px', fontFamily:'manrope' }}>{resident.name}</Text>
        </View>
      </View>
    ));
  }

  render() {
    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.h3}>Residents</Text>
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
    paddingVertical: 40,
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
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  residentFull: {
    backgroundColor: "#FAFAFA",
    marginBottom: 8,
    height: 56,
    width: "100%",
    borderRadius: '10px',
    padding: '5px'
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
