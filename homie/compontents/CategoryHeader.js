import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import arrowLeft from "../assets/icons/arrowLeft.svg";
import searchIcon from "../assets/icons/search.svg";
import { useNavigation } from "@react-navigation/native";

const CategoryHeader = ({ title, image }) => {
  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={arrowLeft} style={styles.arrowLeftIcon} />
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.contentContainer}>
          <Image
            source={{ uri: image }}
            style={styles.image}
            resizeMode="contain"
          />
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Search an invoice"
              style={styles.searchInput}
            />
            <TouchableOpacity onPress={() => {}}>
              <Image source={searchIcon} style={styles.searchIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#160635",
    height: 292,
    paddingTop: 57,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    marginLeft: 25,
  },
  arrowLeftIcon: {
    width: 8,
    height: 15,
  },
  title: {
    color: "#fff",
    fontFamily: "novaticaBold",
    fontSize: 20,
    textAlign: "center",
    flex: 1,
    marginLeft: 28,
  },
  contentContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  image: {
    marginTop: 19,
    width: "100%",
    height: undefined,
    aspectRatio: 4,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    height: 55,
    width: 342,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
});

export default CategoryHeader;
