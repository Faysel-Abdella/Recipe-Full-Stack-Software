import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

// Define a TypeScript type for the props that the Category component expects to receive
type categoryProps = {
  title: string;
  containerStyles: string;
  textStyles: string;
  handelClick: () => void;
};

// Define the Category component
const Category = ({
  title,
  containerStyles,
  textStyles,
  handelClick,
}: categoryProps) => {
  // Render the Category component
  return (
    // Wrap the category in a TouchableOpacity component to make it clickable
    <TouchableOpacity
      // Apply the specified container styles, as well as some default styles
      className={`rounded-2xl justify-center items-center px-5 py-1 ${containerStyles}`}
      // Call the provided handelClick function when the category is clicked
      onPress={handelClick}
    >
      {/* Display the title of the category with the specified text styles */}
      <Text className={`text-base  font-pregular ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  );
};

// Export the Category component as the default export of this module
export default Category;
