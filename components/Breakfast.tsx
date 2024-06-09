import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Image,
  ScrollView,
  RefreshControl,
} from "react-native";
import Modal from "react-native-modal";

import SearchInput from "@/components/SearchInput";
import images from "@/constants/images";
import Category from "@/components/Category";

import breakfasts from "@/constants/breakfasts";
import Food from "./Food";
import { foodProps } from "@/globalTypes";
import { icons } from "@/constants";
import DetailModal from "./DetailModal";
import useAppwrite from "@/lib/useAppwrite";
import {
  getAllBreakfastPosts,
  getAllDinnerPosts,
  getAllLunchPosts,
  getAllPosts,
} from "@/lib/appwrite";

import { NavigationProp } from "@react-navigation/native";
import { useGlobalContext } from "@/context/GlobalProvider";
import Categories from "./Categories";
import RecipeListHeader from "./RecipeListHeader";

const Breakfast = () => {
  const [category, setCategory] = useState("breakfast");

  const [selectedFood, setSelectedFood] = useState<any>(null);

  const { data: posts = [], refetch } = useAppwrite(getAllPosts);

  const { data: breakfasts = [], refetch: refetchBreakfast } =
    useAppwrite(getAllBreakfastPosts);
  const { data: lunch = [], refetch: refetchLunch } =
    useAppwrite(getAllLunchPosts);
  const { data: dinner = [], refetch: refetchDinner } =
    useAppwrite(getAllDinnerPosts);

  const [refreshing, setRefreshing] = useState(false);

  const { user } = useGlobalContext();

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const closeModal = () => {
    setSelectedFood(null);
  };
  return (
    <SafeAreaView className="flex-1 mt-6">
      <FlatList
        data={
          category == "breakfast"
            ? breakfasts
            : category == "lunch"
            ? lunch
            : dinner
        }
        ListHeaderComponent={
          <RecipeListHeader category={category} setCategory={setCategory} />
        }
        numColumns={2}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <View className="w-1/2 my-4" key={item.$id}>
            <Food
              id={item.$id}
              imgUrl={item.thumbnail}
              title={item.title}
              power={item.calory}
              minute={item.minutes}
              onPress={() => setSelectedFood(item)}
            />
          </View>
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={
              category == "breakfast"
                ? refetchBreakfast
                : category == "lunch"
                ? refetchLunch
                : refetchDinner
            }
          />
        }
      />

      <Modal
        isVisible={selectedFood !== null}
        onBackdropPress={closeModal}
        onBackButtonPress={closeModal}
        style={{
          margin: 0,
          paddingTop: 70,
        }}
      >
        <DetailModal selectedFood={selectedFood} />
      </Modal>
    </SafeAreaView>
  );
};

export default Breakfast;
