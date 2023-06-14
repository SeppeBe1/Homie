import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
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
  Animated,
} from "react-native";
import { Transition } from "react-native-reanimated";
import addButton from "../assets/icons/add.svg";
import profilePicture from "../assets/girl.jpg";
import messenger from "../assets/icons/messenger.svg";
import whatsapp from "../assets/icons/whatsapp.svg";
import share from "../assets/icons/share.svg";
import crossIcon from "../assets/icons/close.svg";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Residents extends Component {

  residentsData = [];

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      residentsData: [],
    };
  }

  componentDidMount() {
    this.getUsers();
  }


  getUsers = async () => {
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
          for (let i = 0; i < fetchedResidents.length; i++) {
            const resident = fetchedResidents[i];
            console.log(resident);
            this.residentsData.push({
              firstname: resident.firstname,
              lastname: resident.lastname,
            });
          }
          this.setState({ residentsData: this.residentsData });
          console.log(this.residentsData);
        }
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

   leaveHouse = async () => {
    const userId = await AsyncStorage.getItem('userId');
  
    fetch(`http://localhost:3000/api/v1/users/${userId}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        houseId: "",
      }),
      })
      .then(response => response.json())
      .then(data => {        
          if(data.status == "failed"){
            console.log(data.status);
  
          } else if(data.status == "success"){
            console.log(data.status);
            navigation.navigate("Login");
  
          }
          // Perform any necessary actions after successful login
      })
      .catch(error => {
          // Handle any errors
          console.error(error);
      });
    }


  handleShare = async () => {
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


  toggleModal = () => {
    this.setState((prevState) => ({
      showModal: !prevState.showModal,
    }));
  };

  renderResidents() {
    if (this.residentsData.length === 0) {
      return <Text>Loading...</Text>; // Show loading indicator while data is being fetched
    }
    
    
    return this.residentsData.map((resident, index) => (
      <View style={styles.residentFull} key={index}>
        <TouchableOpacity
          onPress={() => navigation.navigate("housemateprofile")}
        >
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
            <Text style={styles.name}>{resident.name}</Text>
          </View>
          <Text>{resident.firstname} {resident.lastname}</Text>
          </TouchableOpacity>
        </View>
    ));
  };

  render() {

    const { showModal } = this.state;
    const { houseCode } = this.props;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.h3}>Our homies</Text>
        <TouchableOpacity
          style={styles.addButtonContainer}
          onPress={toggleModal}
        >
          <Text style={styles.addResidentText}>Add resident</Text>
          <Image source={addButton} style={styles.addButtonIcon} />
        </TouchableOpacity>
      </View>
      {renderResidents()}
      <TouchableOpacity onPress={handleLeaveHouse} style={styles.leaveButton}>
        <Text style={styles.leaveButtonText}>Leave House</Text>
      </TouchableOpacity>

      <Modal visible={showModal} animationType="fade" transparent>
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            <Image source={crossIcon} style={styles.closeIcon} />
          </TouchableOpacity>
        </View>
        {this.renderResidents()}
        <View>
          <TouchableOpacity
            style={styles.leave}
          >
            <Text style={styles.leave} onPress={this.leaveHouse}>Leave House</Text>
          </TouchableOpacity>
        </View>

        <Modal visible={showModal} animationType="fade" transparent>
          <TouchableWithoutFeedback onPress={this.toggleModal}>
            <View style={styles.overlay} />
          </TouchableWithoutFeedback>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={this.toggleModal}
            >
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
                <Image style={styles.shareButtonIcon} source={messenger} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.shareButton, styles.shareButtonGreen]}
                onPress={() =>
                  Linking.openURL(
                    "whatsapp://send?text=Join our house with this code: 986 546"
                  )
                }
              >
                {this.props.houseCode}
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
                  onPress={this.handleShare}
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
                    Linking.openURL(
                      "fb-messenger://share?link=<YOUR_SHARE_LINK>"
                    )
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
                      `whatsapp://send?text=Join our house with this code: ${this.props.houseCode}`
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
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 35,
    paddingBottom: 20,
  },
  h3: {
    fontFamily: "moon",
    fontSize: 14,
    color: "#160635",
    fontWeight: "bold",
  },
  addButtonContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  addResidentText: {
    fontFamily: "manrope",
    fontSize: 13,
    color: "#A5A5A5",
    paddingRight: 5,
  },
  addButtonIcon: {
    width: 20,
    height: 20,
  },
  residentFull: {
    backgroundColor: "#FAFAFA",
    marginBottom: 8,
    height: 56,
    width: "100%",
    borderRadius: 10,
    padding: 10,
  },
  residentProfile: {
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
  leaveButton: {
    textAlign: "center",
    fontFamily: "manrope",
    color: "#FF7A7A",
    paddingTop: 29,
    textDecorationLine: "underline",
  },
  leaveButtonText: {
    fontFamily: "manrope",
    color: "#FF7A7A",
    textDecorationLine: "underline",
  },
  name: {
    fontFamily: "manrope",
    fontSize: 16,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(22, 6, 53, 0.5)",
  },
  modalContainer: {
    height: 314,
    width: 342,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -171 }, { translateY: -157 }],
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
  modalContent: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 20,
    paddingBottom: 20,
  },
  modalTitle: {
    fontFamily: "moon",
    fontWeight: "bold",
    fontSize: 16,
    color: "#160635",
    alignSelf: "left",
  },
  modalText: {
    fontFamily: "manrope",
    fontSize: 16,
    color: "#160635",
  },
  modalCode: {
    fontFamily: "moon",
    color: "#160635",
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
  },
  shareButtonsContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 65,
    paddingBottom: 20,
  },
  shareButton: {
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  shareButtonPurple: {
    backgroundColor: "#B900F4",
  },
  shareButtonBlue: {
    backgroundColor: "#0E8EF1",
  },
  shareButtonGreen: {
    backgroundColor: "#25D366",
  },
  shareButtonIcon: {
    width: 18,
    height: 18,
  },
});
