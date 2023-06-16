import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import logo from "../../assets/logo.png";
import logoHomie from "../../assets/logoHomie.svg";
import Moon from "../../assets/fonts/Moon.otf";

import MoonFont from "../../assets/fonts/Moon.otf";
import Novatica from "../../assets/fonts/Novatica-Bold.woff";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignUp({ navigation }) {
  const [fistname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");
  const [color, setColor] = useState("white");
  const [validation, setValidation] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleSignUp = () => {
    // Perform login logic here, e.g., API calls, validation, etc.
    if (password !== confirmpassword) {
      const newColor = color === "white" ? "#FF7A7A" : "white";
      setColor(newColor);
      setValidation(true);

      return;
    }

    fetch("http://localhost:3000/api/v1/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: fistname,
        lastname: lastname,
        email: email,
        password: password,
        confirmpassword: confirmpassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Process the response data
        console.log(data.status);

        if (data.status == "failed") {
          const newColor = color === "white" ? "#FF7A7A" : "white";
          setColor(newColor);
          setValidation(true);
        } else if (data.status == "succes") {
          // navigation.navigate('TabNavigator', { screen: Homename });
          let token = data.data.token;
          AsyncStorage.setItem("token", token);
          console.log(data.data.token);
          AsyncStorage.setItem("userId", data.data.userId);
          navigation.navigate("Login");
        }
        // Perform any necessary actions after successful login
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={logoHomie} />
      </View>

      <View style={styles.body}>
        <Text style={styles.h2}>Make an account</Text>

        {validation && (
          <Text style={styles.validation}>
            An error ocurred try a different email or password
          </Text>
        )}

        <TextInput
          style={[styles.input, { borderColor: color }]}
          placeholder="Fistname"
          onChangeText={(text) => setFirstname(text)}
          value={fistname}
        />

        <TextInput
          style={[styles.input, { borderColor: color }]}
          placeholder="Lastname"
          onChangeText={(text) => setLastname(text)}
          value={lastname}
        />

        <TextInput
          style={[styles.input, { borderColor: color }]}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />

        <TextInput
          style={[styles.input, { borderColor: color }]}
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
        />

        <TextInput
          style={[styles.input, { borderColor: color }]}
          placeholder="Confirm password"
          secureTextEntry
          onChangeText={(text) => setconfirmPassword(text)}
          value={confirmpassword}
        />

        <Text style={styles.forgotPw} onPress={() => console.log("hallo")}>
          Forget password
        </Text>

        <TouchableOpacity style={styles.login} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>

        <Text style={styles.noAcc}>
          Already have an account?{" "}
          <Text
            style={styles.noAccCPress}
            onPress={() => navigation.navigate("Login")}
          >
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
    width: "auto",
    backgroundColor: "#F9F9F9",
  },

  header: {
    backgroundColor: "#160635",
    height: 215,
    width: "100%",
  },

  logo: {
    width: 215,
    height: 66.25,
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: "auto",
    marginRight: "auto",
  },

  body: {
    marginLeft: "auto",
    marginRight: "auto",
    width: 400,
  },

  h2: {
    textAlign: "center",
    fontSize: 25,
    fontFamily: Moon,
    marginTop: 40,
    marginBottom: 40,
  },

  validation: {
    color: "#FF7A7A",
    fontSize: 16,
    paddingBottom: 10,
    marginTop: "-25px",
    textAlign: "center",
  },

  forgotPw: {
    color: "#D9B2EE",
    marginTop: 5,
    paddingLeft: 30,
  },

  input: {
    fontSize: 16,
    fontFamily: Novatica,
    placeholderTextColor: "#A5A5A5",
    backgroundColor: "white",

    marginBottom: 17,
    padding: 17,

    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,

    width: "342px",

    marginLeft: 26,
    marginRight: 26,
  },

  login: {
    textAlign: "center",
    backgroundColor: "#B900F4",
    borderRadius: 100,
    width: 200,

    paddingTop: 16,
    paddingRight: 66,
    paddingBottom: 16,
    paddingLeft: 66,

    marginTop: 40,
    marginLeft: "auto",
    marginRight: "auto",
  },

  buttonText: {
    fontSize: 20,
    color: "white",
  },

  noAcc: {
    color: "black",
    marginTop: 20,
    textAlign: "center",
  },

  noAccCPress: {
    color: "#D9B2EE",
  },
});
