import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import navigation from "@react-navigation/native";
import logo from "../../assets/logo.png";
import logoHomie from "../../assets/logoHomie.svg";

import MoonFont from "../../assets/fonts/Moon.otf";
import Novatica from "../../assets/fonts/Novatica-Bold.woff";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [color, setColor] = useState("white");
  const [validation, setValidation] = useState(false);

  const Homename = "TabNavigator";

  const handleLogin = () => {
    // Perform login logic here, e.g., API calls, validation, etc.
    fetch("http://localhost:3000/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
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
          let token = data.data.token;
          AsyncStorage.setItem("token", token);
          navigation.navigate("TabNavigator", { screen: Homename });
        }
        // Perform any necessary actions after successful login
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });

    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={logoHomie} />
      </View>

      <View style={styles.body}>
        <Text style={styles.h2}>Login to your account</Text>

        {validation && (
          <Text style={styles.validation}>Username or password incorrect</Text>
        )}

        <TextInput
          style={[styles.input, { borderColor: color }]}
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />

        <TextInput
          style={[styles.input, { borderColor: color }]}
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
        />

        <Text style={styles.forgotPw} onPress={() => console.log("hallo")}>
          Forget password
        </Text>

        <TouchableOpacity style={styles.login} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>

        <Text style={styles.noAcc}>
          Don't have an account yet?{" "}
          <Text
            style={styles.noAccCPress}
            onPress={() => navigation.navigate("SignUp")}
          >
            Sign up
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    position: "relative",
    height: "100%",
    width: "100vw",
    backgroundColor: "#FAFAFA",
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
    fontFamily: MoonFont,
    marginTop: 60,
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
    marginTop: 10,
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

    width: "300",
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

    marginTop: 46,
    marginLeft: "auto",
    marginRight: "auto",
  },

  buttonText: {
    fontSize: 20,
    color: "white",
  },

  noAcc: {
    color: "black",
    marginTop: 150,
    textAlign: "center",
  },

  noAccCPress: {
    color: "#D9B2EE",
  },
});
