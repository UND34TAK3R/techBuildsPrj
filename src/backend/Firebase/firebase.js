// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Realtime Database
import { getAuth } from "firebase/auth"; // Firebase Auth


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSYWr54DIlbT1sBUt7TfIcu_Hz3IX_23A",
  authDomain: "techbuilds-b8416.firebaseapp.com",
  projectId: "techbuilds-b8416",
  storageBucket: "techbuilds-b8416.appspot.com",
  messagingSenderId: "68936612274",
  appId: "1:68936612274:web:40b7e24e9f2024992f8cab",
  measurementId: "G-8WFDT7BXVR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Realtime Database
const auth = getAuth(app); // Initialize Firebase Auth

export { db, auth, app }; // Export Realtime Database and Auth
