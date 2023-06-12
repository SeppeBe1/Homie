import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react';
import arrowLeft from '../../assets/icons/arrowLeftPurple.svg'
import joinHouse from '../../assets/login/joinHouse.svg'
import Manrope from "../../assets/fonts/Manrope.ttf";
import Moon from "../../assets/fonts/Moon.otf";
import Novatica from "../../assets/fonts/Novatica-Bold.woff";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCode } from 'react-native-reanimated';

const JoinHouse = ({ navigation }) => {
  const [code, setCode] = useState('');
  const [houseIdd, setHouseId] = useState('');
  const [validation, setValidation] = useState(false);

  const handleCodeChange = (index, text) => {
    const sanitizedCode = text.replace(/[^0-9]/g, '').slice(0, 1);
  
    setCode((prevCode) => {
      const updatedCode = prevCode.split('');
      updatedCode[index] = sanitizedCode;
      return updatedCode.join('');
    });
  };

  const checkCode = async (code) => {
    const token = await AsyncStorage.getItem('token');
  
    fetch(`http://localhost:3000/api/v1/house/code/${code}`, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
      }
      })
      .then(response => response.json())
      .then(data => {        
          if(data.status == "failed"){
            console.log('fout');
            setValidation(true);
          } else if(data.status == "succes"){
            setHouseId(data.result[0]._id)
            console.log(data.result[0]._id);
                joinHouseId(data.result[0]._id);
                return;
              }
            }
      )
      .catch(error => {
          // Handle any errors
          console.error(error);
      });
    }

  const joinHouseId = async (houseIddd) => {
  const userId = await AsyncStorage.getItem('userId');
  console.log(houseIddd)

  fetch(`http://localhost:3000/api/v1/users/${userId}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      houseId: houseIddd,
    }),
    })
    .then(response => response.json())
    .then(data => {        
      console.log(data);
        if(data.status == "failed"){
          console.log(data.status);

        } else if(data.status == "success"){
          console.log(data.status);
          navigation.navigate("TabNavigator");

        }
        // Perform any necessary actions after successful login
    })
    .catch(error => {
        // Handle any errors
        console.error(error);
    });
  }



  return (
    <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={arrowLeft} style={styles.arrowLeft} />
            </TouchableOpacity>
            <Image style={styles.joinHouseImage} source={joinHouse}/>




            

      <Text style={styles.h2}>Join a house!</Text>

      {validation && (
        <Text style={styles.validation}>Code doesn't exist</Text>
      )}

      <View style={styles.inputContainer}>
      <TextInput style={styles.input} maxLength={1} keyboardType="numeric" onChangeText={(text) => handleCodeChange(0, text)} />
      <TextInput style={styles.input} maxLength={1} keyboardType="numeric" onChangeText={(text) => handleCodeChange(1, text)} />
      <TextInput style={styles.input} maxLength={1} keyboardType="numeric" onChangeText={(text) => handleCodeChange(2, text)} />
      <TextInput style={styles.input} maxLength={1} keyboardType="numeric" onChangeText={(text) => handleCodeChange(3, text)} />
      <TextInput style={styles.input} maxLength={1} keyboardType="numeric" onChangeText={(text) => handleCodeChange(4, text)} />
      <TextInput style={styles.input} maxLength={1} keyboardType="numeric" onChangeText={(text) => handleCodeChange(5, text)} />
      </View>

      <TouchableOpacity onPress={() => checkCode(code)}>
            <Text style={styles.join}>Join Homie</Text>
       </TouchableOpacity>
    </View>
  );
};

export default JoinHouse;

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

  arrowLeft: {
    textAlign:'left',
    width:15,
    height:25,
    marginTop:40,

  },
  
  joinHouseImage: {
    width:125,
    height:105,
    
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 83,
    marginBottom: 32,
  },

  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  input: {
    backgroundColor: 'white',
    textAlign: 'center',
    fontSize: 28,
    fontFamily: Moon,
    fontWeight: 'bold',
    marginTop: 64,
    marginBottom: 47,

    width: 38,
    height:55,
    borderRadius: 10,
    borderStyle: 'none',

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

  validation:{
    color: "#FF7A7A",
    fontSize: 20,
    marginTop: "-25px", 
    textAlign: "center",
  },

  code: {
    fontSize: 28,
    fontWeight: 'bold',
  },

  join: {
    fontFamily: Moon,
    backgroundColor: '#B900F4',
    borderRadius: 30,
    paddingLeft: 27,
    paddingRight: 27,
    paddingTop: 13,
    paddingBottom: 13,
    marginTop: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
    color: 'white',
    fontSize: 18,

},
});
