// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVLx9UPVbfhbvFNXURHXuu9mqzDt9_okk",
  authDomain: "reactnativeproject-f98ef.firebaseapp.com",
  projectId: "reactnativeproject-f98ef",
  storageBucket: "reactnativeproject-f98ef.appspot.com",
  messagingSenderId: "588836374087",
  appId: "1:588836374087:web:ac5c0a4fbae1d85b965362"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
