import { View, Text, FlatList, SafeAreaView } from "react-native";
import React from "react";

import breakfasts from "@/constants/breakfasts";
import Food from "./Food";

const Breakfast = () => {
  return (
    <SafeAreaView className="flex-1 mt-6">
      <View className="flex-1 flex-row flex-wrap">
        {breakfasts.map((item) => (
          <View className="w-1/2 my-4" key={item.id}>
            <Food
              id={item.id}
              img={item.img}
              title={item.title}
              favorite={item.favorite}
              power={item.power}
              minute={item.minute}
            />
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Breakfast;
