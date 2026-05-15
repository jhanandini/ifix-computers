import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Cart() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('ifix_cart') || '[]'))
  const [menuOpen, setMenuOpen] = useState(false)

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
  const savings = cart.reduce((sum, i) => sum + (i.originalPrice - i.price) * i.qty, 0)

  const whatsappMsg = () => {
    const items = cart.map(i => `${i.name} x${i.qty} = ₹${(i.price * i.qty).toLocaleString()}`).join('\n')
    const msg = `Hello IFIX Computers!\n\nI want to order:\n\n${items}\n\nTotal: ₹${total.toLocaleString()}\n\nPlease confirm availability.`
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A' }}>
      <style>{`
        @media(max-width:768px){
          .nav-search{display:none!important}
          .menu-btn{display:block!important}
          .cart-grid{grid-template-columns:1fr!important}
          .qty-row{flex-wrap:wrap!important;gap:8px!important}
        }
      `}</style>

      {/* Topbar */}
      <div style={{ background: '#111', borderBottom: '1px solid #222', padding: '6px 20px', display: 'flex', gap: '16px', fontSize: '11px', color: '#888', flexWrap: 'wrap' }}>
        <span>📧 admin@ifixcomputers.com</span>
        <span>📞 +91 98765 43210</span>
        <span>📍 Delhi</span>
      </div>

      {/* Navbar */}
      <nav style={{ background: '#0A0A0A', borderBottom: '1px solid #222', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', position: 'sticky', top: 0, zIndex: 100 }}>
        <Link to="/"><div style={{ fontSize: '22px', fontWeight: '700', color: '#C9A84C', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '2px', whiteSpace: 'nowrap' }}>IFIX<span style={{ color: '#fff' }}>Computers</span></div></Link>
        <div style={{ flex: 1, maxWidth: '400px', display: 'flex', background: '#1a1a1a', border: '1px solid #333', borderRadius: '6px', overflow: 'hidden' }} className="nav-search">
          <input style={{ flex: 1, background: 'transparent', border: 'none', padding: '8px 14px', color: '#fff', fontSize: '13px', outline: 'none' }} placeholder="Search products..." />
          <button style={{ background: '#C9A84C', border: 'none', padding: '8px 14px', color: '#000', fontWeight: '700' }}>🔍</button>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Link to="/cart"><button style={{ background: '#C9A84C', color: '#000', border: 'none', borderRadius: '6px', padding: '8px 16px', fontWeight: '700', fontSize: '13px', whiteSpace: 'nowrap' }}>🛒 Cart ({cart.length})</button></Link>
          <button className="menu-btn" style={{ background: 'transparent', border: '1px solid #333', color: '#fff', borderRadius: '6px', padding: '8px 12px', fontSize: '18px', display: 'none' }} onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{ background: '#111', borderBottom: '1px solid #222', padding: '12px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {['Home', 'Products'].map(item => (
            <Link key={item} to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
              <div style={{ color: '#C9A84C', fontSize: '14px', fontWeight: '600', padding: '8px 0', borderBottom: '1px solid #222' }}>{item}</div>
            </Link>
          ))}
        </div>
      )}

      {/* Page Header */}
      <div style={{ background: '#111', borderBottom: '1px solid #222', padding: '20px' }}>
        <div style={{ fontSize: '11px', color: '#C9A84C', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>Review your items</div>
        <h1 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '28px', fontWeight: '700', color: '#F0EDE8', textTransform: 'uppercase', letterSpacing: '1px' }}>Your Cart</h1>
      </div>

      <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: '#111', borderRadius: '8px', border: '1px solid #222' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🛒</div>
            <h2 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '24px', color: '#C9A84C', marginBottom: '8px' }}>Your Cart is Empty</h2>
            <p style={{ color: '#555', fontSize: '13px', marginBottom: '24px' }}>Add some products to get started!</p>
            <Link to="/products">
              <button style={{ background: '#C9A84C', color: '#000', border: 'none', borderRadius: '4px', padding: '12px 28px', fontWeight: '700', fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>Browse Products</button>
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '20px' }} className="cart-grid">

            {/* Cart Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Savings Banner */}
              {savings > 0 && (
                <div style={{ background: 'rgba(56,161,105,0.1)', border: '1px solid rgba(56,161,105,0.3)', borderRadius: '6px', padding: '10px 16px', fontSize: '13px', color: '#38a169' }}>
                  🎉 You're saving <strong>₹{savings.toLocaleString()}</strong> on this order!
                </div>
              )}

              {cart.map(item => (
                <div key={item.id} style={{ background: '#111', border: '1px solid #222', borderRadius: '8px', padding: '16px', display: 'flex', gap: '14px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  <div style={{ background: '#1a1a1a', borderRadius: '8px', width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', flexShrink: 0, border: '1px solid #222' }}>
                    {item.emoji}
                  </div>
                  <div style={{ flex: 1, minWidth: '160px' }}>
                    <div style={{ fontSize: '10px', color: '#C9A84C', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>{item.category}</div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#F0EDE8', marginBottom: '4px' }}>{item.name}</div>
                    <div style={{ fontSize: '11px', color: '#555', marginBottom: '8px' }}>Warranty: {item.warranty}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '16px', color: '#C9A84C', fontWeight: '700', fontFamily: 'Rajdhani, sans-serif' }}>₹{item.price.toLocaleString()}</span>
                      {item.originalPrice && <span style={{ fontSize: '11px', color: '#444', textDecoration: 'line-through' }}>₹{item.originalPrice.toLocaleString()}</span>}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '4px', padding: '4px 8px' }}>
                      <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ background: 'transparent', border: 'none', color: '#C9A84C', fontSize: '18px', fontWeight: '700', lineHeight: 1 }}>−</button>
                      <span style={{ fontSize: '14px', fontWeight: '700', minWidth: '20px', textAlign: 'center', color: '#fff' }}>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ background: 'transparent', border: 'none', color: '#C9A84C', fontSize: '18px', fontWeight: '700', lineHeight: 1 }}>+</button>
                    </div>
                    <div style={{ fontSize: '15px', fontWeight: '700', color: '#C9A84C', fontFamily: 'Rajdhani, sans-serif' }}>₹{(item.price * item.qty).toLocaleString()}</div>
                    <button onClick={() => removeItem(item.id)} style={{ background: 'transparent', color: '#e53e3e', border: '1px solid #e53e3e', borderRadius: '4px', padding: '4px 10px', fontSize: '11px', letterSpacing: '0.5px' }}>Remove</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ background: '#111', border: '1px solid #222', borderRadius: '8px', padding: '20px' }}>
                <h3 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '20px', color: '#C9A84C', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>Order Summary</h3>
                {cart.map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                    <span style={{ maxWidth: '160px' }}>{item.name} × {item.qty}</span>
                    <span>₹{(item.price * item.qty).toLocaleString()}</span>
                  </div>
                ))}
                {savings > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#38a169', marginBottom: '8px' }}>
                    <span>You Save</span>
                    <span>−₹{savings.toLocaleString()}</span>
                  </div>
                )}
                <div style={{ borderTop: '1px solid #222', marginTop: '12px', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: '700', color: '#C9A84C', fontFamily: 'Rajdhani, sans-serif' }}>
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>

              {/* How to Order */}
              <div style={{ background: '#111', border: '1px solid #222', borderRadius: '8px', padding: '16px' }}>
                <div style={{ fontSize: '12px', color: '#C9A84C', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '10px' }}>How to Order</div>
                {['Add items to cart', 'Contact us via WhatsApp or Email', 'We confirm & finalize your order'].map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '8px', alignItems: 'flex-start' }}>
                    <div style={{ background: '#C9A84C', color: '#000', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '700', flexShrink: 0, marginTop: '1px' }}>{i + 1}</div>
                    <div style={{ fontSize: '12px', color: '#666', lineHeight: '1.5' }}>{step}</div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <button onClick={whatsappMsg} style={{ width: '100%', background: '#25D366', color: '#fff', border: 'none', borderRadius: '6px', padding: '14px', fontWeight: '700', fontSize: '14px', letterSpacing: '0.5px' }}>
                💬 Order via WhatsApp
              </button>
              <a href={`mailto:admin@ifixcomputers.com?subject=Order Request&body=${encodeURIComponent(cart.map(i => `${i.name} x${i.qty} = ₹${(i.price*i.qty).toLocaleString()}`).join('\n') + `\n\nTotal: ₹${total.toLocaleString()}`)}`}>
                <button style={{ width: '100%', background: '#C9A84C', color: '#000', border: 'none', borderRadius: '6px', padding: '14px', fontWeight: '700', fontSize: '14px', letterSpacing: '0.5px' }}>
                  📧 Order via Email
                </button>
              </a>
              <div style={{ textAlign: 'center', fontSize: '11px', color: '#444' }}>
                📞 Or call us: +91 98765 43210
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ background: '#060606', borderTop: '1px solid #1a1a1a', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginTop: '40px' }}>
        <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '18px', color: '#C9A84C', fontWeight: '700' }}>IFIX Computers</div>
        <div style={{ fontSize: '11px', color: '#444' }}>© 2025 IFIX Computers, Shimla · All rights reserved</div>
        <Link to="/admin"><div style={{ fontSize: '11px', color: '#333' }}>Admin</div></Link>
      </div>
    </div>
  )
}