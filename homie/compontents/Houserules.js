import {
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Modal,
  TextInput,
} from "react-native";
import React, { Component } from "react";
import checkbox from "../assets/icons/check.svg";
import addRule from "../assets/icons/add.svg";

export default class Houserules extends Component {
  state = {
    isPopupVisible: false,
    newRule: "",
    houseRules: [
      "No smoking",
      "No pets allowed",
      "Quiet hours from 10 PM to 8 AM",
    ],
  };

  togglePopupVisibility = () => {
    this.setState((prevState) => ({
      isPopupVisible: !prevState.isPopupVisible,
    }));
  };

  handleRuleChange = (text) => {
    this.setState({
      newRule: text,
    });
  };

  addRuleToList = () => {
    if (this.state.newRule.trim() !== "") {
      this.setState((prevState) => ({
        isPopupVisible: false,
        newRule: "",
        houseRules: [...prevState.houseRules, prevState.newRule],
      }));
    }
  };

  render() {
    return (
      <View>
        <Text style={styles.h3}>Our House Rules</Text>
        {this.state.houseRules.map((rule, index) => (
          <View key={index} style={styles.ruleContainer}>
            <Image source={checkbox} style={styles.checkbox} />
            <Text style={styles.rule}>{rule}</Text>
          </View>
        ))}
        <TouchableOpacity
          style={styles.addButton}
          onPress={this.togglePopupVisibility}
        >
          <Image source={addRule} style={{ width: 50, height: 50 }} />
        </TouchableOpacity>

        <Modal
          visible={this.state.isPopupVisible}
          animationType="fade"
          transparent={true}
        >
          <TouchableOpacity style={styles.overlay} activeOpacity={1}>
            <View style={styles.popup}>
              <Text style={styles.popupTitle}>New houserule</Text>
              <TextInput
                style={[
                  styles.input,
                  { borderWidth: 0, height: 150, paddingTop: 10 },
                ]} // Aanpassing: verwijder de border en stel de hoogte in
                multiline={true} // Aanpassing: maak de tekst invoerveld meerdere regels
                numberOfLines={5} // Aanpassing: stel het aantal regels in dat zichtbaar is
                value={this.state.newRule}
                onChangeText={this.handleRuleChange}
                onSubmitEditing={this.addRuleToList}
                placeholder="Type here..."
                placeholderTextColor="#999999" // Aanpassing: kleur van de placeholder
              />

              <TouchableOpacity
                style={[styles.addList, { alignSelf: "center" }]} // Aanpassing: centreren van de knop
                onPress={this.addRuleToList}
              >
                <Text
                  style={{
                    fontFamily: "moon",
                    fontWeight: "bold",
                    fontSize: 18,
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  Add to list
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButtonContainer} // Nieuwe stijl voor de close button
                onPress={this.togglePopupVisibility}
              >
                <Text style={styles.closeButton}>X</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
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
    height: "62px",
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
    height: 190,
    paddingLeft: 5, // Aanpassing: voeg wat padding aan de linkerkant toe
  },
  addList: {
    backgroundColor: "#B900F4",
    padding: 20,
    width: 200,
    borderRadius: 30,
  },
  closeButtonContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  closeButton: {
    fontSize: 20,
    fontWeight: "bold",
  },
  addButton: {
    alignSelf: "center",
    paddingTop: 10,
  },
});
