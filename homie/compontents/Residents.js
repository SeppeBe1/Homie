import React, { useEffect, useState } from "react";
import {
  Share,
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Linking,
} from "react-native";
import addButton from "../assets/icons/add.svg";
import profilePicture from "../assets/girl.jpg";
import messenger from "../assets/icons/messenger.svg";
import whatsapp from "../assets/icons/whatsapp.svg";
import share from "../assets/icons/share.svg";
import crossIcon from "../assets/icons/close.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Residents = ({ houseCode }) => {
  const [showModal, setShowModal] = useState(false);
  const [residentsData, setResidentsData] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log("AsyncStorage cleared successfully.");
    } catch (error) {
      console.log("Failed to clear AsyncStorage: ", error);
    }
  };

  const getUsers = async () => {
    const token = await AsyncStorage.getItem("token");
    const houseId = await AsyncStorage.getItem("houseId");
    fetch(`http://localhost:3000/api/v1/users/house/${houseId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.status);
        if (data.status === "failed") {
          console.log(data.status);
        } else if (data.status === "success") {
          const fetchedResidents = data.result;
          const updatedResidentsData = fetchedResidents.map((resident) => ({
            firstname: resident.firstname,
            lastname: resident.lastname,
          }));
          setResidentsData(updatedResidentsData);
          console.log(updatedResidentsData);
        }
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  const leaveHouse = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");

      const handleLeaveHouse = () => {
        setTimeout(() => {
          navigation.navigate("ThankYouScreen");
          setTimeout(() => {
            navigation.navigate("Login");
          }, 3000);
        });
      };

      const response = await fetch(
        `http://localhost:3000/api/v1/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            houseId: "",
          }),
        }
      );

      const data = await response.json();

      if (data.status === "failed") {
        console.log(data.status);
      } else if (data.status === "success") {
        console.log(data.status);
        handleLeaveHouse();
        clearAsyncStorage();
      }
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };

  const handleShare = async () => {
    try {
      const shareOptions = {
        title: "Share Code",
        message: "Join our house with this code: 986 546",
        url: "https://facebook.com", // Replace with your desired URL
      };

      await Share.share(shareOptions);

      console.log("Sharing completed.");
    } catch (error) {
      console.log("Sharing error:", error);
    }
  };

  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const renderResidents = () => {
    if (residentsData.length === 0) {
      return <Text>Loading...</Text>; // Show loading indicator while data is being fetched
    }

    return residentsData.map((resident, index) => (
      <View style={styles.residentFull} key={index}>
        <View style={styles.residentProfile}>
          <View style={styles.status}>
            <Image source={profilePicture} style={styles.profilePicture} />
            <View
              style={[
                styles.circle,
                { backgroundColor: resident.profileStatusColor },
              ]}
            />
          </View>
          <Text>
            {resident.firstname} {resident.lastname}
          </Text>
        </View>
      </View>
    ));
  };

  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.h3}>Our residents</Text>
        <TouchableOpacity style={styles.residentsTitle} onPress={toggleModal}>
          <Text style={styles.addResident}>Add resident</Text>
          <Image source={addButton} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
      </View>
      {renderResidents()}
      <TouchableOpacity style={styles.leave} onPress={leaveHouse}>
        <Text style={styles.leaveText}>Leave House</Text>
      </TouchableOpacity>

      <Modal visible={showModal} animationType="fade" transparent>
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            <Image source={crossIcon} style={styles.closeIcon} />
          </TouchableOpacity>
          <View style={{ flex: 1, gap: 24 }}>
            <Text
              style={{
                fontFamily: "moon",
                fontWeight: "bold",
                fontSize: 16,
                color: "#160635",
              }}
            >
              <Text>New resident</Text>
            </Text>
            <Text
              style={{
                fontFamily: "manrope",
                fontSize: 16,
                color: "#160635",
              }}
            >
              You want to add a new resident? Perfect! Just share this personal
              code, so your roomie can register and join the house.
            </Text>
            <Text
              style={{
                fontFamily: "moon",
                color: "#160635",
                fontSize: 24,
                fontWeight: "bold",
                alignSelf: "center",
              }}
            >
              {houseCode}
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                gap: 15,
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 65,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#B900F4",
                  borderRadius: 30,
                  width: 50,
                  height: 50,
                  alignSelf: "center",
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={handleShare}
              >
                <Image style={{ width: 18, height: 20 }} source={share} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#0E8EF1",
                  borderRadius: 30,
                  width: 50,
                  height: 50,
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() =>
                  Linking.openURL("fb-messenger://share?link=<YOUR_SHARE_LINK>")
                }
              >
                <Image style={{ width: 18, height: 18 }} source={messenger} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#25D366",
                  borderRadius: 30,
                  width: 50,
                  height: 50,
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() =>
                  Linking.openURL(
                    `whatsapp://send?text=Join our house with this code: ${houseCode}`
                  )
                }
              >
                <Image
                  source={whatsapp}
                  style={{
                    padding: 10,
                    width: 18,
                    height: 18,
                    textAlign: "center",
                    alignItems: "center",
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  h3: {
    fontFamily: "moon",
    fontSize: 14,
    color: "#160635",
    paddingVertical: 40,
    fontWeight: "bold",
  },
  leave: {
    textAlign: "center",
    fontFamily: "manrope",
    color: "#FF7A7A",
    paddingTop: 29,
    textDecorationLine: "underline",
  },
  leaveText: {
    textAlign: "center",
    fontFamily: "manrope",
    color: "#FF7A7A",
    paddingTop: 29,
    textDecorationLine: "underline",
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  residentsTitle: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  residentFull: {
    backgroundColor: "#FAFAFA",
    marginBottom: 8,
    height: 56,
    width: "100%",
  },
  addResident: {
    fontFamily: "manrope",
    fontSize: 13,
    color: "#A5A5A5",
    paddingRight: 5,
  },
  residentProfile: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 16,
  },
  status: {
    position: "relative",
  },
  circle: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(22, 6, 53, 0.5)",
  },
  modalContainer: {
    height: 314,
    width: 342,
    marginTop: 265,
    marginLeft: 35,
    marginRight: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    position: "absolute",
  },
  closeButton: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  closeIcon: {
    width: 25,
    height: 25,
  },
});

export default Residents;
