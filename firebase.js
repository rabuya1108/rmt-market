import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // ← 追加！

const firebaseConfig = {
  apiKey: "AIzaSyC-vljhQcGPgd3g4VLLUN5xkIzD0NTVNV8",
  authDomain: "rmt-market.firebaseapp.com",
  projectId: "rmt-market",
  storageBucket: "rmt-market.firebasestorage.app",
  messagingSenderId: "573324963079",
  appId: "1:573324963079:web:ff9109e3bee9710ff529a2",
  measurementId: "G-219L8N300W"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // ← Firestoreインスタンス作成

export { app, db }; // ← dbをエクスポート