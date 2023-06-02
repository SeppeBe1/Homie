import React, { useEffect } from "react";
import * as Font from "expo-font";
import MoonFont from "../assets/fonts/Moon.otf";
import Novatica from "../assets/fonts/Novatica-Bold.woff";
import Manrope from "../assets/fonts/Manrope-Bold.ttf";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

import checkbox from "../assets/icons/Checkbox_empty.svg";
import arrowright from "../assets/icons/Arrow-Right.svg";
import girl from "../assets/girl.jpg";
import boy from "../assets/boy.jpg";
import AddTask from "./AddTask";
import AddEvent from "./AddEvent";

// Load the font
const loadFonts = async () => {
  await Font.loadAsync({
    moon: MoonFont,
    novatica: Novatica,
    manrope: Manrope,
  });
};

export default function Homescreen({ navigation }) {
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const today = new Date();

  const startOfWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - ((today.getDay() + 6) % 7)
  );

  const events = [
    {
      day: "12",
      month: "Dec",
      title: "Houseparty in Casa",
      image: girl,
    },
    {
      day: "31",
      month: "Jan",
      title: "Movie night at the park",
      image: boy,
    },
  ];

  const tasks = [
    {
      day: "12",
      month: "Dec",
      id: 1,
      name: "Taking out the dustbin",
    },
    {
      id: 2,
      day: "31",
      month: "Jan",
      name: "Cleaning the kitchen",
    },
  ];

  useEffect(() => {
    loadFonts();
  }, []);

  return (
    <View style={{ backgroundColor: "#F5F5F5" }}>
      <View style={styles.container}>
        <View>
          <Text style={styles.heading}>Planner</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.h3}>
            {startOfWeek.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("FullCalenderScreen")}
          >
            <Text style={styles.buttonText}>See full calendar</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal={true}>
          <View style={styles.weekcalender}>
            {weekdays.map((weekday, index) => {
              const dayNumber = startOfWeek.getDate() + index;
              const date = new Date(
                startOfWeek.getFullYear(),
                startOfWeek.getMonth(),
                dayNumber
              );
              const isLastDayOfMonth =
                dayNumber >
                new Date(
                  startOfWeek.getFullYear(),
                  startOfWeek.getMonth() + 1,
                  0
                ).getDate();

              if (isLastDayOfMonth) {
                startOfWeek.setMonth(startOfWeek.getMonth() + 1);
                startOfWeek.setDate(1);
              }

              const newDayNumber = isLastDayOfMonth ? 1 : dayNumber;
              const isToday =
                newDayNumber === today.getDate() &&
                startOfWeek.getMonth() === today.getMonth() &&
                startOfWeek.getFullYear() === today.getFullYear();

              return (
                <View
                  key={weekday}
                  style={[styles.day, isToday && styles.today]}
                >
                  <Text
                    style={[styles.darkpurple, isToday && styles.todayText]}
                  >
                    {newDayNumber}
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
        <Text style={styles.h3black}>Your today tasks and events</Text>
        {tasks.map((task) => (
          <View key={task.id} style={styles.tasks}>
            <View>
              <Image
                source={checkbox}
                style={{ width: "16px", height: "16px" }}
              />
            </View>
            <View>
              <Text
                style={{
                  fontFamily: "manrope",
                  fontSize: 14,
                }}
              >
                {task.name}
              </Text>
            </View>
          </View>
        ))}
      </View>
      <View style={{ marginTop: 20, paddingHorizontal: 24 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.h2}> Upcoming events </Text>
          <TouchableOpacity
            style={styles.link}
            onPress={() => navigation.navigate("EventsScreen")}
          >
            <Text style={styles.linkText}>All events</Text>
            <Image
              source={arrowright}
              style={{ width: "10px", height: "6px" }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          marginTop: 8,
        }}
      >
        {events.map((event) => (
          <View
            key={event.name}
            style={{
              marginHorizontal: 24,
              display: "flex",
              flexDirection: "row",
              backgroundColor: "white",
              paddingHorizontal: 11,
              paddingVertical: 8,
              borderRadius: 10,
              alignItems: "flex-end",
              gap: 29,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Text
                style={{
                  fontFamily: "novatica",
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                {event.day}
              </Text>
              <Text
                style={{
                  fontFamily: "novatica",
                  fontWeight: "bold",
                  fontSize: 10,
                }}
              >
                {event.month}
              </Text>
            </View>
            <Text style={styles.h3black}>{event.title}</Text>
            <Image
              source={event.image}
              style={{
                width: 40,
                height: 40,
                borderRadius: 24,
                alignSelf: "flex-end",
                marginLeft: "auto",
              }}
            />
          </View>
        ))}
      </View>
      <View style={{ marginTop: 20, paddingHorizontal: 24 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.h2}> Upcoming tasks </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("TasksScreen")}
            style={styles.link}
          >
            <Text style={styles.linkText}>All tasks</Text>
            <Image
              source={arrowright}
              style={{ width: "10px", height: "6px" }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          marginTop: 8,
        }}
      >
        {tasks.map((task) => (
          <View
            key={task.name}
            style={{
              marginHorizontal: 24,
              display: "flex",
              flexDirection: "row",
              backgroundColor: "white",
              paddingHorizontal: 11,
              paddingVertical: 8,
              borderRadius: 10,
              alignItems: "center",
              gap: 29,
              alignItems: "flex-end",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Text
                style={{
                  fontFamily: "novatica",
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                {task.day}
              </Text>
              <Text
                style={{
                  fontFamily: "novatica",
                  fontWeight: "bold",
                  fontSize: 10,
                }}
              >
                {task.month}
              </Text>
            </View>
            <Text style={styles.h3black}>{task.name}</Text>
          </View>
        ))}
      </View>

      <View style={{ display: "flex", flexDirection: "row", margin: 24 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate(AddTask)}
          style={[styles.button, { flex: 1, marginRight: 16 }]}
        >
          <Text style={styles.buttonText}>Add task</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(AddEvent)}
          style={[styles.button, { flex: 1 }]}
        >
          <Text style={styles.buttonText}>Add event</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#160635",
    height: 244,
    justifyContent: "space-evenly",
    gap: 24,
    fontFamily: "moon",
    fontWeight: "bold",
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
    fontFamily: "manrope",
    fontSize: 14,
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
  },

  darkpurple: {
    color: "#160635",
    fontFamily: "manrope",
    fontWeight: "bold",
    fontSize: 15,
  },

  weekcalender: {
    padding: 5,
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
    fontFamily: "moon",
    fontWeight: "bold",
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
    fontFamily: "novatica",
  },
  h3: {
    fontFamily: "moon",
    fontWeight: "bold",
    color: "#fff",
    fontSize: 14,
  },
  h3black: {
    fontFamily: "moon",
    fontWeight: "bold",
    color: "#000000",
    fontSize: 14,
    paddingBottom: 12,
  },

  h2: {
    fontFamily: "moon",
    fontWeight: "bold",
    color: "#000000",
    fontSize: 15,
  },
});
