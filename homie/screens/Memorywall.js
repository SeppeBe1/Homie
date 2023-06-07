import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';

import arrowLeft from '../assets/icons/arrowLeft.svg';
import sharebtn from '../assets/icons/share.svg';
import closebtn from '../assets/icons/cross.svg';

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
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
      const daysOfWeek = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
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
                  <TouchableOpacity
                    key={cellIndex}
                    style={[
                      styles.dateContainer,
                      { backgroundColor, borderRadius },
                    ]}
                    onPress={() => {
                      setSelectedImageIndex(cellIndex);
                      setIsModalVisible(true);
                    }}
                  >
                    {cell && isPastDate && (
                      <ImageBackground
                        source={require('../assets/party.png')}
                        style={[
                          styles.dateImage,
                          { overflow: 'hidden', borderRadius },
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
                  </TouchableOpacity>
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
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.arrowContainer}
        >
          <Image source={arrowLeft} style={{ width: 8, height: 15 }} />
        </TouchableOpacity>
        <Text style={styles.heading}>Memorywall</Text>
      </View>
      <ScrollView style={{ borderTopLeftRadius: 25, borderTopRightRadius: 25 }}>
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
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modal}>
          <TouchableOpacity
            style={styles.shareButton}
            onPress={() => console.log('open share buttons')}
          >
            <Image source={sharebtn} style={{ width: 18, height: 20 }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsModalVisible(false)}
          >
            <Image source={closebtn} style={{ width: 28, height: 28 }} />
          </TouchableOpacity>
          <Image
            source={require('../assets/party.png')}
            style={[styles.modalImage, { borderRadius: 20 }]}
          />
        </View>
      </Modal>
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
    backgroundColor: '#fff',
  },
  month: {
    fontFamily: 'moon',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'left',
    color: '#160635',
    fontWeight: 'bold',
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
    marginBottom: 5,
    width: 38,
    height: 58,
    borderRadius: 15,
  },
  dateImage: {
    flex: 1,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
    width: 38,
    height: 58,
    borderRadius: 15,
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
    borderRadius: 15,
  },
  modal: {
    flex: 1,
    backgroundColor: '#16063580',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '38px'
  },
  closeButton: {
    position: 'absolute',
    top: 187,
    right: 63,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  shareButton: {
    position: 'absolute',
    left: 63,
    top: 192,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  modalImage: {
    width: '316px',
    height: '548px',
    borderRadius: '20px'
  },
});