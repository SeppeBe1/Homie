import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import { Header, Button } from 'react-native-elements'
import calendarIcon from '../assets/calendar.png'
import like from '../assets/like.png'
import emptylike from '../assets/emptylike.png'
import photoIcon from '../assets/icons/photo.svg'
import * as Font from 'expo-font';

import Nearby from "../compontents/Nearby";
import Discover from '../compontents/Discover';

import React, {useState, useEffect} from 'react'

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

export default function Behomiescreen({navigation}) {
  const [hideImages, setHideImages] = useState(false);

  const hideAllImages = () => {
    setHideImages(true);
  };

  const [currentView, setCurrentView] = useState("Nearby");

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

  return (
    <View style={{ backgroundColor: '#160635', flex: 1 }}>
  <View style={styles.headerContainer}>
    <Text style={styles.heading}>
      Homie moments
    </Text>
    <View style={styles.iconContainer}>
      <TouchableOpacity onPress={() => navigation.navigate("memorywall")}>
      <Image source={calendarIcon} style={{width: 24, height: 24}}/>
      </TouchableOpacity>
    </View>
  </View>
  <View style={{ flex: 1,  alignItems: 'center', color: '#fff' }}>
  {hideImages ? (
    <TouchableOpacity onPress={hideAllImages} style={styles.buttonHide}>
      <Image source={photoIcon} style={{width: 29, height: 25}} />
      <Text style={styles.buttonHideText}>Take a picture</Text>
  </TouchableOpacity>
) : (
    <Image source={require('../assets/groupfoto.jpg')} style={{ width: 160, height: 220, marginBottom:5, marginTop: '-20px'}} />
)}
{!hideImages && (
  <>
    <View style={styles.details}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
      <Image source={like} style={{width: 20, height: 17}}/>
      <Text style={{ color: '#fff', fontFamily:'manrope', fontSize: '13px', paddingLeft: 5 }}>2</Text>
      </View>
      <Text style={{ color: '#3BEDBF', fontFamily:'manrope', fontSize: '13px' }}>20 minutes ago</Text>
    
    </View>
        <Text style={{ color: '#fff', fontFamily:'manrope', fontSize: '14px' }}>Add a description...</Text>
    </>
    )}
  </View>

  <View style={{ flex: 2 }}>
  <ScrollView style={styles.homiefeed}>
    <View style={{ flexDirection:'row', justifyContent: 'space-between' }}>
        
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
      {renderView()}

  </ScrollView>
  </View>
  </View>

  )
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
    fontSize: 20,
    flex: 1,
    textAlign: 'center',
    position: 'absolute',
    fontFamily: 'novaticaBold', 
    fontSize: '20px'
  },
  iconContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-end",
    padding: 10,
    marginRight: 25,
    flex: 1,
  },

  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 200,
    paddingHorizontal: 20,
    margin: 10,
  },

  homiefeed: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 35,
    marginTop: -30,
  },

  btnFull: {
    borderRadius: 35,
    backgroundColor: "#D9B2EE",
    borderColor: "#D9B2EE",
    borderStyle: "solid",
    borderWidth: 2,
    width: "48%",
    paddingVertical: 15,
    marginBottom: 40,
    marginTop: 10,
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
    marginBottom: 40,
    marginTop: 10,
    paddingVertical: 15,
    textAlign: 'center',
  }, 

  btnTextActive: {
    color:'#D9B2EE', 
    fontStyle: 'normal', 
    fontWeight: '700', 
    fontSize: '14px',  
    fontFamily:'moon'
  }, 

  btnTextPassive: {
    color:'#fff', fontStyle: 'normal', fontWeight: '700', fontSize: '14px',  
    fontFamily:'moon'
  }, 
  buttonHide: {
    textAlign:"center",
    alignSelf: 'center',
    backgroundColor:"#B900F4",
    color: "#fff",
    borderRadius: 100,
    width: 240,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: '45px'
  },
  buttonHideText: {
    fontFamily:'moon', 
    fontSize:'18px',
    fontWeight: 'bold',
    color: "#fff",
    marginLeft: '15px'
  }
});