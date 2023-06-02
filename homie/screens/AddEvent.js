import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
} from "react-native";
import arrowLeft from "../assets/icons/arrowLeft.svg";
import upload from "../assets/icons/upload.svg";

import * as ImagePicker from "expo-image-picker";

import MoonFont from "../assets/fonts/Moon.otf";
import Novatica from "../assets/fonts/Novatica-Bold.woff";
import Manrope from "../assets/fonts/Manrope-Bold.ttf";

export default function AddEvent() {
  const navigation = useNavigation();
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventHour, setEventHour] = useState("");
  const [eventPicture, setEventPicture] = useState("");
  const [eventNote, setEventNote] = useState("");
  const handleSelectPicture = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access the camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      setEventPicture(result.uri);
    }
  };

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={arrowLeft}
            style={{ width: 8, height: 15, marginRight: 10 }}
          />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text
            style={{ color: "#fff", fontFamily: "novaticaBold", fontSize: 20 }}
          >
            Plan an event
          </Text>
        </View>
      </View>

      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Name of event"
          value={eventName}
          onChangeText={setEventName}
        />

        <TextInput
          style={styles.input}
          placeholder="Description"
          value={eventDescription}
          onChangeText={setEventDescription}
        />

        <TextInput
          style={styles.input}
          placeholder="Location of event"
          value={eventLocation}
          onChangeText={setEventLocation}
        />

        <TextInput
          style={styles.input}
          placeholder="Date of event"
          value={eventDate}
          onChangeText={setEventDate}
        />

        <TextInput
          style={styles.input}
          placeholder="Start hour"
          value={eventHour}
          onChangeText={setEventHour}
        />

        <TouchableOpacity
          style={styles.buttonPicture}
          onPress={handleSelectPicture}
        >
          <View style={styles.inputPicture}>
            <Text style={styles.text}>Add a fun picture</Text>

            <Image source={upload} style={{ width: 30, height: 30 }} />
          </View>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Type a nice note for your coming homies"
          value={eventNote}
          onChangeText={setEventNote}
        />
        <Image source={{ uri: eventPicture }} style={styles.picture} />
      </View>

      <View style={styles.buttoncontainer}>
        <TouchableOpacity style={[styles.button]}>
          <Text style={styles.buttonText}>submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#160635",
    height: 115,
    marginBottom: 20,
  },
  container: {
    paddingHorizontal: 20,
  },
  input: {
    height: 56,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "white",
    borderColor: "transparent",
    fontFamily: "manrope",
    fontSize: 16,
    color: "#A5A5A5",
  },

  button: {
    backgroundColor: "#B900F4",
    borderRadius: 30,
    width: 200,
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

  buttoncontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
  },

  buttonPicture: {
    height: 56,
  },
  buttonPictureText: {
    fontFamily: "moon",
    fontWeight: "bold",
    color: "#ffffff",
    fontSize: 14,
  },
  inputPicture: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "transparant",
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "white",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  text: {
    fontFamily: "manrope",
    fontSize: 16,
    color: "#A5A5A5",
  },
});
