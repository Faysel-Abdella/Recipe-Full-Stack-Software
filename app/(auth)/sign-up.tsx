import React, { useState } from "react";
import { Text, View, Image, Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { signUpInfo } from "@/globalTypes";
import { createUser } from "@/lib/appwrite";

import { useGlobalContext } from "@/context/GlobalProvider";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { setUser, setIsLoggedIn } = useGlobalContext();

  const [form, setForm] = useState<signUpInfo>({
    username: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    if (!form.email || !form.password || !form.username) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    setIsSubmitting(true);

    try {
      const newUser = await createUser(
        form.email,
        form.password,
        form.username
      );

      setUser(newUser);
      setIsLoggedIn(true);

      router.replace("/home");
    } catch (error: any) {
      console.log(error);
      Alert.alert("Error", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Sign up and start cooking
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e: any) => setForm({ ...form, username: e })}
            otherStyle="mt-7"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e: any) => setForm({ ...form, email: e })}
            otherStyle="mt-7"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e: any) => setForm({ ...form, password: e })}
            otherStyle="mt-7"
          />

          <CustomButton
            title="Sign Up"
            handleClick={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="text-secondary text-lg font-psemibold"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
