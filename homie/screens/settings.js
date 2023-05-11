import {
  StyleSheet,
  Text,
  View,
  Switch,
  Picker,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import arrowLeft from "../assets/icons/arrowLeft.svg";
import mobile from "../assets/icons/mobile.svg";

import * as Font from "expo-font";

// Load the font
const loadFonts = async () => {
  await Font.loadAsync({
    moon: require("../assets/fonts/Moon.otf"),
    manrope: require("../assets/fonts/Manrope.ttf"),
    novatica: require("../assets/fonts/Novatica.ttf"),
    novaticaBold: require("../assets/fonts/Novatica-Bold.ttf"),
  });
};

export default function Settingsscreen({ navigation }) {
  const [notifications, setNotifications] = useState(false);
  const notificationsVal = () =>
    setNotifications((previousState) => !previousState);

  const [nightmode, setnightmode] = useState(false);
  const nightmodeVal = () => setnightmode((previousState) => !previousState);

  const [autooPlay, setAutoPlay] = useState(false);
  const autoPlay = () => setAutoPlay((previousState) => !previousState);

  const [selectedValue, setSelectedValue] = useState("English");

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts().then(() => {
      setFontsLoaded(true);
    });
  }, []);

  if (!fontsLoaded) {
    return null; // or a loading screen
  }

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={arrowLeft}
            style={{ width: 8, height: 15, marginRight: 10 }}
          />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text
            style={{ color: "#fff", fontFamily: "novaticaBold", fontSize: 20 }}
          >
            Settings
          </Text>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.h2Container}>
          <Image source={mobile} style={{ width: 14, height: 20 }} />
          <Text style={styles.h2}>app preferences</Text>
        </View>

        <View style={styles.hr} />
        <View style={styles.settingsBlock}>
          <View style={styles.switchContainter}>
            <Text style={{ fontFamily: "manrope", fontSize: 16 }}>
              Notifications
            </Text>
            <Switch
              trackColor={{ false: "#c7c5c5", true: "#3BEDBF" }}
              onValueChange={notificationsVal}
              value={notifications}
            />
          </View>
          <View style={styles.switchContainter}>
            <Text style={{ fontFamily: "manrope", fontSize: 16 }}>
              Nightmode
            </Text>
            <Switch
              trackColor={{ false: "#c7c5c5", true: "#3BEDBF" }}
              onValueChange={nightmodeVal}
              value={nightmode}
            />
          </View>
          <View style={styles.switchContainter}>
            <Text style={{ fontFamily: "manrope", fontSize: 16 }}>
              Language
            </Text>
            <Picker
              selectedValue={selectedValue}
              style={{
                height: 30,
                width: 65,
                alignItems: "center",
                fontFamily: "manrope",
                fontSize: 14,
                paddingLeft: "auto",
                paddingRight: "auto",
              }}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }
            >
              <Picker.Item
                label="ENG"
                value="English"
                style={{ fontFamily: "manrope", fontSize: 14 }}
              />
              <Picker.Item
                label="NL"
                value="Nederlands"
                style={{ fontFamily: "manrope", fontSize: 14 }}
              />
            </Picker>
          </View>
        </View>

        <View style={styles.h2Container}>
          <Image
            source={require("../assets/icons/help.svg")}
            style={{ width: 24, height: 24 }}
          />
          <Text style={styles.h2}>help</Text>
        </View>

        <View style={styles.hr} />
        <View style={styles.settingsBlock}>
          <View style={styles.arrowText}>
            <Text style={{ fontFamily: "manrope", fontSize: 16 }}>FAQ</Text>
            <TouchableOpacity>
              <Image
                source={require("../assets/icons/arrowRight-purple.svg")}
                style={styles.arrowRight}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.arrowText}>
            <Text style={{ fontFamily: "manrope", fontSize: 16 }}>Support</Text>
            <TouchableOpacity>
              <Image
                source={require("../assets/icons/arrowRight.png")}
                style={styles.arrowRight}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.h2Container}>
          <Image
            source={require("../assets/icons/file.svg")}
            style={{ width: 24, height: 24 }}
          />
          <Text style={styles.h2}>legislation</Text>
        </View>

        <View style={styles.hr} />
        <View style={styles.settingsBlock}>
          <View style={styles.arrowText}>
            <Text style={{ fontFamily: "manrope", fontSize: 16 }}>
              Privacy policy
            </Text>
            <TouchableOpacity>
              <Image
                source={require("../assets/icons/arrowRight.png")}
                style={styles.arrowRight}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    marginLeft: 29,
    marginRight: 29,
    fontFamily: "manrope",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#160635",
    height: "115px",
    marginBottom: 20,
  },

  h2: {
    fontSize: 16,
    fontFamily: "moon",
    fontWeight: 700,
  },

  h2Container: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginTop: 20,
  },

  settingsBlock: {
    marginBottom: 30,
  },

  switchContainter: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },

  arrowText: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },

  arrowRight: {
    height: 12,
    width: 6,
  },

  hr: {
    height: 2,
    backgroundColor: "#E5CDF3",
    marginTop: 15,
    marginBottom: 5,
  },
});
