// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9lVpD0xYofe_lVNjWw2iFC1oLN02dPqQ",
  authDomain: "e-commerce-firebase-8910b.firebaseapp.com",
  projectId: "e-commerce-firebase-8910b",
  storageBucket: "e-commerce-firebase-8910b.appspot.com",
  messagingSenderId: "304978057405",
  appId: "1:304978057405:web:234d2d018e913024e27fd4",
  measurementId: "G-5JRDX3VEZ4"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

export default firebaseApp