import React, { useState } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import { icons } from "@/constants";
import { Video, ResizeMode } from "expo-av";

// State to track the video loading status
const DetailModal = ({ selectedFood }: any) => {
  const [isVideoLoading, setVideoIsLoading] = useState(true);
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        backgroundColor: "#F0ECBC",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 20,
        paddingHorizontal: 15,
        paddingBottom: 50,
        overflow: "visible",
      }}
    >

      {/* Render the content only when a food item is selected */}
      {selectedFood && (
        <ScrollView className="pb-10">
          <View>
            {isVideoLoading && (
              <ActivityIndicator size="large" color="#0000ff" />
            )}

            {/* Render the thumbnail image of the selected food */}
            <Image
              source={{ uri: selectedFood.thumbnail }}
              resizeMode="cover"
              onLoadEnd={() => setVideoIsLoading(false)}
              onLoadStart={() => setVideoIsLoading(true)}
              className="h-[350px] w-full rounded-[30px]"
            />
          </View>
          {/* Render the title of the selected food */}
          <Text className="mt-5 text-3xl font-pbold text-black">
            {selectedFood.title}
          </Text>
          <View className="flex-row gap-2">
             {/* Render the calory information */}
            <View className="flex-row justify-center items-center">
             
              <Image
                source={icons.power}
                className="w-7 h-7"
                resizeMode="contain"
              />
              <Text className="text-base font-pmedium">
                {selectedFood.calory} Cal
              </Text>
            </View>
            {/* Render the preparation time information */}
            <View className="flex-row justify-center items-center space-x-2">
              <Image
                source={icons.time}
                className="w-5 h-5"
                resizeMode="contain"
              />
              <Text className="text-base font-pmedium">
                {selectedFood.minutes} min
              </Text>
              
            </View>
          </View>
          {/* Description */}
          <Text className="mt-9 text-3xl font-pbold text-black underline">
            Description
          </Text>
          {/* selectedFood */}
          <View>
            <Text className="mt-3 text-base font-pmedium">
              {selectedFood.description}
            </Text>
          </View>
          {/* How to make it */}
          <Text className="mt-9 text-3xl font-pbold text-black underline">
            How to make it ?
          </Text>

          {/* Render the video player for the selected food */}
          <Video
            source={{
              uri: selectedFood.video,
            }}
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls
            shouldPlay={true}
            className="h-[350px] w-full rounded-[30px]"
            onLoadStart={() => setVideoIsLoading(true)}
            onLoad={() => setVideoIsLoading(false)}
          />
        </ScrollView>
      )}
    </ScrollView>
  );
};

export default DetailModal;
