import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import arrowLeft from "../assets/icons/arrowLeft.svg";
import emailIcon from "../assets/icons/email.svg";
import phoneIcon from "../assets/icons/phone.svg";
import profilePicture from "../assets/boy2.jpg";
import * as Font from "expo-font";
import React, { useState, useEffect } from "react";

// Load the font
const loadFonts = async () => {
  await Font.loadAsync({
    moon: require("../assets/fonts/Moon.otf"),
    manrope: require("../assets/fonts/Manrope.ttf"),
    novatica: require("../assets/fonts/Novatica.ttf"),
    novaticaBold: require("../assets/fonts/Novatica-Bold.ttf"),
  });
};

export default function HousemateProfile({ navigation }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts().then(() => {
      setFontsLoaded(true);
    });
  }, []);

  if (!fontsLoaded) {
    return null; // or a loading screen
  }

  const getUsersHouse = async () => {
    const token = await AsyncStorage.getItem("token");
    const houseId = await AsyncStorage.getItem("houseId");
    fetch(`http://localhost:3000/api/v1/users/house/${houseId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.status);
        if (data.status === "failed") {
          console.log(data.status);
        } else if (data.status === "success") {
          const fetchedResidents = data.result;
          const updatedResidentsData = fetchedResidents.map((resident) => ({
            firstname: resident.firstname,
            lastname: resident.lastname,
          }));
          setResidentsData(updatedResidentsData);
          console.log(updatedResidentsData);
        }
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  return (
    <View>
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={arrowLeft}
            style={{ width: 8, height: 15, marginTop: 30 }}
          />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: "center" }}>
          <View style={{ position: "relative" }}>
            <Image
              source={profilePicture}
              style={{ width: 88, height: 88, borderRadius: 50, zIndex: 2 }}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontFamily: "novaticaBold",
                fontSize: "16px",
                textAlign: "center",
              }}
            >
              Boy
            </Text>
          </View>
        </View>
      </View>

      <View style={{ backgroundColor: "#F2F2F2" }}>
        <View style={styles.profileItemFirst}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={styles.profileItemTitle}>
              <Image
                source={emailIcon}
                style={{
                  width: 20,
                  height: 16,
                  marginHorizontal: 10,
                  marginTop: 13,
                  marginBottom: 10,
                }}
              />
              <Text style={styles.titleText}>Email address</Text>
            </View>
          </View>
          <Text
            style={{ fontFamily: "manrope", margin: "10px", fontSize: "16px" }}
          >
            boysangur@hotmail.com
          </Text>
        </View>
        <View style={styles.profileItem}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={styles.profileItemTitle}>
              <Image
                source={phoneIcon}
                style={{ width: 21, height: 21, margin: 10 }}
              />
              <Text style={styles.titleText}>Phonenumber</Text>
            </View>
          </View>
          <Text
            style={{ fontFamily: "manrope", margin: "10px", fontSize: "16px" }}
          >
            +32 412 34 76 06
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topHeader: {
    backgroundColor: "#160635",
    height: "225px",
    padding: "25px",
  },

  profileItemFirst: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 15,
    marginHorizontal: "25px",
    marginTop: "25px",
    marginBottom: "5px",
  },

  profileItem: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 15,
    marginHorizontal: "25px",
    marginVertical: "5px",
  },

  profileItemTitle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 10,
  },

  titleText: {
    fontFamily: "moon",
    fontWeight: "bold",
    fontSize: "16px",
    color: "#160635",
    marginTop: 15,
    marginBottom: 10,
    textAlign: "left",
  },
});
