import { View, Text } from "react-native";
import React from "react";
import Category from "./Category";

const Categories = ({ category, setCategory }: any) => {
  return (
    <View className="flex-row justify-between">
      <Category
        title="Breakfast"
        containerStyles={`${
          category == "breakfast" ? "bg-cyan-500" : "bg-white"
        }`}
        textStyles={`${
          category == "breakfast" ? "text-white" : "text-blaxk-200"
        }`}
        handelClick={() => setCategory("breakfast")}
      />
      <Category
        title="Lunch"
        containerStyles={`${category == "lunch" ? "bg-cyan-500" : "bg-white"}`}
        textStyles={`${category == "lunch" ? "text-white" : "text-blaxk-200"}`}
        handelClick={() => setCategory("lunch")}
      />
      <Category
        title="Dinner"
        containerStyles={`${category == "dinner" ? "bg-cyan-500" : "bg-white"}`}
        textStyles={`${category == "dinner" ? "text-white" : "text-blaxk-200"}`}
        handelClick={() => setCategory("dinner")}
      />
    </View>
  );
};

export default Categories;
