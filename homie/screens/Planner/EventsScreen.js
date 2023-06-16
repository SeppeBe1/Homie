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
import fun from "../../assets/undraw_having_fun_re_vj4h 1.svg";
import Event from "../../compontents/Event";
import AddEvent from "./AddEvent";
import EventDetails from "./EventDetails.js";
import image from "../../assets/boy.jpg";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FullCalenderScreen() {
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const today = new Date();
  const currentDate = new Date();
  const [residentsData, setResidentsData] = useState([]);
  const [creatorId, setCreatorId] = useState([]);
  const [firstname, setFirstname] = useState([]);
  const [lastname, setLastname] = useState([]);
  const [isChanged, setIsChanged] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [eventName, setEventname] = useState("");
  const [description, setDescription] = useState("");
  const [datePlanned, setDatePlanned] = useState("");
  const [dateCreated, setDateCreated] = useState("");
  const [location, setLocation] = useState("");
  const [hour, setHour] = useState("");
  const [isParticipant, setIsParticipant] = useState(false);
  const [invitationMessage, setInvitationMessage] = useState("");
  const [buttonText, setButtonText] = useState("Join the party");
  const [buttonStyle, setButtonStyle] = useState(styles.joinButton);
  const [buttonTextStyle, setButtonTextStyle] = useState(styles.joinButtonText);

  useEffect(() => {
    // loadFonts();

    //  getUser();
    // getHouse();
    getAnnouncement();
  }, [isChanged]);

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

  const navigation = useNavigation();

  // const handleButtonClick = () => {
  //   // if (buttonText === "Join the party") {
  //   //   setButtonText("You're in 🎉");
  //   //   setButtonStyle(styles.joinButtonClicked);
  //   //   setButtonTextStyle(styles.joinButtonTextClicked);
  //   // } else {
  //   //   setButtonText("Join the party");
  //   //   setButtonStyle(styles.joinButton);
  //   //   setButtonTextStyle(styles.joinButtonText);
  //   // }
  // //  setIsParticipant(!isParticipant);
  // };

  const handleButtonClick = (announcementId) => {
    setAnnouncements((prevAnnouncements) => {
      return prevAnnouncements.map((announcement) => {
        if (announcement._id === announcementId) {
          return {
            ...announcement,
            isParticipant: !announcement.isParticipant,
          };
        }
        return announcement;
      });
    });
  };

  return (
    <View>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
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
                  flex: 1,
                }}
              >
                All planned events
              </Text>
              <View style={{ width: 8, height: 15 }} />
            </View>
            <Image
              source={fun}
              style={{ width: 110, height: 100, marginTop: 20 }}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate("AddEvent")}
              style={[styles.button]}
            >
              <Text style={styles.buttonText}>Plan an event</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.eventContainer}>
        {announcements.filter((item) => item.type === "Event").length === 0 ? (
          <Text style={styles.nothingFound}>You have no events planned!</Text>
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
                  <View style={styles.eventContainer}>
                    <View style={styles.event}>
                      <View style={styles.dateContainer}>
                        <Text style={styles.dayText}>
                          {" "}
                          {new Date(item.datePlanned).getDate()}
                        </Text>
                        <Text style={styles.monthText}>
                          {new Date(item.datePlanned).toLocaleString(
                            "default",
                            { month: "short" }
                          )}
                        </Text>
                      </View>
                      <View style={{ marginLeft: 15 }}>
                        <Text style={styles.titleText}>{item.eventName}</Text>
                        <Text style={styles.descriptionText}>
                          {item.description}
                        </Text>
                        <Image source={image} style={styles.image} />
                      </View>
                      {/* <TouchableOpacity style={buttonStyle} onPress={handleButtonClick}>
                          <Text style={buttonTextStyle}>{buttonText}</Text>
                        </TouchableOpacity> */}
                    </View>
                    <View style={styles.buttonParticipation}>
                      {/* <TouchableOpacity
                          style={isParticipant ? styles.joinButtonClicked : styles.joinButton}
                          onPress={handleButtonClick}
                        >
                          <Text style={isParticipant ? styles.joinButtonTextClicked : styles.joinButtonText}>
                            {isParticipant ? "You're in 🎉" : "Join the party"}
                          </Text>
                        </TouchableOpacity> */}
                      <TouchableOpacity
                        style={
                          item.isParticipant
                            ? styles.joinButtonClicked
                            : styles.joinButton
                        }
                        onPress={() => handleButtonClick(item._id)}
                      >
                        <Text
                          style={
                            item.isParticipant
                              ? styles.joinButtonTextClicked
                              : styles.joinButtonText
                          }
                        >
                          {item.isParticipant
                            ? "You're in 🎉"
                            : "Join the party"}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#160635",
    height: 292,
    paddingTop: 57,
  },

  button: {
    backgroundColor: "#B900F4",
    borderRadius: 55,
    width: 194,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  buttonText: {
    fontFamily: "moon",
    fontWeight: "bold",
    color: "#ffffff",
    fontSize: 14,
  },

  nothingFound: {
    marginTop: "220px",
  },

  eventContainer: {
    marginTop: 20,
  },

  eventContainer: {
    flex: 1,
    alignItems: "center",
  },
  event: {
    padding: 15,
    flexDirection: "row",
    width: 350,
    height: 110,
    marginTop: 5,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "flex-start",
  },
  dateContainer: {
    fontFamily: "novatica",
    textAlign: "center",
    margin: "5px",
  },
  dayText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#160635",
  },
  monthText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#160635",
  },
  titleText: {
    fontSize: 14,
    fontFamily: "moon",
    fontWeight: "bold",
  },
  descriptionText: {
    fontSize: 12,
    fontFamily: "manrope",
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 25,
    marginTop: 10,
  },
  joinButton: {
    alignSelf: "flex-end",
    backgroundColor: "#00B9F4",
    padding: 12,
    borderRadius: 55,
    marginBottom: 100,
  },
  joinButtonText: {
    color: "white",
    fontFamily: "moon",
    fontSize: 12,
  },
  joinButtonClicked: {
    alignSelf: "flex-end",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#00B9F4",
    padding: 10,
    borderRadius: 55,
    width: 120,
    textAlign: "center",
  },
  joinButtonTextClicked: {
    color: "#00B9F4",
    fontFamily: "moon",
    fontSize: 12,
    fontWeight: "bold",
  },
  buttonParticipation: {
    position: "absolute",
    top: 77,
    right: 12,
  },
});
