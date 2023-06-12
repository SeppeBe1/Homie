import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native'
import { Header, Button, CheckBox } from 'react-native-elements'
import arrowLeft from '../assets/icons/arrowLeft.svg'
import circleArrow from '../assets/icons/circleArrow.svg'
import passwordChanged from '../assets/passwordChanged.svg'


import * as Font from 'expo-font';

import React, {useState, useEffect} from 'react'

// Load the font
const loadFonts = async () => {
  await Font.loadAsync({
    moon: require('../assets/fonts/Moon.otf'),
    manrope: require('../assets/fonts/Manrope.ttf'),
    novatica: require('../assets/fonts/Novatica.ttf'),
    novaticaBold: require('../assets/fonts/Novatica-Bold.ttf')
  });
};

export default function ChangePassword({navigation}) {

  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  useEffect(() => {
    loadFonts().then(() => {
      setFontsLoaded(true);
    });
  }, []);

  if (!fontsLoaded) {
    return null; // or a loading screen
  }

  const handlePasswordChange = () => {
    setIsPasswordChanged(true);
  };

  return (
    <View>
    <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={arrowLeft} style={{ width: 8, height: 15 }} />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>           
            <Text style={{ color: '#fff', fontFamily: 'novaticaBold', fontSize: '16px', textAlign: 'center' }}>Edit Password</Text>    
        </View>
    </View>
    <View style={styles.passwordArea}>
    {!isPasswordChanged ? (
          <View>
            <View style={styles.subtitle}>
              <Text style={{ fontFamily: 'moon', fontWeight: 'bold', textAlign: 'center', marginTop: 100, marginBottom: 10, fontSize: 16 }}>Set your new password</Text>
            </View>
            <View style={{ marginVertical: 40 }}>
              <TextInput
                style={styles.input}
                placeholder="Old password"
                secureTextEntry
              />

              <TextInput
                style={styles.input}
                placeholder="New password"
                secureTextEntry
              />

              <TextInput
                style={styles.input}
                placeholder="Confirm new password"
                secureTextEntry
              />
            </View>
            <TouchableOpacity onPress={handlePasswordChange}>
              <Image source={circleArrow} style={{ alignSelf: 'center', width: 50, height: 50 }} />
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Image source={passwordChanged} style={{ alignSelf: 'center', width: 148, height: 149, marginTop: 100 }} />
            <Text style={{ fontFamily: 'manrope', fontSize: 16, marginTop: 60 }}>Thankyou! Password changed succesfully!</Text>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 35 }}>
              <Text style={styles.button}>Back to profile</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
  </View>
  
  )
}



const styles = StyleSheet.create({

  topHeader:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#160635",
    height: "115px",
    marginBottom: 20,
  },

  passwordArea: {
    backgroundColor: '#F2F2F2', 
    alignItems: 'center'
  },
  input:{
    fontSize: 16,
    fontFamily: 'manrope',
    placeholderTextColor:"#A5A5A5",
    backgroundColor:"white",

    marginBottom: 17,
    padding: 17 ,

    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,

    width: '342px',
    height: '56px'
  },
  button: {
    textAlign:"center",
    alignSelf: 'center',
    backgroundColor:"#B900F4",
    color: "#fff",
    fontFamily:'moon', 
    fontSize:'18px',
    fontWeight: 'bold',
    borderRadius: 100,
    width: 240,
    paddingVertical: 16,
  }
})