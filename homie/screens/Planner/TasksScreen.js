import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import arrowLeft from "../../assets/icons/arrowLeft.svg";
import tasks from "../../assets/completed_tasks.svg";
import Task from "../../compontents/Task";
import AddTask from "./AddTask";
import image from "../../assets/boy.jpg";
import checkempty from "../../assets/icons/Checkbox_empty.svg";
import checkbox from "../../assets/icons/Checkbox_empty.svg";
import checkBlue from "../../assets/icons/check_blue.svg";

import AsyncStorage from "@react-native-async-storage/async-storage";

import MoonFont from "../../assets/fonts/Moon.otf";
import Novatica from "../../assets/fonts/Novatica-Bold.woff";
import Manrope from "../../assets/fonts/Manrope-Bold.ttf";

export default function FullCalenderScreen() {
  const navigation = useNavigation();
  const [residentsData, setResidentsData] = useState([]);
  const [creatorId, setCreatorId] = useState([]);
  const [isChanged, setIsChanged] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [isParticipant, setIsParticipant] = useState(false);
  const [activity, setActivity] = useState("");
  const [checkedTasks, setCheckedTasks] = useState([]);

  useEffect(() => {
    getAnnouncement();
  }, [isChanged]);

  const handleTaskCheck = (taskId) => {
    if (checkedTasks.includes(taskId)) {
      setCheckedTasks(checkedTasks.filter((id) => id !== taskId));
    } else {
      setCheckedTasks([...checkedTasks, taskId]);
    }
  };

  const getAnnouncement = async () => {
    const token = await AsyncStorage.getItem("token");
    const houseId = await AsyncStorage.getItem("houseId");
    console.log(token);

    if (houseId) {
      fetch(`http://localhost:3000/api/v1/anouncement/${houseId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            const fetchedAnnouncements = data.result.map((announcement) => {
              const item = { ...announcement };
              item.datePlanned = new Date(item.datePlanned);
              return item;
            });

            console.log(fetchedAnnouncements);
            setAnnouncements(fetchedAnnouncements);
          } else if (data.status === "failed") {
            console.log(data.result);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log("kaas");
    }
  };

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
              <TouchableOpacity onPress={() => navigation.navigate("Calendar")}>
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
        {announcements.filter((item) => item.type === "Task").length === 0 ? (
          <Text style={styles.nothingFound}>No tasks found!</Text>
        ) : (
          <FlatList
            keyExtractor={(item) => item._id}
            data={announcements.filter((item) => item.type === "Task")} // Filter announcements by type "event"
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  key={item._id}
                  onPress={() => handleTaskCheck(item._id)}
                  style={{ marginVertical: 5 }}
                >
                  <View style={{ width: "100%" }}>
                    <View style={styles.taskContainer}>
                      <Image
                        source={
                          checkedTasks.includes(item._id) ? checkBlue : checkbox
                        }
                        style={{ width: 16, height: 16, marginLeft: 15 }}
                      />
                      <Text
                        style={{
                          fontFamily: "manrope",
                          flex: 1,
                          fontSize: 16,
                          marginLeft: 14,
                          textDecorationLine: checkedTasks.includes(item._id)
                            ? "line-through"
                            : "none",
                        }}
                      >
                        {item.activity}
                      </Text>
                      <Image source={image} style={styles.user} />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>

      <View>
        <Text style={styles.headingText}>All tasks</Text>
        {announcements.filter((item) => item.type === "Task").length === 0 ? (
          <Text style={styles.nothingFound}>No tasks found!</Text>
        ) : (
          <FlatList
            keyExtractor={(item) => item._id}
            data={announcements.filter((item) => item.type === "Task")} // Filter announcements by type "event"
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  key={item._id}
                  onPress={() => handleTaskCheck(item._id)}
                  style={{ marginVertical: 5 }}
                >
                  <View style={{ width: "100%" }}>
                    <View style={styles.taskContainer}>
                      <Image
                        source={
                          checkedTasks.includes(item._id) ? checkBlue : checkbox
                        }
                        style={{ width: 16, height: 16, marginLeft: 15 }}
                      />
                      <Text
                        style={{
                          fontFamily: "manrope",
                          flex: 1,
                          fontSize: 16,
                          marginLeft: 14,
                          textDecorationLine: checkedTasks.includes(item._id)
                            ? "line-through"
                            : "none",
                        }}
                      >
                        {item.activity}
                      </Text>
                      <Image source={image} style={styles.user} />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>
    </View>
    // {announcements.length === 0 ? (
    //   <Text style={styles.nothingFound}>No tasks found</Text>
    // ) : (
    //   <FlatList
    //     keyExtractor={(item) => item._id}
    //     data={announcements.filter((item) => item.type === "Task")} // Filter announcements by type "event"
    //     renderItem={({ item }) => {
    //       return (
    //         <TouchableOpacity
    //           key={(item._id)}
    //           onPress={() => togglePopup(item._id)}
    //           style={{ marginVertical: 5 }}
    //         >
    //           <View style={{ width: "100%" }}>
    //           <View style={styles.taskContainer}>
    //             <Image source={checkempty} style={styles.checkbox} />
    //             <Text style={styles.descriptionText}>{item.activity}</Text>
    //             <Image source={image} style={styles.user} />
    //           </View>
    //         </View>
    //       </TouchableOpacity>
    //       );
    //     }}
    //   />
    // )}
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
    marginHorizontal: 10,
  },
  headingText: {
    fontFamily: "moon",
    fontWeight: "bold",
    fontSize: 15,
    padding: 24,
  },
  nothingFound: {
    marginLeft: "24px",
  },
});
