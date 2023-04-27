import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/native-stack";

import checkbox from "../assets/icons/Checkbox_empty.svg";
import arrowright from "../assets/icons/Arrow-Right.svg";

const CalendarScreen = ({ navigation }) => {
  const daysInWeek = 7;
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const today = new Date();
  const startOfWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - ((today.getDay() + 6) % 7)
  );
  const endOfWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - ((today.getDay() + 6) % 7) + 6
  );

  const handleSeeFullCalendar = () => {
    // handle See Full Calendar button press
  };

  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Taking out the dustbin",
    },
    {
      id: 2,
      name: "Cleaning the kitchen",
    },
    {
      id: 3,
      name: "Walking the dog",
    },
  ]);

  return (
    <View style={{ backgroundColor: "#F5F5F5" }}>
      <View style={styles.container}>
        <View>
          <Text style={styles.heading}>Planner</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.h2}>
            {startOfWeek.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSeeFullCalendar()}
          >
            <Text style={styles.buttonText}>See full calendar</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal={true}>
          <View style={styles.weekcalender}>
            {weekdays.map((weekday) => {
              const dayNumber =
                startOfWeek.getDate() + weekdays.indexOf(weekday);
              const date = new Date(
                startOfWeek.getFullYear(),
                startOfWeek.getMonth(),
                dayNumber
              );
              const isToday = date.toDateString() === today.toDateString();
              return (
                <View
                  key={weekday}
                  style={[styles.day, isToday && styles.today]}
                >
                  <Text
                    style={[styles.darkpurple, isToday && styles.todayText]}
                  >
                    {dayNumber}
                  </Text>
                  <Text
                    style={[styles.darkpurple, isToday && styles.todayText]}
                  >
                    {weekday}
                  </Text>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>

      <View style={styles.todo}>
        <Text style={{ paddingBottom: 12 }}>Your today tasks and events</Text>
        {tasks.map((task) => (
          <View key={task.id} style={styles.tasks}>
            <View>
              <Image
                source={checkbox}
                style={{ width: "16px", height: "16px" }}
              />
            </View>
            <View>
              <Text>{task.name}</Text>
            </View>
          </View>
        ))}
      </View>

      <View>
        <Text> Upcoming events </Text>
        <TouchableOpacity style={styles.link}>
          <Text style={styles.linkText}>See full calendar</Text>
          <Image source={arrowright} style={{ width: "10px", height: "6px" }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#160635",
    height: 244,
    justifyContent: "space-evenly",
    gap: 19,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 24,
    paddingRight: 24,
  },

  todo: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 21,
    marginLeft: 24,
    marginRight: 24,
    marginTop: 13,
  },

  tasks: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
  },

  link: {
    flex: 1,
    flexDirection: "row",
    alignItems: "baseline",
    gap: 13,
    justifyContent: "flex-end",
    paddingRight: "64px",
  },

  darkpurple: {
    color: "#160635",
  },

  weekcalender: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "center",
  },

  button: {
    backgroundColor: "#B900F4",
    borderRadius: 35,
    width: 179,
    height: 40,
    alignItems: "center",
    justifyContent: "center", // Add this line
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 14,
  },

  linkText: {
    color: "#A5A5A5",
    fontSize: 12,
  },

  day: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    color: "white",
    width: "53px",
    height: "64px",
    borderRadius: "15px",
    justifyContent: "center",
    textAlign: "center",
  },

  today: {
    backgroundColor: "#00B9F4",
  },
  heading: {
    paddingTop: 45,
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
  },
  h2: {
    color: "#fff",
    fontSize: 14,
  },
});

export default CalendarScreen;
