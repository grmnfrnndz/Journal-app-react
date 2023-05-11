// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore/lite';
import {getEnvironments} from "../helpers/index.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const {
  VITE_APIKEY:apiKey,
  VITE_AUTHDOMAIN:authDomain,
  VITE_PROJECTID:projectId,
  VITE_STORAGEBUCKET:storageBucket,
  VITE_MESSAGINGSENDERID:messagingSenderId,
  VITE_APPID:appId,
} = getEnvironments();

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);