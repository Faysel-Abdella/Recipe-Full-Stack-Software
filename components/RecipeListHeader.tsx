import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import SearchInput from "./SearchInput";
import Categories from "./Categories";
import { useGlobalContext } from "@/context/GlobalProvider";
import { images } from "@/constants";

const RecipeListHeader = ({ category, setCategory }: any) => {
  const { user } = useGlobalContext();

  return (
    <View>
      <View
        style={{
          alignSelf: "flex-end",
          marginTop: -5,
          position: "absolute", // add if dont work with above
        }}
      ></View>

      <View className=" py-6">
        <Text className="text-black-200 font-psemibold text-2xl">
          Hi, {user.username}!{" "}
        </Text>
        <Text className="text-black-200 font-psemibold text-2xl">
          Explore Today's Best Recipes!
        </Text>
      </View>

      <SearchInput
        className="col"
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

      <Categories category={category} setCategory={setCategory} />
    </View>
  );
};

export default RecipeListHeader;
