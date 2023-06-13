import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

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

// Get a reference to the Firestore service
const db = getFirestore(app);

// Get a reference to the auth service
export const auth = getAuth(app);

// Export the database
export const firestore = db;

export default app;