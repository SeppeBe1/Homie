import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import emptylike from '../assets/emptylike.png';
import groep from '../assets/groupfoto.jpg'

export default class Discover extends Component {
  render(){
  return (   
    <View>
    <View style={{ flexDirection:'row', alignItems: 'center', marginBottom: 20 }}>
    <View>
      <Image source={require('../assets/grouppicture.jpg')} style={{ width: 58, height: 58, borderRadius:50 }} />
    </View>
    <View style={{ marginLeft: 15, flex: 1 }}>
      <Text style={{ color: '#160635', fontFamily:'novaticaBold', fontSize: '16px' }}>Chinatown</Text>
      <Text style={{ fontFamily:'manrope', fontSize: '14px' }}>Party!</Text>
      <View style={{ flexDirection:'row'}}>
        <Text style={{ color:'#939393', paddingRight: 5, fontFamily:'manrope', fontSize: '13px' }}>Hong Kong</Text>
        <Text style={{ color:'#939393', paddingRight:5, fontFamily:'manrope', fontSize: '13px' }}>●</Text>
        <Text style={{ color:'#939393', fontFamily:'manrope', fontSize: '13px' }}>20 m ago</Text>
      </View>
    </View>
    <View>
      <Image source={emptylike} style={{width: 20, height: 17}}/>
    </View>
</View>
  <View style={{ justifyContent:'center' }}>
  <Image source={require('../assets/grouppicture.jpg')} style={{ width: 340, height: 460, marginBottom: 40 }} />
  </View>
  </View> 
    );
  }
}
