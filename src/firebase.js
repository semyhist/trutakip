import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCyvRoBBvMwHzRY4eDF5cySQmuQhZBAPgc",
  authDomain: "trudevamsizlik.firebaseapp.com",
  projectId: "trudevamsizlik",
  storageBucket: "trudevamsizlik.firebasestorage.app",
  messagingSenderId: "1093027829779",
  appId: "1:1093027829779:web:b5cb03992ecb7c8f2147e6",
  measurementId: "G-TDQVY3C6Y2"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
