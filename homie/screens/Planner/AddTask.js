import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SaveAndCancel from "../../compontents/SaveAndCancel";

export default function AddTask() {
  const navigation = useNavigation();
  const [taskName, setTaskName] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");
  const [taskRules, setTaskRules] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [datePickerVisibility, setDatePickerVisibility] = useState(false);
  const isEventNameFilled = taskName !== "";
  const isTaskRulesFilled = taskRules !== "";
  const isTaskDeadlineFilled = taskDeadline !== "";

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const addTaskToList = () => {
    if (taskName.trim() !== "" && taskRules.trim() !== "") {
      createTask();
      navigation.navigate("TasksScreen"); // Navigeer naar TaskScreen.js na het opslaan
    }
  };

  const createTask = async () => {
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
        type: "Task",
        activity: taskName,
        description: taskRules,
        datePlanned: formattedDate,
        creatorId: userId,
        houseId: houseId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Voer eventuele vervolgstappen uit na het opslaan van de gegevens
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const CustomDatePicker = () => {
    if (Platform.OS === "web") {
      return (
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="dd/MM/yyyy"
          placeholderText="Choose Date"
          className="datepickerWeb"
          style={styles.datePickerContainer}
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
      <SaveAndCancel
        navigation={navigation}
        title="Add a task"
        destination="TasksScreen"
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

        <CustomDatePicker />

        <TextInput
          style={[
            styles.taskRulesInput,
            { color: isTaskRulesFilled ? "black" : "#A5A5A5" },
          ]}
          placeholder="Add rules to given tasks"
          value={taskRules}
          onChangeText={setTaskRules}
          multiline={true}
        />
      </View>

      <View style={styles.buttoncontainer}>
        <TouchableOpacity
          style={[
            styles.button,
            { opacity: isEventNameFilled && isTaskRulesFilled ? 1 : 0.5 },
          ]}
          onPress={addTaskToList}
          disabled={!isEventNameFilled || !isTaskRulesFilled}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  inputSmall: {
    height: 56,
    width: "100%",
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "white",
    borderColor: "transparent",
    fontFamily: "manrope",
    fontSize: 16,
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
  },
  buttoncontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
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
  datePickerContainer: {
    fontFamily: "moon",
    zIndex: 20000000,
    border: "none",
    width: "340px",
    height: "55px",
    borderRadius: "10px",
    color: "#A5A5A5",
  },
  datePickerButtonText: {
    fontFamily: "moon",
  },
});
