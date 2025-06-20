// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB17gsJomJxdm7PEecYQgndWougRZzXbwM",
  authDomain: "gyaku-furima.firebaseapp.com",
  projectId: "gyaku-furima",
  storageBucket: "gyaku-furima.firebasestorage.app",
  messagingSenderId: "885620010102",
  appId: "1:885620010102:web:69878c25493491d0154357",
  measurementId: "G-BSTJBSMRJH"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);