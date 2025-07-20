import { db } from "./firebase.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const form = document.getElementById("itemForm");
const status = document.getElementById("status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const price = Number(document.getElementById("price").value);
  const description = document.getElementById("description").value;

  try {
    await addDoc(collection(db, "items"), {
      title,
      price,
      description,
      createdAt: serverTimestamp()
    });

    status.textContent = "✅ 出品が完了しました！";
    form.reset();
  } catch (error) {
    console.error("保存失敗:", error);
    status.textContent = "❌ 保存に失敗しました…";
  }
});
