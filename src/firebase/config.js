// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOs7gXrho2m0NzsDNBr2kuAALQvhfkwps",
  authDomain: "journal-app-react-4a327.firebaseapp.com",
  projectId: "journal-app-react-4a327",
  storageBucket: "journal-app-react-4a327.appspot.com",
  messagingSenderId: "682352122007",
  appId: "1:682352122007:web:026ab283adbb50d48d71d2"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);