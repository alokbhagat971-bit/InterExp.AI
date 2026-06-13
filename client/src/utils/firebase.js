
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interexp-51f10.firebaseapp.com",
  projectId: "interexp-51f10",
  storageBucket: "interexp-51f10.firebasestorage.app",
  messagingSenderId: "732560101507",
  appId: "1:732560101507:web:9ae4f90369409f28928bb6"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider };