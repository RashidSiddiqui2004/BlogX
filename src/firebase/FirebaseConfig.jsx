 
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth'; 
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB5ylaLHHEiE7hjBJ4DRFBYic0BkteMiMA",
  authDomain: "blogx-65fc0.firebaseapp.com",
  projectId: "blogx-65fc0",
  storageBucket: "blogx-65fc0.appspot.com",
  messagingSenderId: "669856330603",
  appId: "1:669856330603:web:afe596821303f623b2522e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app); 
// Create a root reference
const storage = getStorage();

export {fireDB, auth, storage}