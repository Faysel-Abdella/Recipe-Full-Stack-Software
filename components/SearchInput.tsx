import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import icons from "../constants/icons";

const SearchInput = ({ value, placeholder, handleChangeText }: any) => {
  return (
    <View className="border-[1px] border-black-200 flex-1 mx-auto h-12 px-4 bg-slate-100 rounded-2xl focus:border-2 flex-row items-center space-x-4">
      <TextInput
        className="flex-1 mt-0.5 text-red font-pregular text-base"
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
      />

      <TouchableOpacity>
        <Image
          source={icons.searchBlack}
          className="w-7 h-7 text-black "
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({});
