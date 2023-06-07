import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Platform,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import arrowLeft from "../assets/icons/arrowLeft.svg";
import upload from "../assets/icons/upload.svg";

import * as ImagePicker from "expo-image-picker";

export default function AddEvent() {
  const [startDate, setStartDate] = useState(new Date());
  const navigation = useNavigation();
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventHour, setEventHour] = useState("");
  const [eventPicture, setEventPicture] = useState("");
  const [eventNote, setEventNote] = useState("");
  const [eventDate, setEventDate] = useState("");

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

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    setEventDate(date.toLocaleDateString()); // convert date to a string in local date format
    hideDatePicker();
  };

  const isEventNameFilled = eventName !== "";
  const isEventDescriptionFilled = eventDescription !== "";
  const isEventLocationFilled = eventLocation !== "";
  const isEventHourFilled = eventHour !== "";

  const CustomDatePicker = () => {
    if (Platform.OS === "web") {
      return (
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="Choose Date"
          className="datepicker-web"
          style={{ fontFamily: "moon", zIndex: 10000 }}
        />
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.datePickerContainer}
          onPress={showDatePicker}
        >
          <Text style={styles.datePickerButtonText}>
            {eventDate ? eventDate : "Choose Date"}
          </Text>
        </TouchableOpacity>
      );
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
          style={[
            styles.inputSmall,
            { color: isEventNameFilled ? "black" : "#A5A5A5" },
          ]}
          placeholder="Name of event"
          value={eventName}
          onChangeText={setEventName}
        />

        <TextInput
          style={[
            styles.inputSmall,
            { color: isEventDescriptionFilled ? "black" : "#A5A5A5" },
          ]}
          placeholder="Description"
          value={eventDescription}
          onChangeText={setEventDescription}
        />

        <TextInput
          style={[
            styles.inputSmall,
            { color: isEventLocationFilled ? "black" : "#A5A5A5" },
          ]}
          placeholder="Location of event"
          value={eventLocation}
          onChangeText={setEventLocation}
        />

        <CustomDatePicker />

        <TextInput
          style={[
            styles.inputSmall,
            { color: isEventHourFilled ? "black" : "#A5A5A5" },
          ]}
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

        <View>
          <Text style={{ fontFamily: "manrope", paddingVertical: 10 }}>
            Send a nice invitation to your homies....
          </Text>
          <TextInput
            style={styles.inputBig}
            placeholderTextColor="#A5A5A5"
            placeholder="Type a note"
            value={eventNote}
            onChangeText={setEventNote}
            multiline
          />
          <Image source={{ uri: eventPicture }} style={styles.picture} />
        </View>
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
  inputSmall: {
    height: 56,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "white",
    borderColor: "transparent",
    fontFamily: "manrope",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#B900F4",
    borderRadius: 30,
    width: 200,
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
  buttoncontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  inputPicture: {
    flex: 1,
    height: 56,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "transparent",
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
    height: 55,
    paddingTop: 15,
  },
  inputBig: {
    height: 115,
    borderRadius: 10,
    backgroundColor: "white",
    borderColor: "transparent",
    fontFamily: "manrope",
    fontSize: 16,
    color: "black",
    padding: 15,
  },
});
