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
import arrowLeft from "../../assets/icons/arrowLeft.svg";
import SaveAndCancel from "../../compontents/SaveAndCancel"; // Voeg deze importregel toe

export default function AddTask() {
  const navigation = useNavigation();
  const [eventName, setEventName] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");
  const [taskRules, setTaskRules] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [datePickerVisibility, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // const handleConfirm = (date) => {
  //   console.warn("A date has been picked: ", date);
  //   setTaskDeadline(date.toLocaleDateString()); // convert date to a string in local date format
  //   hideDatePicker();
  // };

  const isEventNameFilled = eventName !== "";
  const isTaskDeadlineFilled = taskDeadline !== "";
  const isTaskRulesFilled = taskRules !== "";

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

        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          {/* ...other code */}
        </View>

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

      <View style={[styles.who, { zIndex: -1 }]}>{/* ...other code */}</View>
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
