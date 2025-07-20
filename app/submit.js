import { db } from './firebase.js';
import { ref, push, onChildAdded, remove, update } from 'firebase/database';

const itemInput = document.getElementById('itemName');
const priceInput = document.getElementById('itemPrice');
const sellerInput = document.getElementById('sellerName');
const postBtn = document.getElementById('postBtn');
const postsContainer = document.getElementById('posts');

let editingKey = null;

postBtn.addEventListener('click', () => {
  const itemName = itemInput.value.trim();
  const itemPrice = priceInput.value.trim();
  const sellerName = sellerInput.value.trim();

  if (!itemName || !itemPrice || !sellerName) return;

  const postData = {
    item: itemName,
    price: itemPrice,
    seller: sellerName,
  };

  if (editingKey) {
    update(ref(db, 'posts/' + editingKey), postData);
    editingKey = null;
    postBtn.textContent = '出品';
  } else {
    push(ref(db, 'posts'), postData);
  }

  itemInput.value = '';
  priceInput.value = '';
});

onChildAdded(ref(db, 'posts'), (snapshot) => {
  const post = snapshot.val();
  const key = snapshot.key;

  const card = document.createElement('div');
  card.className = 'post-card';

  const name = document.createElement('p');
  name.innerHTML = `<strong>商品名:</strong> ${post.item}`;
  const price = document.createElement('p');
  price.innerHTML = `<strong>価格:</strong> ${post.price}`;
  const seller = document.createElement('p');
  seller.innerHTML = `<strong>出品者:</strong> ${post.seller}`;

  const editBtn = document.createElement('button');
  editBtn.textContent = '✏️ 編集';
  editBtn.className = 'edit-btn';
  editBtn.style.display = 'none';

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '🗑️ 削除';
  deleteBtn.className = 'delete-btn';
  deleteBtn.style.display = 'none';

  // 自分が投稿者ならボタン表示
  if (post.seller === sellerInput.value) {
    editBtn.style.display = 'inline-block';
    deleteBtn.style.display = 'inline-block';
  }

  editBtn.onclick = () => {
    itemInput.value = post.item;
    priceInput.value = post.price;
    sellerInput.value = post.seller;
    editingKey = key;
    postBtn.textContent = '保存';
  };

  deleteBtn.onclick = () => {
    if (confirm('この投稿を削除しますか？')) {
      remove(ref(db, 'posts/' + key));
      card.remove();
    }
  };

  card.appendChild(name);
  card.appendChild(price);
  card.appendChild(seller);
  card.appendChild(editBtn);
  card.appendChild(deleteBtn);
  postsContainer.appendChild(card);
});