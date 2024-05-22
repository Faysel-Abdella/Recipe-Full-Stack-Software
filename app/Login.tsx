import { View,Text,ImageBackground,StyleSheet,KeyboardAvoidingView, TextInput, ActivityIndicator, Button } from "react-native";
import React, { useState } from "react";
// import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { createUserWithEmailAndPassword ,signInWithEmailAndPassword} from "firebase/auth";

const Login = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');   
     const [loading,setLoading]=useState(false);
     const auth=FIREBASE_AUTH
     const signIn=async () =>{
        setLoading(true);
        try{
            const response=await signInWithEmailAndPassword(auth,email,password)
        alert('check your emails!')
        }
        catch(error){
            console.log(error)
            alert('signin  failed!');
        }
        finally{
            setLoading(false);
        }
     };


     const signUp=async()=>{
        setLoading(true)
        try{    
            const response=await createUserWithEmailAndPassword(auth,email,password)
        
        }
        catch(error){
            console.log(error)
        }
        finally{
            setLoading(false);
        }
     }
     


  return (

<ImageBackground source={require('C:/Users/hp/Desktop/Development/Recipe-React-Native-Full-Stack-Software/assets/images/index.jpg')} style={{width: '100%', height: '100%'}}>
  <Text style={styles.innerText}>Let's get started...</Text>
<View style={styles.container}> 

    <KeyboardAvoidingView behavior="padding">
        <TextInput value={email} style={styles.input} placeholder="email" autoCapitalize="none" onChangeText={(text)=>setEmail(text)}></TextInput>
        <TextInput secureTextEntry={true} value={password} style={styles.input} placeholder="password" autoCapitalize="none" onChangeText={(text)=>setPassword(text)}></TextInput>
{loading ? (<ActivityIndicator size="large" color="#0000ff"/>): (
<>
 <Button title="Login" onPress={()=>signIn()}/>
 <Button title="don't have an account"  onPress={()=>signUp()}/>

</>
)}
</KeyboardAvoidingView>
         </View>
</ImageBackground>


    
 );
};

export default Login
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal:20,
    
  },
  
innerText:{
  color:'white',
  fontWeight:'bold',
  fontSize:45,
  margin:30,
  justifyContent:'center',
  display:'flex',
  alignItems:'center',
}


  ,
  input:{
    marginVertical:4,
    height:50,
    borderWidth:1,
    borderRadius:4,
    padding:10,
    backgroundColor:'#fff'
  }
});
