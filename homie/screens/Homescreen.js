import React from 'react';
import { StyleSheet, View, Text, Button, Image } from 'react-native';
import { Header, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import myImage from '../assets/float.svg';

export default function Homescreen({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
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
      <View style={styles.imageContainer}>
        <Image source={myImage} style={styles.image} />
        <View style={{position:'absolute', left:120, top:35, zIndex: 10, width:120, height:100, display:'flex', alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontSize:'1rem'}}>Welcome back Jade!</Text>
        </View>
      </View>
      <View style={{marginTop: 80, paddingHorizontal: 24}}>
        <View style={{display: 'flex', flexDirection:'row', justifyContent:'space-between'}}>
          <Text>Announcements</Text>
          <Text>Add announcement</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    position: 'relative',
    height: '100%',
    width: '100%',
  },
  header: {
    backgroundColor: '#160635',
    height: 215,
    width: '100%',
  },
  headerContainer: {
    backgroundColor: '#160635',
    paddingHorizontal: 24,
    paddingVertical: 0,
    border: 'none',
    marginTop: 40,
  },
  imageContainer: {
    position: 'absolute',
    top: 100,
    left: "-1px",
    height: '200px',
    width: '350px',
  },
  image: {
    resizeMode: 'contain',
    maxWidth: '80%',
    height: '100%',
  }
});
