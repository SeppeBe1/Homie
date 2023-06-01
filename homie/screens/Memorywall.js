/*import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

import arrowLeft from '../assets/icons/arrowLeft.svg';

import * as Font from 'expo-font';

export default function Memorywall({ navigation }) {

    //loadthefont
    const loadFonts = async () => {
        await Font.loadAsync({
          moon: require('../assets/fonts/Moon.otf'),
          manrope: require('../assets/fonts/Manrope.ttf'),
          novatica: require('../assets/fonts/Novatica.ttf'),
          novaticaBold: require('../assets/fonts/Novatica-Bold.ttf')
        });
      };

  useEffect(() => {
    loadFonts().then(() => {
      setFontsLoaded(true);
    });
  }, []);

 

    const [currentDate, setCurrentDate] = useState(new Date());


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
    
      const today = new Date().getDate();
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth();
    
      const renderCalendarGrid = () => {
        const daysArray = getDaysInMonth();
    
        const renderDaysOfWeek = () => {
          const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
          return (
            <View style={styles.weekContainer}>
              {daysOfWeek.map((day) => (
                <Text key={day} style={styles.dayOfWeek}>
                  {day}
                </Text>
              ))}
            </View>
          );
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
            Array(42 - daysArray.length - emptyCells.length).fill(null)
          );
    
          return (
            <View style={styles.calendarGrid}>
              {calendarDays.map((day, index) => (
                <View key={index} style={styles.dateContainer}>
                  <Text
                    style={[
                      styles.day,
                      day &&
                        day.getDate() === today &&
                        day.getMonth() === currentMonth &&
                        day.getFullYear() === currentYear &&
                        styles.currentDay,
                    ]}
                  >
                    {day ? day.getDate() : ""}
                  </Text>
                </View>
              ))}
            </View>
          );
        };
    
        return (
          <View>
            {renderDaysOfWeek()}
            {renderCalendarDays()}
          </View>
        );
      };
    

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrowLeft}>
          <Image source={arrowLeft} style={{ width: 8, height: 15 }} />
        </TouchableOpacity>
        <Text style={styles.heading}>Memorywall</Text>
      </View>
      <ScrollView style={styles.scrollView}>
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#160635',
  },
  headerContainer: {
    backgroundColor: '#160635',
    height: 150,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    position: 'absolute',
    top: 0,
    width: '100%',
    paddingTop: 50,
    fontFamily: 'novaticaBold',
  },
  arrowLeft: {
    position: 'absolute',
    top: 20,
    left: 15,
    padding: 30,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 5,
    marginTop: -30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },

  calendar: {
    marginHorizontal: 20,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
  },
  currentDay: {
    marginLeft: 6,
    backgroundColor: "#3BEDBF",
    borderRadius: 50,
    width: 30,
    height: 30,
    color: "#fff",
    textAlign: "center",
    lineHeight: 30,
  },

  calendarHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 26,
    paddingTop: 15,
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
    fontFamily: "manrope",
    fontSize: 20,
    color: "#B900F4",
    width: 45,
    height: 50,
  },
  calendarGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    alignItems: "center", // Center the calendar days horizontally
  },
  dateContainer: {
    width: 45,
    height: 50,
    textAlign: "center",
    fontFamily: "manrope",
    fontSize: 20,
  },
  day: {
    textAlign: "center",
    fontFamily: "manrope",
    fontSize: 20,
    justifyContent: "center",
  },
});*/
/*

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

import arrowLeft from '../assets/icons/arrowLeft.svg';

import * as Font from 'expo-font';

export default function Memorywall({ navigation }) {

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

  // Load the fonts
  const loadFonts = async () => {
    await Font.loadAsync({
      moon: require('../assets/fonts/Moon.otf'),
      manrope: require('../assets/fonts/Manrope.ttf'),
      novatica: require('../assets/fonts/Novatica.ttf'),
      novaticaBold: require('../assets/fonts/Novatica-Bold.ttf')
    });
  };

  useEffect(() => {
    loadFonts().then(() => {
      setFontsLoaded(true);
    });
  }, []);

  const [currentDate, setCurrentDate] = useState(new Date());

  const getPreviousMonth = () => {
    const previousMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    setCurrentDate(previousMonth);
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
  
  
  const renderCalendarGrid = (month, today) => {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const daysArray = getDaysInMonth(year, monthIndex);
  
    const renderDaysOfWeek = () => {
      const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
      return (
        <View style={styles.weekContainer}>
          {daysOfWeek.map((day) => (
            <Text key={day} style={styles.dayOfWeek}>
              {day}
            </Text>
          ))}
        </View>
      );
    };
  
    const renderCalendarDays = () => {
      const firstDayOfMonth = new Date(year, monthIndex, 1);
      const firstDayOfWeek = firstDayOfMonth.getDay(); // 0 is Sunday, 1 is Monday, etc.
      const emptyCells = Array(firstDayOfWeek).fill(null);
  
      const calendarDays = emptyCells.concat(
        daysArray,
        Array(42 - daysArray.length - emptyCells.length).fill(null)
      );
  
      const rows = [];
      const totalCells = calendarDays.length;
      let rowCells = [];
  
      calendarDays.forEach((day, index) => {
        rowCells.push(day);
  
        if ((index + 1) % 7 === 0 || index === totalCells - 1) {
          rows.push(rowCells);
          rowCells = [];
        }
      });
  
      return (
        <View style={styles.calendarGrid}>
          {rows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.weekContainer}>
              {row.map((cell, cellIndex) => (
                <View key={cellIndex} style={styles.dateContainer}>
                  <Text
                    style={[
                      styles.day,
                      cell &&
                        cell.getDate() === today &&
                        cell.getMonth() === monthIndex &&
                        cell.getFullYear() === year &&
                        styles.currentDay,
                    ]}
                  >
                    {cell ? cell.getDate() : ""}
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      );
    };
  
    return (
      <View>
        {renderDaysOfWeek()}
        {renderCalendarDays()}
      </View>
    );
  };
  
  
  
  const renderAllMonths = () => {
    const monthsArray = [];

    for (let i = 0; i < 12; i++) {
      const month = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - i,
        1
      );
      monthsArray.push(
        <View key={i} style={styles.monthContainer}>
          <Text style={styles.monthText}>
            {month.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </Text>
          {renderCalendarGrid(month, currentDate.getDate())}
        </View>
      );
    }

    return monthsArray;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrowLeft}>
          <Image source={arrowLeft} style={{ width: 8, height: 15 }} />
        </TouchableOpacity>
        <Text style={styles.heading}>Memorywall</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {renderAllMonths()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#160635',
  },
  headerContainer: {
    backgroundColor: '#160635',
    height: 150,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    position: 'absolute',
    top: 0,
    width: '100%',
    paddingTop: 50,
    fontFamily: 'novaticaBold',
  },
  arrowLeft: {
    position: 'absolute',
    top: 20,
    left: 15,
    padding: 30,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 35,
  },
  monthContainer: {
    marginBottom: 40,
  },
  monthText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "moon",
    color: "#160635",
  },
  calendarGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    alignItems: "center", // Center the calendar days horizontally
  },
  dateContainer: {
    width: 45,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  day: {
    textAlign: "center",
    fontFamily: "manrope",
    fontSize: 16,
    color: "#160635",
  },
  currentDay: {
    marginLeft: 6,
    backgroundColor: "#3BEDBF",
    borderRadius: 50,
    width: 30,
    height: 30,
    color: "#fff",
    textAlign: "center",
    lineHeight: 30,
  },
  weekContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayOfWeek: {
    textAlign: "center",
    fontFamily: "manrope",
    fontSize: 20,
    color: "#B900F4",
    width: 45,
    height: 50,
  },
});
*/



import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';

import arrowLeft from '../assets/icons/arrowLeft.svg';

import * as Font from 'expo-font';

export default function Memorywall({ navigation }) {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  // Load the fonts
  const loadFonts = async () => {
    await Font.loadAsync({
      moon: require('../assets/fonts/Moon.otf'),
      manrope: require('../assets/fonts/Manrope.ttf'),
      novatica: require('../assets/fonts/Novatica.ttf'),
      novaticaBold: require('../assets/fonts/Novatica-Bold.ttf')
    });
  };

  useEffect(() => {
    loadFonts().then(() => {
      setFontsLoaded(true);
    });
  }, []);

  const [currentDate, setCurrentDate] = useState(new Date());
  const screenWidth = Dimensions.get('window').width;

  const getPreviousMonth = () => {
    const previousMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    setCurrentDate(previousMonth);
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

  const renderCalendarGrid = (month, today) => {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const daysArray = getDaysInMonth(year, monthIndex);

    const renderDaysOfWeek = () => {
      const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
      return (
        <View style={styles.weekContainer}>
          {daysOfWeek.map((day) => (
            <Text key={day} style={styles.dayOfWeek}>
              {day}
            </Text>
          ))}
        </View>
      );
    };


    
    const renderCalendarDays = () => {
      const firstDayOfMonth = new Date(year, monthIndex, 1);
      const firstDayOfWeek = firstDayOfMonth.getDay(); // 0 is Sunday, 1 is Monday, etc.
      const emptyCells = Array(firstDayOfWeek).fill(null);
    
      const calendarDays = emptyCells.concat(
        daysArray,
        Array(42 - daysArray.length - emptyCells.length).fill(null)
      );
    
      const rows = [];
      const totalCells = calendarDays.length;
      let rowCells = [];
    
      calendarDays.forEach((day, index) => {
        rowCells.push(day);
    
        if ((index + 1) % 7 === 0 || index === totalCells - 1) {
          rows.push(rowCells);
          rowCells = [];
        }
      });
    
      const { width: screenWidth } = Dimensions.get("window"); // Get the screen width
      const containerWidth = screenWidth - 70; // Adjust the container width based on your layout
      const dateContainerWidth = containerWidth / 7; // Calculate the width of each date container
      const spacing = (containerWidth - dateContainerWidth * 7) / 6; // Calculate the spacing between date containers
    
      return (
        <View style={styles.calendarGrid}>
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.weekContainer}>
            {row.map((cell, cellIndex) => (
              <View key={cellIndex} style={styles.dateContainer}>
                {cell && (
                  <ImageBackground
                    source={require('../assets/grouppicture.jpg')}
                    style={styles.dateImage}
                    imageStyle={{ borderRadius: 8 }}
                  >
                    <Text
                      style={[
                        styles.day,
                        cell.getDate() === today &&
                        cell.getMonth() === monthIndex &&
                        cell.getFullYear() === year &&
                        styles.currentDay,
                      ]}
                    >
                      {cell.getDate()}
                    </Text>
                  </ImageBackground>
                )}
              </View>
            ))}
          </View>
        ))}
      </View>
    );
  };

    return (
      <View>
        {renderDaysOfWeek()}
        {renderCalendarDays()}
      </View>
    );
  };

  const renderAllMonths = () => {
    const monthsArray = [];

    for (let i = 0; i < 12; i++) {
      const month = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - i,
        1
      );
      monthsArray.push(
        <View key={i} style={styles.monthContainer}>
          <Text style={styles.monthText}>
            {month.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </Text>
          {renderCalendarGrid(month, currentDate.getDate())}
        </View>
      );
    }

    return monthsArray;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrowLeft}>
          <Image source={arrowLeft} style={{ width: 8, height: 15 }} />
        </TouchableOpacity>
        <Text style={styles.heading}>Memorywall</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {renderAllMonths()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#160635',
  },
  headerContainer: {
    backgroundColor: '#160635',
    height: 150,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    position: 'absolute',
    top: 0,
    width: '100%',
    paddingTop: 50,
    fontFamily: 'novaticaBold',
  },
  arrowLeft: {
    position: 'absolute',
    top: 20,
    left: 15,
    padding: 30,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 35,
  },
  monthContainer: {
    marginBottom: 40,
  },
  monthText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "moon",
    color: "#160635",
  },
  calendarGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    alignItems: "center", // Center the calendar days horizontally
  },
  day: {
    textAlign: "center",
    fontFamily: "manrope",
    fontSize: 16,
    color: "#fff",
  },
  currentDay: {
    marginLeft: 6,
    backgroundColor: "#3BEDBF",
    borderRadius: 50,
    width: 30,
    height: 30,
    color: "#fff",
    textAlign: "center",
    lineHeight: 30,
  },
  weekContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayOfWeek: {
    textAlign: "center",
    fontFamily: "manrope",
    fontSize: 20,
    color: "#160635",
    height: 50,
    padding: 5
  },
 /* dateBackground: {
    backgroundColor: "#3BEDBF", // Replace with the desired background color or image
    borderRadius: 8, // Adjust the border-radius as needed
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: '40px',
    height: '60px',
    margin: 5,
  },*/
  dateContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  dateContent: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  dateImage: {
    width: 40,
    height: 55,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  },
);
