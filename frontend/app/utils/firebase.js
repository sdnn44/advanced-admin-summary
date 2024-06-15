// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBS_4rpHxQiY2j6LIyygFT_8GpLLgb2H2Y",
  authDomain: "strefaskilla-helper.firebaseapp.com",
  databaseURL: "https://strefaskilla-helper-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "strefaskilla-helper",
  storageBucket: "strefaskilla-helper.appspot.com",
  messagingSenderId: "106532216380",
  appId: "1:106532216380:web:3c3f8faa6158b0dbed2d39",
  measurementId: "G-0BD07VQM76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase();