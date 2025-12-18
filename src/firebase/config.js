import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCCT0yyIz7QMeT3xn4TIJce7Uja-9bIg9U",
  authDomain: "virtual-art-gallery-eaf83.firebaseapp.com",
  projectId: "virtual-art-gallery-eaf83",
  storageBucket: "virtual-art-gallery-eaf83.firebasestorage.app",
  messagingSenderId: "18362983952",
  appId: "1:18362983952:web:6c0dfd2fa52a3fd1fc0c95"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);