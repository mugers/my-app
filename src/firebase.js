import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
 
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

export { db };