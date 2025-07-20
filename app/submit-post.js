import { db } from './firebase.js';
import { collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const item = document.getElementById('title').value;
  const price = document.getElementById('price').value;
  const seller = document.getElementById('seller').value;
  const description = document.getElementById('description').value;
  const files = document.getElementById('images').files;

  let imageUrls = [];

  // 画像は後回しでOK
  // 必要なら Firebase Storage 実装する

  try {
    await addDoc(collection(db, 'posts'), {
      item,
      price,
      seller,
      description,
      images: imageUrls,
      createdAt: serverTimestamp()  // ←これ重要！！
    });

    alert('出品が完了しました！');
    window.location.href = 'index.html';
  } catch (error) {
    console.error('出品エラー:', error);
    alert('エラーが発生しました');
  }
});