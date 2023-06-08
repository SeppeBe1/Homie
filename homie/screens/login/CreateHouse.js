import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import React , { useState }  from 'react'
import arrowLeft  from '../../assets/icons/arrowLeftPurple.svg'
import createHouse from '../../assets/login/createHouse.svg'
import next from '../../assets/login/next.svg'
import  navigation  from '@react-navigation/native';

import Manrope from "../../assets/fonts/Manrope.ttf";
import MoonFont from "../../assets/fonts/Moon.otf";
import Novatica from "../../assets/fonts/Novatica-Bold.woff";
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateHouse = ({navigation}) => {
    const [housename, setHousename] = useState('');
    const [color, setColor] = useState('white');
    const [validation, setValidation] = useState(false);

    function checkHouse(){
      if(housename == ""){
        console.log("Cannot be empty");
        const newColor = color === 'white' ? '#FF7A7A' : 'white';
        setColor('#FF7A7A');
        setValidation(true);
      } else {
        AsyncStorage.setItem('housename', housename);
        navigation.navigate("CreateHouseAdress");
      }
    }



  return (
    <View style={styles.container}>
        <View style={styles.itemsTop}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={arrowLeft} style={styles.arrowLeft} />
            </TouchableOpacity>
        <Text style={styles.h2} >Create your homie!</Text>
        </View>

        <Image source={createHouse} style={styles.imageCreate} />
        <Text style={styles.p}>Register your house in Homie and Make
            your cohousing experience easier and
            more fun!
        </Text>
    
        <Text style={styles.h3}> 1. Let's start with a name!</Text>
     
        {validation && (
                <Text style={styles.validation}>Cannot be empty</Text>
             )}

        <TextInput
            style={[styles.input, { borderColor: color }]}
            placeholder="Housename"
            onChangeText={text => setHousename(text)}
            value={housename}
            />

            <TouchableOpacity onPress={checkHouse}>
                <Image source={next} style={styles.arrowNext}  />
            </TouchableOpacity>

    </View>
  )
}



export default CreateHouse

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

      itemsTop: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

      },

      arrowLeft: {
        width:10,
        height:18,
      },

      imageCreate: {
        width:194,
        height:123,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 56,
      },

      h2: {
        textAlign: 'center',
        fontSize: 25,
        fontFamily: Manrope,
        fontWeight: 'bold',
        marginTop: 60,
        marginBottom: 56,

        marginLeft: 'auto',
        marginRight: 'auto',
      },

      p: {
        width: 250,
        fontFamily: Manrope,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 52,

      },

      h3: {
        width: 250,
        fontFamily: Manrope,
        marginLeft: 'auto',
        marginRight: 'auto',
        fontWeight: 'bold',

        marginBottom: 43,
      },

      validation:{
        color: "#FF7A7A",
        fontSize: 16,
        paddingBottom: 10,
        marginTop: "-25px", 
        textAlign: "center",
      },

      


    input:{
        fontSize: 16,
        fontFamily: Novatica,
        placeholderTextColor:"#A5A5A5",
        backgroundColor:"white",

        marginBottom: 47,
        padding: 17 ,
        width: 340,

        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,

        width: '300',
      },

      arrowNext: {
        width: 50,
        height: 50,
        marginLeft: 'auto',
        marginRight: 'auto',

      },

      

})