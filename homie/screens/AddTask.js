import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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

export default function AddTask() {
  const navigation = useNavigation();
  const [eventName, setEventName] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");
  const [taskRules, setTaskRules] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [datePickerVisibility, setDatePickerVisibility] = useState(false);

  const users = [
    { id: 1, name: "User 1", image: require("../assets/girl.jpg") },
    { id: 2, name: "User 2", image: require("../assets/girl.jpg") },
    { id: 3, name: "User 3", image: require("../assets/girl.jpg") },
  ];

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    setTaskDeadline(date.toLocaleDateString()); // convert date to a string in local date format
    hideDatePicker();
  };

  const CustomDatePicker = () => {
    if (Platform.OS === "web") {
      return (
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="Choose Date"
          className="datepicker-web"
          style={{ fontFamily: "moon", zIndex: 100000 }}
        />
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.datePickerContainer}
          onPress={showDatePicker}
        >
          <Text style={styles.datePickerButtonText}>
            {taskDeadline ? taskDeadline : "Deadline of task"}
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

        <CustomDatePicker />

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
