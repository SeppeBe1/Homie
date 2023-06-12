import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, Button, Image,  FlatList, TouchableOpacity, Modal   } from "react-native";
import { Header, Avatar } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Font from "expo-font";
import myImage from "../assets/float.svg";
import pen from "../assets/pentosquare.svg";
import Manrope from "../assets/fonts/Manrope.ttf";
import Moon from "../assets/fonts/Moon.otf";
import Novatica from "../assets/fonts/Novatica-Bold.woff";
import AsyncStorage from '@react-native-async-storage/async-storage';
import close from '../assets/icons/close.svg'
import { color } from "react-native-elements/dist/helpers";



// Load the font

export default function Homescreen({ navigation }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [firstname, setFirstname] = useState([]);
  const [lastname, setLastname] = useState([]);
  const [houseIdd, setHouseId] = useState([]);
  const [housenamee, setHousename] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [announcements, setAnnouncements] = useState([]);
  const currentDate = new Date();

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
    const fetchData = async () => {
      await loadFonts();
  
      getUser();
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    if (houseIdd.length > 0) {
      getHouse();
      getAnnouncement(houseIdd);
    }
  }, [houseIdd]);

  const handleDeleteItem = (itemId) => {
    setAnnouncements((prevAnnouncements) =>
      prevAnnouncements.filter((item) => item._id !== itemId)
    );
  };
  


  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
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
    console.log('yeet')

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
            setHouseId(data.data.houseId);


            // let profilePic = data.data.profilePic;
          }
      })
      .catch(error => {
          // Handle any errors
          console.error(error);
      });
  }

  const getHouse = async () => {
    const token = await AsyncStorage.getItem('token');

    const response = await fetch(`http://localhost:3000/api/v1/house/${houseIdd}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (data.status === 'failed') {
    } else if (data.status === 'succes') {
      setHousename(data.data.housename);
  }
}

const createAnnouncement = async () => {
  const userId = await AsyncStorage.getItem('userId');
  const token = await AsyncStorage.getItem('token');
  fetch('http://localhost:3000/api/v1/anouncement', {
    
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: 'Announcement',
                description: inputValue,
                creatorId: userId,
                houseId: houseIdd,
                dateCreated: formattedDate,
            }),
            })
            .then(response => response.json())
            .then(data => {
                // Process the response data
                console.log(data.status);

                if(data.status == "failed"){

                } else if(data.status == "succes"){
                  handleCloseModal();
                }
                // Perform any necessary actions after successful login
            })
            .catch(error => {
                // Handle any errors
                console.error(error);
            });
}


  const getAnnouncement = async (houseIdd) => {
      const token = await AsyncStorage.getItem('token');
      console.log(token)
      if(houseIdd){
        fetch(`http://localhost:3000/api/v1/anouncement/${houseIdd}`, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
          }
          })
          .then(response =>  response.json())
          .then(data => {   
            if (data.status === "success") {
              const fetchedAnnouncements = data.result.map((announcement) => announcement);
              console.log(fetchedAnnouncements)
              setAnnouncements(fetchedAnnouncements);
              } 
              else if(data === "failed"){
                console.log(data.result);
              }
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        console.log(kaas);
      }

  };

  try {
    if (!fontsLoaded) {
      return null; // or a loading screen
    }
  
    // Rest of the return statement...
  } catch (error) {
    console.error("Error rendering component:", error);
  }



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header
          containerStyle={styles.headerContainer}
          leftComponent={
            <Avatar
              onPress={() => navigation.navigate("myprofilescreen")}
              size="medium"
              rounded
              source={{
                uri: "https://i.redd.it/lmwqtxhw9st41.jpg",
              }}
              containerStyle={{ width: 46, height: 46 }}
            />
          }
          centerComponent={
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Button
                title={housenamee}
                onPress={() => navigation.navigate("homeaccount")}
              />
            </View>
          }
          rightComponent={
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Icon
                name="cog"
                color="white"
                size={24}
                onPress={() => {
                  navigation.navigate({ name: "settingsscreen" });
                }}
              />
            </View>
          }
        />
      </View>
      <View style={styles.imageContainer}>
        <Image source={myImage} style={styles.image} />
        <View
          style={{
            position: "absolute",
            left: 110,
            top: 35,
            zIndex: 10,
            width: 130,
            height: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: "1rem",
              fontFamily: "moon",
              fontWeight: "bold",
              color: "#160635",
            }}
          >
            Welcome back {firstname +' ' + lastname}!
          </Text>
        </View>
      </View>
      <View style={{ marginTop: 80, paddingHorizontal: 24 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: "0.875rem",
              fontFamily: "moon",
              fontWeight: "bold",
            }}
          >
            Announcements
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity style={styles.addAnnoucement}  onPress={handleOpenModal} animationType="fade" transparent>
              <Text
                style={{
                  fontSize: "0.875rem",
                  fontFamily: "manrope",
                  fontWeight: "regular",
                  color: "#939393",
                }}
              >
                Add announcement
              </Text>
              <Image
                source={pen}
                style={{ width: 20, height: 20, marginLeft: 7 }}
              />
            </TouchableOpacity>
            {/* ---------------------------------- */}
            <Modal visible={modalVisible} transparent={true} animationType="fade">
              <View style={styles.modalContainer} >
                <View style={styles.modalContent}>
                  <TouchableOpacity onPress={handleCloseModal}>
                    <Image source={close} style={styles.close} />
                  </TouchableOpacity>
                  <Text style={styles.modalText}>NEW ANNOUNCEMENT</Text>
                  <Text style={styles.dateTime}>{formattedDate}</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Type here"
                    multiline={true}
                    numberOfLines={5}
                    onChangeText={handleInputChange}
                    value={inputValue}
                  />
                  <TouchableOpacity onPress={createAnnouncement} style={styles.createAnnouncementBtn} >
                    <Text style={styles.createAnnouncement}>ADD TO DASHBOARD</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            {/* ---------------------------------- */}
          </View>
        </View>
      </View>
      <View>
        {announcements.length === 0 ? (
          <Text>No announcements found</Text>
        ) : (
          <FlatList
            keyExtractor={(item) => item._id}
            data={announcements}
            renderItem={({ item }) => {
              let announcementStyle;
              let announcementTextStyle;

              switch (item.type) {
                case "Announcement":
                  announcementStyle = styles.announcement;
                  announcementTextStyle = styles.announcementText;
                  return (
                    <>
                      <View style={announcementStyle}>
                        <Text style={announcementTextStyle}>{item.description}</Text>
                        <Text style={styles.announcementTime}>1 sec ago</Text>
                      </View>
                    </>
                    
                  );
                case "Payment":
                  announcementStyle = styles.payment;
                  announcementTextStyle = styles.announcementTextEventPayment;

                  return (
                    <>
                      <View style={announcementStyle}>
                        <Text style={announcementTextStyle}><Text>19$: </Text>{item.description}</Text>
                      </View>
                    </>
                    
                  );
                case "Event":
                  announcementStyle = styles.event;
                  announcementTextStyle = styles.announcementTextEventPayment;
                  return (
                    <>
                      <View style={announcementStyle}>
                      <Text style={announcementTextStyle}><Text>19h00: </Text>{item.description}</Text>
                      </View>
                    </>
                    
                  );
              }

            }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    position: "relative",
    height: "100%",
    width: "100%",
  },
  header: {
    backgroundColor: "#160635",
    height: 215,
    width: "100%",
  },
  headerContainer: {
    backgroundColor: "#160635",
    paddingHorizontal: 24,
    paddingVertical: 0,
    border: "none",
    marginTop: 40,
  },
  imageContainer: {
    position: "absolute",
    top: 100,
    left: "-1px",
    height: "200px",
    width: "350px",
  },
  image: {
    resizeMode: "contain",
    maxWidth: "80%",
    height: "100%",
  },
  addAnnoucement:{
    display: "flex",
    flexDirection: "row"
    
  },

  modalContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    marginTop: 256,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    borderStyle: 'none',
    width: '80%',
  },

  close: {
    alignSelf : 'flex-end',
    width:28,
    height:28,
},
  modalText: {
    fontSize: 16,
    marginTop: -15,
    marginBottom: 10,
    fontFamily: Moon,
    fontWeight: 'bold',
  },

  dateTime: {
    fontSize: 14,
    marginBottom: 10,
    fontFamily: Manrope,
    color:'#D9B2EE'
  },

  input: {
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontFamily: Manrope,
  },

  createAnnouncementBtn: {
    fontFamily: Moon,
    backgroundColor: '#B900F4',
    borderRadius: 30,
    paddingLeft: 27,
    paddingRight: 27,
    paddingTop: 13,
    paddingBottom: 13,
    marginTop: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 18,

},

createAnnouncement: {
  fontFamily: Moon,
  color:'white',

  marginLeft: 'auto',
  marginRight: 'auto',
  fontSize: 18,
},

announcement:{
  backgroundColor: '#FF7A7A',
  fontFamily: Manrope,
  borderRadius: 10,
  height: 41,
  marginLeft: 30,
  marginRight: 30,
  marginTop: 8,
},

payment:{
  backgroundColor: '#F57ED4',
  fontFamily: Manrope,
  borderRadius: 10,
  height: 41,
  marginLeft: 30,
  marginRight: 30,
  marginTop: 8,
},

event:{
  backgroundColor: '#00B9F4',
  fontFamily: Manrope,
  borderRadius: 10,
  height: 41,
  marginLeft: 30,
  marginRight: 30,
  marginTop: 8,
},

announcementText:{
  fontSize: 14,
  color:'white',
  marginLeft: 17,
  marginRight: 17,
  marginTop: 4,
  marginBottom: -2,
},

announcementTextEventPayment:{
  fontSize: 14,
  color:'white',
  marginLeft: 17,
  marginRight: 17,
  marginTop: 11,
  marginBottom: 11,
},
announcementTime:{
  marginLeft: 17,
  marginRight: 17,
  fontSize: 10,
  color:'white',
},


});
