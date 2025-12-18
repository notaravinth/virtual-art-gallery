import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCCT0yyIz7QMeT3xn4TIJce7Uja-9bIg9U",
  authDomain: "virtual-art-gallery-eaf83.firebaseapp.com",
  projectId: "virtual-art-gallery-eaf83",
  appId: "1:18362983952:web:6c0dfd2fa52a3fd1fc0c95"
};

const app = initializeApp(firebaseConfig);

// Export only what we need for the hybrid system
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();