import React, { useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";

import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { getCurrentUser, signIn } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
import { signInInfo } from "@/globalTypes";

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [form, setForm] = useState<signInInfo>({
    email: "",
    password: "",
  });

  const { setUser, setIsLoggedIn } = useGlobalContext();

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    setIsSubmitting(true);

    try {
      console.log(form.email, form.password);

      const currentUser = getCurrentUser();

      setUser(currentUser);
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
            Log in to your account
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e: any) => setForm({ ...form, email: e })}
            otherStyle="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e: any) => setForm({ ...form, password: e })}
            otherStyle="mt-7"
          />

          <CustomButton
            title="Sign In"
            handleClick={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account ?
            </Text>
            <Link
              href="/sign-up"
              className="text-secondary text-lg font-psemibold"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
