import React, { useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import SearchInput from "@/components/SearchInput";
import images from "@/constants/images";
import Category from "@/components/Category";
import Food from "@/components/Food";
import Breakfast from "@/components/Breakfast";

const Home = () => {
  const [category, setCatagory] = useState("breakfast");

  return (
    <SafeAreaView className="bg-slate-300 px-4 h-full">
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View className=" py-6">
          <Text className="text-black-200 font-psemibold text-2xl">
            What are you{" "}
          </Text>
          <Text className="text-black-200 font-psemibold text-2xl">
            cooking today?
          </Text>
        </View>

        <SearchInput
          placeholder="Search any recipe"
          handleChangeText={() => {}}
        />

        <View className="items-center">
          <Image
            source={images.explor}
            className="rounded-3xl my-5"
            resizeMode="contain"
          />
        </View>

        <Text className="text-lg font-pbold ">Categories</Text>

        <View className="flex-row justify-between">
          <Category
            title="Breakfast"
            containerStyles={`${
              category == "breakfast" ? "bg-cyan-500" : "bg-white"
            }`}
            textStyles={`${
              category == "breakfast" ? "text-white" : "text-blaxk-200"
            }`}
            handelClick={() => setCatagory("breakfast")}
          />
          <Category
            title="Lunch"
            containerStyles={`${
              category == "lunch" ? "bg-cyan-500" : "bg-white"
            }`}
            textStyles={`${
              category == "lunch" ? "text-white" : "text-blaxk-200"
            }`}
            handelClick={() => setCatagory("lunch")}
          />
          <Category
            title="Dinner"
            containerStyles={`${
              category == "dinner" ? "bg-cyan-500" : "bg-white"
            }`}
            textStyles={`${
              category == "dinner" ? "text-white" : "text-blaxk-200"
            }`}
            handelClick={() => setCatagory("dinner")}
          />
        </View>

        {category == "breakfast" && <Breakfast />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
