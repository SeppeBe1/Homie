import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/native-stack";

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

  return (
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
            const dayNumber = startOfWeek.getDate() + weekdays.indexOf(weekday);
            const date = new Date(
              startOfWeek.getFullYear(),
              startOfWeek.getMonth(),
              dayNumber
            );
            const isToday = date.toDateString() === today.toDateString();
            return (
              <View key={weekday} style={[styles.day, isToday && styles.today]}>
                <Text style={[styles.darkpurple, isToday && styles.todayText]}>
                  {dayNumber}
                </Text>
                <Text style={[styles.darkpurple, isToday && styles.todayText]}>
                  {weekday}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#160635",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 24,
    paddingRight: 24,
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
    paddingTop: 50,
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
