import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBGY0MHi-h3EDWq-MrQWcfgewyq2px7tw8",
  authDomain: "car-sell-2b999.firebaseapp.com",
  projectId: "car-sell-2b999",
  storageBucket: "car-sell-2b999.appspot.com",
  messagingSenderId: "372909544742",
  appId: "1:372909544742:web:52836023efaaaf86e55de7",
  measurementId: "G-LSV0B498LT"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app); 