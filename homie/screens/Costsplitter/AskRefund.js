import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    TextInput,
  } from "react-native";
  
  import React, { useState, useEffect } from "react";
  import * as Font from "expo-font";
  import MoonFont from "../../assets/fonts/Moon.otf";
  import Novatica from "../../assets/fonts/Novatica-Bold.woff";
  import Manrope from "../../assets/fonts/Manrope-Bold.ttf";
  import { useNavigation } from "@react-navigation/native";
  import arrowback from "../../assets/icons/Arrow_back.svg";

const loadFonts = async () => {
    await Font.loadAsync({
        moon: MoonFont,
        novatica: Novatica,
        manrope: Manrope,
    });
};

const AskRefund = () => {

    const navigation = useNavigation();
        useEffect(() => {
        loadFonts();
    }, []);

    return (
        <View style={styles.headerContainer}>
            <View style={styles.title}>
                <TouchableOpacity style={{marginLeft: 10}} onPress={() => navigation.goBack()}>
                    <Image
                    source={arrowback}
                    style={{ width: 8, height: 15}}
                    />
                </TouchableOpacity>
                <Text style={styles.h1}>Ask refund</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        width: "100%",
        height: "140px",
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
});

export default AskRefund;
