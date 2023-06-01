import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

const Event = ({ date, title, description, image }) => {
  return (
    <View style={styles.eventContainer}>
      <View style={styles.event}>
        <View style={styles.dateContainer}>
          <Text style={styles.dayText}>{date.day}</Text>
          <Text style={styles.monthText}>{date.month}</Text>
        </View>
        <View>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.descriptionText}>{description}</Text>
          <Image source={image} style={styles.image} />
        </View>
        <TouchableOpacity style={styles.joinButton}>
          <Text style={styles.joinButtonText}>Join the party</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  eventContainer: {
    flex: 1,
    alignItems: "center",
  },
  event: {
    padding: 15,
    flexDirection: "row",
    width: 350,
    height: 110,
    marginTop: 15,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "space-around",
  },
  dateContainer: {
    fontFamily: "novatica",
    textAlign: "center",
    margin: "-7px",
  },
  dayText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#160635",
  },
  monthText: {
    fontSize: 10,
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
  },
  joinButtonText: {
    color: "white",
    fontFamily: "moon",
    fontSize: 12,
  },
};

export default Event;
