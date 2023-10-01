import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyBBUADquTSVJXfVOG5MOodJ__s2bNe6Jl8",
  authDomain: "next-projesi.firebaseapp.com",
  projectId: "next-projesi",
  storageBucket: "next-projesi.appspot.com",
  messagingSenderId: "939758895207",
  appId: "1:939758895207:web:fe75ad75f86e4d2c88d4c2",
  measurementId: "G-2Y3LMR5ECN"
};

const app = initializeApp(firebaseConfig);
export const auth =getAuth(app)
export const db =getFirestore(app)
export const storage =getStorage(app)


export default app