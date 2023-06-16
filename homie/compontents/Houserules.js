import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Modal,
  TextInput,
} from "react-native";

import checkbox from "../assets/icons/check.svg";
import addRule from "../assets/icons/add.svg";
import crossIcon from "../assets/icons/close.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Houserules() {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [newRule, setNewRule] = useState("");
  const [houseRules, setHouseRules] = useState([]);

  useEffect(() => {
    getHouseRules();
  }, []);

  const togglePopupVisibility = () => {
    setPopupVisible((prevState) => !prevState);
  };

  const handleRuleChange = (text) => {
    setNewRule(text);
  };

  const addRuleToList = () => {
    if (newRule.trim() !== "") {
      setPopupVisible(false);
      setNewRule("");
      const newHouseRule = { description: newRule, houseId: houseId };
      setHouseRules((prevHouseRules) => [...prevHouseRules, newHouseRule]);
    }
  };

  const getHouseRules = async () => {
    const token = await AsyncStorage.getItem("token");
    const houseId = await AsyncStorage.getItem("houseId");

    if (houseId) {
      fetch(`http://localhost:3000/api/v1/houserules/${houseId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            const fetchedHouseRules = data.result.map((houserule) => houserule);
            setHouseRules(fetchedHouseRules);
          } else if (data.status === "failed") {
            console.log(data.result);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log("houseId is not available");
    }
  };

  const createHouserule = async () => {
    const token = await AsyncStorage.getItem("token");
    const houseId = await AsyncStorage.getItem("houseId");

    fetch(`http://localhost:3000/api/v1/houserules/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "Houserule",
        description: newRule,
        houseId: houseId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        if (data.status === "success") {
          const newHouseRule = { description: newRule, houseId: houseId };
          const updatedHouseRules = [...houseRules, newHouseRule];

          setNewRule("");
          setHouseRules(updatedHouseRules);

          AsyncStorage.setItem("houseRules", JSON.stringify(updatedHouseRules))
            .then(() => {
              togglePopupVisibility();
            })
            .catch((error) => {
              console.error("Error saving houseRules to AsyncStorage:", error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View>
      <Text style={styles.h3}>Our House Rules</Text>
      {houseRules.map((rule, index) => (
        <View key={index} style={styles.ruleContainer}>
          <Image source={checkbox} style={styles.checkbox} />
          <Text style={styles.rule}>{rule.description}</Text>
        </View>
      ))}
      <TouchableOpacity
        style={styles.addButton}
        onPress={togglePopupVisibility}
      >
        <Image source={addRule} style={{ width: 50, height: 50 }} />
      </TouchableOpacity>

      <Modal
        visible={isPopupVisible}
        animationType="fade"
        transparent={true}
      >
        <TouchableOpacity style={styles.overlay} activeOpacity={1}>
          <View style={styles.popup}>
            <Text style={styles.popupTitle}>New houserule</Text>
            <TouchableOpacity
              style={styles.closeButtonContainer}
              onPress={togglePopupVisibility}
            >
              <Image source={crossIcon} style={styles.closeIcon} />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              multiline={true}
              numberOfLines={5}
              value={newRule}
              onChangeText={handleRuleChange}
              placeholder="Type here..."
              placeholderTextColor="#999999"
            />
            <TouchableOpacity style={styles.addList} onPress={addRuleToList}>
              <Text style={styles.addButtonTitle}>Add to list</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  h3: {
    fontFamily: "moon",
    fontSize: 14,
    color: "#160635",
    paddingTop: 40,
    paddingBottom: 10,
    fontWeight: "bold",
  },
  ruleContainer: {
    height: 62,
    width: "100%",
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    borderRadius: 10,
    padding: 25,
  },
  checkbox: {
    width: 16,
    height: 11,
    marginRight: 10,
  },
  rule: {
    fontFamily: "manrope",
    fontSize: 16,
    color: "#333333",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeIcon: {
    marginTop: 10,
    width: 25,
    height: 25,
  },
  popup: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 25,
    width: 350,
    height: 315,
  },
  popupTitle: {
    fontFamily: "moon",
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    marginBottom: 10,
    fontSize: 16,
    height: 150,
    paddingLeft: 5,
    marginTop: 10,
  },
  addList: {
    backgroundColor: "#B900F4",
    padding: 20,
    width: 200,
    borderRadius: 30,
    alignSelf: "center",
  },
  addButtonTitle: {
    fontFamily: "moon",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    color: "white",
  },
  closeButtonContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  addButton: {
    alignSelf: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
});
