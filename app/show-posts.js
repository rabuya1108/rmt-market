import { db } from './firebase.js';
import { collection, getDocs, query, orderBy } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const postList = document.getElementById('postList');

const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));

getDocs(q).then(snapshot => {
  snapshot.forEach(doc => {
    const data = doc.data();
    const div = document.createElement('div');
    div.style.border = '1px solid #ccc';
    div.style.padding = '10px';
    div.style.margin = '10px';
    div.style.background = '#f9f9f9';

    div.innerHTML = `
      <h3>📌 ${data.title}</h3>
      <p>💴 ${data.price} 円</p>
      <p>🙋‍♂️ ${data.seller}</p>
      <p>${data.description || ''}</p>
    `;
    postList.appendChild(div);
  });
}).catch(error => {
  console.error('表示エラー:', error);
});