import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Import the icons from the constants/icons file
import icons from "../constants/icons";

// Define the SearchInput component and its props
const SearchInput = ({ value, placeholder, handleChangeText }: any) => {
  // Render the SearchInput component
  return (
    // Wrap the search input in a View component with specific styles
    <View className="border-[1px] border-black-200 flex-1 mx-auto h-12 px-4 bg-slate-100 rounded-2xl focus:border-2 flex-row items-center space-x-4">
      {/* Render the TextInput component inside the View */}
      <TextInput
        // Apply specific styles to the TextInput component
        className="flex-1 mt-0.5 text-red font-pregular text-base"
        // Set the value prop to the provided value
        value={value}
        // Set the placeholder prop to the provided placeholder
        placeholder={placeholder}
        // Set the placeholderTextColor prop to a specific color
        placeholderTextColor="#7b7b8b"
        // Call the provided handleChangeText function when the text input value changes
        onChangeText={handleChangeText}
      />

      {/* Render a TouchableOpacity component with an image inside */}
      <TouchableOpacity>
        <Image
          // Set the source of the image to the searchBlack icon from the constants/icons file
          source={icons.searchBlack}
          // Apply specific styles to the Image component
          className="w-7 h-7 text-black "
          // Set the resizeMode prop to contain to maintain the aspect ratio of the image
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

// Export the SearchInput component as the default export of this module
export default SearchInput;

// Define the styles for the component using StyleSheet.create
const styles = StyleSheet.create({});
