import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import React , { useState }  from 'react'
import arrowLeft  from '../../assets/icons/arrowLeftPurple.svg'
import createHouse from '../../assets/login/createHouse.svg'
import next from '../../assets/login/next.svg'

import Manrope from "../../assets/fonts/Manrope.ttf";
import Moon from "../../assets/fonts/Moon.otf";
import Novatica from "../../assets/fonts/Novatica-Bold.woff";
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateHouseAdress = ({navigation}) => {
    const [city, setCity] = useState('');
    const [postalcode, setpostalCode] = useState('');
    const [color, setColor] = useState('white');
    const [validation, setValidation] = useState(false);
    const [validationText, setValidationText] = useState(false);
    
    async function checkAdress(){
      if(city == "" || postalcode == ""){
        setValidationText("Cannot be empty");
        console.log("Cannot be empty");
        const newColor = color === 'white' ? '#FF7A7A' : 'white';
        setColor('#FF7A7A');
        setValidation(true);
      } else if (isNaN(Number(postalcode))) {
        setValidationText("Postal code must be a number");
          console.log("Postal code must be a number");
          setColor("#FF7A7A");
          setValidation(true);
        } else {

        const token = await AsyncStorage.getItem('token');
        console.log(token);
        const housename = await AsyncStorage.getItem('housename');
        console.log(housename);
        const userId = await AsyncStorage.getItem('userId');
        console.log(housename);

        fetch('http://localhost:3000/api/v1/house', {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              housename: housename,
              city: city,
              postalcode: postalcode,
          }),
          })
          .then(response => response.json())
          .then(async data => {

              if(data.status == "failed"){

              } else if(data.status == "succes"){
                AsyncStorage.setItem('houseId', data.data.houseId);
                const userId = await AsyncStorage.getItem('userId');

                fetch(`http://localhost:3000/api/v1/users/${userId}`, {
                  method: 'PUT',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      houseId: data.data.houseId,
                  }),
                  })
                  .then(response => response.json())
                  .then(data => {        
                      if(data.status == "failed"){
                        console.log(data.status);
        
                      } else if(data.status == "succes"){
                        console.log(data.status);
                        navigation.navigate("CreateHouseRule");

                      }
                      // Perform any necessary actions after successful login
                  })
                  .catch(error => {
                      // Handle any errors
                      console.error(error);
                  });


                  navigation.navigate("CreateHouseRule");
                //---------------------
              }
              // Perform any necessary actions after successful login
          })
          .catch(error => {
              // Handle any errors
              console.error(error);
          });
      }
    }

  return (
    <View style={styles.container}>
        <View style={styles.itemsTop}>
        <Text style={styles.h2} >Create your homie!</Text>
        </View>

        <Image source={createHouse} style={styles.imageCreate} />
    
        <Text style={styles.h3}> 2. Which city do you live?</Text>
     
        {validation && (
                <Text style={styles.validation}>{validationText}</Text>
             )}

        <TextInput
            style={[styles.input, { borderColor: color }]}
            placeholder="City"
            onChangeText={text => setCity(text)}
            value={city}
        />

        <TextInput
            style={[styles.input, { borderColor: color }]}
            placeholder="Postalcode"
            onChangeText={text => setpostalCode(text)}
            value={postalcode}
         />

            <TouchableOpacity onPress={checkAdress}>
                <Text  style={styles.create}>Create Homie</Text>
            </TouchableOpacity>

    </View>
  )
}



export default CreateHouseAdress

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

        marginBottom: 17,
        padding: 17 ,
        width: 340,

        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,

        width: '300',
      },

      arrowNext: {
        marginTop: 30,
        width: 50,
        height: 50,
        marginLeft: 'auto',
        marginRight: 'auto',

      },

      create: {
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

      

})