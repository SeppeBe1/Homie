import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, Button, Image } from 'react-native';
import { Header, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Font from 'expo-font';
import myImage from '../assets/float.svg';
import pen from '../assets/pentosquare.svg';

// Load the font
const loadFonts = async () => {
  await Font.loadAsync({
    'moon': require('../assets/fonts/Moon.otf'),
  });
}

export default function Homescreen({navigation}) {
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
        <View style={{position:'absolute', left:110, top:35, zIndex: 10, width:130, height:100, display:'flex', alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontSize:'1rem', fontFamily:'moon', fontWeight:'bold', color:'#160635'}}>Welcome back Jade!</Text>
        </View>
      </View>
      <View style={{marginTop: 80, paddingHorizontal: 24}}>
        <View style={{display: 'flex', flexDirection:'row', justifyContent:'space-between'}}>
          <Text style={{fontSize:'0.875rem', fontFamily:'moon', fontWeight:'bold'}}>Announcements</Text>
          <View style={{display: 'flex', flexDirection:'row', alignItems:'center' }}>
            <Text style={{fontSize:'0.875rem', fontFamily:'manrope', fontWeight:'regular', color:'#939393'}}>Add announcement</Text>     
            <Image source={pen} style={{width: 20, height: 20, marginLeft: 7}}/>
          </View>
        </View>
      </View>
      <View style={{height: '100%', width:'100%', backgroundColor:'red', display:'flex', alignItems:'center', justifyContent:'center'}}>
        <Text>Hey</Text>
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
  

