import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, Image,  FlatList   } from "react-native";
import { Header, Avatar } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Font from "expo-font";
import myImage from "../assets/float.svg";
import pen from "../assets/pentosquare.svg";
import AsyncStorage from '@react-native-async-storage/async-storage';


// Load the font
const loadFonts = async () => {
  await Font.loadAsync({
    moon: require("../assets/fonts/Moon.otf"),
    manrope: require("../assets/fonts/Manrope.ttf"),
    novatica: require("../assets/fonts/Novatica.ttf"),
    novaticaBold: require("../assets/fonts/Novatica-Bold.ttf"),
  });
};

export default function Homescreen({ navigation }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [firstname, setFirstname] = useState([]);
  const [lastname, setLastname] = useState([]);
  const [houseIdd, setHouseId] = useState([]);
  const [housenamee, setHousename] = useState([]);


  useEffect(() => {
    getUser();
    getHouse();
    loadFonts().then(() => {
      setFontsLoaded(true);
    });
    getHouserules();
  }, [houseIdd, housenamee]);

  const getUser = async () => {
    const userId = await AsyncStorage.getItem('userId');

    fetch(`http://localhost:3000/api/v1/users/${userId}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      }
      })
      .then(response => response.json())
      .then(data => {        
          if(data.status == "failed"){
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

  const getHouserules = async () => {
      const token = await AsyncStorage.getItem('token');

      fetch(`http://localhost:3000/api/v1/announcement`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
        })
        .then(response => response.json())
        .then(data => {        
            if(data.status == "failed"){
              console.log(data.status);
    
            } else if(data.status == "succes"){
              console.log(data.status);
              console.log(data);
              for(let i = 0; i < data.result.length ; i++){
                console.log(data.result[i].houseId);
                if(data.result[i].houseId == houseIdd){
                  console.log(data.data.description)
                  console.log('correct');
                  return;
                } else {
                  console.log('fout');
                }
  
              }
            }
            // Perform any necessary actions after successful login
        })
        .catch(error => {
            // Handle any errors
            console.error(error);
        });
     
  };

  // getHouserules();


  if (!fontsLoaded) {
    return null; // or a loading screen
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
          </View>
        </View>
      </View>
      <View
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "red",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
          <FlatList
            keyExtractor={(item) => item._id}
            data={data}
            
            renderItem={({ item }) => (
              // item.id == houseId ?  
              <>
                <Text>{item._id}</Text>
                <Text>{item.description}</Text>
              </>
              // : null
            )}
          />
        
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
});
