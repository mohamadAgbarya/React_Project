import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage,ref  } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBo09A4gapBmSzx2usPSZM0eFcZFArTMPc",
  authDomain: "pet-store-e677c.firebaseapp.com",
  projectId: "pet-store-e677c",
  storageBucket: "pet-store-e677c.appspot.com",
  messagingSenderId: "197022295800",
  appId: "1:197022295800:web:cbd4dc9bdcdb78d2abbd0d",
  measurementId: "G-S2Z2D5BBV6"

};

export default firebaseConfig;


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
