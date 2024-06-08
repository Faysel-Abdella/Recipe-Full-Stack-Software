import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { icons } from "@/constants";
import { Video, ResizeMode } from "expo-av";

const DetailModal = ({ selectedFood }: any) => {
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
      {selectedFood && (
        <ScrollView className="pb-10">
          <View>
            <Image
              source={{ uri: selectedFood.thumbnail }}
              className="h-[350px] w-full rounded-[30px]"
              resizeMode="cover"
            />
          </View>
          <Text className="mt-5 text-3xl font-pbold text-black">
            {selectedFood.title}
          </Text>
          <View className="flex-row gap-2">
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

          <Text className="mt-9 text-3xl font-pbold text-black underline">
            Description
          </Text>

          <View>
            <Text className="mt-3 text-base font-pmedium">
              {selectedFood.description}
            </Text>
          </View>

          <Text className="mt-9 text-3xl font-pbold text-black underline">
            How to make it ?
          </Text>

          <Video
            source={{
              uri: selectedFood.video,
            }}
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls
            shouldPlay={true}
            className="h-[350px] w-full rounded-[30px]"
          />
        </ScrollView>
      )}
    </ScrollView>
  );
};

export default DetailModal;
