 
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth'; 
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCAjYbPznWLRv-IMv5lfXW2Zs7roABEvkA",
  authDomain: "blogx-5fe73.firebaseapp.com",
  projectId: "blogx-5fe73",
  storageBucket: "blogx-5fe73.appspot.com",
  messagingSenderId: "164571703768",
  appId: "1:164571703768:web:2ad46c32bef8065b3beaad",
  measurementId: "G-SQEEVW32J6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);  
const storage = getStorage();

export {fireDB, auth, storage}