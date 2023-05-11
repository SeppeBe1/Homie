import { Text, TouchableOpacity, View, Image, StyleSheet } from "react-native";
import React, { Component } from "react";
import addButton from "../assets/icons/add.svg";
import profilePicture from "../assets/girl.jpg";

const residentsData = [
  { name: "Me", profileStatusColor: "#FFB84E" },
  { name: "Boysangur", profileStatusColor: "#3BED6D" },
  { name: "Yanelle", profileStatusColor: "#FF7A7A" },
  { name: "Seppe", profileStatusColor: "#FF7A7A" },
];

export default class Residents extends Component {
  renderResidents() {
    return residentsData.map((resident, index) => (
      <View style={styles.residentFull}>
        <View style={styles.residentProfile} key={index}>
          <View style={styles.status}>
            <Image source={profilePicture} style={styles.profilePicture} />
            <Image
              style={[
                styles.circle,
                { backgroundColor: resident.profileStatusColor },
              ]}
            />
          </View>
          <Text>{resident.name}</Text>
        </View>
      </View>
    ));
  }

  render() {
    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.h3}>Our residents</Text>
          <View style={styles.residentsTitle}>
            <Text style={styles.addResident}>Add resident</Text>
            <Image source={addButton} style={{ width: 20, height: 20 }} />
          </View>
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
    paddingVertical: 30,
    fontWeight: "bold",
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
    marginBottom: "8px",
    height: "56px",
    width: "100%",
  },
  addResident: {
    fontFamily: "manrope",
    fontSize: "13px",
    color: "#A5A5A5",
    paddingRight: "5px",
  },
  residentProfile: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "16px",
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
});
