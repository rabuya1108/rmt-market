// firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

// Firebaseの設定（まさし用）
const firebaseConfig = {
  apiKey: "AIzaSyC-vljhQcGPgd3g4VLLUN5xkIzD0NTVNV8",
  authDomain: "rmt-market.firebaseapp.com",
  projectId: "rmt-market",
  storageBucket: "rmt-market.appspot.com", // ← 修正済み（.app ➝ .com）
  messagingSenderId: "573324963079",
  appId: "1:573324963079:web:ff9109e3bee9710ff529a2",
  measurementId: "G-219L8N300W"
};

// 初期化
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// エクスポートして他のファイルから使えるように
export { app, db, storage };