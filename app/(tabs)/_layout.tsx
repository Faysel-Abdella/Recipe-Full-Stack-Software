import React, { useState } from "react";
import {
  View,
  Text,
  ImageSourcePropType,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Tabs, router } from "expo-router";

import { signOut } from "@/lib/appwrite";
import icons from "../../constants/icons";
import { StatusBar } from "expo-status-bar";
import { useGlobalContext } from "@/context/GlobalProvider";

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
  const [showLogout, setShowLogout] = useState(false);

  const { user, setUser, setIsLoggedIn } = useGlobalContext();

  const handleLogout = async () => {
    console.log("Logged out");
    await signOut();
    setUser(null);
    setIsLoggedIn(false);
    router.replace("/sign-in");
  };

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
              <TouchableOpacity
                onPress={() => {
                  setShowLogout(!showLogout);
                }}
              >
                <TabIcon
                  name="More"
                  icon={icons.menu}
                  color={color}
                  focused={focused}
                />
              </TouchableOpacity>
            ),
          }}
        />
      </Tabs>
      {showLogout && (
        <View style={styles.logoutMenu}>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
  },
  icon: {
    width: 24,
    height: 24,
  },
  iconText: {
    fontSize: 12,
  },
  iconTextFocused: {
    fontWeight: "600",
  },
  iconTextRegular: {
    fontWeight: "400",
  },
  logoutMenu: {
    position: "absolute",
    bottom: 60, // Adjust this value based on your tab bar height
    right: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  logoutButton: {
    padding: 10,
  },
  logoutText: {
    color: "#ff0000",
  },
});
