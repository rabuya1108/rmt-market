import { db } from './firebase.js';
import { collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const price = Number(document.getElementById('price').value);
  const seller = document.getElementById('seller').value;
  const description = document.getElementById('description').value;

  try {
    await addDoc(collection(db, 'posts'), {
      title,
      price,
      seller,
      description,
      createdAt: serverTimestamp()
    });

    alert('出品完了！');
    // 入力欄をリセット（おまけ）
    e.target.reset();
  } catch (error) {
    console.error('出品エラー:', error);
    alert('エラーが発生しました');
  }
});