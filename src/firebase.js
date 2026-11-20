import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAD6_qaR9Z-F4AQu343JV8cnYgvsuz6kdI",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "gps-tracking-cameroun.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "gps-tracking-cameroun",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "gps-tracking-cameroun.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1070298677030",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1070298677030:web:1e344bd8f2bfbfeb584be7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
