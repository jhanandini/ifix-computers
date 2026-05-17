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
  const savings = cart.reduce((sum, i) => sum + ((i.originalPrice || i.price) - i.price) * i.qty, 0)

  const whatsappMsg = () => {
    const items = cart.map(i => `${i.name} x${i.qty} = Rs.${(i.price * i.qty).toLocaleString()}`).join('\n')
    const msg = `Hello IFIX Computers!\n\nI want to order:\n\n${items}\n\nTotal: Rs.${total.toLocaleString()}\n\nPlease confirm availability.`
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f3ff', fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Inter', sans-serif !important; box-sizing: border-box; }
        a { text-decoration: none; color: inherit; }
        @media(max-width: 768px) {
          .topbar { display: none !important; }
          .nav-search { display: none !important; }
          .menu-btn { display: flex !important; }
          .cart-grid { grid-template-columns: 1fr !important; }
          .section-pad { padding: 20px 16px !important; }
        }
      `}</style>

      {/* Topbar */}
      <div className="topbar" style={{ background: '#1e0a3c', padding: '7px 24px', display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#c4b5fd' }}>
        <div style={{ display: 'flex', gap: '24px' }}>
          <span>+91 98765 43210</span>
          <span>admin@ifixcomputers.com</span>
          <span>Delhi, India</span>
        </div>
        <div style={{ fontWeight: '600', color: '#a78bfa' }}>Free Expert Advice on Every Purchase!</div>
      </div>

      {/* Navbar */}
      <nav style={{ background: '#fff', borderBottom: '1px solid #e9d5ff', padding: '0 24px', display: 'flex', alignItems: 'center', gap: '16px', position: 'sticky', top: 0, zIndex: 100, height: '64px', boxShadow: '0 2px 12px rgba(88,28,135,0.08)' }}>
        <Link to="/">
          <div style={{ fontSize: '22px', fontWeight: '800', color: '#581c87' }}>
            IFIX<span style={{ color: '#1e0a3c' }}>Computers</span>
          </div>
        </Link>
        <div className="nav-search" style={{ flex: 1, maxWidth: '480px', display: 'flex', background: '#f5f3ff', border: '1.5px solid #e9d5ff', borderRadius: '8px', overflow: 'hidden' }}>
          <input style={{ flex: 1, background: 'transparent', border: 'none', padding: '10px 16px', color: '#1e0a3c', fontSize: '14px', outline: 'none' }} placeholder="Search products..." />
          <button style={{ background: '#7c3aed', border: 'none', padding: '10px 20px', color: '#fff', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}>Search</button>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Link to="/cart">
            <button style={{ background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 20px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>
              Cart ({cart.length})
            </button>
          </Link>
          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'transparent', border: '1.5px solid #e9d5ff', color: '#581c87', borderRadius: '8px', padding: '8px 14px', fontSize: '14px', fontWeight: '600', display: 'none', alignItems: 'center', cursor: 'pointer' }}>
            Menu
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{ background: '#fff', borderBottom: '1px solid #e9d5ff', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[['Home', '/'], ['Products', '/products']].map(([label, path]) => (
            <Link key={label} to={path} onClick={() => setMenuOpen(false)}>
              <div style={{ color: '#581c87', fontSize: '15px', fontWeight: '600', padding: '10px 0', borderBottom: '1px solid #f3f4f6' }}>{label}</div>
            </Link>
          ))}
        </div>
      )}

      {/* Page Header */}
      <div style={{ background: 'linear-gradient(135deg, #1e0a3c 0%, #3b0764 100%)', padding: '32px 24px' }}>
        <p style={{ fontSize: '12px', color: '#a78bfa', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px' }}>Review your items</p>
        <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#fff' }}>Your Cart</h1>
      </div>

      <div className="section-pad" style={{ padding: '28px 24px', maxWidth: '1000px', margin: '0 auto' }}>
        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: '16px', border: '1.5px solid #e9d5ff' }}>
            <div style={{ fontSize: '64px', color: '#7c3aed', fontWeight: '800', marginBottom: '16px' }}>0</div>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1e0a3c', marginBottom: '8px' }}>Your Cart is Empty</h2>
            <p style={{ color: '#6b7280', fontSize: '15px', marginBottom: '24px' }}>Add some products to get started!</p>
            <Link to="/products">
              <button style={{ background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '8px', padding: '12px 28px', fontWeight: '700', fontSize: '15px', cursor: 'pointer' }}>Browse Products</button>
            </Link>
          </div>
        ) : (
          <div className="cart-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '20px' }}>
            {/* Cart Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {savings > 0 && (
                <div style={{ background: '#d1fae5', border: '1px solid #6ee7b7', borderRadius: '8px', padding: '12px 16px', fontSize: '14px', color: '#065f46', fontWeight: '600' }}>
                  You are saving Rs.{savings.toLocaleString()} on this order!
                </div>
              )}
              {cart.map(item => (
                <div key={item.id} style={{ background: '#fff', border: '1.5px solid #e9d5ff', borderRadius: '12px', padding: '16px', display: 'flex', gap: '14px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  <div style={{ background: '#faf5ff', borderRadius: '10px', width: '72px', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid #e9d5ff', overflow: 'hidden' }}>
                    <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '6px' }}
                      onError={e => { e.target.style.display = 'none' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: '160px' }}>
                    <div style={{ fontSize: '10px', color: '#7c3aed', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>{item.category}</div>
                    <div style={{ fontSize: '15px', fontWeight: '700', color: '#1e0a3c', marginBottom: '4px' }}>{item.name}</div>
                    <div style={{ fontSize: '12px', color: '#9e9e9e', marginBottom: '8px' }}>Warranty: {item.warranty}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '18px', color: '#581c87', fontWeight: '800' }}>Rs.{item.price.toLocaleString()}</span>
                      {item.originalPrice && <span style={{ fontSize: '12px', color: '#9e9e9e', textDecoration: 'line-through' }}>Rs.{item.originalPrice.toLocaleString()}</span>}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f5f3ff', border: '1.5px solid #e9d5ff', borderRadius: '8px', padding: '4px 10px' }}>
                      <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ background: 'transparent', border: 'none', color: '#7c3aed', fontSize: '20px', fontWeight: '800', cursor: 'pointer', lineHeight: 1 }}>-</button>
                      <span style={{ fontSize: '15px', fontWeight: '700', minWidth: '20px', textAlign: 'center', color: '#1e0a3c' }}>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ background: 'transparent', border: 'none', color: '#7c3aed', fontSize: '20px', fontWeight: '800', cursor: 'pointer', lineHeight: 1 }}>+</button>
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: '800', color: '#581c87' }}>Rs.{(item.price * item.qty).toLocaleString()}</div>
                    <button onClick={() => removeItem(item.id)} style={{ background: '#fff', color: '#dc2626', border: '1px solid #fca5a5', borderRadius: '6px', padding: '5px 12px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>Remove</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ background: '#fff', border: '1.5px solid #e9d5ff', borderRadius: '12px', padding: '20px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#1e0a3c', marginBottom: '16px' }}>Order Summary</h3>
                {cart.map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#6b7280', marginBottom: '8px' }}>
                    <span style={{ maxWidth: '160px' }}>{item.name} x{item.qty}</span>
                    <span>Rs.{(item.price * item.qty).toLocaleString()}</span>
                  </div>
                ))}
                {savings > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#059669', fontWeight: '600', marginBottom: '8px' }}>
                    <span>You Save</span><span>-Rs.{savings.toLocaleString()}</span>
                  </div>
                )}
                <div style={{ borderTop: '1.5px solid #e9d5ff', marginTop: '12px', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', fontSize: '22px', fontWeight: '800', color: '#581c87' }}>
                  <span>Total</span><span>Rs.{total.toLocaleString()}</span>
                </div>
              </div>

              {/* How to Order */}
              <div style={{ background: '#faf5ff', border: '1.5px solid #e9d5ff', borderRadius: '12px', padding: '16px' }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#581c87', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>How to Order</div>
                {['Add items to cart', 'Contact us via WhatsApp or Email', 'We confirm and finalize your order'].map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'flex-start' }}>
                    <div style={{ background: '#7c3aed', color: '#fff', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '800', flexShrink: 0, marginTop: '1px' }}>{i + 1}</div>
                    <div style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.6' }}>{step}</div>
                  </div>
                ))}
              </div>

              <button onClick={whatsappMsg} style={{ width: '100%', background: '#25D366', color: '#fff', border: 'none', borderRadius: '10px', padding: '14px', fontWeight: '800', fontSize: '15px', cursor: 'pointer' }}>
                Order via WhatsApp
              </button>
              <a href={`mailto:admin@ifixcomputers.com?subject=Order Request&body=${encodeURIComponent(cart.map(i => `${i.name} x${i.qty} = Rs.${(i.price * i.qty).toLocaleString()}`).join('\n') + `\n\nTotal: Rs.${total.toLocaleString()}`)}`}>
                <button style={{ width: '100%', background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '10px', padding: '14px', fontWeight: '800', fontSize: '15px', cursor: 'pointer' }}>
                  Order via Email
                </button>
              </a>
              <div style={{ textAlign: 'center', fontSize: '13px', color: '#9e9e9e' }}>Or call: +91 98765 43210</div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ background: '#0a0118', borderTop: '1px solid #1e0a3c', padding: '20px 24px', marginTop: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ fontSize: '20px', fontWeight: '800', color: '#fff' }}>IFIX<span style={{ color: '#a78bfa' }}>Computers</span></div>
        <div style={{ fontSize: '12px', color: '#4b5563' }}>2025 IFIX Computers, Delhi. All rights reserved</div>
        <Link to="/terms"><div style={{ fontSize: '12px', color: '#a78bfa', cursor: 'pointer' }}>Terms & Conditions</div></Link>
      </div>
    </div>
  )
}