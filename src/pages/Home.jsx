import { Link } from 'react-router-dom'
import { useState } from 'react'

const products = [
  { id: 1, name: 'Intel Core i5-13600K', price: 24500, originalPrice: 32000, category: 'Processor', img: '/images/cpu.jpg', stock: true, warranty: '3 Years', tag: 'HOT' },
  { id: 2, name: 'RTX 4060 8GB GDDR6', price: 33000, originalPrice: 40000, category: 'GPU', img: '/images/gpu.jpg', stock: true, warranty: '3 Years', tag: 'NEW' },
  { id: 3, name: 'Samsung 16GB DDR5', price: 7200, originalPrice: 9500, category: 'RAM', img: '/images/ram.jpg', stock: true, warranty: '5 Years', tag: '' },
  { id: 4, name: 'ASUS B760M Motherboard', price: 14800, originalPrice: 18000, category: 'Motherboard', img: '/images/mobo.jpg', stock: true, warranty: '3 Years', tag: '' },
  { id: 5, name: 'Samsung 980 Pro 1TB', price: 8500, originalPrice: 11000, category: 'Storage', img: '/images/ssd.jpg', stock: true, warranty: '5 Years', tag: 'SALE' },
  { id: 6, name: 'Cooler Master Hyper 212', price: 3100, originalPrice: 4200, category: 'Cooling', img: '/images/cooler.jpg', stock: false, warranty: '2 Years', tag: '' },
  { id: 7, name: 'Corsair 650W PSU', price: 7800, originalPrice: 9500, category: 'PSU', img: '/images/psu.jpg', stock: true, warranty: '5 Years', tag: '' },
  { id: 8, name: 'Corsair 4000D Cabinet', price: 8200, originalPrice: 10000, category: 'Cabinet', img: '/images/cabinet.jpg', stock: true, warranty: '2 Years', tag: 'NEW' },
]

const categories = [
  { name: 'Processor', emoji: '⚙️' },
  { name: 'GPU', emoji: '🎮' },
  { name: 'Motherboard', emoji: '🔌' },
  { name: 'RAM', emoji: '💾' },
  { name: 'Storage', emoji: '💿' },
  { name: 'Cooling', emoji: '❄️' },
  { name: 'Cabinet', emoji: '🖥️' },
  { name: 'PSU', emoji: '⚡' },
]

export default function Home() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('ifix_cart') || '[]'))
  const [menuOpen, setMenuOpen] = useState(false)

  const addToCart = (product) => {
    const existing = cart.find(i => i.id === product.id)
    const updated = existing
      ? cart.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      : [...cart, { ...product, qty: 1 }]
    setCart(updated)
    localStorage.setItem('ifix_cart', JSON.stringify(updated))
    alert(`✅ ${product.name} added to cart!`)
  }

  const discount = (orig, price) => Math.round((orig - price) / orig * 100)

  return (
    <div style={{ minHeight: '100vh', background: '#f5f3ff', fontFamily: "'Poppins', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Poppins', sans-serif; }
        :root {
          --purple: #3b0764;
          --purple-mid: #4c0a7c;
          --purple-light: #6d28d9;
          --purple-pale: #ede9fe;
          --white: #ffffff;
          --gray: #f5f3ff;
          --text: #1e1b4b;
          --muted: #6b7280;
        }
        .add-btn:hover { background: var(--purple-light) !important; color: #fff !important; }
        .cat-card:hover { border-color: var(--purple-light) !important; background: var(--purple-pale) !important; }
        .prod-card:hover { border-color: #6d28d9 !important; box-shadow: 0 4px 20px rgba(109,40,217,0.1) !important; }
        .cat-nav-item:hover { color: #a78bfa !important; border-bottom-color: #a78bfa !important; }
        @media(max-width: 768px) {
          .nav-search { display: none !important; }
          .menu-btn { display: flex !important; }
          .hero-inner { flex-direction: column !important; padding: 32px 16px !important; }
          .hero-right { display: none !important; }
          .hero-h1 { font-size: 32px !important; }
          .hero-stats { gap: 16px !important; }
          .cat-nav { display: none !important; }
          .cat-grid { grid-template-columns: repeat(4, 1fr) !important; }
          .prod-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
          .why-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .contact-grid { flex-direction: column !important; }
          .topbar { display: none !important; }
          .footer-inner { flex-direction: column !important; text-align: center !important; gap: 8px !important; }
          .section-pad { padding: 28px 16px !important; }
        }
        @media(max-width: 480px) {
          .prod-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .cat-grid { grid-template-columns: repeat(4, 1fr) !important; }
          .hero-h1 { font-size: 26px !important; }
        }
      `}</style>

      {/* Topbar */}
      <div className="topbar" style={{ background: '#2d0052', padding: '7px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: '#c4b5fd' }}>
        <div style={{ display: 'flex', gap: '20px' }}>
          <span>✉ admin@ifixcomputers.com</span>
          <span>📞 +91 98765 43210</span>
          <span>📍 Delhi, India</span>
        </div>
        <div style={{ color: '#a78bfa', fontWeight: '600' }}>Free Expert Advice on Every Purchase!</div>
      </div>

      {/* Navbar */}
      <nav style={{ background: '#3b0764', padding: '13px 24px', display: 'flex', alignItems: 'center', gap: '16px', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
        <div style={{ fontSize: '22px', fontWeight: '800', color: '#fff', letterSpacing: '1px', whiteSpace: 'nowrap' }}>
          IFIX<span style={{ color: '#a78bfa' }}>Computers</span>
        </div>
        <div className="nav-search" style={{ flex: 1, maxWidth: '420px', display: 'flex', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', overflow: 'hidden' }}>
          <input style={{ flex: 1, background: 'transparent', border: 'none', padding: '9px 14px', color: '#fff', fontSize: '13px', outline: 'none' }} placeholder="Search products, brands..." />
          <button style={{ background: '#6d28d9', border: 'none', padding: '9px 16px', color: '#fff', fontWeight: '700', fontSize: '13px' }}>🔍</button>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Link to="/cart">
            <button style={{ background: '#6d28d9', color: '#fff', border: 'none', borderRadius: '8px', padding: '9px 18px', fontWeight: '700', fontSize: '13px' }}>
              🛒 Cart ({cart.length})
            </button>
          </Link>
          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: '8px', padding: '9px 12px', fontSize: '18px', display: 'none', alignItems: 'center', justifyContent: 'center' }}>☰</button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{ background: '#3b0764', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', overflow: 'hidden' }}>
            <input style={{ flex: 1, background: 'transparent', border: 'none', padding: '10px 14px', color: '#fff', fontSize: '13px', outline: 'none' }} placeholder="Search products..." />
            <button style={{ background: '#6d28d9', border: 'none', padding: '10px 14px', color: '#fff', fontWeight: '700' }}>🔍</button>
          </div>
          {[['Home', '/'], ['Products', '/products'], ['Cart', '/cart']].map(([label, path]) => (
            <Link key={label} to={path} onClick={() => setMenuOpen(false)}>
              <div style={{ color: '#a78bfa', fontSize: '15px', fontWeight: '600', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>{label}</div>
            </Link>
          ))}
        </div>
      )}

      {/* Category Nav */}
      <div className="cat-nav" style={{ background: '#2d0052', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0 24px', display: 'flex', overflowX: 'auto' }}>
        {['Home', 'Processors', 'GPU / Graphics', 'Motherboards', 'RAM', 'Storage', 'Cooling', 'Cabinets', 'PSU', 'Accessories'].map((item, i) => (
          <Link to={i === 0 ? '/' : '/products'} key={item}>
            <div className="cat-nav-item" style={{ padding: '11px 16px', fontSize: '12px', color: i === 0 ? '#a78bfa' : '#6b7280', whiteSpace: 'nowrap', borderBottom: i === 0 ? '2px solid #a78bfa' : '2px solid transparent', fontWeight: i === 0 ? '600' : '400', display: 'block' }}>
              {item}
            </div>
          </Link>
        ))}
      </div>

      {/* HERO BANNER */}
      <div style={{ position: 'relative', overflow: 'hidden', background: '#3b0764', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        {/* Hero BG image with overlay */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/hero.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15 }}></div>
        {/* Pattern overlay */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(109,40,217,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(109,40,217,0.08) 1px, transparent 1px)', backgroundSize: '48px 48px' }}></div>
        {/* Purple glow */}
        <div style={{ position: 'absolute', right: 0, top: 0, width: '50%', height: '100%', background: 'radial-gradient(ellipse at right, rgba(109,40,217,0.2) 0%, transparent 70%)' }}></div>

        <div className="hero-inner" style={{ position: 'relative', zIndex: 1, padding: '72px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px' }}>
          {/* Left */}
          <div style={{ flex: 1, maxWidth: '580px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(167,139,250,0.12)', border: '1px solid rgba(167,139,250,0.3)', color: '#a78bfa', fontSize: '10px', padding: '5px 14px', borderRadius: '4px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px', fontWeight: '600' }}>
              ⭐ Delhi's No.1 Computer Store
            </div>
            <h1 className="hero-h1" style={{ fontSize: '52px', fontWeight: '800', color: '#fff', lineHeight: '1.1', marginBottom: '8px', letterSpacing: '-0.5px' }}>
              Premium Parts.
            </h1>
            <h1 className="hero-h1" style={{ fontSize: '52px', fontWeight: '800', color: '#a78bfa', lineHeight: '1.1', marginBottom: '20px', letterSpacing: '-0.5px' }}>
              Expert Advice.
            </h1>
            <div style={{ width: '60px', height: '4px', background: '#6d28d9', borderRadius: '2px', marginBottom: '20px' }}></div>
            <p style={{ fontSize: '15px', color: '#9ca3af', lineHeight: '1.9', marginBottom: '32px', maxWidth: '440px' }}>
              Curated selection of high-performance components. Genuine warranty, best prices — trusted by builders across Delhi NCR.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '40px' }}>
              <Link to="/products">
                <button style={{ background: '#6d28d9', color: '#fff', border: 'none', borderRadius: '8px', padding: '14px 32px', fontWeight: '700', fontSize: '14px', letterSpacing: '0.5px' }}>
                  Shop Now →
                </button>
              </Link>
              <a href="tel:+919876543210">
                <button style={{ background: 'transparent', color: '#a78bfa', border: '2px solid #a78bfa', borderRadius: '8px', padding: '12px 32px', fontWeight: '600', fontSize: '14px' }}>
                  📞 Call Us
                </button>
              </a>
            </div>
            <div className="hero-stats" style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', paddingTop: '28px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              {[['500+', 'Products'], ['5★', 'Rated'], ['3yr', 'Warranty'], ['24/7', 'Support']].map(([num, label]) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '28px', fontWeight: '800', color: '#a78bfa' }}>{num}</div>
                  <div style={{ fontSize: '10px', color: '#6b7280', letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: '2px' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Card */}
          <div className="hero-right" style={{ flexShrink: 0, width: '260px' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(167,139,250,0.25)', borderRadius: '12px', padding: '28px 20px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: '#6d28d9' }}></div>
              <div style={{ fontSize: '72px', marginBottom: '12px' }}>🖥️</div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#fff', marginBottom: '4px' }}>Expert Builds</div>
              <div style={{ fontSize: '10px', color: '#6b7280', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' }}>Always Available</div>
              {['Intel / AMD Processors', 'RTX 40 Series GPUs', 'DDR5 RAM & NVMe SSDs', '3 Year Warranty'].map(spec => (
                <div key={spec} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '8px 12px', marginBottom: '8px', textAlign: 'left' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#a78bfa', flexShrink: 0 }}></div>
                  <div style={{ fontSize: '11px', color: '#9ca3af' }}>{spec}</div>
                </div>
              ))}
              <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer">
                <button style={{ width: '100%', background: '#25D366', color: '#fff', border: 'none', borderRadius: '8px', padding: '12px', fontWeight: '700', fontSize: '13px', marginTop: '8px' }}>
                  💬 WhatsApp Us
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Shop By Category */}
      <div className="section-pad" style={{ padding: '48px 24px', background: '#f5f3ff' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '11px', color: '#6d28d9', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: '600', marginBottom: '8px' }}>Browse by type</div>
          <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#1e1b4b', marginBottom: '8px' }}>Shop By Category</h2>
          <p style={{ fontSize: '14px', color: '#6b7280', maxWidth: '400px', margin: '0 auto' }}>Find exactly what you need from our wide range of computer components</p>
        </div>
        <div className="cat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '12px', maxWidth: '900px', margin: '0 auto' }}>
          {categories.map(cat => (
            <Link to="/products" key={cat.name}>
              <div className="cat-card" style={{ background: '#fff', border: '1.5px solid #ede9fe', borderRadius: '12px', padding: '20px 8px', textAlign: 'center', cursor: 'pointer' }}>
                <div style={{ fontSize: '30px', marginBottom: '8px' }}>{cat.emoji}</div>
                <div style={{ fontSize: '11px', color: '#6d28d9', fontWeight: '600', letterSpacing: '0.3px' }}>{cat.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="section-pad" style={{ padding: '0 24px 48px', background: '#fff' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '11px', color: '#6d28d9', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: '600', marginBottom: '8px' }}>Handpicked for you</div>
          <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#1e1b4b', marginBottom: '8px' }}>Featured Products</h2>
          <p style={{ fontSize: '14px', color: '#6b7280', maxWidth: '400px', margin: '0 auto' }}>Top quality components at the best prices in Delhi</p>
        </div>
        <div className="prod-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', maxWidth: '1000px', margin: '0 auto' }}>
          {products.map(product => (
            <div key={product.id} className="prod-card" style={{ background: '#fff', border: '1.5px solid #f3f4f6', borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{ background: '#f9fafb', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #f3f4f6', position: 'relative', padding: '12px' }}>
                {product.tag && (
                  <div style={{ position: 'absolute', top: '8px', left: '8px', background: product.tag === 'HOT' ? '#fee2e2' : product.tag === 'NEW' ? '#dcfce7' : '#ede9fe', color: product.tag === 'HOT' ? '#b91c1c' : product.tag === 'NEW' ? '#15803d' : '#6d28d9', fontSize: '9px', padding: '3px 8px', borderRadius: '4px', fontWeight: '700', letterSpacing: '0.5px', zIndex: 2 }}>
                    {product.tag}
                  </div>
                )}
                <div style={{ position: 'absolute', top: '8px', right: '8px', background: '#6d28d9', color: '#fff', fontSize: '9px', padding: '3px 8px', borderRadius: '4px', fontWeight: '700', zIndex: 2 }}>
                  -{discount(product.originalPrice, product.price)}%
                </div>
                <img src={product.img} alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  onError={e => { e.target.onerror = null; e.target.style.display = 'none'; e.target.parentNode.innerHTML += '<div style="font-size:48px">🖥️</div>' }} />
              </div>
              <div style={{ padding: '14px' }}>
                <div style={{ fontSize: '10px', color: '#6d28d9', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '600', marginBottom: '4px' }}>{product.category}</div>
                <div style={{ fontSize: '13px', color: '#1e1b4b', fontWeight: '600', marginBottom: '10px', lineHeight: '1.4' }}>{product.name}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ fontSize: '18px', color: '#3b0764', fontWeight: '800' }}>₹{product.price.toLocaleString()}</span>
                  <span style={{ fontSize: '11px', color: '#9ca3af', textDecoration: 'line-through' }}>₹{product.originalPrice.toLocaleString()}</span>
                </div>
                <div style={{ fontSize: '10px', color: product.stock ? '#16a34a' : '#dc2626', fontWeight: '600', marginBottom: '6px' }}>
                  {product.stock ? '● In Stock' : '● Out of Stock'}
                </div>
                <div style={{ fontSize: '10px', color: '#9ca3af', marginBottom: '12px' }}>Warranty: {product.warranty}</div>
                <button className="add-btn" onClick={() => addToCart(product)}
                  style={{ width: '100%', background: '#ede9fe', color: '#6d28d9', border: 'none', borderRadius: '8px', padding: '9px', fontSize: '11px', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <Link to="/products">
            <button style={{ background: 'transparent', color: '#6d28d9', border: '2px solid #6d28d9', borderRadius: '8px', padding: '12px 36px', fontWeight: '700', fontSize: '14px' }}>
              View All Products →
            </button>
          </Link>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="section-pad" style={{ padding: '48px 24px', background: '#f5f3ff' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '11px', color: '#6d28d9', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: '600', marginBottom: '8px' }}>Our Promise</div>
          <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#1e1b4b', marginBottom: '8px' }}>Why Choose IFIX?</h2>
          <p style={{ fontSize: '14px', color: '#6b7280', maxWidth: '400px', margin: '0 auto' }}>We are committed to providing the best experience for every customer</p>
        </div>
        <div className="why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', maxWidth: '900px', margin: '0 auto' }}>
          {[
            { icon: '🛡️', title: 'Genuine Parts', desc: '100% authentic components with manufacturer warranty on every product' },
            { icon: '⚡', title: 'Expert Advice', desc: 'Professional guidance for every build, upgrade and repair' },
            { icon: '💰', title: 'Best Prices', desc: 'Most competitive pricing in Delhi with no hidden charges' },
            { icon: '🔧', title: 'After Sales Support', desc: 'We are always here for you even after your purchase' },
          ].map(w => (
            <div key={w.title} style={{ textAlign: 'center', padding: '28px 16px', background: '#fff', border: '1.5px solid #ede9fe', borderRadius: '12px' }}>
              <div style={{ fontSize: '36px', marginBottom: '14px' }}>{w.icon}</div>
              <div style={{ fontSize: '15px', fontWeight: '700', color: '#1e1b4b', marginBottom: '8px' }}>{w.title}</div>
              <div style={{ fontSize: '12px', color: '#6b7280', lineHeight: '1.7' }}>{w.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="section-pad" style={{ padding: '64px 24px', background: '#3b0764' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '11px', color: '#a78bfa', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: '600', marginBottom: '8px' }}>Get in touch</div>
          <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#fff', marginBottom: '12px' }}>Ready to Build Your Dream PC?</h2>
          <p style={{ fontSize: '14px', color: '#9ca3af', maxWidth: '500px', margin: '0 auto', lineHeight: '1.8' }}>
            Browse our products, add to cart, then contact us directly to confirm your order. We guide you every step of the way.
          </p>
        </div>
        <div className="contact-grid" style={{ display: 'flex', gap: '32px', alignItems: 'flex-start', justifyContent: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', width: '100%', marginBottom: '32px' }}>
            <Link to="/products">
              <button style={{ background: '#6d28d9', color: '#fff', border: 'none', borderRadius: '8px', padding: '14px 32px', fontWeight: '700', fontSize: '14px' }}>Browse Products</button>
            </Link>
            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer">
              <button style={{ background: '#25D366', color: '#fff', border: 'none', borderRadius: '8px', padding: '14px 32px', fontWeight: '700', fontSize: '14px' }}>💬 WhatsApp Us</button>
            </a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', width: '100%', maxWidth: '800px' }}>
            {[
              { icon: '📞', label: '+91 98765 43210', sub: 'Call or WhatsApp anytime' },
              { icon: '✉️', label: 'admin@ifixcomputers.com', sub: 'Email us anytime' },
              { icon: '📍', label: 'Delhi, India', sub: 'Visit our store' },
              { icon: '🕐', label: 'Mon - Sat: 10am - 7pm', sub: 'Store timings' },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(167,139,250,0.2)', borderRadius: '12px', padding: '16px 20px' }}>
                <div style={{ width: '44px', height: '44px', background: 'rgba(109,40,217,0.3)', border: '1px solid rgba(167,139,250,0.3)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>{row.icon}</div>
                <div>
                  <div style={{ fontSize: '13px', color: '#f9fafb', fontWeight: '600' }}>{row.label}</div>
                  <div style={{ fontSize: '11px', color: '#6b7280' }}>{row.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: '#2d0052', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '20px 24px' }}>
        <div className="footer-inner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ fontSize: '20px', fontWeight: '800', color: '#fff' }}>
            IFIX<span style={{ color: '#a78bfa' }}>Computers</span>
          </div>
          <div style={{ fontSize: '11px', color: '#4b5563' }}>© 2025 IFIX Computers, Delhi · All rights reserved</div>
          <Link to="/admin"><div style={{ fontSize: '11px', color: '#2d0052', cursor: 'pointer' }}>Admin</div></Link>
        </div>
      </div>
    </div>
  )
}