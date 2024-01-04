// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/auth";
import { getFirestore } from "firebase/firestore";

export let app: FirebaseApp;

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTHMDOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENTER_ID,
  appId: import.meta.env.VITE_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

try {
  app = getApp("app");
} catch (e) {
  app = initializeApp(firebaseConfig, "app");
}

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);
export const db = getFirestore(app);
export default firebase;
