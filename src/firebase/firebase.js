import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAx3vfuDWgUlTnBnZ3nnuEulPF0lofWxAc",
  authDomain: "claim-management-a67f0.firebaseapp.com",
  projectId: "claim-management-a67f0",
  storageBucket: "claim-management-a67f0.firebasestorage.app",
  messagingSenderId: "804802549561",
  appId: "1:804802549561:web:21d18e6f33a58a5ab6bae8",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
