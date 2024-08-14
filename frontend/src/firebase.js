// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "threads-739de.firebaseapp.com",
  projectId: "threads-739de",
  storageBucket: "threads-739de.appspot.com",
  messagingSenderId: "763331682151",
  appId: "1:763331682151:web:9ea15a0bd966287e35d9c2",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
