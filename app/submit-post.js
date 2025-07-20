// submit-post.js

import { db, storage } from './firebase.js';
import { collection, addDoc, Timestamp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js';

const form = document.getElementById('postForm');
const imageInput = document.getElementById('imageInput');
const previewContainer = document.getElementById('imagePreview');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const itemName = document.getElementById('itemName').value.trim();
  const itemPrice = document.getElementById('itemPrice').value.trim();
  const sellerName = document.getElementById('sellerName').value.trim();
  const itemDescription = document.getElementById('itemDescription').value.trim();
  const files = [...imageInput.files].slice(0, 8); // 最大8枚

  if (!itemName || !itemPrice || !sellerName) {
    alert('必須項目（タイトル・価格・出品者名）を入力してください');
    return;
  }

  const imageUrls = [];

  try {
    for (const file of files) {
      const storageRef = ref(storage, `images/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      imageUrls.push(url);
    }

    await addDoc(collection(db, 'posts'), {
      item: itemName,
      price: itemPrice,
      seller: sellerName,
      description: itemDescription,
      images: imageUrls,
      createdAt: Timestamp.now(),
    });

    alert('✅ 出品が完了しました！');
    form.reset();
    previewContainer.innerHTML = '';
  } catch (error) {
    console.error('出品エラー:', error);
    alert('エラーが発生しました。もう一度お試しください。');
  }
});