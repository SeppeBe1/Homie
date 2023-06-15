import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const SaveAndCancel = ({ navigation, title, destination, fileInfo }) => {
  return (
    <View style={styles.header}>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={styles.emptyIcon} />
    </View>
  );
};

const styles = {
  header: {
    backgroundColor: "#160635",
    alignItems: "center",
    zIndex: 1,
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 20,
  },
  buttonText: {
    color: "white",
    fontFamily: "moon",
    fontSize: 14,
  },
  headerTitle: {
    color: "#fff",
    fontFamily: "novaticaBold",
    fontSize: 20,
    paddingBottom: 40,
  },
  emptyIcon: {
    width: 8,
    height: 15,
    zIndex: 3,
  },
};

export default SaveAndCancel;
