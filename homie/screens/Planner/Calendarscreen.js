import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import MoonFont from "../../assets/fonts/Moon.otf";
import Novatica from "../../assets/fonts/Novatica-Bold.woff";
import Manrope from "../../assets/fonts/Manrope-Bold.ttf";
//import EventItem from "../../compontents/EventItem";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  FlatList
} from "react-native";

import checkbox from "../../assets/icons/Checkbox_empty.svg";
import arrowright from "../../assets/icons/Arrow-Right.svg";
import crossIcon from "../../assets/icons/close.svg";
import girl from "../../assets/girl.jpg";
import boy from "../../assets/boy.jpg";
import AddTask from "./AddTask";
import AddEvent from "./AddEvent";
import checkBlue from "../../assets/icons/check_blue.svg";

import AsyncStorage from '@react-native-async-storage/async-storage';


// Load the font
const loadFonts = async () => {
  await Font.loadAsync({
    moon: MoonFont,
    novatica: Novatica,
    manrope: Manrope,
  });
};

/*const europeanDate = "15-06-2023"; // Example date in European notation
const dateObj = new Date(europeanDate);

// Store the date in MongoDB
db.collection.insertOne({ date: dateObj });

// Retrieving a date and formatting it in the European date notation: dd-mm-yyyy
const document = db.collection.findOne({});*/

// Format the date in the European date notation
//const formattedDate = document.date.toLocaleDateString("en-GB");

//console.log(formattedDate); // Output: 15-06-2023


export default function Homescreen({ navigation }) {
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const today = new Date();
  const currentDate = new Date();
  const [residentsData, setResidentsData] = useState([]);
  const [creatorId, setCreatorId]= useState([]);
  const [firstname, setFirstname] = useState([]);
  const [lastname, setLastname] = useState([]);
  const [isChanged, setIsChanged] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [announcements, setAnnouncements] = useState([]);
  const [eventName, setEventname] = useState("");
  const [datePlanned, setDatePlanned] = useState("");
  const [dateCreated, setDateCreated] = useState("");
  const [location, setLocation] = useState("");
  const [hour, setHour] = useState("");

  const loadFonts = async () => {
    try {
      await Font.loadAsync({
        moon: require("../assets/fonts/Moon.otf"),
        manrope: require("../assets/fonts/Manrope.ttf"),
        novatica: require("../assets/fonts/Novatica.ttf"),
        novaticaBold: require("../assets/fonts/Novatica-Bold.ttf"),
      });
      setFontsLoaded(true);
    } catch (error) {
      console.error("Error loading fonts:", error);
    }
  };


  useEffect(() => {
     loadFonts();

       getUser();
      // getHouse();
      getAnnouncement(); 
  }, [isChanged]);

  const handleDeleteItem = (itemId) => {
    setAnnouncements((prevAnnouncements) =>
      prevAnnouncements.filter((item) => item._id !== itemId)
    );
  };
  
  const handleInputChange = (text) => {
    setInputValue(text);
  };

  const options = {
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };

  const formattedDate = currentDate.toLocaleString("nl-NL", options).replace("om", "-");;
  
  const getUser = async () => {
    const userId = await AsyncStorage.getItem('userId');
    const houseId = await AsyncStorage.getItem("houseId");

    fetch(`http://localhost:3000/api/v1/users/${userId}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      }
      })
      .then(response => response.json())
      .then(data => {        
          if(data.status == "failed"){
            console.log(data.status);
          } else if(data.status == "succes"){
            setFirstname(data.data.firstname);
            setLastname(data.data.lastname);
            AsyncStorage.setItem('houseId', data.data.houseId);
            const fetchedResidents = data.result;
            const updatedResidentsData = fetchedResidents.map((resident) => ({
            firstname: resident.firstname,
            lastname: resident.lastname,
          }));
          setResidentsData(updatedResidentsData);
          }
      })
      .catch(error => {
          console.error(error);
      });
  }

const getAnnouncement = async () => {
  const token = await AsyncStorage.getItem('token');
  const houseId = await AsyncStorage.getItem('houseId');
  console.log(token);

  if (houseId) {
    fetch(`http://localhost:3000/api/v1/anouncement/${houseId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          const fetchedAnnouncements = data.result.map(announcement => {
          const item = { ...announcement }; 
            item.datePlanned = new Date(item.datePlanned);
            return item;
          });

          console.log(fetchedAnnouncements);
          setAnnouncements(fetchedAnnouncements);
        } else if (data.status === 'failed') {
          console.log(data.result);
        }
      })
      .catch(error => {
        console.error(error);
      });
  } else {
    console.log('kaas');
  }
};
  const startOfWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - ((today.getDay() + 6) % 7)
  );

  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [checkedTasks, setCheckedTasks] = useState([]);

  useEffect(() => {
    loadFonts();
  }, []);

  const togglePopUp = () => {
    setIsPopUpVisible(!isPopUpVisible);
  };
  

  const handleEventPress = (event) => {
    navigation.navigate("EventDetails", { event });
  };
  const handleTaskCheck = (taskId) => {
    if (checkedTasks.includes(taskId)) {
      setCheckedTasks(checkedTasks.filter((id) => id !== taskId));
    } else {
      setCheckedTasks([...checkedTasks, taskId]);
    }
  };

  return (
    <View style={{ backgroundColor: "#F5F5F5" }}>
      <View style={styles.container}>
        <View>
          <Text style={styles.heading}>Planner</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.h3}>
            {startOfWeek.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("FullCalenderScreen")}
          >
            <Text style={styles.buttonText}>See full calendar</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal={true}>
          <View style={styles.weekcalender}>
            {weekdays.map((weekday, index) => {
              const dayNumber = startOfWeek.getDate() + index;
              const date = new Date(
                startOfWeek.getFullYear(),
                startOfWeek.getMonth(),
                dayNumber
              );
              const isLastDayOfMonth =
                dayNumber >
                new Date(
                  startOfWeek.getFullYear(),
                  startOfWeek.getMonth() + 1,
                  0
                ).getDate();

              if (isLastDayOfMonth) {
                startOfWeek.setMonth(startOfWeek.getMonth() + 1);
                startOfWeek.setDate(1);
              }

              const newDayNumber = isLastDayOfMonth ? 1 : dayNumber;
              const isToday =
                newDayNumber === today.getDate() &&
                startOfWeek.getMonth() === today.getMonth() &&
                startOfWeek.getFullYear() === today.getFullYear();

              return (
                <View
                  key={weekday}
                  style={[styles.day, isToday && styles.today]}
                >
                  <Text
                    style={[styles.darkpurple, isToday && styles.todayText]}
                  >
                    {newDayNumber}
                  </Text>
                  <Text
                    style={[styles.darkpurple, isToday && styles.todayText]}
                  >
                    {weekday}
                  </Text>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
      <View style={styles.todo}>
        <Text style={styles.h3black}>Your today tasks and events</Text>
        {announcements.length === 0 ? (
        <Text>You're free today!</Text>
      ) : (
        <FlatList
          keyExtractor={(item) => item._id}
          data={announcements.filter(
            (item) =>
            {
              const today = new Date();
              const itemDate = new Date(item.datePlanned);
              return (
                (item.type === 'Task' || item.type === 'Event') &&
                itemDate.toDateString() === today.toDateString()
              );
            }
            
          )}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                key={(item._id)}
                onPress={() => togglePopup(item._id)}
                style={{ marginVertical: 5 }}
              >
                <View key={item._id} style={styles.tasks}>
            <TouchableOpacity onPress={() => handleTaskCheck(item._id)}>
              <Image
                source={checkedTasks.includes(item._id) ? checkBlue : checkbox}
                style={{ width: 16, height: 16 }}
              />
            </TouchableOpacity>
            <View>
              <Text
                style={{
                  fontFamily: "manrope",
                  fontSize: 14,
                  textDecorationLine: checkedTasks.includes(item._id)
                    ? "line-through"
                    : "none",
                }}
              >
                {item.activity}
              </Text>
            </View>
          </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
      </View>
      <View style={{ marginTop: 20, paddingHorizontal: 24 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.h2}> Upcoming events </Text>
          <TouchableOpacity
            style={styles.link}
            onPress={() => navigation.navigate("EventsScreen")}
          >
            <Text style={styles.linkText}>All events</Text>
            <Image source={arrowright} style={{ width: 10, height: 6 }} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          marginTop: 8,
        }}
      >
        {announcements.filter((item) => item.type === "Event").length === 0 ? (
          <Text style={styles.nothingFound}>No events found!</Text>
        ) : (
          <FlatList
            keyExtractor={(item) => item._id}
            data={announcements.filter((item) => item.type === "Event")} 
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  key={item._id}
                  onPress={() => handleEventPress(item)}
                  style={{ marginVertical: 5 }}
                >
                  <View
                    style={{
                      marginHorizontal: 24,
                      display: "flex",
                      flexDirection: "row",
                      backgroundColor: "white",
                      paddingHorizontal: 11,
                      paddingVertical: 8,
                      borderRadius: 10,
                      alignItems: "flex-end",
                      gap: 29,
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Text style={{ fontFamily: "novatica", fontWeight: "bold", fontSize: 20 }}>
                      {new Date(item.datePlanned).getDate()}
                    </Text>
                    <Text>
                      {new Date(item.datePlanned).toLocaleString("default", { month: "short" })}
                    </Text>
                      <Text
                        style={{
                          fontFamily: "novatica",
                          fontWeight: "bold",
                          fontSize: 10,
                        }}
                      >
                        {item.month}
                      </Text>
                    </View>
                    <Text style={styles.h3black}>{item.eventName}</Text>
                    {/* <Image
                      source={item.image}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 24,
                        alignSelf: "flex-end",
                        marginLeft: "auto",
                      }}
                    /> */}
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>
      <View style={{ marginTop: 20, paddingHorizontal: 24 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.h2}> Upcoming tasks </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("TasksScreen")}
            style={styles.link}
          >
            <Text style={styles.linkText}>All tasks</Text>
            <Image source={arrowright} style={{ width: 10, height: 6 }} />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          marginTop: 8,
        }}
      >  
      {announcements.filter((item) => item.type === "Task").length === 0 ? (

        <Text style={styles.nothingFound}>No tasks found!</Text>
      ) : (
        <FlatList
          keyExtractor={(item) => item._id}
          data={announcements.filter((item) => item.type === "Task")} // Filter announcements by type "event"
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                key={(item._id)}
                onPress={togglePopUp}
                style={{ marginVertical: 5 }}
              >
                <View
                  style={{
                    marginHorizontal: 24,
                    display: "flex",
                    flexDirection: "row",
                    backgroundColor: "white",
                    paddingHorizontal: 11,
                    paddingVertical: 8,
                    borderRadius: 10,
                    alignItems: "flex-end",
                    gap: 29,
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Text style={{ fontFamily: "novatica", fontWeight: "bold", fontSize: 20 }}>
                    {new Date(item.datePlanned).getDate()}
                  </Text>
                  <Text>
                    {new Date(item.datePlanned).toLocaleString("default", { month: "short" })}
                  </Text>
                    <Text
                      style={{
                        fontFamily: "novatica",
                        fontWeight: "bold",
                        fontSize: 10,
                      }}
                    >
                      {item.month}
                    </Text>
                  </View>
                  <Text style={styles.h3black}>{item.activity}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
      </View>

      <Modal visible={isPopUpVisible} animationType="fade" transparent>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(22, 6, 53, 0.5)",
          }}
          onPress={togglePopUp}
        >
          <View
            style={{
              backgroundColor: "white",
              width: 342,
              height: 325,
              borderRadius: 10,
              textAlign: "center",
              padding: 65,
            }}
          >
            <TouchableOpacity
              style={{ position: "absolute", top: 16, right: 16 }}
              onPress={togglePopUp}
            >
              <Image source={crossIcon} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
            <View style={styles.popupText}>
              <View style={{ flex: 1, flexDirection: "column" }}>
                <Text
                  style={{
                    fontFamily: "novatica",
                    fontWeight: "bold",
                    fontSize: 40,
                    color: "#160635",
                  }}
                >
                  14
                </Text>
                <Text
                  style={{
                    fontFamily: "novatica",
                    fontSize: 20,
                    color: "#160635",
                  }}
                >
                  Dec
                </Text>
              </View>

              <Text
                style={{
                  fontFamily: "moon",
                  fontWeight: "bold",
                  fontSize: 13,
                  color: "#160635",
                }}
              >
                Taking out the dustbin
              </Text>
              <Text
                style={{
                  fontFamily: "manrope",
                  fontSize: 13,
                  color: "black",
                }}
              >
                "Both the PMD bag, residual waste bag and GFT bin have to be put
                outside. You can put it outside from 8pm. Don't forget!"
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      <View style={{ display: "flex", flexDirection: "row", margin: 24 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("AddTask")}
          style={[styles.button, { flex: 1, marginRight: 16 }]}
        >
          <Text style={styles.buttonText}>Add task</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("AddEvent")}
          style={[styles.button, { flex: 1 }]}
        >
          <Text style={styles.buttonText}>Add event</Text>
        </TouchableOpacity>
      </View> 
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#160635",
    height: 244,
    justifyContent: "space-evenly",
    gap: 24,
    fontFamily: "moon",
    fontWeight: "bold",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 24,
    paddingRight: 24,
  },

  todo: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 21,
    marginLeft: 24,
    marginRight: 24,
    marginTop: 13,
  },

  tasks: {
    fontFamily: "manrope",
    fontSize: 14,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
  },

  link: {
    flex: 1,
    flexDirection: "row",
    alignItems: "baseline",
    gap: 13,
    justifyContent: "flex-end",
  },

  darkpurple: {
    color: "#160635",
    fontFamily: "manrope",
    fontWeight: "bold",
    fontSize: 15,
  },

  weekcalender: {
    padding: 5,
    flexDirection: "row",
    gap: 16,
    justifyContent: "center",
  },

  popupText: {
    flex: 1,
    flexDirection: "column",
    gap: 20,
  },

  button: {
    backgroundColor: "#B900F4",
    borderRadius: 35,
    width: 179,
    height: 40,
    alignItems: "center",
    justifyContent: "center", // Add this line
  },

  buttonText: {
    fontFamily: "moon",
    fontWeight: "bold",
    color: "#ffffff",
    fontSize: 14,
  },

  nothingFound: {
    marginLeft: '29px'
  },

  linkText: {
    color: "#A5A5A5",
    fontSize: 12,
  },

  day: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    color: "white",
    width: 53,
    height: 64,
    borderRadius: 15,
    justifyContent: "center",
    textAlign: "center",
  },

  today: {
    backgroundColor: "#00B9F4",
  },
  heading: {
    paddingTop: 45,
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "novatica",
    fontWeight: "bold"
  },
  h3: {
    fontFamily: "moon",
    fontWeight: "bold",
    color: "#fff",
    fontSize: 14,
  },
  h3black: {
    fontFamily: "moon",
    fontWeight: "bold",
    color: "#000000",
    fontSize: 14,
    paddingBottom: 12,
  },

  h2: {
    fontFamily: "moon",
    fontWeight: "bold",
    color: "#000000",
    fontSize: 15,
  },
});
