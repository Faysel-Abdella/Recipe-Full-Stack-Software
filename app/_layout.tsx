import { useEffect } from "react";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";

import { View, Text } from "react-native";
import React from "react";
import GlobalProvider from "@/context/GlobalProvider";

const AppLayout = () => {
   // Use the useFonts hook to load the custom fonts
  const [fontsLoaded, errorIfTheFontDoesntLoadCorrectly] = useFonts({
    // Define the font names and their corresponding file paths
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

  // Use the useEffect hook to handle font loading
  useEffect(() => {
    // If there's an error while loading the fonts, throw the error
    if (errorIfTheFontDoesntLoadCorrectly)
      throw errorIfTheFontDoesntLoadCorrectly;
    // If the fonts are loaded, hide the splash screen
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, errorIfTheFontDoesntLoadCorrectly]);

  // If the fonts are not loaded and there's no error, return null to prevent rendering
  if (!fontsLoaded && !errorIfTheFontDoesntLoadCorrectly) return null;

  // Render the application
  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </GlobalProvider>
  );
};

export default AppLayout;
