import { Text, TouchableOpacity, View, Image } from "react-native";
import React, { Component } from "react";
import addButton from "../assets/icons/add.svg";
import profilePicture from "../assets/girl.jpg";

const residentsData = [
  { name: "Me", profileStatus: require("../assets/icons/add.svg") },
  { name: "John", profileStatus: require("../assets/icons/add.svg") },
  { name: "Emma", profileStatus: require("../assets/icons/add.svg") },
  { name: "Emma", profileStatus: require("../assets/icons/add.svg") },
];

export default class Residents extends Component {
  renderResidents() {
    return residentsData.map((resident, index) => (
      <View key={index}>
        <Image source={profilePicture} style={{ width: 40, height: 40 }} />
        <Image
          source={resident.profileStatus}
          style={{ width: 10, height: 10 }}
        />
        <Text>{resident.name}</Text>
      </View>
    ));
  }

  render() {
    return (
      <View>
        <Text>Our residents</Text>
        <View>
          <TouchableOpacity> Add resident </TouchableOpacity>
          <Image source={addButton} style={{ width: 20, height: 20 }} />
        </View>
        {this.renderResidents()}
        <View>
          <TouchableOpacity> Leave House </TouchableOpacity>
        </View>
      </View>
    );
  }
}
