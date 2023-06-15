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
  import alarm from "../../assets/icons/alarm.svg";
  import arrow from "../../assets/arrow.svg";
  import pf1 from "../../assets/pf1.png";
  import pf2 from "../../assets/pf2.png";
  import arrowDown from "../../assets/icons/arrowDown.svg";
import arrowUp from "../../assets/icons/arrowUp.svg";   

const loadFonts = async () => {
    await Font.loadAsync({
        moon: MoonFont,
        novatica: Novatica,
        manrope: Manrope,
    });
};

const AskRefund = () => {

    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('Newest');

    const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
    };

    const handleStatusSelection = (status) => {
    setSelectedStatus(status);
    setIsDropdownVisible(false);
    };

    const navigation = useNavigation();
        useEffect(() => {
        loadFonts();
    }, []);

    return (
        <View>
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
            <View style={{paddingHorizontal: 25}}>
                <View style={{backgroundColor: "white", height: "162px", width: "100%", borderRadius: 10, marginTop: "38px", position:"relative"}}>
                    <TouchableOpacity style={{flexDirection:"row", alignItems: "center", marginTop: "12px", marginLeft: "12px"}}>
                        <Image source={alarm} style={{width:26, height:26}} />
                        <Text style={{fontFamily: "manrope", fontWeight: "regular", fontSize: 12, color: "#160635", marginLeft: "7px"}}>Ring the bell for a refund request</Text>
                    </TouchableOpacity>
                    <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center", marginHorizontal:25, marginTop:25}}>
                        <View style={styles.nameContainer}>
                            <Image source={pf1} style={{width:50, height:50}}/>
                            <Text style={styles.name}>Yanelle</Text>
                        </View>
                        <Image source={arrow} style={{width:250, height:13}}/>
                        <View style={styles.nameContainer}>
                            <Image source={pf2} style={{width:50, height:50}}/>
                            <Text style={styles.name}>Me</Text>
                        </View>
                    </View>
                    <Text style={{position:"absolute", left:"50%", top:"65px", transform: "translateX(-50%)", fontFamily:"moon", fontWeight:"bold", fontSize:20, color:"#3BEDBF"}}>$30</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 20, position: "relative", zIndex:99 }}>
                    <Text style={{ fontSize: 14, fontFamily: "moon", fontWeight: "bold" }}>History</Text>
                    <TouchableOpacity onPress={toggleDropdown} style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={{ fontSize: 14, fontFamily: "manrope", fontWeight: "regular", color: "#939393", marginRight: 7 }}>{selectedStatus}</Text>
                        {isDropdownVisible ? (
                        <Image source={arrowUp} style={{ width: 10, height: 6 }} />
                        ) : (
                        <Image source={arrowDown} style={{ width: 10, height: 6 }} />
                        )}
                    </TouchableOpacity>
                    {isDropdownVisible && (
                        <View style={{ position: "absolute", top: 25, right: 0, width: 80, backgroundColor: "#fff", borderRadius: 5, elevation: 3, zIndex:99, justifyContent: "center", alignItems: "center" }}>
                            <TouchableOpacity onPress={() => handleStatusSelection('Newest')} style={styles.dropdownItem}>
                                <Text style={styles.dropdownText}>Newest</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleStatusSelection('Oldest')} style={styles.dropdownItem}>
                                <Text style={styles.dropdownText}>Oldest</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleStatusSelection('Refunds')} style={styles.dropdownItem}>
                                <Text style={styles.dropdownText}>Refunds</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleStatusSelection('Debts')} style={styles.dropdownItem}>
                                <Text style={styles.dropdownText}>Debts</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                <View>
                    <View style={styles.transactions}>
                        <View style={styles.transactionContainer}>
                            <Image source={pf1} style={{width:40, height:40}}/>
                            <View style={styles.container}>
                                <Text style={styles.transactionTitle}>To Yanelle</Text>
                                <Text style={styles.date}>04/12/2021</Text>
                            </View>
                        </View>
                        <Text style={styles.amount}>-$30</Text>
                    </View>
                </View>
            </View>
        </View>
        
    );
};

const styles = StyleSheet.create({
    amount:{
        fontFamily: "manrope",
        fontWeight: "bold",
        fontSize: "15px",
        color: "#FF7A7A",
    },
    date:{
        fontFamily: "manrope",
        fontWeight: "light",
        fontSize: "10px",
    },
    transactionTitle: {
        fontFamily: "manrope",
        fontWeight: "bold",
        fontSize: "14px",
        color: "#160635",
    },
    container: {
        marginLeft: 10,
    },
    transactionContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    transactions: {
        width: "100%", 
        height:"60px", 
        backgroundColor:"white", 
        borderRadius: 10, 
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 25,
    },
    dropdownText: {
        fontFamily: "manrope",
        fontWeight: "regular",
        fontSize: "0.875rem",
        color: "#939393",
    },
    dropdownItem: {
        paddingVertical: 5,
    },
    nameContainer:{
        alignItems: "center",
        justifyContent: "center",
    },
    name:{
        fontFamily: "manrope",
        fontWeight: "light",
        fontSize: 13,
        marginTop: 5,
    },
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
