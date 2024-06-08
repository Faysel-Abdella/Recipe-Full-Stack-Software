import React, { useState } from "react";
import { View, Button, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import SearchInput from "@/components/SearchInput";
import images from "@/constants/images";
import Category from "@/components/Category";
import Food from "@/components/Food";
import Breakfast from "@/components/Breakfast";

import { NavigationProp } from "@react-navigation/native";
import { useGlobalContext } from "@/context/GlobalProvider";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}
const Home = ({ navigation }: RouterProps) => {
  const [category, setCatagory] = useState("breakfast");

  const { user } = useGlobalContext();

  return (
    <SafeAreaView className="bg-slate-300 px-4 h-full">
      {category == "breakfast" && <Breakfast />}
    </SafeAreaView>
  );
};

export default Home;
