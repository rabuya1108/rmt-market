export default function Home() {
  const listings = [
    { id: 1, title: '🎮 モンハン：護石代行', price: '1000円', user: '代行屋A' },
    { id: 2, title: '💰 FF14：ギル1000万', price: '1500円', user: 'ギル販売X' },
    { id: 3, title: '📦 原神：星5アカウント', price: '2500円', user: '神引き屋' },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>🛍 出品一覧</h1>
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
            🙋‍♂️ 出品者: {item.user}
          </li>
        ))}
      </ul>
    </div>
  );
}