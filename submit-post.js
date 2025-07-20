// submit-post.js
import { db, storage } from './firebase.js';
import { collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js';

const form = document.getElementById('postForm');
const imageInput = document.getElementById('imageInput');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('itemName').value;
  const price = document.getElementById('itemPrice').value;
  const seller = document.getElementById('sellerName').value;
  const description = document.getElementById('itemDescription').value;
  const files = imageInput.files;

  if (!title || !price || !seller) {
    alert("タイトル・価格・出品者名を入力してください。");
    return;
  }

  // 画像アップロード処理
  const imageUrls = [];

  for (let i = 0; i < Math.min(files.length, 8); i++) {
    const file = files[i];
    const storageRef = ref(storage, 'images/' + Date.now() + '_' + file.name);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    imageUrls.push(downloadURL);
  }

  // Firestoreに保存
  try {
    await addDoc(collection(db, 'posts'), {
      title,
      price,
      seller,
      description,
      imageUrls,
      createdAt: serverTimestamp()
    });
    alert('出品が完了しました！');
    form.reset();
    document.getElementById('imagePreview').innerHTML = '';
  } catch (err) {
    console.error('出品エラー:', err);
    alert('出品に失敗しました。');
  }
});