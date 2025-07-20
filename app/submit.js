// submit.js - 出品処理とFirebase保存（画像対応） import { db } from './firebase.js'; import { ref, push } from 'firebase/database';

const itemInput = document.getElementById('itemName'); const priceInput = document.getElementById('itemPrice'); const sellerInput = document.getElementById('sellerName'); const descInput = document.getElementById('itemDesc'); const imageInputs = document.querySelectorAll('.image-input'); const postBtn = document.getElementById('postBtn');

postBtn.addEventListener('click', () => { const item = itemInput.value.trim(); const price = priceInput.value.trim(); const seller = sellerInput.value.trim(); const description = descInput.value.trim(); const images = [];

imageInputs.forEach(input => { if (input.value.trim() !== '') { images.push(input.value.trim()); } });

if (!item || !price || !seller) return alert('未入力の項目があります');

const postData = { item, price, seller, description, images }; push(ref(db, 'posts'), postData) .then(() => { itemInput.value = ''; priceInput.value = ''; sellerInput.value = ''; descInput.value = ''; imageInputs.forEach(input => input.value = ''); alert('出品しました'); }); });

