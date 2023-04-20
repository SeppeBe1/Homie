import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import { Header, Avatar, Button } from 'react-native-elements'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import React from 'react'

export default function Behomiescreen({navigation}) {
  return (
    <View style={{ backgroundColor: '#160635', flex: 1 }}>
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>
          Homie Moments
        </Text>
        <View style={styles.iconContainer}>
          <FontAwesomeIcon icon={faCalendarDays} size={24} color="#FFFFFF" />
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', color: '#fff' }}>
        <Image source={require('../assets/groupfoto.jpg')} style={{ width: 160, height: 220, marginBottom:10 }} />
        <View style={styles.details}>
          <Text style={{ color: '#fff' }}>2 likes</Text>
          <Text style={{ color: '#3BEDBF' }}>20 minutes ago</Text>
        </View>
        <Text style={{ color: '#fff' }}>Add a description...</Text>
      </View>
      <ScrollView style={styles.homiefeed}>
        <View style={{ flexDirection:'row', justifyContent: 'space-between' }}>
          <TouchableOpacity style={styles.btnFull} onPress={() => console.log('Nearby pressed!')}>
            <Text style={{ color:'#fff', fontWeight: 'bold', textTransform: 'uppercase'}}>Nearby</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnBorder} onPress={() => console.log('Discover pressed!')}>
            <Text style={{ color:'#D9B2EE', fontWeight: 'bold', textTransform: 'uppercase'}}>Discover</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection:'row', alignItems: 'center', marginBottom: 15 }}>
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
            <FontAwesomeIcon icon={faHeart} size={24} color="#000" />
          </View>
        </View>
        <View style={{ justifyContent:'center' }}>
        <Image source={require('../assets/groupfoto.jpg')} style={{ width: '100%', height: 440 }} />
        </View>
        </ScrollView>
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
    padding: 15
  },

  btnFull:{
    borderRadius: 35,
    backgroundColor: '#D9B2EE', 
    width: '48%',
    paddingVertical: 15,
    marginVertical: 35,
    textAlign: 'center'

  }, 

  btnBorder: {
    borderRadius: 35,
    backgroundColor: '#fff',
    borderColor: '#D9B2EE',
    borderStyle: 'solid',
    borderWidth: 2, 
    width:'48%',
    marginVertical: 35,
    paddingVertical: 15,
    textAlign: 'center'
  }
});
