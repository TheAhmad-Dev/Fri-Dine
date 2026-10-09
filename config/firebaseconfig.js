import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCT5wcCTqx63nnsWKqmEfEDoMz9PpCGYIc",
  authDomain: "fri-dine-1d8d6.firebaseapp.com",
  databaseURL: "https://fri-dine-1d8d6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fri-dine-1d8d6",
  storageBucket: "fri-dine-1d8d6.firebasestorage.app",
  messagingSenderId: "559715891550",
  appId: "1:559715891550:web:dad8fdbc8492fb1bd937cf",
};

const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApp();

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;