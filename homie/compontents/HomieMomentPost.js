import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import emptylike from '../assets/emptylike.png';
import groep from '../assets/groupfoto.jpg'

const HomieMomentPost = () => {
  return (    
      <View style={{ flexDirection:'row', alignItems: 'center', marginBottom: 20 }}>
        <View>
          <Image source={require('../assets/groupfoto.jpg')} style={{ width: 58, height: 58, borderRadius:50 }} />
        </View>
        <View style={{ marginLeft: 15, flex: 1 }}>
          <Text style={{ color: '#160635', fontWeight: 'bold', fontSize: 16 }}>Casa Frankie</Text>
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
  );
};

export default HomieMomentPost;

