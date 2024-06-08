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
import { getAllPosts } from "@/lib/appwrite";

import { NavigationProp } from "@react-navigation/native";
import { useGlobalContext } from "@/context/GlobalProvider";

const Breakfast = () => {
  const [category, setCatagory] = useState("breakfast");

  const [selectedFood, setSelectedFood] = useState<foodProps | null>(null);

  const { data: posts = [], refetch } = useAppwrite(getAllPosts);

  // console.log(posts[0].title);
  // console.log(posts[0].description);
  // console.log(posts[0].minutes);
  // console.log(posts[0].thumbnail);

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
        data={posts}
        ListHeaderComponent={
          <View>
            <View
              style={{
                alignSelf: "flex-end",
                marginTop: -5,
                position: "absolute", // add if dont work with above
              }}
            ></View>

            <View className=" py-6">
              <Text className="text-black-200 font-psemibold text-2xl">
                Hi, {user.username}!{" "}
              </Text>
              <Text className="text-black-200 font-psemibold text-2xl">
                Explore Today's Best Recipes!
              </Text>
            </View>

            <SearchInput
              className="col"
              placeholder="Search any recipe"
              handleChangeText={() => {}}
            />

            <View className="items-center">
              <Image
                source={images.explor}
                className="rounded-3xl my-5"
                resizeMode="contain"
              />
            </View>

            <Text className="text-lg font-pbold ">Categories</Text>

            <View className="flex-row justify-between">
              <Category
                title="Breakfast"
                containerStyles={`${
                  category == "breakfast" ? "bg-cyan-500" : "bg-white"
                }`}
                textStyles={`${
                  category == "breakfast" ? "text-white" : "text-blaxk-200"
                }`}
                handelClick={() => setCatagory("breakfast")}
              />
              <Category
                title="Lunch"
                containerStyles={`${
                  category == "lunch" ? "bg-cyan-500" : "bg-white"
                }`}
                textStyles={`${
                  category == "lunch" ? "text-white" : "text-blaxk-200"
                }`}
                handelClick={() => setCatagory("lunch")}
              />
              <Category
                title="Dinner"
                containerStyles={`${
                  category == "dinner" ? "bg-cyan-500" : "bg-white"
                }`}
                textStyles={`${
                  category == "dinner" ? "text-white" : "text-blaxk-200"
                }`}
                handelClick={() => setCatagory("dinner")}
              />
            </View>
          </View>
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
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      <Modal
        isVisible={selectedFood !== null}
        onBackdropPress={closeModal}
        // onSwipeComplete={closeModal}

        onBackButtonPress={closeModal}
        // swipeDirection="down"
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
