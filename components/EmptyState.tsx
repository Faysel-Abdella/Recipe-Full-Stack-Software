//importing the necessary directories

import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "@/constants";

import { router } from "expo-router";
import CustomButton from "./CustomButton";

// This component represents an empty state, typically used when there is no data to display.
  // It takes two props: `title` and `subtitle`, which are used to display a message to the user.

const EmptyState = ({ title, subtitle }: any) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="W-[270px] h-[215px]"
        resizeMode="contain"
      />

      {/* This Image component displays an "empty" image, which is likely a placeholder or illustration. The image is set to a fixed size and is resized to fit the container. */}

      
      <Text className="text-xl font-psemibold text-center text-gray-800 mt-2">
        {title}
      </Text>

      {/* This Text component displays the provided `title` prop in a semi-bold font, centered, and with a gray color. It also adds some margin-top. */}


      <Text className="mt-3 font-pmedium text-sm text-gray-800 ">
        {subtitle}
      </Text>

      <CustomButton
        title="Share your recipe"
        handleClick={() => router.push("/create")}
        containerStyles="w-full my-5"
        isLoading={false}
      />
      {/* This CustomButton component displays a button with the title "Share your recipe". When clicked, it navigates the user to the "/create" route. The button is set to the full width of the container and has some margin on the top and bottom. The `isLoading` prop is set to `false`, indicating that the button is not in a loading state. */}
    </View>
  );
};

export default EmptyState;
//empty state
