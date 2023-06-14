import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import { Header, Button } from 'react-native-elements'
import calendarIcon from '../assets/calendar.png'
import like from '../assets/like.png'
import emptylike from '../assets/emptylike.png'
import photoIcon from '../assets/icons/photo.svg'
import crossIcon from "../assets/icons/close.svg"

import * as Font from 'expo-font';

import Nearby from "../compontents/Nearby";
import Discover from '../compontents/Discover';

import React, {useState, useEffect, useRef } from 'react'

// Load the font
const loadFonts = async () => {
  await Font.loadAsync({
    moon: require('../assets/fonts/Moon.otf'),
    manrope: require('../assets/fonts/Manrope.ttf'),
    novatica: require('../assets/fonts/Novatica.ttf'),
    novaticaBold: require('../assets/fonts/Novatica-Bold.ttf')
  });
}
;

export default function Behomiescreen({ navigation }) {
  const [currentView, setCurrentView] = useState("Nearby");
  const scrollViewRef = useRef();
  const stickyButtonsRef = useRef();
  const [scrollViewMarginTop, setScrollViewMarginTop] = useState(0);


  const switchView = (view) => {
    setCurrentView(view);

  };

  useEffect(() => {
    loadFonts();
  }, []);

  const renderView = () => {
    switch (currentView) {
      case "Nearby":
        return <Nearby hideImages={hideImages} />;
      case "Discover":
        return <Discover />;
      default:
        return null;
    }
  };

  const handleScroll = (event) => {
    const { y } = event.nativeEvent.contentOffset;
    const newMarginTop = y > 0 ? -y : 0;
    setScrollViewMarginTop(newMarginTop);
  };


  return (

    <View style={{ backgroundColor: '#160635', flex: 1 }}>
      <View style={styles.headerContainer}>
      <Text style={styles.heading}>
          Homie moments
        </Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("memorywall")}>
            <Image source={calendarIcon} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.imagecontainer}>
        <Image source={require('../assets/groupfoto.jpg')} style={{ width: 160, height: 220, marginBottom: 5 }} />
        <View style={styles.dateLikes}>
          <View style={styles.likes}>
            <Image source={like} style={{ width: 20, height: 17 }} />
            <Text style={{ color: '#fff', fontFamily: 'manrope', fontSize: 13, paddingLeft: 5 }}>2</Text>
          </View>
          <Text style={{ color: '#3BEDBF', fontFamily: 'manrope', fontSize: 13 }}>20 minutes ago</Text>
          </View>
        <Text style={{ color: '#fff', fontFamily: 'manrope', fontSize: 14, marginTop: 20, marginBottom: 20 }}>Add a description...</Text>
      </View>

      <View style={[styles.stickyButtons, {  marginTop: scrollViewMarginTop  }]}>
          <TouchableOpacity
              style={[
                styles.btnBorder,
                currentView === "Nearby" && styles.btnFull,
              ]}
              onPress={() => switchView("Nearby")}
            >
              <Text
                style={[
                  styles.btnTextActive,
                  currentView === "Nearby" && styles.btnTextPassive,
                ]}
              >
                Nearby
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.btnBorder,
                currentView === "Discover" && styles.btnFull,
              ]}
              onPress={() => switchView("Discover")}
            >
              <Text
                style={[
                  styles.btnTextActive,
                  currentView === "Discover" && styles.btnTextPassive,
                ]}
              >
                Discover
              </Text>
            </TouchableOpacity>
        </View>

        {currentView && (
      <ScrollView
        style={[styles.homiefeed, {  marginTop: scrollViewMarginTop  }]}
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {renderView()}
      </ScrollView>
    )}
    </View>

  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#160635",
    height: 150,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    color: "#fff",
    flex: 1,
    textAlign: 'center',
    position: 'absolute',
    fontFamily: 'novaticaBold', 
    fontSize: 20,
    marginLeft: 'auto',
    marginRight: 'auto',

  },

  dateLikes: {
    display: "flex",
    flexDirection:'row',
    justifyContent: 'space-between'

  },

  likes:{
    display: "flex",
    flexDirection:'row',
  },

  iconContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-end",
    padding: 10,
    marginRight: 25,
    flex: 1,
  },

  imagecontainer:{
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    
  },

  stickyButtons: {
    zIndex: 1,
    position: 'sticky',
    top: 0,
    backgroundColor: "#ffff",

    // backgroundColor: "#ffff",
    flexDirection:'row',
    justifyContent: 'space-between',

    marginTop:10,

    paddingTop:20,
    paddingBottom: 20,
    paddingLeft: 35,
    paddingRight:35,

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },


  homiefeed: {
    paddingTop:10,
    flexGrow: 1,
    zIndex:0,
    paddingLeft: 35,
    paddingRight: 35,
    backgroundColor: "#ffff",

  },


  btnFull: {
    borderRadius: 35,
    backgroundColor: "#D9B2EE",
    borderColor: "#D9B2EE",
    borderStyle: "solid",
    borderWidth: 2,
    width: "48%",
    paddingVertical: 15,
    textAlign: 'center',
    fontFamily:'moon'
  }, 

  btnBorder: {
    borderRadius: 35,
    backgroundColor: "#fff",
    borderColor: "#D9B2EE",
    borderStyle: "solid",
    borderWidth: 2,
    width: "48%",
    paddingVertical: 15,
    textAlign: 'center',
  }, 

  btnTextActive: {
    color:'#D9B2EE', 
    fontStyle: 'normal', 
    fontWeight: '700', 
    fontSize: 14,  
    fontFamily:'moon'
  }, 

  btnTextPassive: {
    color:'#fff', fontStyle: 'normal', fontWeight: '700', fontSize: 14,  
    fontFamily:'moon'
  },

  

});