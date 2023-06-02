import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable,
  Platform,
} from "react-native";
import arrowLeft from "../assets/icons/arrowLeft.svg";

import MoonFont from "../assets/fonts/Moon.otf";
import Novatica from "../assets/fonts/Novatica-Bold.woff";
import Manrope from "../assets/fonts/Manrope-Bold.ttf";

export default function AddTask() {
  const navigation = useNavigation();
  const [eventName, setEventName] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");
  const [taskRules, setTaskRules] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
  };
  const onChange = ({ type }, selectedDate) => {
    if (type === "set") {
      const currentDate = selectedDate || date;
      setDate(currentDate);
      if (Platform.OS === "android") {
        toggleDatepicker();
        setTaskDeadline(currentDate.toDateString());
      }
    } else {
      toggleDatepicker();
    }
  };

  const users = [
    { id: 1, name: "User 1", image: require("../assets/girl.jpg") },
    { id: 2, name: "User 2", image: require("../assets/girl.jpg") },
    { id: 3, name: "User 3", image: require("../assets/girl.jpg") },
  ];

  const confirmIOSDate = () => {
    setTaskDeadline(date.toDateString());
    toggleDatepicker();
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
            Add a task
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

        {!showPicker && (
          <Pressable onPress={toggleDatepicker}>
            <TextInput
              style={styles.input}
              placeholder="Deadline of task"
              value={taskDeadline}
              onChangeText={setTaskDeadline}
              editable={false}
              onPressIn={toggleDatepicker}
            />
          </Pressable>
        )}

        {showPicker && Platform.OS !== "web" && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={date}
            onChange={onChange}
            style={styles.datePicker}
          />
        )}

        {showPicker && Platform.OS === "ios" && (
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <TouchableOpacity
              style={[
                styles.button,
                styles.pickerButton,
                { backgroundColor: "white" },
              ]}
              onPress={toggleDatepicker}
            >
              <Text style={[styles.buttonText, { color: "pink" }]}>cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                styles.pickerButton,
                { backgroundColor: "white" },
              ]}
              onPress={confirmIOSDate}
            >
              <Text style={[styles.buttonText, { color: "pink" }]}>
                confirm
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <View
          style={{ flexDirection: "row", justifyContent: "space-around" }}
        ></View>

        <TextInput
          style={styles.taskRulesInput}
          placeholder="Add rules to given tasks"
          value={taskRules}
          onChangeText={setTaskRules}
          multiline={true}
        />
      </View>

      <View style={styles.who}>
        <Text
          style={{
            fontFamily: "moon",
            fontWeight: "bold",
            paddingBottom: 5,
          }}
        >
          To which homie are you giving this task?
        </Text>
        <Text style={{ fontFamily: "manrope", fontSize: 12 }}>
          Add someone to this task. This person will be notified and the task
          will be added to the to-do list.
        </Text>
        <View style={styles.users}>
          {users.map((user) => (
            <Image source={user.image} style={styles.user} key={user.id} />
          ))}
        </View>
        <View style={styles.buttoncontainer}>
          <TouchableOpacity style={[styles.button]}>
            <Text style={styles.buttonText}>submit</Text>
          </TouchableOpacity>
        </View>
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
  taskRulesInput: {
    height: 100,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    borderRadius: 10,
    backgroundColor: "white",
    borderColor: "transparent",
    fontFamily: "manrope",
    fontSize: 16,
    color: "#A5A5A5",
  },
  who: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  user: {
    width: 40,
    height: 40,
    marginRight: 10,
    marginTop: 15,
    borderRadius: 25,
  },

  users: {
    flex: 1,
    flexDirection: "row",
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
  datePicker: {
    height: 120,
    marginTop: -10,
  },
  pickerButton: {
    paddingHorizontal: 20,
  },
});
