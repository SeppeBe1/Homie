import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import * as FileSystem from 'expo-file-system';
import { Header, Button } from "react-native-elements";
import arrowLeft from "../assets/icons/arrowLeft.svg";
import editIcon from "../assets/icons/edit.svg";
import emailIcon from "../assets/icons/email.svg";
import phoneIcon from "../assets/icons/phone.svg";
import passwordIcon from "../assets/icons/password.svg";
import editFieldIcon from "../assets/icons/editField.svg";
import statusAvailable from "../assets/icons/statusAvailable.svg";
import statusBusy from "../assets/icons/statusBusy.svg";
import statusNotdisturb from "../assets/icons/statusNotdisturb.svg";
import dropdownIcon from "../assets/icons/dropdown.svg";
import dropdownIconUp from "../assets/icons/dropdownUp.png";
import crossIcon from "../assets/icons/close.svg";
import checkboxEmpty from "../assets/icons/greenCheckbox_empt.svg";
import checkboxChecked from "../assets/icons/greenCheckbox.svg";
import defaultProfilePic from "../assets/defaultProfilePic.png";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import * as Font from "expo-font";

import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

// Load the font
const loadFonts = async () => {
  await Font.loadAsync({
    moon: require("../assets/fonts/Moon.otf"),
    manrope: require("../assets/fonts/Manrope.ttf"),
    novatica: require("../assets/fonts/Novatica.ttf"),
    novaticaBold: require("../assets/fonts/Novatica-Bold.ttf"),
  });
};

export default function Myprofilescreen({ navigation }) {
  const cameraIconColor = "#00B9F4"; // Color for the camera icon
  const imageIconColor = "#F57ED4"; // Color for the files icon

  const [uploadPopupVisible, setUploadPopupVisible] = useState(false);
  const [data, setData] = useState([]);
  const [firstname, setFirstname] = useState([]);
  const [lastname, setLastname] = useState([]);
  const [phonenumber, setPhonenumber] = useState([]);
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [profilePic, setProfilePic]= useState(defaultProfilePic);
 // const [availability, setAvailability]= useState([]);

  const handleChooseFromFiles = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to select an image.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      setProfilePic(result.uri);
      const userId = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("token");

    const formData = new FormData();
    formData.append("profilePic", {
      uri: result.uri,
      name: "profilepic.png",
      type: "image/png" // You can customize the filename if needed
    });

    fetch(`http://localhost:3000/api/v1/users/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      },
      body: formData,
    })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the server
      console.log("Image upload success:", data);
    })
    .catch((error) => {
      // Handle the error
      console.log("Image upload error:", error);
    });
    }
    setUploadPopupVisible(false);
  };

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to take a photo.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      setProfilePic(result.uri);

      const userId = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("token");

      const formData = new FormData();
      formData.append("profilePic", {
        uri: result.uri,
        name: "profilepic.png",
        type: "image/png" // You can customize the filename if needed
      });
      fetch(`http://localhost:3000/api/v1/users/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the server
      console.log("Image upload success:", data);
    })
    .catch((error) => {
      // Handle the error
      console.log("Image upload error:", error);
    });
    }
    setUploadPopupVisible(false);
  };

  const UploadImagePopup = () => {
    return (
      <View>
        <Modal visible={uploadPopupVisible} animationType="slide" transparent>
          <View style={styles.overlay}>
            <View style={styles.modalProfilePicture}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setUploadPopupVisible(false)}
              >
                <Image source={crossIcon} style={{ width: 24, height: 24 }} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Upload Image</Text>
              <View style={styles.uploadContainer}>
                <TouchableOpacity
                  style={styles.uploadZone}
                  onPress={handleChooseFromFiles}
                >
                  <FontAwesome name="image" size={23} color={imageIconColor} />
                  <Text style={styles.uploadText}>Gallery</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.uploadZone}
                  onPress={handleTakePhoto}
                >
                  <AntDesign name="camera" size={28} color={cameraIconColor} />
                  <Text style={styles.uploadText}>Take Photo</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  const [isEmailAddressVisible, setIsEmailAddressVisible] = useState(false);
  const [isPhoneNumberVisible, setIsPhoneNumberVisible] = useState(false);

  const toggleEmail = () => {
    setIsEmailAddressVisible(!isEmailAddressVisible);
  };

  const togglePhone = () => {
    setIsPhoneNumberVisible(!isPhoneNumberVisible);
  };

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [availability, setAvailability] = useState("Available");

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleAvailabilityChange= (newAvailability) => {
    setAvailability(newAvailability);
  }

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckmarkClick = () => {
    setIsChecked(!isChecked); // Toggle the checked status
  };

  const handleEmail= () => {
    setNewEmail(email);
  }

  const [fontsLoaded, setFontsLoaded] = useState(false);

  const updateAvailability= async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("token");
  
      const response = await fetch(`http://localhost:3000/api/v1/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          availability: availability, // Update the status value
        }),
      });
  
      const data = await response.json();
      if (data.status === "success") {
        console.log(data.data);
      } else {
        console.log(data.status);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const getUser = async () => {
    const userId = await AsyncStorage.getItem("userId");
    console.log("getUserke");
    const token = await AsyncStorage.getItem('token');
    console.log(token);   

    fetch(`http://localhost:3000/api/v1/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == "failed") {
          console.log(data.status);
        } else if (data.status == "succes") {
          setFirstname(data.data.firstname);
          setLastname(data.data.lastname);
          setEmail(data.data.email);
          setPhonenumber(data.data.phonenumber);
          setPassword(data.data.password);
          setAvailability(data.data.availability);
          if (data.data.profilePic) {
            setProfilePic(data.data.profilePic);
          } else {
            setProfilePic(defaultProfilePic);
          } 
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [newEmail, setNewEmail] = useState("");
  const [newPhonenumber, setNewPhonenumber] = useState("");

  const updateEmail = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("token");
  
      const response = await fetch(`http://localhost:3000/api/v1/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: newEmail,
        }),
      });
  
      const data = await response.json();
      if (data.status === "success") {
        setEmail(newEmail); 
        toggleEmail(); 
        console.log(data.data);
      } else {
        console.log(data.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updatePhonenumber = async () => {
    // Make the API request to update the email address in the database
    try {
      const userId = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("token");
  
      const response = await fetch(`http://localhost:3000/api/v1/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          phonenumber: newPhonenumber, 
        }),
      });
  
      const data = await response.json();
      if (data.status === "success") {
        setPhonenumber(newPhonenumber);
        togglePhone(); // Close the modal
        console.log(data.data);
      } else {
        console.log(data.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();

    loadFonts().then(() => {
      setFontsLoaded(true);
    });

  }, []);

  useEffect(() => {
    updateAvailability();
  }, [availability]);


  if (!fontsLoaded) {
    return null; // or a loading screen
  }

  return (
    <View>
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={arrowLeft} style={{ width: 8, height: 15, marginTop: 30 }} />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: "center" }}>
          <View style={{ position: "relative" }}>
          {profilePic ? (
                <Image
                  source={{ uri: profilePic}}
                  style={{ width: 88, height: 88, borderRadius: 50 }}
                />
              ) : (
                <Image
                  source={defaultProfilePic}
                  style={{ width: 88, height: 88, borderRadius: 50 }}
                />
              )}            
            <TouchableOpacity
              style={{ position: "absolute", top: 0, right: 0 }}
              onPress={() => setUploadPopupVisible(true)}
            >
              <Image source={editIcon} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
            <UploadImagePopup />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <View>
              <Text
                style={{
                  color: "#fff",
                  fontFamily: "novaticaBold",
                  fontSize: "16px",
                  textAlign: "center",
                }}
              >
                {firstname + " " + lastname}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={toggleDropdown}
            style={{
              flexDirection: "row",
              alignItems: "center",
              position: "absolute",
              top: 105,
              right: 95,
            }}
          >
            {availability === "Available" && (
              <Image
                source={statusAvailable}
                style={{ width: 11, height: 11, marginRight: 5 }}
              />
            )}
            {availability === "Busy" && (
              <Image
                source={statusBusy}
                style={{ width: 11, height: 11, marginRight: 5 }}
              />
            )}
            {availability === "Do Not Disturb" && (
              <Image
                source={statusNotdisturb}
                style={{ width: 11, height: 11, marginRight: 5 }}
              />
            )}
            {isDropdownVisible ? (
              <Image source={dropdownIconUp} style={{ width: 15, height: 8 }} />
            ) : (
              <Image source={dropdownIcon} style={{ width: 15, height: 8 }} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {isDropdownVisible && (
        <View style={styles.dropdownMenu}>
          <TouchableOpacity
        onPress={() => handleAvailabilityChange("Available")}
        style={styles.dropdownItem}
      >
        <Image
          source={statusAvailable}
          style={{ width: 11, height: 11, marginRight: 5 }}
        />
        <Text style={styles.dropdownText}>Available</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleAvailabilityChange("Busy")}
        style={styles.dropdownItem}
      >
        <Image
          source={statusBusy}
          style={{ width: 11, height: 11, marginRight: 5 }}
        />
        <Text style={styles.dropdownText}>Busy</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleAvailabilityChange("Do Not Disturb")}
        style={styles.dropdownItem}
      >
        <Image
          source={statusNotdisturb}
          style={{ width: 11, height: 11, marginRight: 5 }}
        />
        <Text style={styles.dropdownText}>Do Not Disturb</Text>
      </TouchableOpacity>
        </View>
      )}

      <View style={{ backgroundColor: "#F2F2F2" }}>
        <View style={styles.profileItemFirst}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={styles.profileItemTitle}>
              <Image
                source={emailIcon}
                style={{
                  width: 20,
                  height: 16,
                  marginHorizontal: 10,
                  marginTop: 13,
                  marginBottom: 10,
                }}
              />
              <Text style={styles.titleText}>Email address</Text>
            </View>
            <TouchableOpacity onPress={toggleEmail}>
              <Image
                source={editFieldIcon}
                style={{ width: 16, height: 16, marginRight: 10 }}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={{ fontFamily: "manrope", margin: "10px", fontSize: "16px" }}
          >{email}
          </Text>
        </View>
        <View style={styles.profileItem}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={styles.profileItemTitle}>
              <Image
                source={phoneIcon}
                style={{ width: 21, height: 21, margin: 10 }}
              />
              <Text style={styles.titleText}>Phonenumber</Text>
            </View>
            <TouchableOpacity onPress={togglePhone}>
              <Image
                source={editFieldIcon}
                style={{ width: 16, height: 16, marginRight: 10 }}
              />
            </TouchableOpacity>
          </View>
          {phonenumber ? (
          <Text
            style={{
              fontFamily: "manrope",
              margin: "10px",
              fontSize: "16px",
            }}
          >
            {phonenumber}
          </Text>
        ) : (
          <Text
            style={{
              fontFamily: "manrope",
              margin: "10px",
              fontSize: "16px",
            }}
          >
            no phonenumber entered
          </Text>
        )}
        </View>
        <View style={styles.profileItem}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={styles.profileItemTitle}>
              <Image
                source={passwordIcon}
                style={{ width: 18, height: 20, margin: 10 }}
              />
              <Text style={styles.titleText}>Password</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("changepassword")}
            >
              <Image
                source={editFieldIcon}
                style={{ width: 16, height: 16, marginRight: 10 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Modal visible={isEmailAddressVisible} animationType="fade" transparent>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(22, 6, 53, 0.5)",
          }}
          // onPress={toggleEmail}
          activeOpacity={1}
        >
          <View
            style={{
              backgroundColor: "white",
              width: 342,
              height: 238,
              borderRadius: 10,
              textAlign: "center",
              padding: 21,
            }}
          >
            <TouchableOpacity
              style={{ position: "absolute", top: 16, right: 16, zIndex: 2 }}
              onPress={toggleEmail}
            >
              <Image source={crossIcon} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
            <View style={styles.popupText}>
              <Text style={styles.titleText}>Change email address</Text>
              <TextInput
                style={{
                  fontFamily: "manrope",
                  marginBottom: "37px",
                  fontSize: "16px",
                  color: "#A5A5A5",
                }}
                placeholder={email}
                value={newEmail}
                onChangeText={setNewEmail}
                onTouchStart={(event) => event.stopPropagation()} // Prevent event propagation for input field touch
              />
              <TouchableOpacity onPress={handleCheckmarkClick}>
                <View style={styles.modalCheckboxContainer}>
                  <Image
                    source={isChecked ? checkboxChecked : checkboxEmpty}
                    style={{ width: 24, height: 24 }}
                  />
                  <Text style={styles.modalCheckboxText}>
                    Make visible for public
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { alignSelf: "center" }]}
                onPress={updateEmail}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal visible={isPhoneNumberVisible} animationType="fade" transparent>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(22, 6, 53, 0.5)",
          }}
          // onPress={togglePhone}
          activeOpacity={1}
        >
          <View
            style={{
              backgroundColor: "white",
              width: 342,
              height: 238,
              borderRadius: 10,
              textAlign: "center",
              padding: 21,
            }}
          >
            <TouchableOpacity
              style={{ position: "absolute", top: 16, right: 16, zIndex: 2 }}
              onPress={togglePhone}
            >
              <Image source={crossIcon} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
            <View style={styles.popupText}>
              <Text style={styles.titleText}>Change phone number</Text>
              <TextInput
                style={{
                  fontFamily: "manrope",
                  marginBottom: "37px",
                  fontSize: "16px",
                  color: "#A5A5A5",
                }}
                placeholder={phonenumber}
                value={newPhonenumber}
                onChangeText={setNewPhonenumber}
                onTouchStart={(event) => event.stopPropagation()} // Prevent event propagation for input field touch
              />
              <TouchableOpacity onPress={handleCheckmarkClick}>
                <View style={styles.modalCheckboxContainer}>
                  <Image
                    source={isChecked ? checkboxChecked : checkboxEmpty}
                    style={{ width: 24, height: 24 }}
                  />
                  <Text style={styles.modalCheckboxText}>
                    Make visible for public
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { alignSelf: "center" }]}
                onPress={updatePhonenumber}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  topHeader: {
    backgroundColor: "#160635",
    height: "225px",
    padding: "25px",
  },

  profileItemFirst: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 15,
    marginHorizontal: "25px",
    marginTop: "25px",
    marginBottom: "5px",
  },

  profileItem: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 15,
    marginHorizontal: "25px",
    marginVertical: "5px",
  },

  profileItemTitle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 10,
  },

  dropdownMenu: {
    position: "absolute",
    top: 200,
    right: 0,
    width: 160,
    backgroundColor: "#fff",
    borderRadius: 5,
    elevation: 3,
    zIndex: 1,
    marginRight: 7,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dropdownText: {
    fontFamily: "manrope",
    fontSize: 16,
    marginLeft: 5,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(22,6,53,0.6)",
  },

  modalProfilePicture: {
    height: "225px",
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    padding: 20,
    bottom: 0,
    left: 0,
    right: 0,
  },

  modalTitle: {
    fontFamily: "moon",
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 8,
  },

  uploadText: {
    fontFamily: "manrope",
    fontSize: 12,
  },

  uploadZone: {
    paddingTop: 15,
    flex: 1,
    alignItems: "center",
    width: 100,
    alignContent: "space-around",
  },

  uploadContainer: {
    alignItems: "baseline",
    flex: 1,
    flexDirection: "row",
    width: 160,
  },

  titleText: {
    fontFamily: "moon",
    fontWeight: "bold",
    fontSize: "16px",
    color: "#160635",
    marginTop: 15,
    marginBottom: 10,
    textAlign: "left",
  },

  button: {
    textAlign: "center",
    backgroundColor: "#B900F4",
    borderRadius: 100,
    width: 319,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontFamily: "moon",
    fontWeight: "bold",
  },
  modalCheckboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  modalCheckboxText: {
    fontFamily: "manrope",
    fontSize: "16px",
    marginLeft: 2,
  },
});
