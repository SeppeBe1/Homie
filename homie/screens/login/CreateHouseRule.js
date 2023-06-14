import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import arrowLeft from "../../assets/icons/arrowLeftPurple.svg";
import createHouse from "../../assets/login/createHouse.svg";
import next from "../../assets/login/next.svg";
import Manrope from "../../assets/fonts/Manrope.ttf";
import Moon from "../../assets/fonts/Moon.otf";
import Novatica from "../../assets/fonts/Novatica-Bold.woff";
import AsyncStorage from "@react-native-async-storage/async-storage";
import addRule from "../../assets/icons/addRule.svg";
import trash from "../../assets/icons/trash.svg";
import update from "../../assets/icons/update.svg";
import plus from "../../assets/icons/plus.svg";

const CreateHouseRule = ({ navigation }) => {
  const [description, setDescription] = useState("");
  const [editrule, setEditRule] = useState("");
  const [descriptionsList, setDescriptionsList] = useState([]);
  const [editDescriptionId, setEditRuleId] = useState(null);

  const createDescription = async () => {
    if (description.trim() !== "") {
      if (editDescriptionId) {
        // Editing an existing description
        setDescriptionsList((prevDescriptionsList) =>
          prevDescriptionsList.map((item) => {
            // const oldRule = item.text;
            // fuckdees(oldRule,description)
            if (item.id === editDescriptionId) {
              console.log(item.text);
              console.log(description);

              const updatedItem = { ...item, text: description };
              setDescription("");
              // fuckdees(item.text ,description );
              return updatedItem;
            }
            return item;
          })
        );
        setEditRuleId(null);
      } else {
        // Creating a new description
        const newDescription = { id: Date.now().toString(), text: description };

        const token = await AsyncStorage.getItem("token");
        const houseId = await AsyncStorage.getItem("houseId");

        fetch("http://localhost:3000/api/v1/houseRules", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description: description,
            houseId: houseId,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.status == "failed") {
              console.log(data.status);
            } else if (data.status == "succes") {
              console.log(data.status);
              setDescriptionsList((prevDescriptionsList) => [
                ...prevDescriptionsList,
                newDescription,
              ]);
              setDescription("");
            }
            // Perform any necessary actions after successful login
          })
          .catch((error) => {
            // Handle any errors
            console.error(error);
          });
      }
    }
  };

  // const fuckdees = async (description, newDescription) => {

  //   const token = await AsyncStorage.getItem('token');
  //   const houseId = await AsyncStorage.getItem('houseId');
  //   console.log(houseId);

  //   fetch(`http://localhost:3000/api/v1/houseRules/${description}/${houseId}`, {
  //     method: 'PUT',
  //     headers: {
  //         'Authorization': `Bearer ${token}`,
  //     },
  //     body: JSON.stringify({
  //       description: newDescription
  //       }),
  //     })
  //     .then(response => response.json())
  //     .then(data => {
  //         // Process the response data

  //         if(data.status == "failed"){
  //         console.log(data.status);
  //         console.log(data);
  //         console.log(houseId)
  //         } else if(data.status == "succes"){
  //           console.log(data);
  //         }
  //     })
  //     .catch(error => {
  //         // Handle any errors
  //         console.error(error);
  //     });
  // }

  const updateDescription = async (descriptionId, descriptionText) => {
    setDescription(descriptionText);
    setEditRuleId(descriptionId);
  };

  const deleteDescription = async (descriptionId, descriptionText) => {
    const token = await AsyncStorage.getItem("token");
    const houseId = await AsyncStorage.getItem("houseId");

    fetch(
      `http://localhost:3000/api/v1/houseRules/${descriptionText}/${houseId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Process the response data

        if (data.status == "failed") {
          console.log(data.status);
        } else if (data.status == "succes") {
          setDescriptionsList((prevDescriptionsList) =>
            prevDescriptionsList.filter((item) => item.id !== descriptionId)
          );
        }
        // Perform any necessary actions after successful login
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  const renderDescriptionItem = ({ item }) => (
    <View style={styles.input}>
      <Text style={styles.inputField}>{item.text}</Text>
      <TouchableOpacity onPress={() => updateDescription(item.id, item.text)}>
        <Image source={addRule} style={styles.inputEdit} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteDescription(item.id, item.text)}>
        <Image source={trash} style={styles.inputEdit} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.itemsTop}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={arrowLeft} style={styles.arrowLeft} />
        </TouchableOpacity>
        <Text style={styles.h2}>Create your homie!</Text>
      </View>

      <Image source={createHouse} style={styles.imageCreate} />
      <Text style={styles.p}>
        Register your house in Homie and Make your cohousing experience easier
        and more fun!
      </Text>

      <Text style={styles.h3}>
        {" "}
        3. Are there certain house rules that apply to your home?
      </Text>

      <View style={styles.input}>
        <TextInput
          style={styles.inputField}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter a description..."
        />
        <TouchableOpacity onPress={createDescription}>
          <Text>
            {editDescriptionId ? (
              <Image source={update} style={styles.inputEdit} />
            ) : (
              <Image source={plus} style={styles.inputEdit} />
            )}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={descriptionsList}
        keyExtractor={(item) => item.id}
        renderItem={renderDescriptionItem}
      />

      <TouchableOpacity onPress={() => navigation.navigate("ShareHomie")}>
        <Text style={styles.create}>Launch Homie</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateHouseRule;

const styles = StyleSheet.create({
  container: {
    textAlign: "center",
    position: "relative",
    height: "100%",
    width: "100vw",
    backgroundColor: "#F9F9F9",

    paddingLeft: 50,
    paddingRight: 50,
  },

  itemsTop: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  arrowLeft: {
    width: 10,
    height: 18,
  },

  imageCreate: {
    width: 194,
    height: 123,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 56,
  },

  h2: {
    textAlign: "center",
    fontSize: 25,
    fontFamily: Manrope,
    fontWeight: "bold",
    marginTop: 60,
    marginBottom: 56,

    marginLeft: "auto",
    marginRight: "auto",
  },

  p: {
    width: 250,
    fontFamily: Manrope,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 52,
  },

  h3: {
    width: 250,
    fontFamily: Manrope,
    marginLeft: "auto",
    marginRight: "auto",
    fontWeight: "bold",

    marginBottom: 43,
  },

  input: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 16,
    fontFamily: Novatica,
    placeholderTextColor: "#A5A5A5",
    backgroundColor: "white",
    width: 340,
    marginBottom: 7,

    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,

    width: "300",
  },

  description: {
    textAlign: "left",
    fontSize: 16,
    fontFamily: Novatica,
    placeholderTextColor: "#A5A5A5",
    backgroundColor: "white",
    padding: 17,

    marginBottom: 7,

    width: 340,

    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,

    width: "300",
  },

  inputField: {
    textAlign: "left",
    width: "300",
    width: "90%",
    padding: 17,
  },

  inputEdit: {
    width: 20,
    height: 20,
    marginRight: 17,
  },

  arrowNext: {
    marginTop: 40,
    width: 50,
    height: 50,
    marginLeft: "auto",
    marginRight: "auto",
  },

  create: {
    fontFamily: Moon,
    backgroundColor: "#B900F4",
    borderRadius: 30,
    paddingLeft: 27,
    paddingRight: 27,
    paddingTop: 13,
    paddingBottom: 13,
    marginTop: 30,
    marginLeft: "auto",
    marginRight: "auto",
    color: "white",
    fontSize: 18,
  },
});
