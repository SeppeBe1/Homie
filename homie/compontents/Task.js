import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import checkempty from "../assets/icons/Checkbox_empty.svg";

const Task = ({ description, image }) => {
  return (
    <View style={{ width: "100%" }}>
      <View style={styles.taskContainer}>
        <Image source={checkempty} style={styles.checkbox} />
        <Text style={styles.descriptionText}>{description}</Text>
        <Image source={image} style={styles.user} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    height: "40px",
    marginBottom: "8px",
    marginLeft: "24px",
    marginRight: "24px",
    justifyContent: "center",
  },
  checkbox: {
    width: 24,
    height: 24,
    marginLeft: 15,
  },
  descriptionText: {
    flex: 1,
    fontSize: 16,
    fontFamily: "manrope",
    marginLeft: 14,
  },
  user: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 15,
  },
  headingText: {
    fontFamily: "moon",
    fontWeight: "bold",
    fontSize: 15,
    padding: 24,
  },
});

export default Task;
