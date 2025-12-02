// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDzxb-O-pX8-UOgxmKs2ORlYPhXti_sAYo",
  authDomain: "local-service-2.firebaseapp.com",
  projectId: "local-service-2",
  storageBucket: "local-service-2.firebasestorage.app",
  messagingSenderId: "905166062258",
  appId: "1:905166062258:web:5fa8b6071ecf30821bbfab",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const serverTime = serverTimestamp;

export default app;
