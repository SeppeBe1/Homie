import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import arrowLeft from "../../assets/icons/arrowLeft.svg";
import fun from "../../assets/undraw_having_fun_re_vj4h 1.svg";
import Event from "../../compontents/Event";
import AddEvent from "./AddEvent";
import EventDetails from "./EventDetails.js";

export default function FullCalenderScreen() {
  const navigation = useNavigation();
  const events = [
    {
      date: { day: "12", month: "DEC" },
      title: "Houseparty in Casa",
      description: "A little party killed nobody",
      image: require("../../assets/girl.jpg"),
    },
    {
      date: { day: "15", month: "DEC" },
      title: "Outdoor Concert",
      description: "Live music under the stars",
      image: require("../../assets/boy.jpg"),
    },
    {
      date: { day: "18", month: "DEC" },
      title: "Art Exhibition",
      description: "Explore stunning artworks",
      image: require("../../assets/boy.jpg"),
    },
  ];

  return (
    <View>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
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
                  flex: 1,
                }}
              >
                All planned events
              </Text>
              <View style={{ width: 8, height: 15 }} />
            </View>
            <Image
              source={fun}
              style={{ width: 110, height: 100, marginTop: 20 }}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate("AddEvent")}
              style={[styles.button]}
            >
              <Text style={styles.buttonText}>Plan an event</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.eventContainer}>
        {events.map((event, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate("EventDetails")}
          >
            <Event
              date={event.date}
              title={event.title}
              description={event.description}
              image={event.image}
              navigation={navigation}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#160635",
    height: 292,
    paddingTop: 57,
  },

  button: {
    backgroundColor: "#B900F4",
    borderRadius: 55,
    width: 194,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  buttonText: {
    fontFamily: "moon",
    fontWeight: "bold",
    color: "#ffffff",
    fontSize: 14,
  },

  eventContainer: {
    marginTop: 20,
  },
});
