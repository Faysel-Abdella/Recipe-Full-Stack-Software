import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

type customButtonProps = {
  title: string;
  textStyles?: string;
  containerStyles: string;
  handleClick: () => void;
  isLoading: boolean;
};

const CustomButton = ({
  title,
  textStyles,
  containerStyles,
  handleClick,
  isLoading,
}: customButtonProps) => {
  return (
    //
    <TouchableOpacity
      onPress={handleClick}
      activeOpacity={0.7}
      className={`bg-secondary-100 rounded-full min-h-[62px] justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator animating={true} color="white" size="small" />
      ) : (
        <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
