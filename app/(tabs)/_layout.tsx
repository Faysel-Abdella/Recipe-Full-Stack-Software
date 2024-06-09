import React from "react";
import { View, Text, ImageSourcePropType, Image } from "react-native";
import { Tabs } from "expo-router";

import icons from "../../constants/icons";
import { StatusBar } from "expo-status-bar";

type tabIconProps = {
  icon: ImageSourcePropType;
  color: string;
  name: string;
  focused: boolean;
};

const TabIcon = ({ icon, color, name, focused }: tabIconProps) => {
  return (
    <View className="items-center justify-center gap-1">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false, // By default all tabs has the screen (file) name, we want to disappear this and use our own lable below the icon using Text component
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 54,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="Home"
                icon={icons.home}
                color={color}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="favorites"
          options={{
            title: "Favorites",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="Favorites"
                icon={icons.bookmark}
                color={color}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "Share recipe",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="Share Recipe"
                icon={icons.plus}
                color={color}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="more"
          options={{
            title: "More",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="More"
                icon={icons.menu}
                color={color}
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default TabsLayout;
