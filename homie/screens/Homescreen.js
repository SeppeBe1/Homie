import React from 'react';
import { StyleSheet, View, Text, Button, Image } from 'react-native';
import { Header, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


import myImage from '../assets/intersect.svg';

export default function Homescreen({navigation}) {

  return (
    <View>
      <View 
        style={{
          backgroundColor: '#160635',
          height: 215,
          width: '100%',
        }}
      >
        <Header
          containerStyle={styles.headerContainer}
          leftComponent={<Avatar
            size="medium"
            rounded
            source={{
              uri:
                'https://i.redd.it/lmwqtxhw9st41.jpg',
            }}
            containerStyle={{ width: 46, height: 46 }}
          />}
          centerComponent={
            <View 
            style={{
              display: 'flex', 
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%'
            }}
            >
              <Button title="Casa" onPress={() => navigation.navigate('Homeaccount')}  />
            </View>
          }
          rightComponent={
            <View 
              style={{
                display: 'flex', 
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%'
              }}
            >
              <Icon name="cog" color="white" size={24} onPress={() => alert('Settings')} />
            </View>
          }
        />
      </View>
      <Image source={myImage} style={{width: 100, height: 100}} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#160635',
    paddingHorizontal: 24,
    paddingVertical: 0,
    border: 'none',
    marginTop: 40,
  },
});


