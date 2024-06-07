import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";

import breakfasts from "@/constants/breakfasts";
import Food from "./Food";
import { foodProps } from "@/globalTypes";
import { icons } from "@/constants";
import DetailModal from "./DetailModal";

const Breakfast = () => {
  const [selectedFood, setSelectedFood] = useState<foodProps | null>(null);

  const closeModal = () => {
    setSelectedFood(null);
  };
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
              onPress={() => setSelectedFood(item)}
            />
          </View>
        ))}
      </View>

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
