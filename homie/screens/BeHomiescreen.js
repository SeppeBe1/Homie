import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import { Header, Button } from 'react-native-elements'
import calendarIcon from '../assets/calendar.png'
import like from '../assets/like.png'
import emptylike from '../assets/emptylike.png'
import * as Font from 'expo-font';

import HomieMomentPost from '../compontents/HomieMomentPost';

import React, {useState, useEffect} from 'react'

// Load the font
const loadFonts = async () => {
  await Font.loadAsync({
    'moon': require('../assets/fonts/Moon.otf'),
  });
}
export default function Behomiescreen({navigation}) {

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
    <View style={{ backgroundColor: '#160635', flex: 1 }}>
  <View style={styles.headerContainer}>
    <Text style={styles.heading}>
      Homie Moments
    </Text>
    <View style={styles.iconContainer}>
      <Image source={calendarIcon} style={{width: 24, height: 24}}/>
    </View>
  </View>
  <View style={{ flex: 1,  alignItems: 'center', color: '#fff' }}>
    <Image source={require('../assets/groupfoto.jpg')} style={{ width: 160, height: 220, marginBottom:5, marginTop: '-20px'}} />
    <View style={styles.details}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
      <Image source={like} style={{width: 20, height: 17}}/>
      <Text style={{ color: '#fff', paddingLeft: 5 }}>2</Text>
      </View>
      <Text style={{ color: '#3BEDBF' }}>20 minutes ago</Text>
    </View>
    <Text style={{ color: '#fff' }}>Add a description...</Text>
  </View>
  <View style={{ flex: 1 }}>
  <ScrollView style={styles.homiefeed}>
    <View style={{ flexDirection:'row', justifyContent: 'space-between' }}>
      <TouchableOpacity style={styles.btnFull} onPress={() => console.log('Nearby pressed!')}>
        <Text style={{ color:'#fff', fontStyle: 'normal', fontWeight: '700', fontSize: '14px',  fontFamily:'moon'}}>Nearby</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnBorder} onPress={() => console.log('Discover pressed!')}>
        <Text style={{ color:'#D9B2EE', fontStyle: 'normal', fontWeight: '700', fontSize: '14px',  fontFamily:'moon'}}>Discover</Text>
      </TouchableOpacity>
    </View>
    <HomieMomentPost />
    <View style={{ justifyContent:'center' }}>
      <Image source={require('../assets/groupfoto.jpg')} style={{ width: '100%', height: 440, marginBottom: 40 }} />
    </View>
    <HomieMomentPost />
    <View style={{ justifyContent:'center' }}>
      <Image source={require('../assets/groupfoto.jpg')} style={{ width: '100%', height: 440, marginBottom: 40 }} />
    </View>
  </ScrollView>
  </View>
  </View>

  )
}

const styles = StyleSheet.create({
  

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
    flex: 1,
    textAlign: 'center',
    position: 'absolute',
  },
  iconContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    padding: 10,
    marginRight: 25,
    flex: 1,
  },

  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200,
    paddingHorizontal: 20,
    margin: 10
  },

  homiefeed: {
    backgroundColor: '#fff', 
    borderTopLeftRadius: 25, 
    borderTopRightRadius: 25,
    padding: 35,
    marginTop: -30
  },

  btnFull:{
    borderRadius: 35,
    backgroundColor: '#D9B2EE', 
    borderColor: '#D9B2EE',
    borderStyle: 'solid',
    borderWidth: 2, 
    width: '48%',
    paddingVertical: 15,
    marginBottom: 40,
    marginTop: 10,
    textAlign: 'center',
    fontFamily:'moon'
  }, 

  btnBorder: {
    borderRadius: 35,
    backgroundColor: '#fff',
    borderColor: '#D9B2EE',
    borderStyle: 'solid',
    borderWidth: 2, 
    width:'48%',
    marginBottom: 40,
    marginTop: 10,
    paddingVertical: 15,
    textAlign: 'center',
  }
});




/* import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import { Header, Avatar, Button } from 'react-native-elements'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import calendarIcon from '../assets/calendar.png'
import like from '../assets/like.png'
import emptylike from '../assets/emptylike.png'

import React from 'react'

export default function Behomiescreen({navigation}) {
  return (
    <View style={{ backgroundColor: '#160635', flex: 1 }}>
  <View style={styles.headerContainer}>
    <Text style={styles.heading}>
      Homie Moments
    </Text>
    <View style={styles.iconContainer}>
      <Image source={calendarIcon} style={{width: 24, height: 24}}/>
    </View>
  </View>
  <View style={{ flex: 1,  alignItems: 'center', color: '#fff' }}>
    <Image source={require('../assets/groupfoto.jpg')} style={{ width: 160, height: 220, marginBottom:5, marginTop: '-20px'}} />
    <View style={styles.details}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
      <Image source={like} style={{width: 20, height: 17}}/>
      <Text style={{ color: '#fff', paddingLeft: 5 }}>2</Text>
      </View>
      <Text style={{ color: '#3BEDBF' }}>20 minutes ago</Text>
    </View>
    <Text style={{ color: '#fff' }}>Add a description...</Text>
  </View>
  <View style={{ flex: 1 }}>
    <ScrollView style={styles.homiefeed}>
      <View style={{ flexDirection:'row', justifyContent: 'space-between' }}>
        <TouchableOpacity style={styles.btnFull} onPress={() => console.log('Nearby pressed!')}>
          <Text style={{ color:'#fff', fontWeight: 'bold', textTransform: 'uppercase'}}>Nearby</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnBorder} onPress={() => console.log('Discover pressed!')}>
          <Text style={{ color:'#D9B2EE', fontWeight: 'bold', textTransform: 'uppercase'}}>Discover</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection:'row', alignItems: 'center', marginBottom: 20 }}>
        <View>
          <Image source={require('../assets/groupfoto.jpg')} style={{ width: 58, height: 58, borderRadius:50 }} />
        </View>
        <View style={{ marginLeft: 15, flex: 1 }}>
          <Text style={{ color: '#160635', fontWeight: 'bold', fontSize: '16px' }}>Casa Frankie</Text>
          <Text>Time for dinner!</Text>
          <View style={{ flexDirection:'row'}}>
            <Text style={{ color:'#939393', paddingRight: 5 }}>Antwerpen</Text>
            <Text style={{ color:'#939393', paddingRight:5 }}>●</Text>
            <Text style={{ color:'#939393' }}>20 m ago</Text>
          </View>
        </View>
        <View>
          <Image source={emptylike} style={{width: 20, height: 17}}/>
        </View>
      </View>
      <View style={{ justifyContent:'center' }}>
        <Image source={require('../assets/groupfoto.jpg')} style={{ width: '100%', height: 440, marginBottom: 40 }} />
      </View>

      <View style={{ flexDirection:'row', alignItems: 'center', marginBottom: 20 }}>
        <View>
          <Image source={require('../assets/groupfoto.jpg')} style={{ width: 58, height: 58, borderRadius:50 }} />
        </View>
        <View style={{ marginLeft: 15, flex: 1 }}>
          <Text style={{ color: '#160635', fontWeight: 'bold', fontSize: '16px' }}>Casa Frankie</Text>
          <Text>Time for dinner!</Text>
          <View style={{ flexDirection:'row'}}>
            <Text style={{ color:'#939393', paddingRight: 5 }}>Antwerpen</Text>
            <Text style={{ color:'#939393', paddingRight:5 }}>●</Text>
            <Text style={{ color:'#939393' }}>20 m ago</Text>
          </View>
        </View>
        <View>
          <Image source={emptylike} style={{width: 20, height: 17}}/>
        </View>
      </View>
      <View style={{ justifyContent:'center' }}>
        <Image source={require('../assets/groupfoto.jpg')} style={{ width: '100%', height: 440, marginBottom: 40 }} />
      </View>
    </ScrollView>
  </View>
</View>

  )
}

const styles = StyleSheet.create({
  

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
    flex: 1,
    textAlign: 'center',
    position: 'absolute'
  },
  iconContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    padding: 10,
    marginRight: 25,
    flex: 1,
  },

  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200,
    paddingHorizontal: 20,
    margin: 10
  },

  homiefeed: {
    backgroundColor: '#fff', 
    borderTopLeftRadius: 25, 
    borderTopRightRadius: 25,
    padding: 35,
    marginTop: -30
  },

  btnFull:{
    borderRadius: 35,
    backgroundColor: '#D9B2EE', 
    borderColor: '#D9B2EE',
    borderStyle: 'solid',
    borderWidth: 2, 
    width: '48%',
    paddingVertical: 15,
    marginBottom: 40,
    marginTop: 10,
    textAlign: 'center'
  }, 

  btnBorder: {
    borderRadius: 35,
    backgroundColor: '#fff',
    borderColor: '#D9B2EE',
    borderStyle: 'solid',
    borderWidth: 2, 
    width:'48%',
    marginBottom: 40,
    marginTop: 10,
    paddingVertical: 15,
    textAlign: 'center'
  }
});*/