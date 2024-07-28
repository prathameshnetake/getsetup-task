// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
