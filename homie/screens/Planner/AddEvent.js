import React, { useState, useEffect } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import arrowLeft from "../../assets/icons/arrowLeft.svg";
import upload from "../../assets/icons/upload.svg";
import dropdown from "../../assets/icons/dropdown.svg";
import manrope from "../../assets/fonts/Manrope-Regular.ttf";
import SaveAndCancel from "../../compontents/SaveAndCancel"; // Voeg deze importregel toe

import * as ImagePicker from "expo-image-picker";

export default function AddEvent() {
  const [startDate, setStartDate] = useState(new Date());
  const navigation = useNavigation();
  const [eventDescription, setEventDescription] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventHour, setEventHour] = useState("");
  const [eventPicture, setEventPicture] = useState("");
  const [eventNote, setEventNote] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventName, setEventName] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const iseventDescriptionFilled = eventDescription !== "";
  const [taskRules, setTaskRules] = useState("");

  const handleSelectPicture = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access the camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      setEventPicture(result.uri);
      setSelectedFileName(result.uri.split("/").pop()); // Hier wordt de bestandsnaam opgeslagen
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
          <Image source={dropdown} style={styles.dropdownArrow} />
        </TouchableOpacity>
      );
    }
  };

  const addEventToList = async () => {
    if (eventName.trim() !== "" && eventDescription.trim() !== "") {
      await createEvent();
    }
  };

  const createEvent = async () => {
    const userId = await AsyncStorage.getItem("userId");
    const houseId = await AsyncStorage.getItem("houseId");
    const token = await AsyncStorage.getItem("token");

    // Formateer de geselecteerde datum naar het gewenste formaat
    const formattedDate = startDate.toISOString();

    fetch("http://localhost:3000/api/v1/anouncement", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "Event",
        activity: eventName,
        description: eventDescription,
        location: eventLocation,
        datePlanned: formattedDate,
        hour: eventHour,
        creatorId: userId,
        houseId: houseId,
        // image: eventPicture,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("gelukttttttttttttttttt");
        navigation.navigate("EventsScreen"); // Navigeer naar EventScreen.js nadat het event succesvol is opgeslagen
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View>
      <SaveAndCancel
        navigation={navigation}
        title="Plan an event"
        destination="EventsScreen"
      />

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

        {/* <TouchableOpacity
          style={styles.buttonPicture}
          onPress={handleSelectPicture}
        >
          <View style={styles.inputPicture}>
            <Text
              style={[
                styles.text,
                { color: selectedFileName ? "black" : "#A5A5A5" },
              ]}
            >
              {selectedFileName || "Add a fun picture"}
            </Text>
            <Image source={upload} style={{ width: 30, height: 30 }} />
          </View>
        </TouchableOpacity> */}

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
          <View style={styles.buttoncontainer}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  opacity:
                    isEventNameFilled && isEventDescriptionFilled ? 1 : 0.5,
                },
              ]}
              onPress={addEventToList}
              disabled={!isEventNameFilled || !isEventDescriptionFilled}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>

          <Image source={{ uri: eventPicture }} style={styles.picture} />
        </View>
      </View>

      {/* 
      <View style={styles.buttoncontainer}>
        <TouchableOpacity style={[styles.button]}>
          <Text style={styles.buttonText}>submit</Text>
        </TouchableOpacity>
      </View> */}
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
    zIndex: -9999,
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
  datePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 56,
    backgroundColor: "white",
  },
  datePickerButtonText: {
    fontFamily: "moon",
    flex: 1,
    color: "#A5A5A5",
  },
  dropdownArrow: {
    width: 20,
    height: 20,
  },
  picture: {
    marginLeft: "auto",
    marginRight: "auto",
    width: 150,
    height: 150,
    marginTop: 10,
    borderRadius: 10,
  },
});
