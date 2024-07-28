import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDHqFSvWGrEEdB_gGAWQsF58B3huoxuITw",
  authDomain: "getsetup-assignment.firebaseapp.com",
  projectId: "getsetup-assignment",
  storageBucket: "getsetup-assignment.appspot.com",
  messagingSenderId: "244992183359",
  appId: "1:244992183359:web:b295bbe18986c430e9bc8a",
  measurementId: "G-PSS5GXKPJE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
