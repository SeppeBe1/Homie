import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native'
import { Header, Button, CheckBox } from 'react-native-elements'
import arrowLeft from '../assets/icons/arrowLeft.svg'
import editIcon from '../assets/icons/edit.svg'
import emailIcon from '../assets/icons/email.svg'
import phoneIcon from '../assets/icons/phone.svg'
import passwordIcon from '../assets/icons/password.svg'
import editFieldIcon from '../assets/icons/editField.svg'
import statusAvailable from '../assets/icons/statusAvailable.svg'
import statusBusy from '../assets/icons/statusBusy.svg'
import statusNotdisturb from '../assets/icons/statusNotdisturb.svg'
import dropdownIcon from '../assets/icons/dropdown.svg'
import dropdownIconUp from '../assets/icons/dropdownUp.png'
import crossIcon from "../assets/icons/close.svg"
import CheckBoxIcon from 'react-native-elements/dist/checkbox/CheckBoxIcon'
import checkboxEmpty from "../assets/icons/greenCheckbox_empt.svg"
import checkboxChecked from "../assets/icons/greenCheckbox.svg"
import profilePicture from "../assets/boy2.jpg"

import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import * as Font from 'expo-font';

import React, {useState, useEffect} from 'react'
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native'

// Load the font
const loadFonts = async () => {
  await Font.loadAsync({
    moon: require('../assets/fonts/Moon.otf'),
    manrope: require('../assets/fonts/Manrope.ttf'),
    novatica: require('../assets/fonts/Novatica.ttf'),
    novaticaBold: require('../assets/fonts/Novatica-Bold.ttf')
  });
};

export default function Myprofilescreen({navigation}) {

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts().then(() => {
      setFontsLoaded(true);
    });
  }, []);

  if (!fontsLoaded) {
    return null; // or a loading screen
  }

  return (
    <View>

<View style={styles.topHeader}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={arrowLeft} style={{ width: 8, height: 15 }} />
    </TouchableOpacity>
    <View style={{ flex: 1, alignItems: 'center' }}>
    <View style={{ position: 'relative' }}>
      <Image
        source={{ profilePicture }}
        style={{ width: 88, height: 88, borderRadius: 50, zIndex: 1 }}
      />
    </View>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
      <Text style={{ color: '#fff', fontFamily: 'novaticaBold', fontSize: '16px', textAlign: 'center' }}>Boy</Text>
      </View>
  </View>
  </View>

  <View style={{ backgroundColor: '#F2F2F2'}}>
    <View style={styles.profileItemFirst}>
      <View style={{ display: 'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
        <View style={styles.profileItemTitle}>
          <Image source={emailIcon} style={{width: 20, height: 16, marginHorizontal: 10, marginTop: 13, marginBottom: 10}}/>
          <Text style={styles.titleText}>Email address</Text>
        </View>
      </View>
      <Text style={{fontFamily: 'manrope', margin: '10px', fontSize: '16px'}}>boysangur@hotmail.com</Text>
    </View>
    <View style={styles.profileItem}>
    <View style={{ display: 'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
      <View style={styles.profileItemTitle}>
      <Image source={phoneIcon} style={{width: 21, height: 21, margin: 10}}/>
      <Text style={styles.titleText}>Phonenumber</Text>
      </View>
      </View>
      <Text style={{fontFamily: 'manrope', margin: '10px', fontSize: '16px'}}>+32 412 34 76 06</Text>
    </View>
  </View>
  </View>
  
  )
}



const styles = StyleSheet.create({

  topHeader:{
    backgroundColor: '#160635',
    height: '225px', 
    padding: '25px'
  },

  profileItemFirst: {
    backgroundColor: '#fff',
    padding: 10, 
    borderRadius: 15,
    marginHorizontal: '25px',
    marginTop: '25px',
    marginBottom: '5px'
  },

  profileItem: {
    backgroundColor: '#fff',
    padding: 10, 
    borderRadius: 15,
    marginHorizontal: '25px',
    marginVertical: '5px'
  },

  profileItemTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems:'flex-start',
    padding: 10
  },

  titleText: {
    fontFamily: 'moon', 
    fontWeight: 'bold', 
    fontSize: '16px', 
    color: '#160635', 
    marginTop: 15,
    marginBottom: 10,
    textAlign: 'left'
  },

  button: {
    textAlign: 'center',
    backgroundColor: '#B900F4',
    borderRadius: 100,
    width: 319,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontFamily: 'moon',
    fontWeight: 'bold'
  },
})
