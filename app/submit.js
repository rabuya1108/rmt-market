import { db } from './firebase.js';
import { ref, push, onChildAdded, remove, update } from 'firebase/database';

const itemInput = document.getElementById('itemName');
const priceInput = document.getElementById('itemPrice');
const sellerInput = document.getElementById('sellerName');
const postBtn = document.getElementById('postBtn');
const postsContainer = document.getElementById('posts');

let editingKey = null;

// 投稿ボタン処理
postBtn?.addEventListener('click', () => {
  const itemName = itemInput.value;
  const itemPrice = priceInput.value;
  const sellerName = sellerInput.value;

  if (!itemName || !itemPrice || !sellerName) return;

  const postData = {
    item: itemName,
    price: itemPrice,
    seller: sellerName,
    description: '', // あとで編集可能にする
  };

  push(ref(db, 'posts'), postData);

  itemInput.value = '';
  priceInput.value = '';
  sellerInput.value = '';
});

// 投稿一覧表示処理
onChildAdded(ref(db, 'posts'), (snapshot) => {
  const post = snapshot.val();
  const key = snapshot.key;

  const card = document.createElement('div');
  card.className = 'post-card';
  card.style.cursor = 'pointer';
  card.onclick = () => {
    window.location.href = `post.html?id=${key}`;
  };

  const title = document.createElement('h3');
  title.textContent = post.item;

  const price = document.createElement('p');
  price.textContent = `💴 ${post.price}円`;

  const seller = document.createElement('p');
  seller.textContent = `👤 出品者: ${post.seller}`;

  card.appendChild(title);
  card.appendChild(price);
  card.appendChild(seller);

  postsContainer?.appendChild(card);
});