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
import AskRefund from "./AskRefund";
import * as Font from "expo-font";
import MoonFont from "../../assets/fonts/Moon.otf";
import Novatica from "../../assets/fonts/Novatica-Bold.woff";
import Manrope from "../../assets/fonts/Manrope-Bold.ttf";
import { useNavigation } from "@react-navigation/native";

import debtIcon from "../../assets/debtIcon.svg";
import searchIcon from "../../assets/icons/search.svg";
import arrowback from "../../assets/icons/Arrow_back.svg";
import furniture from "../../assets/categories/furniture.svg";
import furniture2 from "../../assets/categories/furniture2.svg";
import groceries from "../../assets/categories/groceries.svg";
import groceries2 from "../../assets/categories/groceries2.svg";
import trips from "../../assets/categories/trips.svg";
import trips2 from "../../assets/categories/trips2.svg";
import bliksem from "../../assets/categories/bliksem.svg";
import bliksem2 from "../../assets/categories/bliksem2.svg";
import gas from "../../assets/categories/gas.svg";
import gas2 from "../../assets/categories/gas2.svg";
import water from "../../assets/categories/water.svg";
import water2 from "../../assets/categories/water2.svg";
import mainte from "../../assets/categories/mainte.svg";
import mainte2 from "../../assets/categories/mainte2.svg";
import other from "../../assets/categories/other.svg";
import other2 from "../../assets/categories/other2.svg";
import add from "../../assets/icons/add.svg";

const loadFonts = async () => {
  await Font.loadAsync({
    moon: MoonFont,
    novatica: Novatica,
    manrope: Manrope,
  });
};



const SplitCosts = () => {

  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedCategoryImage, setSelectedCategoryImage] = useState(null);

  const handleCategoryPress = (category, imageSource) => {
    if (category === activeCategory) {
      setActiveCategory(null);
      setSelectedCategoryImage(null);
    } else {
      setActiveCategory(category);
      setSelectedCategoryImage(imageSource);
    }
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
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(AskRefund)}>
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
      <View style={{paddingHorizontal: 25, width: "100%", flexDirection: "row", alignItems: "center", marginTop: 10}}>
        <View style={{backgroundColor: "white", height: 45, width: 60, justifyContent: "center", alignItems: "center", borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}>
          <Image source={searchIcon} style={{ width: 22 , height: 22}}/>
        </View>
        <TextInput style={{width: "100%", backgroundColor: "white", height: "45px", borderTopRightRadius: 10, borderBottomRightRadius: 10, fontFamily: "manrope",
          fontWeight: "400",
          fontSize: 14,
          outlineColor: 'transparent',
          outlineStyle: 'none',}}
          placeholder="Enter the amount"
          placeholderTextColor="#A5A5A5"
        />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{flexDirection: 'row', marginTop: 25, paddingHorizontal: 15, flex:1}}>
          <View style={styles.categoriesContainer}>
            <TouchableOpacity  style={[styles.categories, activeCategory === 'furniture' && styles.activeCategory,]} onPress={() => handleCategoryPress('furniture')}>
              <Image source={activeCategory === 'furniture' ? furniture2 : furniture} style={{ width: 18, height: 21}} />
            </TouchableOpacity>
            <Text style={styles.categoriesText}>Furniture</Text>
          </View>
          <View style={styles.categoriesContainer}>
            <TouchableOpacity style={[styles.categories, activeCategory === 'groceries' && styles.activeCategory,]} onPress={() => handleCategoryPress('groceries')}>
              <Image source={activeCategory === 'groceries' ? groceries2 : groceries} style={{ width: 18.3, height: 18.3}}/>
            </TouchableOpacity>
            <Text style={styles.categoriesText}>Groceries</Text>
          </View>
          <View style={styles.categoriesContainer}> 
            <TouchableOpacity style={[styles.categories, activeCategory === 'trips' && styles.activeCategory,]} onPress={() => handleCategoryPress('trips')}>
              <Image source={activeCategory === 'trips' ? trips2 : trips} style={{ width: 24, height: 17}}/>
            </TouchableOpacity>
            <Text style={styles.categoriesText}>Trips</Text>
          </View>
          <View style={styles.categoriesContainer}> 
            <TouchableOpacity style={[styles.categories, activeCategory === 'bliksem' && styles.activeCategory,]} onPress={() => handleCategoryPress('bliksem')}>
              <Image source={activeCategory === 'bliksem' ? bliksem2 : bliksem} style={{ width: 14, height: 22}}/>
            </TouchableOpacity>
            <Text style={styles.categoriesText}>Electricity</Text>
          </View>
          <View style={styles.categoriesContainer}>
            <TouchableOpacity style={[styles.categories, activeCategory === 'gas' && styles.activeCategory,]} onPress={() => handleCategoryPress('gas')}>
              <Image source={activeCategory === 'gas' ? gas2 : gas} style={{ width: 18, height: 23}}/>
            </TouchableOpacity>
            <Text style={styles.categoriesText}>Gas</Text>
          </View>
          <View style={styles.categoriesContainer}>
            <TouchableOpacity style={[styles.categories, activeCategory === 'water' && styles.activeCategory,]} onPress={() => handleCategoryPress('water')}>
              <Image source={activeCategory === 'water' ? water2 : water} style={{ width: 16, height: 19.63}}/>
            </TouchableOpacity>
            <Text style={styles.categoriesText}>Water</Text>
          </View>
          <View style={styles.categoriesContainer}>
            <TouchableOpacity style={[styles.categories, activeCategory === 'mainte' && styles.activeCategory,]} onPress={() => handleCategoryPress('mainte')}>
              <Image source={activeCategory === 'mainte' ? mainte2 : mainte} style={{ width: 21, height: 21}}/>
            </TouchableOpacity>
            <Text style={styles.categoriesText}>Maintenance</Text>
          </View>
          <View style={styles.categoriesContainer}>
            <TouchableOpacity style={[styles.categories, activeCategory === 'other' && styles.activeCategory,]} onPress={() => handleCategoryPress('other')}>
              <Image source={activeCategory === 'other' ? other2 : other} style={{ width: 20, height: 4}}/>
            </TouchableOpacity>
            <Text style={styles.categoriesText}>Other</Text>
          </View>
        </View>
      </ScrollView>

      <View style={{flexDirection: "row", justifyContent: "space-between", alignItems:"center", paddingHorizontal: 25, marginTop: 20}}>
        <Text style={{fontSize: "0.875rem", fontFamily: "moon", fontWeight: "bold",}}>Transactions</Text>
        <TouchableOpacity style={{flexDirection: "row"}}>
          <Text style={{fontSize: "0.875rem", fontFamily: "manrope", fontWeight: "regular", color: "#939393", marginRight:7}}>Add spending</Text>
          <Image source={add} style={{width: 20, height: 20}}/>
        </TouchableOpacity>
      </View>

      <View style={{ width: "100%", paddingHorizontal: 25, marginTop: 15 }}>
        {selectedCategoryImage === null || selectedCategoryImage === furniture ? (
          <TouchableOpacity style={styles.transactionContainer}>
            <View style={styles.transaction}>
              <Image source={furniture} style={{ width: 18, height: 21 }} />
              <View style={styles.paidByWho}>
                <Text style={styles.payTitle}>TV Box</Text>
                <Text style={styles.payText}>Paid by Jade</Text>
              </View>
            </View>
            <Text style={styles.amount}>€20</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  payText: {
    fontFamily: "manrope",
    fontWeight: "regular",
    fontSize: 12,
  },
  payTitle: {
    fontFamily: "moon",
    fontWeight: "bold",
    fontSize: 14,
    color: "#160635",
  },
  amount: {
    marginRight: 20,
    fontFamily: "manrope",
    fontWeight: "bold",
    fontSize: 14,
  },
  paidByWho: {
    marginLeft: 10,
  },
  transaction: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
  },
  transactionContainer:{
    width: "100%", 
    backgroundColor: "white", 
    height: "53px", 
    borderRadius: 10,
    flexDirection:"row", 
    justifyContent:"space-between", 
    alignItems:"center",
  },
  activeCategory: {
    backgroundColor: '#F57ED4',
  },
  categoriesText: {
    fontFamily: "manrope",
    fontWeight: "500",
    fontSize: 12,
    color: "#160635",
    marginTop: 7,
  },
  categoriesContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  categories: {
    width: 55,
    height: 55,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: "#F57ED4",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15,
  },
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
