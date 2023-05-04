import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import { Header, Button } from 'react-native-elements'
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
        source={require('../assets/profielfoto.svg')}
        style={{ width: 88, height: 88, borderRadius: 50 }}
      />
      <TouchableOpacity
        style={{ position: 'absolute', top: 0, right: 0 }}
        onPress={() => console.log('Edit profile clicked')}
      >
        <Image source={editIcon} style={{ width: 20, height: 20 }} />
      </TouchableOpacity>
    </View>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
        <View>
      <Text style={{ color: '#fff', fontFamily: 'novaticaBold', fontSize: '16px', textAlign: 'center' }}>Jade Apers</Text>
      </View>
      </View>
      <TouchableOpacity onPress={() => console.log('Status clicked')} style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', top: 120, right: 130 }}>
        <Image source={statusAvailable} style={{ width: 11, height: 11, marginRight: 5 }} />
        <Image source={dropdownIcon} style={{ width: 15, height: 8 }} />
      </TouchableOpacity>
  </View>
  </View>
    
  <View style={{ backgroundColor: '#F2F2F2'}}>
    <View style={styles.profileItemFirst}>
      <View style={{ display: 'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
        <View style={styles.profileItemTitle}>
          <Image source={emailIcon} style={{width: 20, height: 16, margin: 10}}/>
          <Text style={{fontFamily: 'moon', fontWeight: 'bold', fontSize: '16px', color: '#160635', marginTop: 10, marginLeft: 10}}>Email address</Text>
        </View>
        <TouchableOpacity onPress={() => console.log('Edit email clicked')}>
        <Image source={editFieldIcon} style={{width: 16, height: 16, marginRight: 10}}/>
        </TouchableOpacity>
      </View>
      <Text style={{fontFamily: 'manrope', margin: '10px', fontSize: '16px'}}>jadeapers@hotmail.com</Text>
    </View>
    <View style={styles.profileItem}>
    <View style={{ display: 'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
      <View style={styles.profileItemTitle}>
      <Image source={phoneIcon} style={{width: 21, height: 21, margin: 10}}/>
      <Text style={{fontFamily: 'moon', fontWeight: 'bold', fontSize: '16px', color: '#160635', marginTop: 10, marginLeft: 10}}>Phonenumber</Text>
      </View>
      <TouchableOpacity onPress={() => console.log('Edit email clicked')}>
        <Image source={editFieldIcon} style={{width: 16, height: 16, marginRight: 10}}/>
      </TouchableOpacity>
      </View>
      <Text style={{fontFamily: 'manrope', margin: '10px', fontSize: '16px'}}>+32 412 34 76 06</Text>
    </View>
    <View style={styles.profileItem}>
    <View style={{ display: 'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
      <View style={styles.profileItemTitle}>
      <Image source={passwordIcon} style={{width: 18, height: 20, margin: 10}}/>
      <Text style={{fontFamily: 'moon', fontWeight: 'bold', fontSize: '16px', color: '#160635', marginTop: 10, marginLeft: 10}}>Password</Text>
      </View>
      <TouchableOpacity onPress={() => console.log('Edit email clicked')}>
      <Image source={editFieldIcon} style={{width: 16, height: 16, marginRight: 10}}/>
      </TouchableOpacity>
      </View>
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
  }
})
