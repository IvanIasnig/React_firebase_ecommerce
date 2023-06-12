// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyCP3ZymwId655dI7AsUOM2wRUTwL2v5c",
  authDomain: "auth-ecommerce-bbf68.firebaseapp.com",
  projectId: "auth-ecommerce-bbf68",
  storageBucket: "auth-ecommerce-bbf68.appspot.com",
  messagingSenderId: "501170396498",
  appId: "1:501170396498:web:5478a3a6742005713cae8b",
  measurementId: "G-K9HR0X25QL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;