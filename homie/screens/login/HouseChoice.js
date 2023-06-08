import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState }  from 'react'
import  navigation  from '@react-navigation/native';
import logo from "../../assets/logo.png";

import joinHouse from "../../assets/login/joinHouse.svg";
import createHouse from "../../assets/login/createHouse.svg";

import Manrope from "../../assets/fonts/Manrope.ttf";
import Novatica from "../../assets/fonts/Novatica-Bold.woff";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function HouseChoice({ navigation }) {


  return (
    <View style={styles.container}>

        <View style={styles.body}>
            <Text style={styles.h2}>Welcome to Homie!</Text>
            <Text style={styles.p}>What do you want to do?</Text>
         <View style={styles.butts}>
            <TouchableOpacity style={styles.button}  onPress={() =>navigation.navigate("JoinHouse")}>
              <Image style={styles.btnImageOne} source={joinHouse}/>
              <Text>Join a house</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}  onPress={() =>navigation.navigate("CreateHouse")}>
              <Image style={styles.btnImageTwo} source={createHouse}/>
              <Text>Create a house</Text>
            </TouchableOpacity>
        </View>

        </View>
    </View>
  )
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: "#F9F9F9",
        position: "relative",
        height: "100%",
        width: "100vw",
      },

    body: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: "100%",
        paddingTop: 176,
      },

      h2: {
        textAlign: 'center',
        fontSize: 25,
        marginTop: 60,
        marginBottom: 10,
        fontWeight: "bold",
        fontFamily: Novatica,
      },

      p:{
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 20,
        fontFamily: Manrope,
      }, 

      butts:{
        marginLeft: 'auto',
        marginRight: 'auto',
      },

      button:{
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',

        paddingBottom : 'center',
        paddingTop : 'center',
        height:168,
        width: 400,
        // backgroundColor: "#F4F4F4",
        backgroundColor: "#F4F4F4",
        marginTop:17.5,
        marginBottom:17.5,

        borderRadius:20,

      },

      btnImageOne:{
        marginTop : '7%',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 103,
        height: 79,
        marginBottom: 10,
        fontFamily: Manrope,
      },
      btnImageTwo:{
        marginTop : '7%',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 107,
        height: 60,
        marginBottom: 10,
        fontFamily: Manrope,
      },
      
})