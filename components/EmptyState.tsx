import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "@/constants";

import { router } from "expo-router";
import CustomButton from "./CustomButton";

const EmptyState = ({ title, subtitle }: any) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="W-[270px] h-[215px]"
        resizeMode="contain"
      />

      <Text className="text-xl font-psemibold text-center text-gray-800 mt-2">
        {title}
      </Text>

      <Text className="mt-3 font-pmedium text-sm text-gray-800 ">
        {subtitle}
      </Text>

      <CustomButton
        title="Share your recipe"
        handleClick={() => router.push("/create")}
        containerStyles="w-full my-5"
        isLoading={false}
      />
    </View>
  );
};

export default EmptyState;
