import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { Video, ResizeMode } from "expo-av";

import FormField from "@/components/FormField";
import { icons } from "@/constants";
import CustomButton from "@/components/CustomButton";

import { router } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";

import { postFeed } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const Create = () => {
  const [selectedValue, setSelectedValue] = useState("option1");
  const { user } = useGlobalContext();

  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<any>({
    category: "",
    title: "",
    description: "",
    minutes: "",
    calory: "",
    thumbnail: null,
    video: null,
  });

  const openPicker = async (selectType: any) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        selectType === "image"
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // We have to make sure that the user hasn't cancelled

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({ ...form, thumbnail: result.assets[0] });
      }

      if (selectType === "video") {
        setForm({ ...form, video: result.assets[0] });
      }
    }
  };

  const submit = async () => {
    if (
      !form.category ||
      !form.title ||
      !form.description ||
      !form.minutes ||
      !form.calory ||
      !form.thumbnail ||
      !form.video
    ) {
      return Alert.alert("Please fill in all the fields");
    }

    setUploading(true);

    try {
      await postFeed({
        ...form,
        userId: user.$id,
      });
      Alert.alert("Success", "Post uploaded successfully");
      router.push("/home");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });

      setUploading(false);
    }
  };

  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView className="bg-gray-800 pt-10">
      <ScrollView className="px-4  my-6">
        <Text className="text-2xl text-white font-psemibold">
          Share your recipe with others!
        </Text>

        <View className="mt-7">
          <Text className="text-base text-gray-100 font-pmedium">
            Select an Option:
          </Text>
          <View className="text-white bg-black-100 border-2 border-black-200   rounded-2xl focus:border-secondary ">
            <Picker
              dropdownIconColor="white"
              selectedValue={selectedValue}
              onValueChange={(itemValue, itemIndex) => {
                setForm({ ...form, category: itemValue });
                setSelectedValue(itemValue);
              }}
              dropdownIconRippleColor={"yellow"}
              onFocus={() => {
                setModalVisible(true);
              }}
              onBlur={() => {
                setModalVisible(false);
              }}
            >
              <Picker.Item
                label="Breakfast"
                value="breakfast"
                style={{ color: isModalVisible ? "black" : "white" }}
              />
              <Picker.Item
                label="Lunch"
                value="lunch"
                style={{ color: isModalVisible ? "black" : "white" }}
              />
              <Picker.Item
                style={{ color: isModalVisible ? "black" : "white" }}
                label="dinner"
                value="dinner"
              />
            </Picker>
          </View>
        </View>

        <FormField
          title="Recipe Name"
          value={form.title}
          placeholder="Give your recipe a title..."
          handleChangeText={(e: any) => setForm({ ...form, title: e })}
          otherStyle="mt-10"
        />

        <FormField
          multiline={true}
          title="Describe your recipe"
          value={form.description}
          placeholder="How to prepare this recipe, ingredients, etc..."
          handleChangeText={(e: any) => setForm({ ...form, description: e })}
          otherStyle="mt-10"
        />

        <FormField
          title="Minutes to prepare"
          value={form.minutes}
          placeholder=" How many minutes to prepare this ?"
          keyboardType="numeric"
          handleChangeText={(e: any) => setForm({ ...form, minutes: e })}
          otherStyle="mt-10"
        />

        <FormField
          title="Calories"
          value={form.calory}
          placeholder=" How many calories in this recipe?"
          keyboardType="numeric"
          handleChangeText={(e: any) => setForm({ ...form, calory: e })}
          otherStyle="mt-10"
        />

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>

          <TouchableOpacity onPress={() => openPicker("video")}>
            {/* If the video is uploaded we show the video if not we show the upload icon image */}
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-7 space-y-2 ">
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail Image
          </Text>

          <TouchableOpacity onPress={() => openPicker("image")}>
            {/* If the video is uploaded we show the video if not we show the upload icon image */}
            {form.thumbnail ? (
              <Image
                source={form.thumbnail}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="w-5 h-5"
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choice a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <CustomButton
          title="Submit & Publish"
          handleClick={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
