import React from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import images from "../constants/images";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";




import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
import Login from "./Login";
// import List from './app/screens/List';
// import Details from './app/screens/Details';
import { useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import Home from "./(tabs)/home";
const Stack=createNativeStackNavigator();
const InsideStack=createNativeStackNavigator();

function InsideLayout(){
  return (
<InsideStack.Navigator >

  <InsideStack.Screen name="Home screen" component={Home}/>


</InsideStack.Navigator>);
}

export default function App() {

  const [user,setUser] = useState<User | null>(null);
useEffect(()=> {
  onAuthStateChanged(FIREBASE_AUTH,(user)=>{
    console.log('user',user);
  setUser(user);
  });
},[])
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app THANK YOU GOD!</Text>
    //   <StatusBar style="auto" />
    // </View>
      <Stack.Navigator initialRouteName='Login'>
{user ? (    <Stack.Screen name='Inside' component={InsideLayout} options={{headerShown:false}}/>)
 : (    <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/>
)}


      </Stack.Navigator>
     


  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });





























// const App = () => {
//   return (
//     <SafeAreaView>
//       <View className="relative h-full w-full">
//         <View className="absolute z-10 top-0  mt-20 ">
//           <View className="left-6">
//             <Text className="text-slate-200 text-4xl font-psemibold">
//               Cooking &
//             </Text>
//             <Text className="text-white text-3xl font-psemibold ">
//               Delicious Food Easily
//             </Text>

//             <Text className="text-slate-50 text-lg font-pmedium mt-9">
//               Discover more than 100 food recipes in your hands and cooking it
//               easily!
//             </Text>
//           </View>


      //     <View className="left-4">
      //       <CustomButton
      //         containerStyles="mt-10"
      //         handleClick={() => router.push("/home")}
      //         isLoading={false}
      //         textStyles=""
      //         title="Get Started"
      //       />
      //     </View>
      //   </View>

        // <Image
        //   source={images.index}
        //   className="h-full w-full"
        //   resizeMode="cover"
        // />
      // </View>
//     </SafeAreaView>
//   );
// };

