// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-vljhQcGPgd3g4VLLUN5xkIzD0NTVNV8",
  authDomain: "rmt-market.firebaseapp.com",
  projectId: "rmt-market",
  storageBucket: "rmt-market.firebasestorage.app",
  messagingSenderId: "573324963079",
  appId: "1:573324963079:web:ff9109e3bee9710ff529a2",
  measurementId: "G-219L8N300W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export { app };