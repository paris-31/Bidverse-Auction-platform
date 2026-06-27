import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Web app's Firebase configuration

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRh6ZRyuzkBnRUMY8iamX_0TksUcRprL8",
  authDomain: "auction-system-a5b0b.firebaseapp.com",
  projectId: "auction-system-a5b0b",
  storageBucket: "auction-system-a5b0b.firebasestorage.app",
  messagingSenderId: "363892220250",
  appId: "1:363892220250:web:ef803fb913d86416bc1363",
  measurementId: "G-17VQ3B2DYV"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
export const db = getFirestore(app);
export const auth = getAuth(app);
