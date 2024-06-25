import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

// Define the type for the CustomButton props
type customButtonProps = {
  title: string;// The text to be displayed on the button
  textStyles?: string;// Additional styles for the button text
  containerStyles: string;// Additional styles for the button container
  handleClick: () => void;// The function to be called when the button is clicked
  isLoading: boolean;// Indicates whether the button is in a loading state
};

const CustomButton = ({
  title,
  textStyles,
  containerStyles,
  handleClick,
  isLoading,
}: customButtonProps) => {
  return (
    // Render a TouchableOpacity component for the button
    <TouchableOpacity
    activeOpacity={0.7}
    onPress={handleClick}
      className={`bg-secondary-100 rounded-full min-h-[62px] justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      // Apply the base styles and additional container styles, and reduce the opacity if the button is in a loading state
      disabled={isLoading}
    >
      {isLoading ? (
       // If the button is in a loading state, render an ActivityIndicator component
        <ActivityIndicator animating={true} color="white" size="small" />
      ) : (
      // Otherwise, render the button text
        <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
