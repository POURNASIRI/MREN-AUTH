// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIERBASE__API_KEY,
  authDomain: "mern-auth-9811b.firebaseapp.com",
  projectId: "mern-auth-9811b",
  storageBucket: "mern-auth-9811b.appspot.com",
  messagingSenderId: "643384422764",
  appId: "1:643384422764:web:f169a8230f1afb17170349"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);