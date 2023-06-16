import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    TextInput,
} from "react-native";
  
import React, { useState, useEffect, useRef } from "react";
import * as Font from "expo-font";
import MoonFont from "../../assets/fonts/Moon.otf";
import Novatica from "../../assets/fonts/Novatica-Bold.woff";
import Manrope from "../../assets/fonts/Manrope-Bold.ttf";
import { useNavigation } from "@react-navigation/native";
import DatePicker from 'react-native-datepicker';
import arrowDown from "../../assets/icons/arrowDown.svg";
import arrowUp from "../../assets/icons/arrowUp.svg";
import pf1 from "../../assets/pf1.png";
import pf2 from "../../assets/pf2.png";

import furniture from "../../assets/categories/furniture.svg";
import groceries from "../../assets/categories/groceries.svg";
import trips from "../../assets/categories/trips.svg";
import bliksem from "../../assets/categories/bliksem.svg";
import gas from "../../assets/categories/gas.svg";
import water from "../../assets/categories/water.svg";
import mainte from "../../assets/categories/mainte.svg";
import other from "../../assets/categories/other.svg";

const loadFonts = async () => {
    await Font.loadAsync({
        moon: MoonFont,
        novatica: Novatica,
        manrope: Manrope,
    });
};

const AddSpending = () => {

    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("Paid by");

    const [isDropdownVisible2, setIsDropdownVisible2] = useState(false);
    const [selectedStatus2, setSelectedStatus2] = useState("Shared by");

    const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
    };

    const toggleDropdown2 = () => {
        setIsDropdownVisible2(!isDropdownVisible2);
    };

    const handleStatusSelection = (status) => {
        setSelectedStatus(status);
        setIsDropdownVisible(false);
    };

    const handleStatusSelection2 = (status) => {
        setSelectedStatus2(status);
        setIsDropdownVisible2(false);
    };
      

    const datePickerRef = useRef(null);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const showDatePicker = () => {
        datePickerRef.current && datePickerRef.current.showPicker();
    };

    const navigation = useNavigation();
        useEffect(() => {
        loadFonts();
    }, []);

    return (
        <View>
            <View style={styles.headerContainer}>
                <View style={styles.title}>
                    <Text style={styles.h1}>Add payment</Text>
                </View>
                <View style={{marginTop:15, paddingHorizontal:25, width:"100%", position:"absolute", flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.navText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.navText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{marginTop: 25, paddingHorizontal: 25, position:"relative", zIndex:99}}>
                <TextInput style={styles.input}
                    placeholder="Title"
                    placeholderTextColor="#A5A5A5"
                />
                <View style={{flexDirection: "row"}}>
                    <TextInput style={styles.input2}
                        placeholder="Amount in euros"
                        placeholderTextColor="#A5A5A5"
                    />
                    <DatePicker
                        ref={datePickerRef}
                        style={{ width: 200 , backgroundColor:"white", height: "55px", borderRadius: 10, marginTop: 10, justifyContent:"center", alignItems:"center", borderWidth: 0}}
                        date={selectedDate}
                        mode="date"
                        format="YYYY-MM-DD"
                        onDateChange={handleDateChange}
                        showIcon={false}
                        borderWidth={0}
                    />
                </View>
                <View style={{position:"relative", zIndex:100}}>
                    <TouchableOpacity onPress={toggleDropdown} style={styles.input3}>
                        <Text style={{color: "#A5A5A5", fontFamily: "manrope", fontWeight: "regular", fontSize: 16}}>{selectedStatus}</Text>
                            {isDropdownVisible ? (
                            <Image source={arrowUp} style={{ width: 10, height: 6 }} />
                            ) : (
                            <Image source={arrowDown} style={{ width: 10, height: 6 }} />
                            )}
                    </TouchableOpacity>

                    {isDropdownVisible && (
                        <View style={{ position: "absolute", top: 25, right: 0, width: 200, backgroundColor: "#fff", borderRadius: 5, elevation: 3, zIndex: 99, flexDirection: "row", justifyContent: "center", alignItems: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4 }}>
                        <TouchableOpacity onPress={() => handleStatusSelection(<Image source={pf1} style={{ width: 40, height: 40, borderRadius: 50, marginRight: 10 }} />)} style={styles.dropdownItem}>
                          <Image source={pf1} style={{ width: 50, height: 50, borderRadius: 50, marginRight: 10 }} />
                        </TouchableOpacity>
                      
                        <TouchableOpacity onPress={() => handleStatusSelection(<Image source={pf2} style={{ width: 40, height: 40, borderRadius: 50, marginRight: 10 }} />)} style={styles.dropdownItem}>
                          <Image source={pf2} style={{ width: 50, height: 50, borderRadius: 50, marginRight: 10 }} />
                        </TouchableOpacity>
                      </View>
                    )}

                </View>
                <View style={{position:"relative", zIndex:99}}>
                    <TouchableOpacity onPress={toggleDropdown2} style={styles.input3}>
                        <Text style={{color: "#A5A5A5", fontFamily: "manrope", fontWeight: "regular", fontSize: 16}}>{selectedStatus2}</Text>
                            {isDropdownVisible2 ? (
                            <Image source={arrowUp} style={{ width: 10, height: 6 }} />
                            ) : (
                            <Image source={arrowDown} style={{ width: 10, height: 6 }} />
                            )}
                    </TouchableOpacity>
                    {isDropdownVisible2 && (
                    <View style={{ position: "absolute", top: 25, right: 0, width:150, backgroundColor: "#fff", borderRadius: 5, elevation: 3, zIndex: 99, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4 , padding: 15}}>
                        <View style={{flexDirection:"row", justifyContent: "center", alignItems: "center"}}>
                            <TouchableOpacity onPress={() => handleStatusSelection2(<View style={{width: 40, height: 40, flexDirection:"row", justifyContent: "center", alignItems: "center", borderWidth:2, borderRadius:999, borderColor:"#F57ED4", padding:0, marginRight: 10}}><Image source={furniture} style={{ width: 19, height: 22 }} /></View>)}>
                                <View style={{width: 50, height: 50, flexDirection:"row", justifyContent: "center", alignItems: "center", borderWidth:2.5, borderRadius:999, borderColor:"#F57ED4", padding:5, marginRight: 10}}>
                                    <Image source={furniture} style={{ width: 25, height: 28 }} />
                                </View>
                            </TouchableOpacity>
                        
                            <TouchableOpacity onPress={() => handleStatusSelection2(<View style={{width: 40, height: 40, flexDirection:"row", justifyContent: "center", alignItems: "center", borderWidth:2, borderRadius:999, borderColor:"#F57ED4", padding:0, marginRight: 10}}><Image source={groceries} style={{ width: 20, height: 21 }} /></View>)}>
                                <View style={{width: 50, height: 50, flexDirection:"row", justifyContent: "center", alignItems: "center", borderWidth:2.5, borderRadius:999, borderColor:"#F57ED4", padding:5, marginRight: 10}}>
                                    <Image source={groceries} style={{ width: 26, height: 27 }} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection:"row", justifyContent: "center", alignItems: "center", marginTop:10}}>
                            <TouchableOpacity onPress={() => handleStatusSelection2(<View style={{width: 40, height: 40, flexDirection:"row", justifyContent: "center", alignItems: "center", borderWidth:2, borderRadius:999, borderColor:"#F57ED4", padding:0, marginRight: 10}}><Image source={trips} style={{ width: 24, height: 17 }} /></View>)}>
                                <View style={{width: 50, height: 50, flexDirection:"row", justifyContent: "center", alignItems: "center", borderWidth:2.5, borderRadius:999, borderColor:"#F57ED4", padding:5, marginRight: 10}}>
                                    <Image source={trips} style={{ width: 27, height: 20 }} />
                                </View>
                            </TouchableOpacity>
                        
                            <TouchableOpacity onPress={() => handleStatusSelection2(<View style={{width: 40, height: 40, flexDirection:"row", justifyContent: "center", alignItems: "center", borderWidth:2, borderRadius:999, borderColor:"#F57ED4", padding:0, marginRight: 10}}><Image source={bliksem} style={{ width: 16, height: 24 }} /></View>)}>
                                <View style={{width: 50, height: 50, flexDirection:"row", justifyContent: "center", alignItems: "center", borderWidth:2.5, borderRadius:999, borderColor:"#F57ED4", padding:5, marginRight: 10}}>
                                    <Image source={bliksem} style={{ width: 20, height: 28 }} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection:"row", justifyContent: "center", alignItems: "center", marginTop:10}}>
                            <TouchableOpacity onPress={() => handleStatusSelection2(<View style={{width: 40, height: 40, flexDirection:"row", justifyContent: "center", alignItems: "center", borderWidth:2, borderRadius:999, borderColor:"#F57ED4", padding:0, marginRight: 10}}><Image source={gas} style={{ width: 17, height: 22 }} /></View>)}>
                                <View style={{width: 50, height: 50, flexDirection:"row", justifyContent: "center", alignItems: "center", borderWidth:2.5, borderRadius:999, borderColor:"#F57ED4", padding:5, marginRight: 10}}>
                                    <Image source={gas} style={{ width: 21, height: 26 }} />
                                </View>
                            </TouchableOpacity>
                        
                            <TouchableOpacity onPress={() => handleStatusSelection2(<View style={{width: 40, height: 40, flexDirection:"row", justifyContent: "center", alignItems: "center", borderWidth:2, borderRadius:999, borderColor:"#F57ED4", padding:0, marginRight: 10}}><Image source={water} style={{ width: 18, height: 22}} /></View>)}>
                                <View style={{width: 50, height: 50, flexDirection:"row", justifyContent: "center", alignItems: "center", borderWidth:2.5, borderRadius:999, borderColor:"#F57ED4", padding:5, marginRight: 10}}>
                                    <Image source={water} style={{ width: 22, height: 26 }} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection:"row", justifyContent: "center", alignItems: "center", marginTop:10}}>
                            <TouchableOpacity onPress={() => handleStatusSelection2(<View style={{width: 40, height: 40, flexDirection:"row", justifyContent: "center", alignItems: "center", borderWidth:2, borderRadius:999, borderColor:"#F57ED4", padding:0, marginRight: 10}}><Image source={mainte} style={{ width: 19, height: 19}} /></View>)}>
                                <View style={{width: 50, height: 50, flexDirection:"row", justifyContent: "center", alignItems: "center", borderWidth:2.5, borderRadius:999, borderColor:"#F57ED4", padding:5, marginRight: 10}}>
                                    <Image source={mainte} style={{ width: 24, height: 24 }} />
                                </View>
                            </TouchableOpacity>
                        
                            <TouchableOpacity onPress={() => handleStatusSelection2(<View style={{width: 40, height: 40, flexDirection:"row", justifyContent: "center", alignItems: "center", borderWidth:2, borderRadius:999, borderColor:"#F57ED4", padding:0, marginRight: 10}}><Image source={other} style={{ width: 19, height: 4}} /></View>)}>
                                <View style={{width: 50, height: 50, flexDirection:"row", justifyContent: "center", alignItems: "center", borderWidth:2.5, borderRadius:999, borderColor:"#F57ED4", padding:5, marginRight: 10}}>
                                    <Image source={other} style={{ width: 22, height: 4 }} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    )}
                </View>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: "40px", position: "relative", paddingHorizontal:25 }}>
                <Text style={{ fontSize: 14, fontFamily: "moon", fontWeight: "bold" }}>Shared by which homies</Text>
            </View>
            <View style={{paddingHorizontal:25}}>
                <View style={styles.input3}>
                    <View style={{flexDirection:"row", alignItems:"center"}}>
                        <Image source={pf1} style={{ width: 40, height: 40, borderRadius: 50, marginRight: 10 }} />
                        <Text style={{color: "#A5A5A5", fontFamily: "manrope", fontWeight: "regular", fontSize: 16}}>Yanelle</Text>
                    </View>
                    <View style={{flexDirection:"row", alignItems:"center"}}> 
                        <Text style={{paddingRight:25,color: "#160635", fontFamily: "novatica", fontWeight: "bold", fontSize: 14, textDecorationLine:"underline"}}>0%</Text>
                        <Text style={{color: "#160635", fontFamily: "novatica", fontWeight: "bold", fontSize: 14, textDecorationLine:"underline"}}>€0,00</Text>
                    </View>
                </View>
                <View style={styles.input3}>
                    <View style={{flexDirection:"row", alignItems:"center"}}>
                        <Image source={pf2} style={{ width: 40, height: 40, borderRadius: 50, marginRight: 10 }} />
                        <Text style={{color: "#A5A5A5", fontFamily: "manrope", fontWeight: "regular", fontSize: 16}}>Jade</Text>
                    </View>
                    <View style={{flexDirection:"row", alignItems:"center"}}> 
                        <Text style={{paddingRight:25,color: "#160635", fontFamily: "novatica", fontWeight: "bold", fontSize: 14, textDecorationLine:"underline"}}>0%</Text>
                        <Text style={{color: "#160635", fontFamily: "novatica", fontWeight: "bold", fontSize: 14, textDecorationLine:"underline"}}>€0,00</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    dropdownItem: {
        paddingVertical: 10,
    },
    input3: {
        width: "100%", 
        backgroundColor: "white", 
        height: "55px", 
        borderRadius: 10, 
        fontFamily: "manrope",
        fontWeight: "regular",
        fontSize: 16,
        outlineColor: 'transparent',
        outlineStyle: 'none', 
        paddingLeft: 20,
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: 20,
    },
    input2: {
        width: "100%", 
        backgroundColor: "white", 
        height: "55px", 
        borderRadius: 10, 
        fontFamily: "manrope",
        fontWeight: "regular",
        fontSize: 16,
        outlineColor: 'transparent',
        outlineStyle: 'none', 
        paddingLeft: 20,
        marginRight: "11px",
        marginTop: 10,
    },
    input: {
        width: "100%", 
        backgroundColor: "white", 
        height: "55px", 
        borderRadius: 10, 
        fontFamily: "manrope",
        fontWeight: "regular",
        fontSize: 16,
        outlineColor: 'transparent',
        outlineStyle: 'none', 
        paddingLeft: 20,
        marginTop: 10,
    },
    navText: {
        fontFamily: "moon",
        fontSize: 16,
        color: "white",
        fontWeight: "bold",
    },
    headerContainer: {
        width: "100%",
        height: "140px",
        backgroundColor: "#160635",
        position: "relative",
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

export default AddSpending;
