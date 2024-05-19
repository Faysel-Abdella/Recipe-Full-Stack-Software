import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

type categoryProps = {
  title: string;
  containerStyles: string;
  textStyles: string;
  handelClick: () => void;
};

const Category = ({
  title,
  containerStyles,
  textStyles,
  handelClick,
}: categoryProps) => {
  return (
    <TouchableOpacity
      className={`rounded-2xl justify-center items-center px-5 py-1 ${containerStyles}`}
      onPress={handelClick}
    >
      <Text className={`text-base  font-pregular ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Category;
