import { useState } from 'react';

export default function Home() {
  const [listings, setListings] = useState([
    { id: 1, title: '🎮 モンハン：護石代行', price: '1000円', user: '代行屋A' },
    { id: 2, title: '💰 FF14：ギル1000万', price: '1500円', user: 'ギル販売X' },
    { id: 3, title: '📦 原神：星5アカウント', price: '2500円', user: '神引き屋' }
  ]);

  const [newItem, setNewItem] = useState({ title: '', price: '', user: '' });

  const addListing = () => {
    if (!newItem.title || !newItem.price || !newItem.user) return;
    const newId = listings.length + 1;
    setListings([...listings, { id: newId, ...newItem }]);
    setNewItem({ title: '', price: '', user: '' }); // 入力クリア
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>🛍️ 出品一覧</h1>

      {/* 🔽 入力フォーム */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="タイトル"
          value={newItem.title}
          onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
          style={{ marginRight: '10px' }}
        />
        <input
          type="text"
          placeholder="価格"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          style={{ marginRight: '10px' }}
        />
        <input
          type="text"
          placeholder="出品者名"
          value={newItem.user}
          onChange={(e) => setNewItem({ ...newItem, user: e.target.value })}
          style={{ marginRight: '10px' }}
        />
        <button onClick={addListing}>出品する</button>
      </div>

      {/* 🔽 出品一覧 */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {listings.map((item) => (
          <li
            key={item.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '10px',
              marginBottom: '10px',
              background: '#f9f9f9'
            }}
          >
            <strong>{item.title}</strong><br />
            💴 {item.price}<br />
            🧑‍💻 出品者: {item.user}
          </li>
        ))}
      </ul>
    </div>
  );
}