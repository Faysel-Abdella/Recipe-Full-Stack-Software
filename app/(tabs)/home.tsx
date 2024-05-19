import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "@/components/SearchInput";

const Home = () => {
  return (
    <SafeAreaView className="bg-slate-300">
      <View className="px-6 py-6">
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
    </SafeAreaView>
  );
};

export default Home;
