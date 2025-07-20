import { db } from './firebase.js';
import { ref, push, onChildAdded, remove, update } from 'firebase/database';

const itemInput = document.getElementById('itemName');
const priceInput = document.getElementById('itemPrice');
const sellerInput = document.getElementById('sellerName');
const imageInput = document.getElementById('itemImage');
const postBtn = document.getElementById('postBtn');
const postsContainer = document.getElementById('posts');

let editingKey = null;

postBtn.addEventListener('click', () => {
  const itemName = itemInput.value;
  const itemPrice = priceInput.value;
  const sellerName = sellerInput.value;
  const imageUrl = imageInput.value;

  if (!itemName || !itemPrice || !sellerName) return;

  const postData = {
    item: itemName,
    price: itemPrice,
    seller: sellerName,
    image: imageUrl || ""
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
  sellerInput.value = '';
  imageInput.value = '';
});

onChildAdded(ref(db, 'posts'), (snapshot) => {
  const post = snapshot.val();
  const key = snapshot.key;

  const card = document.createElement('div');
  card.className = 'post-card';

  if (post.image) {
    const img = document.createElement('img');
    img.src = post.image;
    img.alt = post.item;
    img.style.maxWidth = '100%';
    img.style.borderRadius = '8px';
    card.appendChild(img);
  }

  const name = document.createElement('p');
  name.innerHTML = `<strong>商品名:</strong> ${post.item}`;

  const price = document.createElement('p');
  price.innerHTML = `<strong>価格:</strong> ${post.price}`;

  const seller = document.createElement('p');
  seller.innerHTML = `<strong>出品者:</strong> ${post.seller}`;

  const editBtn = document.createElement('button');
  editBtn.textContent = '✏️ 編集';
  editBtn.style.display = 'none';

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '🗑️ 削除';
  deleteBtn.style.display = 'none';

  if (post.seller === sellerInput.value) {
    editBtn.style.display = 'inline-block';
    deleteBtn.style.display = 'inline-block';
  }

  editBtn.onclick = () => {
    itemInput.value = post.item;
    priceInput.value = post.price;
    sellerInput.value = post.seller;
    imageInput.value = post.image || '';
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