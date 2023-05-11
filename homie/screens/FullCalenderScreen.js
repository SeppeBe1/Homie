import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import arrowLeft from "../assets/icons/arrowLeft.svg";
import MoonFont from "../assets/fonts/Moon.otf";
import Novatica from "../assets/fonts/Novatica-Bold.woff";
import Manrope from "../assets/fonts/Manrope-Bold.ttf";

export default function FullCalenderScreen() {
  const navigation = useNavigation();
  const [currentDate, setCurrentDate] = useState(new Date());

  // Load the font
  const loadFonts = async () => {
    await Font.loadAsync({
      moon: MoonFont,
      novatica: Novatica,
      manrope: Manrope,
    });
  };

  const getNextMonth = () => {
    const nextMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );
    setCurrentDate(nextMonth);
  };

  const getPreviousMonth = () => {
    const previousMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    setCurrentDate(previousMonth);
  };

  const renderCalendarGrid = () => {
    const daysArray = getDaysInMonth();

    const renderDaysOfWeek = () => {
      const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
      return daysOfWeek.map((day) => (
        <Text key={day} style={styles.dayOfWeek}>
          {day}
        </Text>
      ));
    };

    const renderCalendarDays = () => {
      const firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      const firstDayOfWeek = firstDayOfMonth.getDay(); // 0 is Sunday, 1 is Monday, etc.
      const emptyCells = Array(firstDayOfWeek).fill(null);

      const calendarDays = emptyCells.concat(
        daysArray,
        Array(40 - daysArray.length - emptyCells.length).fill(null)
      );

      return calendarDays.map((day, index) => (
        <View key={index} style={styles.dateContainer}>
          <Text style={styles.day}>{day ? day.getDate() : ""}</Text>
        </View>
      ));
    };

    useEffect(() => {
      loadFonts();
    }, []);

    return (
      <View>
        <View style={styles.weekContainer}>{renderDaysOfWeek()}</View>
        <View style={styles.calendarGrid}>{renderCalendarDays()}</View>
      </View>
    );
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysArray = [];

    for (let day = 1; day <= daysInMonth; day++) {
      daysArray.push(new Date(year, month, day));
    }

    return daysArray;
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
            Calendar
          </Text>
        </View>
      </View>
      <View style={styles.calendar}>
        <View style={styles.calendarHeader}>
          <TouchableOpacity onPress={getPreviousMonth}>
            <Image
              source={arrowLeft}
              style={{
                width: 6,
                height: 11,
                marginRight: 30,
                tintColor: "#160635",
              }}
            />
          </TouchableOpacity>
          <Text style={styles.calendarMonth}>
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </Text>
          <TouchableOpacity onPress={getNextMonth}>
            <Image
              source={arrowLeft}
              style={{
                width: 6,
                height: 11,
                marginLeft: 30,
                tintColor: "#160635",
                transform: [{ rotate: "180deg" }],
              }}
            />
          </TouchableOpacity>
        </View>
        {renderCalendarGrid()}
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
  calendar: {
    marginHorizontal: 20,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
  },
  calendarHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  calendarSwitchButton: {
    fontSize: 20,
    color: "#333",
    marginHorizontal: 10,
  },
  calendarMonth: {
    fontSize: 20,
    fontFamily: "moon",
    fontWeight: "bold",
    color: "#160635",
  },
  weekContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  dayOfWeek: {
    textAlign: "center",
    lineHeight: 40,
    fontFamily: "manrope",
    fontSize: "18px",
    color: "#B900F4",
  },
  calendarGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  dateContainer: {
    width: 40,
    height: 50,
    justifyContent: "center",
  },
  day: {
    textAlign: "center",
    fontFamily: "manrope",
    fontSize: "20px",
  },
});
