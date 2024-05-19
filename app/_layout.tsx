import { useEffect } from "react";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";

import { View, Text } from "react-native";
import React from "react";

const AppLayout = () => {
  const [fontsLoaded, errorIfTheFontDoesntLoadCorrectly] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (errorIfTheFontDoesntLoadCorrectly)
      throw errorIfTheFontDoesntLoadCorrectly;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, errorIfTheFontDoesntLoadCorrectly]);

  if (!fontsLoaded && !errorIfTheFontDoesntLoadCorrectly) return null;

  return (
    <View>
      <Text>AppLayout</Text>
    </View>
  );
};

export default AppLayout;
