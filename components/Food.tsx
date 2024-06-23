import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";

import icons from "@/constants/icons";
import { foodProps } from "@/globalTypes";

const Food = ({ imgUrl, title, power, minute, onPress }: foodProps) => {
  const [isLoading, setIsLoading] = useState(true);
// State to keep track of the image loading status
  return (
    <View>
       {/* Wrap the entire component in a TouchableOpacity to make it clickable */}
      <TouchableOpacity onPress={onPress} activeOpacity={1}>
        <View className="relative w-[170px]">
          {/* Render a heart-shaped button to mark the item as a favorite */}
          <TouchableOpacity className="absolute top-1 right-2 z-10 w-8 h-8 rounded-full bg-white justify-center items-center">
            <Image
              source={false ? icons.loveSolid : icons.loveOutline}
              className="w-4 h-4"
            />
          </TouchableOpacity>

          <View className="items-center">
            {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
            <Image
              source={{ uri: imgUrl }}
              // Add event handlers to track the image loading status
              className="h-[120px] w-[170px] rounded-[15px]"
              resizeMode="cover"
              onLoadStart={() => setIsLoading(true)}
              onLoadEnd={() => setIsLoading(false)}
            />
            {/* Render the title of the food item */}
          </View>
        </View>

        <Text className="font-psemibold ml-3 mt-2">{title}</Text>

        {/* Render the power and minute information of the food item */}

        <View className="flex-row gap-2">
          <View className="flex-row justify-center items-center">
            <Image
              source={icons.power}
              className="w-7 h-7"
              resizeMode="contain"
            />
            <Text>{power} Cal</Text>
          </View>
          <View className="flex-row justify-center items-center space-x-2">
            <Image
              source={icons.time}
              className="w-5 h-5"
              resizeMode="contain"
            />
            
            <Text>{minute} min</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Food;
