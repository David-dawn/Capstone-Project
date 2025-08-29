// lib/firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBRYRWGaZq_X77PEYMA9LuGTjsxy_PS8zU",
  authDomain: "todo-list-b0f4e.firebaseapp.com",
  projectId: "todo-list-b0f4e",
  storageBucket: "todo-list-b0f4e.firebasestorage.app",
  messagingSenderId: "915126387282",
  appId: "1:915126387282:web:bfbdc772bb107416c4958b",
  measurementId: "G-HVJZXW6QJ8"
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
