import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Auth
import { getAuth } from "firebase/auth";

// Storage
import { getStorage } from "firebase/storage";

// Functions
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyD0YNrXKgLsR0HLzm1KrJkFAkekVzdc37I",
  authDomain: "instagram-2026-ae5e0.firebaseapp.com",
  projectId: "instagram-2026-ae5e0",
  storageBucket: "instagram-2026-ae5e0.firebasestorage.app",
  messagingSenderId: "1052694223595",
  appId: "1:1052694223595:web:2e59e344a4f7126b367cae",
  
};



const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
