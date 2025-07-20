// submit-post.js

import { db, storage } from './app/firebase.js';
import { collection, addDoc, Timestamp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js';

const form = document.getElementById('postForm');
const imageInput = document.getElementById('imageInput');
const previewContainer = document.getElementById('imagePreview');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const itemName = document.getElementById('itemName').value;
  const itemPrice = document.getElementById('itemPrice').value;
  const sellerName = document.getElementById('sellerName').value;
  const itemDescription = document.getElementById('itemDescription').value;
  const files = [...imageInput.files].slice(0, 8);

  if (!itemName || !itemPrice || !sellerName) {
    alert('必須項目が入力されていません');
    return;
  }

  const imageUrls = [];

  for (const file of files) {
    const storageRef = ref(storage, 'images/' + Date.now() + '_' + file.name);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    imageUrls.push(downloadURL);
  }

  await addDoc(collection(db, 'posts'), {
    item: itemName,
    price: itemPrice,
    seller: sellerName,
    description: itemDescription,
    images: imageUrls,
    createdAt: Timestamp.now(),
  });

  alert('出品が完了しました！');
  form.reset();
  previewContainer.innerHTML = '';
});
