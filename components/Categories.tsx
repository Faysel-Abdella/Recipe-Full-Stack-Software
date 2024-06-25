import { View, Text } from "react-native";
import React from "react";
import Category from "./Category";

const Categories = ({ category, setCategory }: any) => {
  return (
    // Create a flex-row container to display the categories horizontally
    <View className="flex-row justify-between">
      {/* Render the "Breakfast" category */}
      <Category
        title="Breakfast"
        // Conditionally apply styles based on the selected category
        containerStyles={`${
          category == "breakfast" ? "bg-cyan-500" : "bg-white"
        }`}
        textStyles={`${
          category == "breakfast" ? "text-white" : "text-blaxk-200"
        }`}
        handelClick={() => setCategory("breakfast")}
      />
      {/* Render the "Lunch" category */}
      <Category
        title="Lunch"
        containerStyles={`${category == "lunch" ? "bg-cyan-500" : "bg-white"}`}
        textStyles={`${category == "lunch" ? "text-white" : "text-blaxk-200"}`}
        handelClick={() => setCategory("lunch")}
      />
       {/* Render the "Dinner" category */}
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
