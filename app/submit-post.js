// app/submit-post.js
import { db } from './firebase.js';
import { collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

document.getElementById('postForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const item = document.getElementById('item').value;
  const price = document.getElementById('price').value;
  const seller = document.getElementById('seller').value;
  const description = document.getElementById('description').value;
  const imageInput = document.getElementById('images');
  
  const imageUrls = [];

  for (let file of imageInput.files) {
    const url = URL.createObjectURL(file);
    imageUrls.push(url); // 仮：本番はFirebase Storage推奨
  }

  try {
    await addDoc(collection(db, 'posts'), {
      item,
      price,
      seller,
      description,
      images: imageUrls,
      createdAt: serverTimestamp()
    });
    alert('出品完了！');
    location.href = '/'; // 出品後トップへ戻る
  } catch (err) {
    console.error('出品エラー:', err);
    alert('出品に失敗しました');
  }
});