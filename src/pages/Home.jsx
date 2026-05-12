import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Home() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('ifix_cart') || '[]'))

  const products = [
    { id: 1, name: 'Intel Core i5-13600K', price: 24500, category: 'Processor', emoji: '⚙️', stock: true },
    { id: 2, name: 'RTX 4060 8GB', price: 33000, category: 'GPU', emoji: '🎮', stock: true },
    { id: 3, name: 'Samsung 16GB DDR5', price: 7200, category: 'RAM', emoji: '💾', stock: true },
    { id: 4, name: 'ASUS B760M Motherboard', price: 14800, category: 'Motherboard', emoji: '🔌', stock: true },
    { id: 5, name: 'Samsung 980 Pro 1TB SSD', price: 8500, category: 'Storage', emoji: '💿', stock: true },
    { id: 6, name: 'Cooler Master Hyper 212', price: 3100, category: 'Cooling', emoji: '❄️', stock: false },
  ]

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
          <Link to="/" style={{ color: 'var(--yellow)', fontWeight: '600' }}>Home</Link>
          <Link to="/products" style={{ color: '#ccc' }}>Products</Link>
          <Link to="/cart" style={{ color: '#ccc' }}>Cart ({cart.length})</Link>
        </div>
        <Link to="/cart">
          <button style={{ background: 'var(--yellow)', color: 'var(--deep)', border: 'none', borderRadius: '8px', padding: '8px 20px', fontWeight: '700', fontSize: '14px' }}>
            🛒 Cart ({cart.length})
          </button>
        </Link>
      </nav>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, var(--deep) 0%, var(--dark-olive) 100%)', padding: '60px 24px', borderBottom: '3px solid var(--yellow)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ background: 'var(--yellow)', color: 'var(--deep)', display: 'inline-block', padding: '4px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', marginBottom: '16px' }}>
            🏆 Shimla's Trusted Computer Store
          </div>
          <h1 style={{ fontSize: '48px', fontWeight: '800', color: 'var(--yellow)', lineHeight: '1.1', marginBottom: '16px' }}>
            Your Local<br />Computer Parts<br />Expert
          </h1>
          <p style={{ color: '#ccc', fontSize: '16px', marginBottom: '28px', maxWidth: '400px' }}>
            Processors, GPUs, RAM, Motherboards & more. Quality parts, expert advice, trusted by builders across Himachal Pradesh.
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Link to="/products">
              <button style={{ background: 'var(--yellow)', color: 'var(--deep)', border: 'none', borderRadius: '10px', padding: '14px 28px', fontWeight: '700', fontSize: '16px' }}>
                Shop Now →
              </button>
            </Link>
            <a href="tel:+919876543210">
              <button style={{ background: 'transparent', color: 'var(--yellow)', border: '2px solid var(--yellow)', borderRadius: '10px', padding: '14px 28px', fontWeight: '700', fontSize: '16px' }}>
                📞 Call Us
              </button>
            </a>
          </div>
        </div>
        <div style={{ textAlign: 'center', background: 'var(--olive)', border: '2px solid var(--yellow)', borderRadius: '20px', padding: '32px 40px' }}>
          <div style={{ fontSize: '64px', marginBottom: '8px' }}>🖥️</div>
          <div style={{ color: 'var(--yellow)', fontWeight: '700', fontSize: '14px' }}>Expert Advice</div>
          <div style={{ color: '#ccc', fontSize: '12px' }}>Always Available</div>
        </div>
      </div>

      {/* Categories */}
      <div style={{ background: 'var(--dark-olive)', padding: '12px 24px', display: 'flex', gap: '10px', overflowX: 'auto', borderBottom: '1px solid #333' }}>
        {['All', 'Processors', 'GPU', 'Motherboard', 'RAM', 'Storage', 'Cooling', 'Cabinets', 'PSU', 'Accessories'].map(cat => (
          <Link to="/products" key={cat}>
            <span style={{ background: 'var(--olive)', color: '#eee', borderRadius: '20px', padding: '6px 16px', fontSize: '12px', whiteSpace: 'nowrap', cursor: 'pointer' }}>
              {cat}
            </span>
          </Link>
        ))}
      </div>

      {/* Featured Products */}
      <div style={{ padding: '24px' }}>
        <h2 style={{ fontSize: '22px', color: 'var(--yellow)', marginBottom: '20px', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '1px' }}>
          ⚡ FEATURED PRODUCTS
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
          {products.map(product => (
            <div key={product.id} style={{ background: '#1e1410', border: '1px solid var(--olive)', borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{ background: 'var(--dark-olive)', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px' }}>
                {product.emoji}
              </div>
              <div style={{ padding: '14px' }}>
                <div style={{ fontSize: '13px', color: '#ddd', marginBottom: '4px', fontWeight: '500' }}>{product.name}</div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '8px' }}>{product.category}</div>
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

      {/* Contact Banner */}
      <div style={{ margin: '0 24px 24px', background: 'var(--olive)', borderRadius: '16px', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid var(--yellow)' }}>
        <div>
          <h3 style={{ fontSize: '20px', color: 'var(--yellow)', fontFamily: 'Rajdhani', marginBottom: '6px' }}>Want to Buy? Contact Admin Directly</h3>
          <p style={{ fontSize: '13px', color: '#ccc' }}>Browse & add to cart, then call or email us to confirm your order</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '20px', color: 'var(--yellow)', fontWeight: '700' }}>📞 +91 98765 43210</div>
          <div style={{ fontSize: '13px', color: '#aaa', marginTop: '4px' }}>admin@ifixcomputers.com</div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: '#0e0808', borderTop: '2px solid var(--olive)', padding: '16px 24px', textAlign: 'center', fontSize: '12px', color: '#666' }}>
        © 2025 IFIX Computers, Shimla · All rights reserved
      </div>
    </div>
  )
}