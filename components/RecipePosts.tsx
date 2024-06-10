import React, { useState, useEffect } from "react";
import { View, FlatList, SafeAreaView, RefreshControl } from "react-native";
import Modal from "react-native-modal";

import Food from "./Food";

import DetailModal from "./DetailModal";
import useAppwrite from "@/lib/useAppwrite";
import {
  getAllBreakfastPosts,
  getAllDinnerPosts,
  getAllLunchPosts,
} from "@/lib/appwrite";

import RecipeListHeader from "./RecipeListHeader";
import EmptyState from "./EmptyState";

const RecipePosts = () => {
  const [category, setCategory] = useState("breakfast");

  const [selectedFood, setSelectedFood] = useState<any>(null);

  const { data: breakfasts = [], refetch: refetchBreakfast } =
    useAppwrite(getAllBreakfastPosts);
  const { data: lunch = [], refetch: refetchLunch } =
    useAppwrite(getAllLunchPosts);
  const { data: dinner = [], refetch: refetchDinner } =
    useAppwrite(getAllDinnerPosts);

  const [refreshing, setRefreshing] = useState(false);

  const onRefreshBreakfast = async () => {
    setRefreshing(true);
    await refetchBreakfast();
    setRefreshing(false);
  };
  const onRefreshLunch = async () => {
    setRefreshing(true);
    await refetchLunch();
    setRefreshing(false);
  };
  const onRefreshDinner = async () => {
    setRefreshing(true);
    await refetchDinner();
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
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        keyExtractor={(item) => item.$id}
        ListHeaderComponent={
          <RecipeListHeader category={category} setCategory={setCategory} />
        }
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
                ? onRefreshBreakfast
                : category == "lunch"
                ? onRefreshLunch
                : onRefreshDinner
            }
          />
        }
        ListEmptyComponent={
          <EmptyState
            title={`No ${category} found`}
            subtitle={`Be the first to create a ${category} post and share it with others!`}
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

export default RecipePosts;
