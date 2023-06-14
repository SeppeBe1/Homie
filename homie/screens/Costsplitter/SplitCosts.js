import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Modal,
  Button,
} from "react-native";

import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import MoonFont from "../../assets/fonts/Moon.otf";
import Novatica from "../../assets/fonts/Novatica-Bold.woff";
import Manrope from "../../assets/fonts/Manrope-Bold.ttf";
import { useNavigation } from "@react-navigation/native";

import debtIcon from "../../assets/debtIcon.svg";
import arrowback from "../../assets/icons/Arrow_back.svg";

const loadFonts = async () => {
  await Font.loadAsync({
    moon: MoonFont,
    novatica: Novatica,
    manrope: Manrope,
  });
};


const SplitCosts = () => {
  const navigation = useNavigation();
  useEffect(() => {
    loadFonts();
  }, []);

  return (
    <View style={{ flex: 1}}>
      <View style={styles.headerContainer}>
        <View style={styles.title}>
          <TouchableOpacity style={{marginLeft: 10}} onPress={() => navigation.goBack()}>
            <Image
              source={arrowback}
              style={{ width: 8, height: 15}}
            />
          </TouchableOpacity>
          <Text style={styles.h1}>Cost splitter</Text>
        </View>
        <View style={styles.debtContainer}>
          <Image
            source={debtIcon}
            style={{ width: 48, height: 48}}
          />
          <View style={styles.debtTextContainer}>
            <Text style={styles.debtText}>You are still</Text>
            <Text style={styles.debtCost}> $40</Text>
            <Text style={styles.debtText}> in debt</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Pay off debts</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.debtShowContainer}>
            <View style={styles.debtShow}>
              <Text style={styles.showAmount}>$320</Text>
              <Text style={styles.showText}>My total spendings</Text>
            </View>
            <View style={styles.debtShow}>
              <Text style={styles.showAmount}>$1250</Text>
              <Text style={styles.showText}>House total spendings</Text>
            </View>
          </View>
        </View>
      </View>
      <View>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 200,
    height: 50,
    borderRadius: 30,
    backgroundColor: "#B900F4",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontFamily: "moon",
    fontWeight: "bold",
    fontSize: 18,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 18,
  },
  headerContainer: {
    width: "100%",
    height: "370px",
    backgroundColor: "#160635",
  },
  title: {
    flexDirection: "row",
    width: "100%",
    position: "relative",
    paddingTop: 55,
    paddingHorizontal: 25,
  },
  h1: {
    fontFamily: "novatica",
    fontWeight: "700",
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    position: "absolute", 
    left:"50%", 
    transform: "translateX(-50%)",
  },
  debtContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 35,
  },
  debtTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  debtText: {
    fontFamily: "novatica",
    fontWeight: "700",
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  debtCost: {
    fontFamily: "novatica",
    fontWeight: "700",
    fontSize: 17,
    fontWeight: "bold",
    color: "#3BEDBF",
    textTransform: "uppercase",
  },
  debtShowContainer: {
    flexDirection: "row",
  },
  debtShow: {
    width: "160px",
    height: "55px",
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 20,
  },
  showText: {
    fontFamily: "manrope",
    fontWeight: "400",
    fontSize: 12,
    color: "#160635",
  },
  showAmount: {
    fontFamily: "moon",
    fontWeight: "700",
    fontSize: 20,
    color: "#160635",
  },
});

export default SplitCosts;
