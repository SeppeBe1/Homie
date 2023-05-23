import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState }  from 'react'
import { useNavigation } from '@react-navigation/native';
import logo from "../../assets/logo.png";
import logoHomie from "../../assets/logoHomie.svg";

import MoonFont from "../../assets/fonts/Moon.otf";
import Novatica from "../../assets/fonts/Novatica-Bold.woff";

export default function SignUp({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setconfirmPassword] = useState('');

    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
      setIsFocused(true);
    };
  
    const handleBlur = () => {
      setIsFocused(false);
    };

    const handleLogin = () => {
      // Perform login logic here, e.g., API calls, validation, etc.
      console.log('Email:', email);
      console.log('Password:', password);
      console.log('Confirm password:', password);
    };

  return (
    <View style={styles.container}>

        <View style={styles.header}>
            <Image style={styles.logo}source={logoHomie}/>
        </View>

        <View style={styles.body}>
            <Text style={styles.h2}>Make an account</Text>

            <TextInput
            style={[styles.input, isFocused && styles.focusedInput]}
            placeholder="Email"
            onChangeText={text => setEmail(text)}
            value={email}
            onFocus={handleFocus}
            onBlur={handleBlur}
            />

            <TextInput
            style={[styles.input, isFocused && styles.focusedInput]}
            placeholder="Password"
            secureTextEntry
            onChangeText={text => setPassword(text)}
            value={password}
            onFocus={handleFocus}
            onBlur={handleBlur}
            />

            <TextInput
            style={[styles.input, isFocused && styles.focusedInput]}
            placeholder="Confirm passwprd"
            secureTextEntry
            onChangeText={text => setPassword(text)}
            value={confirmpassword}
            onFocus={handleFocus}
            onBlur={handleBlur}
            />

            <Text style={styles.forgotPw} onPress={() => console.log("hallo")}>Forget password</Text>

            <TouchableOpacity style={styles.login} onPress={handleLogin}>
            <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>

            <Text style={styles.noAcc} >Already have an account? <Text style={styles.noAccCPress} onPress={() =>navigation.navigate("Login")}>Login</Text></Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: "white",
        position: "relative",
        height: "100%",
        width: "100vw",
        backgroundColor:"#FAFAFA",
      },

    header: {
        backgroundColor: "#160635",
        height: 215,
        width: "100%",
      },

    logo: {
        width: 280,
        height: "40%",
        marginTop: 50,
        marginLeft: 'auto',
        marginRight: 'auto',
      },

    body: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 400,
      },

      h2: {
        textAlign: 'center',
        fontSize: 25,
        fontFamily: MoonFont,
        marginTop: 60,
        marginBottom: 40,
      },

      forgotPw:{
        color: "#D9B2EE",
        marginTop: 10,

      },

      input:{
        fontSize: 16,
        fontFamily: Novatica,
        placeholderTextColor:"#A5A5A5",
        backgroundColor:"white",

        marginBottom: 17,
        padding: 17 ,

        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,

        width: '300',
      },

      login:{
        textAlign:"center",
        backgroundColor:"#B900F4",
        borderRadius: 100,
        width: 200,

        paddingTop: 16 ,
        paddingRight: 66 ,
        paddingBottom: 16  ,
        paddingLeft: 66 ,

        marginTop: 46,
        marginLeft: 'auto',
        marginRight: 'auto',
      },

      buttonText:{
        fontSize: 20,
        color: "white",
      },

      noAcc:{
        color:'black',
        marginTop:75,
        textAlign: "center",
      },
      
      noAccCPress:{
        color:'#D9B2EE',

      },

    
})