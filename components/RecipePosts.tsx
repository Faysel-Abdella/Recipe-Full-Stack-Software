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

// State to keep track of the current category (breakfast, lunch, or dinner)
const RecipePosts = () => {
  const [category, setCategory] = useState("breakfast");

  // State to store the currently selected food item
  const [selectedFood, setSelectedFood] = useState<any>(null);

  // Use the useAppwrite hook to fetch data for each category
  const { data: breakfasts = [], refetch: refetchBreakfast } =
    useAppwrite(getAllBreakfastPosts);
  const { data: lunch = [], refetch: refetchLunch } =
    useAppwrite(getAllLunchPosts);
  const { data: dinner = [], refetch: refetchDinner } =
    useAppwrite(getAllDinnerPosts);

  // State to track whether the list is being refreshed
  const [refreshing, setRefreshing] = useState(false);

  // Functions to handle refreshing the list for each category
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

  // Function to close the detail modal
  const closeModal = () => {
    setSelectedFood(null);
  };

  // Fetch the data for the current category when the category changes
  useEffect(() => {
    if (category === "breakfast") {
      onRefreshBreakfast();
    } else if (category === "lunch") {
      onRefreshLunch();
    } else {
      onRefreshDinner();
    }
  }, [category]);

  // Fetch the data for the initial category when the component mounts
  useEffect(() => {
    if (category === "breakfast") {
      onRefreshBreakfast();
    } else if (category === "lunch") {
      onRefreshLunch();
    } else {
      onRefreshDinner();
    }
  }, []);

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
        // Hide horizontal and vertical scroll indicators
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        // Display 2 items per row
        numColumns={2}
        // Use the $id property as the unique key for each item
        keyExtractor={(item) => item.$id}
        // Render the header component
        ListHeaderComponent={
          <RecipeListHeader category={category} setCategory={setCategory} />
        }
        // Render each item using the Food component
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
        // Implement the pull-to-refresh functionality
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
        // it displays empty if no category is found
        ListEmptyComponent={
          <EmptyState
            title={`No ${category} found`}
            subtitle={`Be the first to create a ${category} post and share it with others!`}
          />
        }
      />
      {/* // Render the empty state component if the list is empty */}
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
