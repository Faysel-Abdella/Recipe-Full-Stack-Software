import React from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import images from "../constants/images";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

const App = () => {
  return (
    // Wrap the content in a SafeAreaView to ensure it's positioned properly on the screen
    <SafeAreaView>
      <View className="relative h-full w-full">
        {/* Create an absolute positioned view for the main content */}
        <View className="absolute z-10 top-0  mt-20 ">
          <View className="left-6">
            {/* Display the main title and description */}
            <Text className="text-slate-200 text-4xl font-psemibold">
              Cooking &
            </Text>
            <Text className="text-white text-3xl font-psemibold ">
              Delicious Food Easily
            </Text>
            <Text className="text-slate-50 text-lg font-pmedium mt-9">
              Discover more than 100 food recipes in your hands and cooking it
              easily!
            </Text>
          </View>
          {/* Add a "Get Started" button */}
          <View className="left-4">
            <CustomButton
              containerStyles="mt-10"
              handleClick={() => router.push("/sign-up")}
              isLoading={false}
              textStyles=""
              title="Get Started"
            />
          </View>
        </View>
        {/* Display the background image */}
        <Image
          source={images.index}
          className="h-full w-full"
          resizeMode="cover"
        />
      </View>
    </SafeAreaView>
  );
};
export default App;
