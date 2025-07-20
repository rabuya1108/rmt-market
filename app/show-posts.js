// app/show-posts.js
import { db } from './firebase.js';
import { collection, getDocs, query, orderBy } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const postList = document.getElementById('postList');

const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));

getDocs(q).then(snapshot => {
  postList.innerHTML = ''; // ← 先に中身をリセット！
  snapshot.forEach(doc => {
    const data = doc.data();
    const card = document.createElement('div');
    card.style.border = '1px solid #ccc';
    card.style.padding = '12px';
    card.style.margin = '12px';
    card.style.borderRadius = '8px';
    card.style.backgroundColor = '#fff';

    card.innerHTML = `
      <h3>📝 ${data.item}</h3>
      <p>💴 ${data.price}円</p>
      <p>🙋‍♂️ 出品者: ${data.seller}</p>
      <p>${data.description || ''}</p>
      ${data.images && data.images.length > 0 ? `<img src="${data.images[0]}" style="max-width:100px;">` : ''}
    `;

    postList.appendChild(card);
  });
}).catch(error => {
  console.error('データ取得エラー:', error);
});