import { Text, View, StyleSheet, Image, Animated } from "react-native";
import goodbye from "../assets/goodbye.svg";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export default function ThankYouScreen() {
  const navigation = useNavigation();
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(-200);

  useLayoutEffect(() => {
    navigation.setOptions({
      animationEnabled: true,
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    navigation.setOptions({
      transitionSpec: {
        open: {
          animation: "timing",
          config: { duration: 500 },
        },
        close: {
          animation: "timing",
          config: { duration: 500 },
        },
      },
    });

    // Start the animations when the component mounts
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, navigation, slideAnim]);

  const handleLeaveAnimation = () => {
    Animated.timing(slideAnim, {
      toValue: -800, // Adjust the value to control the flying out distance
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate("Login");
    });
  };

  return (
    <View style={styles.splashContainer}>
      <Animated.Text
        style={[
          styles.thankYouText,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        You left Casa Magdalena.{"\n"}See you again soon, goodbye!
      </Animated.Text>
      <Animated.Image
        source={goodbye}
        style={[
          styles.thankYouImage,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 50,
  },
  thankYouText: {
    fontFamily: "novatica",
    fontSize: 20,
    color: "#160635",
    fontWeight: "bold",
    paddingBottom: 40,
  },
  thankYouImage: {
    width: 230,
    height: 292,
  },
});
