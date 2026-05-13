import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCoh1Cd1E4G2rqy83Hxs9DU21wKbYibh84",
  authDomain: "industrialstore-2699e.firebaseapp.com",
  projectId: "industrialstore-2699e",
  storageBucket: "industrialstore-2699e.firebasestorage.app",
  messagingSenderId: "740051499764",
  appId: "1:740051499764:web:bfcde421314886a6773ca1",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);

export default app;