import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import arrowLeft from "../assets/icons/arrowLeft.svg";
import fun from "../assets/undraw_having_fun_re_vj4h 1.svg";
import Event from "../compontents/Event";

import MoonFont from "../assets/fonts/Moon.otf";
import Novatica from "../assets/fonts/Novatica-Bold.woff";
import Manrope from "../assets/fonts/Manrope-Bold.ttf";

export default function FullCalenderScreen() {
  const navigation = useNavigation();
  const events = [
    {
      date: { day: "12", month: "DEC" },
      title: "Houseparty in Casa",
      description: "A little party killed nobody",
      image: require("../assets/girl.jpg"),
    },
    {
      date: { day: "15", month: "DEC" },
      title: "Outdoor Concert",
      description: "Live music under the stars",
      image: require("../assets/boy.jpg"),
    },
    {
      date: { day: "18", month: "DEC" },
      title: "Art Exhibition",
      description: "Explore stunning artworks",
      image: require("../assets/boy.jpg"),
    },
  ];

  return (
    <View>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "85%",
              }}
            >
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={arrowLeft} style={{ width: 8, height: 15 }} />
              </TouchableOpacity>
              <Text
                style={{
                  color: "#fff",
                  fontFamily: "novaticaBold",
                  fontSize: 20,
                  textAlign: "center",
                  flex: 1, // Take up remaining space
                }}
              >
                All planned events
              </Text>
              <View style={{ width: 8, height: 15 }} />{" "}
              {/* Placeholder for spacing */}
            </View>

            <Image
              source={fun}
              style={{ width: 110, height: 100, marginTop: 20 }}
            />
            <TouchableOpacity style={[styles.button]}>
              <Text style={styles.buttonText}>Plan an event</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {events.map((event, index) => (
        <Event
          key={index}
          date={event.date}
          title={event.title}
          description={event.description}
          image={event.image}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#160635",
    height: 292,
    paddingTop: 50,
  },

  button: {
    backgroundColor: "#B900F4",
    borderRadius: 55,
    width: 194,
    height: 50,
    alignItems: "center",
    justifyContent: "center", // Add this line
    marginTop: 20,
  },

  buttonText: {
    fontFamily: "moon",
    fontWeight: "bold",
    color: "#ffffff",
    fontSize: 14,
  },
});
