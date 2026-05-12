import { Link } from 'react-router-dom'
import { useState } from 'react'

const allProducts = [
  { id: 1, name: 'Intel Core i5-13600K', price: 24500, category: 'Processor', emoji: '⚙️', stock: true, warranty: '3 Years' },
  { id: 2, name: 'Intel Core i7-13700K', price: 35000, category: 'Processor', emoji: '⚙️', stock: true, warranty: '3 Years' },
  { id: 3, name: 'AMD Ryzen 5 7600X', price: 22000, category: 'Processor', emoji: '⚙️', stock: true, warranty: '3 Years' },
  { id: 4, name: 'RTX 4060 8GB', price: 33000, category: 'GPU', emoji: '🎮', stock: true, warranty: '3 Years' },
  { id: 5, name: 'RTX 4070 12GB', price: 55000, category: 'GPU', emoji: '🎮', stock: true, warranty: '3 Years' },
  { id: 6, name: 'RX 7600 8GB', price: 28000, category: 'GPU', emoji: '🎮', stock: false, warranty: '3 Years' },
  { id: 7, name: 'Samsung 16GB DDR5', price: 7200, category: 'RAM', emoji: '💾', stock: true, warranty: '5 Years' },
  { id: 8, name: 'Corsair 32GB DDR5', price: 13500, category: 'RAM', emoji: '💾', stock: true, warranty: '5 Years' },
  { id: 9, name: 'ASUS B760M Motherboard', price: 14800, category: 'Motherboard', emoji: '🔌', stock: true, warranty: '3 Years' },
  { id: 10, name: 'MSI Z790 Tomahawk', price: 28000, category: 'Motherboard', emoji: '🔌', stock: true, warranty: '3 Years' },
  { id: 11, name: 'Samsung 980 Pro 1TB', price: 8500, category: 'Storage', emoji: '💿', stock: true, warranty: '5 Years' },
  { id: 12, name: 'WD Black 2TB SSD', price: 16000, category: 'Storage', emoji: '💿', stock: true, warranty: '5 Years' },
  { id: 13, name: 'Cooler Master Hyper 212', price: 3100, category: 'Cooling', emoji: '❄️', stock: false, warranty: '2 Years' },
  { id: 14, name: 'Noctua NH-D15', price: 9500, category: 'Cooling', emoji: '❄️', stock: true, warranty: '6 Years' },
  { id: 15, name: 'Corsair 4000D Cabinet', price: 8200, category: 'Cabinet', emoji: '🖥️', stock: true, warranty: '2 Years' },
  { id: 16, name: 'SMPS Corsair 650W', price: 7800, category: 'PSU', emoji: '⚡', stock: true, warranty: '5 Years' },
]

const categories = ['All', 'Processor', 'GPU', 'RAM', 'Motherboard', 'Storage', 'Cooling', 'Cabinet', 'PSU']

export default function Products() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('ifix_cart') || '[]'))
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = allProducts.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const addToCart = (product) => {
    const existing = cart.find(i => i.id === product.id)
    let updated
    if (existing) {
      updated = cart.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
    } else {
      updated = [...cart, { ...product, qty: 1 }]
    }
    setCart(updated)
    localStorage.setItem('ifix_cart', JSON.stringify(updated))
    alert(`✅ ${product.name} added to cart!`)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--deep)' }}>
      {/* Topbar */}
      <div style={{ background: 'var(--dark-olive)', padding: '6px 24px', display: 'flex', gap: '24px', fontSize: '12px', color: '#ccc' }}>
        <span>📧 admin@ifixcomputers.com</span>
        <span>📞 +91 98765 43210</span>
        <span>📍 Shimla, Himachal Pradesh</span>
      </div>

      {/* Navbar */}
      <nav style={{ background: 'var(--deep)', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid var(--yellow)' }}>
        <div style={{ fontSize: '26px', fontWeight: '800', color: 'var(--yellow)', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '2px' }}>
          IFIX<span style={{ color: '#fff' }}>Computers</span>
        </div>
        <div style={{ display: 'flex', gap: '24px', fontSize: '14px' }}>
          <Link to="/" style={{ color: '#ccc' }}>Home</Link>
          <Link to="/products" style={{ color: 'var(--yellow)', fontWeight: '600' }}>Products</Link>
          <Link to="/cart" style={{ color: '#ccc' }}>Cart ({cart.length})</Link>
        </div>
        <Link to="/cart">
          <button style={{ background: 'var(--yellow)', color: 'var(--deep)', border: 'none', borderRadius: '8px', padding: '8px 20px', fontWeight: '700', fontSize: '14px' }}>
            🛒 Cart ({cart.length})
          </button>
        </Link>
      </nav>

      {/* Search + Filter */}
      <div style={{ background: 'var(--dark-olive)', padding: '16px 24px', borderBottom: '1px solid #333' }}>
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: '100%', padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--olive)', background: 'var(--deep)', color: '#fff', fontSize: '14px', marginBottom: '12px', outline: 'none' }}
        />
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{ background: activeCategory === cat ? 'var(--yellow)' : 'var(--olive)', color: activeCategory === cat ? 'var(--deep)' : '#eee', border: 'none', borderRadius: '20px', padding: '6px 16px', fontSize: '12px', fontWeight: activeCategory === cat ? '700' : '400', cursor: 'pointer' }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div style={{ padding: '24px' }}>
        <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
          Showing {filtered.length} products
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
          {filtered.map(product => (
            <div key={product.id} style={{ background: '#1e1410', border: '1px solid var(--olive)', borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{ background: 'var(--dark-olive)', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px' }}>
                {product.emoji}
              </div>
              <div style={{ padding: '14px' }}>
                <div style={{ fontSize: '13px', color: '#ddd', marginBottom: '4px', fontWeight: '500' }}>{product.name}</div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '4px' }}>{product.category}</div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '8px' }}>Warranty: {product.warranty}</div>
                <div style={{ fontSize: '18px', color: 'var(--yellow)', fontWeight: '700', marginBottom: '6px' }}>₹{product.price.toLocaleString()}</div>
                <div style={{ fontSize: '11px', color: product.stock ? '#6abf69' : '#f0a500', marginBottom: '10px' }}>
                  {product.stock ? '● In Stock' : '● Low Stock'}
                </div>
                <button
                  onClick={() => addToCart(product)}
                  style={{ background: 'var(--yellow)', color: 'var(--deep)', border: 'none', borderRadius: '6px', padding: '8px', fontSize: '12px', fontWeight: '700', width: '100%' }}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: '#0e0808', borderTop: '2px solid var(--olive)', padding: '16px 24px', textAlign: 'center', fontSize: '12px', color: '#666' }}>
        © 2025 IFIX Computers, Shimla · All rights reserved
      </div>
    </div>
  )
}