import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {  getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDK6CbDOo9HS5xE_pUJLritrwb-DAo745M",
  authDomain: "cafelogin-9dffa.firebaseapp.com",
  projectId: "cafelogin-9dffa",
  storageBucket: "cafelogin-9dffa.appspot.com",
  messagingSenderId: "922808217107",
  appId: "1:922808217107:web:5c98aab65d6e530bfbd9e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);