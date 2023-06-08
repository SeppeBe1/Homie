import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import React , { useState, useEffect  }  from 'react'
import arrowLeft  from '../../assets/icons/arrowLeftPurple.svg'
import sharecodeImage from '../../assets/login/sharecodeImage.svg'
import next from '../../assets/login/next.svg'

import Manrope from "../../assets/fonts/Manrope.ttf";
import Moon from "../../assets/fonts/Moon.otf";
import Novatica from "../../assets/fonts/Novatica-Bold.woff";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ShareButton from '../../assets/icons/shareButton.svg'

const ShareHomie = ({navigation}) => {
  const [code, setCode] = useState('');

  useEffect(() => {
    gethouse();
  }, []);

  const gethouse = async () => {
    const token = await AsyncStorage.getItem('token');
    const houseId = await AsyncStorage.getItem('houseId');

    const response = await fetch(`http://localhost:3000/api/v1/house/${houseId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    console.log(data.status);

    if (data.status === 'failed') {
      console.log(data.status);
      console.log(data.data);
    } else if (data.status === 'succes') {
      console.log(data.status);
      console.log(data.data);
      setCode(data.data.houseCode);
    }
  };



  return (
    <View style={styles.container}>

        <Image source={sharecodeImage} style={styles.imageCreate} />

        <Text style={styles.h2} >Congrats!{'\n'} Your homie is officially {'\n'}launched</Text>

    
        <Text style={styles.p}> Share your personal code with your homies, so they can immediatly join your cohohousing community</Text>
     
        <Text style={styles.code}>{code}</Text>

        <TouchableOpacity>
              <Image source={ShareButton} style={styles.share} />
        </TouchableOpacity>


        <TouchableOpacity  onPress={() =>navigation.navigate("TabNavigator")}>
           <Text style={styles.skip}> Skip for now</Text>
        </TouchableOpacity>

    </View>
  )
}



export default ShareHomie;

const styles = StyleSheet.create({

    container: {
      textAlign: 'center',
        position: "relative",
        height: "100%",
        width: "100vw",
        backgroundColor:"#F9F9F9",

        paddingLeft: 50,
        paddingRight: 50,

      },


      imageCreate: {
        width:138,
        height:121,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop:88,
        marginBottom: 56,
      },

      h2: {
        textAlign: 'center',
        fontSize: 25,
        fontFamily: Manrope,
        fontWeight: 'bold',
        marginTop: 57,
        marginBottom: 21,

        marginLeft: 'auto',
        marginRight: 'auto',
      },

      p: {
        width: 250,
        fontFamily: Manrope,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 58,

      },

      code: {
        width: 250,
        fontFamily: Moon,
        fontSize: 28,
        marginLeft: 'auto',
        marginRight: 'auto',
        fontWeight: 'bold',
        letterSpacing: 4,

        marginBottom: 43,

      },

      share: {
        width:50,
        height:50,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop:46,
        marginBottom: 36,

      },

      skip: {
        color:'#D9B2EE',
        fontSize: 16,



      },
})