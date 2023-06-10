import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import arrowLeft from "../../assets/icons/arrowLeft.svg";
import tasks from "../../assets/completed_tasks.svg";
import Task from "../../compontents/Task";
import AddTask from "./AddTask";

import MoonFont from "../../assets/fonts/Moon.otf";
import Novatica from "../../assets/fonts/Novatica-Bold.woff";
import Manrope from "../../assets/fonts/Manrope-Bold.ttf";

export default function FullCalenderScreen() {
  const navigation = useNavigation();

  // Define an array of tasks
  const tasksArray = [
    { description: "Task 1", image: require("../../assets/girl.jpg") },
    { description: "Task 2", image: require("../../assets/girl.jpg") },
    { description: "Task 3", image: require("../../assets/girl.jpg") },
    { description: "Task 4", image: require("../../assets/girl.jpg") },
  ];

  return (
    <View>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "85%",
              }}
            >
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={arrowLeft} style={{ width: 8, height: 15 }} />
              </TouchableOpacity>
              <Text
                style={{
                  color: "#fff",
                  fontFamily: "novaticaBold",
                  fontSize: 20,
                  textAlign: "center",
                  flex: 1, // Take up remaining space
                }}
              >
                All tasks
              </Text>
              <View style={{ width: 8, height: 15 }} />{" "}
              {/* Placeholder for spacing */}
            </View>

            <Image
              source={tasks}
              style={{ width: 110, height: 100, marginTop: 20 }}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate(AddTask)}
              style={[styles.button]}
            >
              <Text style={styles.buttonText}>Add a task</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.headingText}>Your tasks</Text>
        {tasksArray.map((task, index) => (
          <Task key={index} description={task.description} image={task.image} />
        ))}
      </View>
      <View>
        <Text style={styles.headingText}>All tasks</Text>
        {tasksArray.map((task, index) => (
          <Task key={index} description={task.description} image={task.image} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#160635",
    height: 292,
    paddingTop: 50,
  },
  headingText: {
    fontFamily: "moon",
    fontWeight: "bold",
    fontSize: 15,
    padding: 24,
    paddingBottom: 10,
  },

  button: {
    backgroundColor: "#B900F4",
    borderRadius: 55,
    width: 194,
    height: 50,
    alignItems: "center",
    justifyContent: "center", // Add this line
    marginTop: 20,
  },

  buttonText: {
    fontFamily: "moon",
    fontWeight: "bold",
    color: "#ffffff",
    fontSize: 14,
  },
});
