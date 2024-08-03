// Import the functions you need from the SDKs you need
import { initializeApp,getApps, getApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVfbO1TNc9FBCpGpatQ2PzZwhfDYBXfFw",
  authDomain: "collegemoments-ffa88.firebaseapp.com",
  projectId: "collegemoments-ffa88",
  storageBucket: "collegemoments-ffa88.appspot.com",
  messagingSenderId: "10553889636",
  appId: "1:10553889636:web:d06821ccdb4dcf9b5e2071",
  measurementId: "G-T9KL2CSGZ1"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const app= !getApps().length ? initializeApp(firebaseConfig): getApp()
const auth= getAuth(app)
const provider= new GoogleAuthProvider()
export {app, auth, provider}