import React, { useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";

import RecipePosts from "@/components/RecipePosts";

const Home = () => {
  return (
    <SafeAreaView className="bg-slate-300 px-4 h-full">
      <RecipePosts />
    </SafeAreaView>
  );
};

export default Home;
