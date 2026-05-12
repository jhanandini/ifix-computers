import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Cart() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('ifix_cart') || '[]'))

  const updateQty = (id, qty) => {
    if (qty < 1) return removeItem(id)
    const updated = cart.map(i => i.id === id ? { ...i, qty } : i)
    setCart(updated)
    localStorage.setItem('ifix_cart', JSON.stringify(updated))
  }

  const removeItem = (id) => {
    const updated = cart.filter(i => i.id !== id)
    setCart(updated)
    localStorage.setItem('ifix_cart', JSON.stringify(updated))
  }

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0)

  const whatsappMsg = () => {
    const items = cart.map(i => `${i.name} x${i.qty} = ₹${(i.price * i.qty).toLocaleString()}`).join('\n')
    const msg = `Hello IFIX Computers! I want to order:\n\n${items}\n\nTotal: ₹${total.toLocaleString()}`
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(msg)}`, '_blank')
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
          <Link to="/products" style={{ color: '#ccc' }}>Products</Link>
          <Link to="/cart" style={{ color: 'var(--yellow)', fontWeight: '600' }}>Cart ({cart.length})</Link>
        </div>
        <Link to="/cart">
          <button style={{ background: 'var(--yellow)', color: 'var(--deep)', border: 'none', borderRadius: '8px', padding: '8px 20px', fontWeight: '700', fontSize: '14px' }}>
            🛒 Cart ({cart.length})
          </button>
        </Link>
      </nav>

      <div style={{ padding: '24px', maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', color: 'var(--yellow)', fontFamily: 'Rajdhani', marginBottom: '24px' }}>🛒 Your Cart</h1>

        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', background: '#1e1410', borderRadius: '16px', border: '1px solid var(--olive)' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🛒</div>
            <h2 style={{ color: 'var(--yellow)', marginBottom: '8px' }}>Your cart is empty</h2>
            <p style={{ color: '#aaa', marginBottom: '24px' }}>Add some products first!</p>
            <Link to="/products">
              <button style={{ background: 'var(--yellow)', color: 'var(--deep)', border: 'none', borderRadius: '8px', padding: '12px 28px', fontWeight: '700', fontSize: '15px' }}>
                Browse Products
              </button>
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px' }}>
            {/* Cart Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {cart.map(item => (
                <div key={item.id} style={{ background: '#1e1410', border: '1px solid var(--olive)', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ fontSize: '36px', background: 'var(--dark-olive)', borderRadius: '10px', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {item.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#ddd', marginBottom: '4px' }}>{item.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>{item.category}</div>
                    <div style={{ fontSize: '16px', color: 'var(--yellow)', fontWeight: '700' }}>₹{item.price.toLocaleString()}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ background: 'var(--olive)', color: '#fff', border: 'none', borderRadius: '6px', width: '28px', height: '28px', fontSize: '16px', cursor: 'pointer' }}>-</button>
                    <span style={{ fontSize: '16px', fontWeight: '700', minWidth: '24px', textAlign: 'center' }}>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ background: 'var(--olive)', color: '#fff', border: 'none', borderRadius: '6px', width: '28px', height: '28px', fontSize: '16px', cursor: 'pointer' }}>+</button>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--yellow)', marginBottom: '8px' }}>₹{(item.price * item.qty).toLocaleString()}</div>
                    <button onClick={() => removeItem(item.id)} style={{ background: '#3d1515', color: '#f88', border: '1px solid #f88', borderRadius: '6px', padding: '4px 10px', fontSize: '12px', cursor: 'pointer' }}>Remove</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div style={{ background: '#1e1410', border: '1px solid var(--olive)', borderRadius: '12px', padding: '20px', height: 'fit-content' }}>
              <h3 style={{ fontSize: '20px', color: 'var(--yellow)', fontFamily: 'Rajdhani', marginBottom: '16px' }}>Order Summary</h3>
              {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#ccc', marginBottom: '8px' }}>
                  <span>{item.name} x{item.qty}</span>
                  <span>₹{(item.price * item.qty).toLocaleString()}</span>
                </div>
              ))}
              <div style={{ borderTop: '1px solid var(--olive)', marginTop: '12px', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: '700', color: 'var(--yellow)' }}>
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>

              <div style={{ marginTop: '20px', padding: '14px', background: 'var(--dark-olive)', borderRadius: '10px', border: '1px solid var(--olive)', marginBottom: '16px' }}>
                <p style={{ fontSize: '12px', color: '#ccc', marginBottom: '8px' }}>📋 To place your order, contact admin directly:</p>
                <div style={{ fontSize: '14px', color: 'var(--yellow)', fontWeight: '700' }}>📞 +91 98765 43210</div>
                <div style={{ fontSize: '12px', color: '#aaa' }}>admin@ifixcomputers.com</div>
              </div>

              <button
                onClick={whatsappMsg}
                style={{ width: '100%', background: '#25D366', color: '#fff', border: 'none', borderRadius: '8px', padding: '12px', fontWeight: '700', fontSize: '14px', marginBottom: '10px', cursor: 'pointer' }}>
                💬 Order via WhatsApp
              </button>

              <a href="mailto:admin@ifixcomputers.com">
                <button style={{ width: '100%', background: 'var(--yellow)', color: 'var(--deep)', border: 'none', borderRadius: '8px', padding: '12px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>
                  📧 Order via Email
                </button>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ background: '#0e0808', borderTop: '2px solid var(--olive)', padding: '16px 24px', textAlign: 'center', fontSize: '12px', color: '#666', marginTop: '40px' }}>
        © 2025 IFIX Computers, Shimla · All rights reserved
      </div>
    </div>
  )
}