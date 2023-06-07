import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

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
      novaticaBold: require('../assets/fonts/Novatica-Bold.ttf'),
    });
  };

  useEffect(() => {
    loadFonts();
  }, []);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(Dimensions.get('window').width);
    };

    Dimensions.addEventListener('change', updateScreenWidth);

    return () => {
      Dimensions.removeEventListener('change', updateScreenWidth);
    };
  }, []);

  const getPreviousMonth = () => {
    const previousMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    setCurrentDate(previousMonth);
  };

  const getDaysInMonth = (year, month) => {
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
      const daysOfWeek = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
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

      const dateContainerWidth = screenWidth / 7;

      return (
        <View style={styles.calendarGrid}>
          {rows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.weekContainer}>
              {row.map((cell, cellIndex) => {
                const isPastDate = cell && cell < today;
                const backgroundColor = isPastDate ? '#F2F2F2' : '#FFF';
                const borderRadius = isPastDate ? 15 : 0;

                return (
                  <View
                    key={cellIndex}
                    style={[
                      styles.dateContainer, {backgroundColor, borderRadius}
                    ]}
                  >
                    {cell && isPastDate && (
                      <ImageBackground
                        source={require('../assets/grouppicture.jpg')}
                        style={[styles.dateImage, {overflow: 'hidden', borderRadius},
                      ]}
                      >
                        <Text
                          style={[
                            styles.day,
                            isPastDate && styles.currentDay,
                          ]}
                        >
                          {cell.getDate()}
                        </Text>
                      </ImageBackground>
                    )}

                  {cell && !isPastDate && (
                    <View style={styles.dateContent}>
                      <Text style={[styles.day, styles.futureDay]}>
                        {cell.getDate()}
                      </Text>
                    </View>
                  )}

                  </View>
                );
              })}
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

  const monthsToShow = [
    currentDate,
    new Date(currentYear, currentMonth - 1, 1),
    new Date(currentYear, currentMonth - 2, 1),
    new Date(currentYear, currentMonth - 3, 1),
    new Date(currentYear, currentMonth - 4, 1),
    new Date(currentYear, currentMonth - 5, 1),
    new Date(currentYear, currentMonth - 6, 1),
    new Date(currentYear, currentMonth - 7, 1),
    new Date(currentYear, currentMonth - 8, 1),
    new Date(currentYear, currentMonth - 9, 1),


  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrowContainer}>
        <Image source={arrowLeft} style={{ width: 8, height: 15 }} />
      </TouchableOpacity>
      <Text style={styles.heading}>Memorywall</Text>
      </View>
      <ScrollView style={{borderTopLeftRadius: '25px',  borderTopRightRadius: '25px'}}>
        {monthsToShow.map((month, index) => (
          <View key={index} style={styles.calendarContainer}>
            <Text style={styles.month}>
              {month.toLocaleString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
            </Text>
            {renderCalendarGrid(month, new Date())}
          </View>
        ))}
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
    height: 120,
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
  arrowContainer: {
    position: 'absolute',
    top: 20,
    left: 15,
    padding: 30,
  },
  calendarContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#fff",
  },
  month: {
    fontFamily: 'moon',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'left',
    color: '#160635',
    fontWeight:'bold',
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  dayOfWeek: {
    fontFamily: 'manrope',
    fontSize: 18,
    color: '#160635',
  },
  calendarGrid: {
    flexDirection: 'column',
  },
  dateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
    marginBottom: '5px',
    width: '38px', 
    height: '58px',
    borderRadius: '15px',
  },
  dateImage: {
    flex: 1,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
    width: '38px',
    height: '58px',
    borderRadius: '15px',
  },
  day: {
    fontFamily: 'manrope',
    fontSize: 20,
    color: '#FFF',
  },
  futureDay: {
    color: '#000',
  },
  dateContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '15px',
  },
});
