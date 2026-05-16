import { Link } from 'react-router-dom'
import { useState } from 'react'

const products = [
  { id: 1, name: 'Intel Core i5-13600K', price: 24500, originalPrice: 32000, category: 'Processor', img: '/images/cpu.jpg', stock: true, warranty: '3 Years', tag: 'HOT', condition: 'new' },
  { id: 2, name: 'RTX 4060 8GB GDDR6', price: 33000, originalPrice: 40000, category: 'GPU', img: '/images/gpu.jpg', stock: true, warranty: '3 Years', tag: 'NEW', condition: 'new' },
  { id: 3, name: 'Samsung 16GB DDR5', price: 7200, originalPrice: 9500, category: 'RAM', img: '/images/ram.jpg', stock: true, warranty: '5 Years', tag: '', condition: 'new' },
  { id: 4, name: 'ASUS B760M Motherboard', price: 14800, originalPrice: 18000, category: 'Motherboard', img: '/images/mobo.jpg', stock: true, warranty: '3 Years', tag: '', condition: 'new' },
  { id: 5, name: 'Samsung 980 Pro 1TB', price: 8500, originalPrice: 11000, category: 'Storage', img: '/images/ssd.jpg', stock: true, warranty: '5 Years', tag: 'SALE', condition: 'new' },
  { id: 6, name: 'Cooler Master Hyper 212', price: 3100, originalPrice: 4200, category: 'Cooling', img: '/images/cooler.jpg', stock: false, warranty: '2 Years', tag: '', condition: 'new' },
  { id: 7, name: 'Used Corsair 650W PSU', price: 3500, originalPrice: 7800, category: 'PSU', img: '/images/psu.jpg', stock: true, warranty: '6 Months', tag: '', condition: 'old' },
  { id: 8, name: 'Used Corsair 4000D Cabinet', price: 4000, originalPrice: 8200, category: 'Cabinet', img: '/images/cabinet.jpg', stock: true, warranty: '6 Months', tag: '', condition: 'old' },
]

const categories = [
  { name: 'Processor', img: '/images/cpu.jpg' },
  { name: 'GPU', img: '/images/gpu.jpg' },
  { name: 'Motherboard', img: '/images/mobo.jpg' },
  { name: 'RAM', img: '/images/ram.jpg' },
  { name: 'Storage', img: '/images/ssd.jpg' },
  { name: 'Cooling', img: '/images/cooler.jpg' },
  { name: 'Cabinet', img: '/images/cabinet.jpg' },
  { name: 'PSU', img: '/images/psu.jpg' },
]

const whyUs = [
  { icon: '✅', title: 'Genuine Products', desc: '100% authentic components with official manufacturer warranty' },
  { icon: '🚚', title: 'Fast Delivery', desc: 'Quick delivery across Delhi NCR within 24-48 hours' },
  { icon: '💰', title: 'Best Prices', desc: 'Lowest prices guaranteed with no hidden charges' },
  { icon: '🔧', title: 'Expert Support', desc: 'Free technical advice and after-sales support always' },
]

export default function Home() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('ifix_cart') || '[]'))
  const [menuOpen, setMenuOpen] = useState(false)
  const [condition, setCondition] = useState('new')

  const addToCart = (product) => {
    const existing = cart.find(i => i.id === product.id)
    const updated = existing
      ? cart.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      : [...cart, { ...product, qty: 1 }]
    setCart(updated)
    localStorage.setItem('ifix_cart', JSON.stringify(updated))
    alert(`${product.name} added to cart!`)
  }

  const discount = (orig, price) => Math.round((orig - price) / orig * 100)
  const filteredProducts = products.filter(p => p.condition === condition)

  return (
    <div style={{ minHeight: '100vh', background: '#f5f3ff', fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Inter', sans-serif !important; box-sizing: border-box; }
        a { text-decoration: none; color: inherit; }
        .prod-card:hover { box-shadow: 0 8px 24px rgba(88,28,135,0.12) !important; transform: translateY(-2px); }
        .cat-card:hover { border-color: #7c3aed !important; box-shadow: 0 4px 16px rgba(124,58,237,0.15) !important; }
        .add-btn:hover { background: #581c87 !important; }
        @media(max-width: 768px) {
          .topbar { display: none !important; }
          .nav-search { display: none !important; }
          .menu-btn { display: flex !important; }
          .cat-nav-bar { display: none !important; }
          .banner-inner { flex-direction: column !important; padding: 32px 16px !important; }
          .banner-right { display: none !important; }
          .banner-h1 { font-size: 28px !important; }
          .cat-grid { grid-template-columns: repeat(4, 1fr) !important; }
          .prod-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
          .why-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .contact-inner { flex-direction: column !important; text-align: center !important; }
          .footer-inner { flex-direction: column !important; text-align: center !important; gap: 12px !important; }
          .section-pad { padding: 28px 16px !important; }
          .stats-row { gap: 16px !important; }
        }
        @media(max-width: 480px) {
          .prod-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .banner-h1 { font-size: 24px !important; }
        }
      `}</style>

      {/* Topbar */}
      <div className="topbar" style={{ background: '#1e0a3c', padding: '7px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#c4b5fd' }}>
        <div style={{ display: 'flex', gap: '24px' }}>
          <span>+91 98765 43210</span>
          <span>admin@ifixcomputers.com</span>
          <span>Delhi, India</span>
        </div>
        <div style={{ fontWeight: '600', color: '#a78bfa' }}>Free Delivery on Orders Above 2,000!</div>
      </div>

      {/* Navbar */}
      <nav style={{ background: '#fff', borderBottom: '1px solid #e9d5ff', padding: '0 24px', display: 'flex', alignItems: 'center', gap: '16px', position: 'sticky', top: 0, zIndex: 100, height: '64px', boxShadow: '0 2px 8px rgba(88,28,135,0.08)' }}>
        <Link to="/">
          <div style={{ fontSize: '22px', fontWeight: '800', color: '#581c87', letterSpacing: '-0.5px', whiteSpace: 'nowrap' }}>
            IFIX<span style={{ color: '#212121' }}>Computers</span>
          </div>
        </Link>
        <div className="nav-search" style={{ flex: 1, maxWidth: '480px', display: 'flex', background: '#f5f3ff', border: '1.5px solid #e9d5ff', borderRadius: '8px', overflow: 'hidden' }}>
          <input style={{ flex: 1, background: 'transparent', border: 'none', padding: '10px 16px', color: '#212121', fontSize: '14px', outline: 'none' }} placeholder="Search for processors, GPUs, RAM..." />
          <button style={{ background: '#7c3aed', border: 'none', padding: '10px 18px', color: '#fff', fontWeight: '700', fontSize: '14px' }}>Search</button>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Link to="/cart">
            <button style={{ background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 20px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>
              Cart ({cart.length})
            </button>
          </Link>
          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'transparent', border: '1.5px solid #e9d5ff', color: '#581c87', borderRadius: '8px', padding: '10px 12px', fontSize: '20px', display: 'none', alignItems: 'center', cursor: 'pointer' }}>
            Menu
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{ background: '#fff', borderBottom: '1px solid #e9d5ff', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', background: '#f5f3ff', border: '1.5px solid #e9d5ff', borderRadius: '8px', overflow: 'hidden' }}>
            <input style={{ flex: 1, background: 'transparent', border: 'none', padding: '10px 16px', color: '#212121', fontSize: '13px', outline: 'none' }} placeholder="Search products..." />
            <button style={{ background: '#7c3aed', border: 'none', padding: '10px 14px', color: '#fff', fontWeight: '700' }}>Search</button>
          </div>
          {[['Home', '/'], ['Products', '/products'], ['Cart', '/cart']].map(([label, path]) => (
            <Link key={label} to={path} onClick={() => setMenuOpen(false)}>
              <div style={{ color: '#581c87', fontSize: '15px', fontWeight: '600', padding: '10px 0', borderBottom: '1px solid #f3f4f6' }}>{label}</div>
            </Link>
          ))}
        </div>
      )}

      {/* Category Nav Bar */}
      <div className="cat-nav-bar" style={{ background: '#fff', borderBottom: '1px solid #e9d5ff', padding: '0 24px', display: 'flex', overflowX: 'auto' }}>
        {['Home', 'Processors', 'GPU / Graphics', 'Motherboards', 'RAM', 'Storage', 'Cooling', 'Cabinets', 'PSU', 'Accessories'].map((item, i) => (
          <Link to={i === 0 ? '/' : '/products'} key={item}>
            <div style={{ padding: '12px 16px', fontSize: '13px', color: i === 0 ? '#7c3aed' : '#616161', whiteSpace: 'nowrap', borderBottom: i === 0 ? '2px solid #7c3aed' : '2px solid transparent', fontWeight: i === 0 ? '600' : '400' }}>
              {item}
            </div>
          </Link>
        ))}
      </div>

      {/* HERO BANNER */}
      <div style={{ background: 'linear-gradient(135deg, #1e0a3c 0%, #3b0764 50%, #4c1d95 100%)', padding: '0' }}>
        <div className="banner-inner" style={{ padding: '60px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '32px', maxWidth: '1200px', margin: '0 auto' }}>
          {/* Left */}
          <div style={{ flex: 1 }}>
            <div style={{ display: 'inline-block', background: 'rgba(167,139,250,0.15)', border: '1px solid rgba(167,139,250,0.3)', color: '#c4b5fd', fontSize: '11px', padding: '5px 14px', borderRadius: '4px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px', fontWeight: '600' }}>
              Delhi's Most Trusted Computer Store
            </div>
            <h1 className="banner-h1" style={{ fontSize: '52px', fontWeight: '800', color: '#fff', lineHeight: '1.1', marginBottom: '16px', letterSpacing: '-1px' }}>
              Premium Computer<br />Parts & Accessories
            </h1>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.75)', lineHeight: '1.7', marginBottom: '28px', maxWidth: '480px' }}>
              Build your dream PC with genuine components. Expert advice, best prices, fast delivery across Delhi NCR.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '36px' }}>
              <Link to="/products">
                <button style={{ background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '8px', padding: '14px 32px', fontWeight: '800', fontSize: '15px', cursor: 'pointer' }}>
                  Shop Now
                </button>
              </Link>
              <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer">
                <button style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '2px solid rgba(255,255,255,0.4)', borderRadius: '8px', padding: '12px 28px', fontWeight: '700', fontSize: '15px', cursor: 'pointer' }}>
                  WhatsApp Us
                </button>
              </a>
            </div>
            <div className="stats-row" style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
              {[['500+', 'Products'], ['10K+', 'Customers'], ['3yr', 'Warranty'], ['24/7', 'Support']].map(([num, label]) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '28px', fontWeight: '800', color: '#a78bfa' }}>{num}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '2px' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Feature Cards */}
          <div className="banner-right" style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '12px', width: '230px' }}>
            {[
              { title: 'Genuine Parts', desc: 'Official manufacturer warranty' },
              { title: 'Best Prices', desc: 'Price match guarantee' },
              { title: 'Fast Delivery', desc: 'Delhi NCR within 24-48hrs' },
              { title: 'Expert Support', desc: 'Free technical advice' },
            ].map(f => (
              <div key={f.title} style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(167,139,250,0.2)', borderRadius: '10px', padding: '14px 16px' }}>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#e9d5ff', marginBottom: '2px' }}>{f.title}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Shop By Category */}
      <div className="section-pad" style={{ padding: '48px 24px', background: '#fff' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <p style={{ fontSize: '12px', color: '#7c3aed', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px' }}>Browse by type</p>
          <h2 style={{ fontSize: '30px', fontWeight: '800', color: '#1e0a3c', marginBottom: '8px' }}>Shop By Category</h2>
          <p style={{ fontSize: '14px', color: '#757575' }}>Find exactly what you need from our wide range of components</p>

          {/* NEW / OLD Toggle */}
          <div style={{ display: 'inline-flex', background: '#f5f3ff', border: '1.5px solid #e9d5ff', borderRadius: '10px', padding: '4px', marginTop: '20px', gap: '4px' }}>
            <button onClick={() => setCondition('new')}
              style={{ background: condition === 'new' ? '#7c3aed' : 'transparent', color: condition === 'new' ? '#fff' : '#7c3aed', border: 'none', borderRadius: '8px', padding: '10px 32px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s' }}>
              New
            </button>
            <button onClick={() => setCondition('old')}
              style={{ background: condition === 'old' ? '#7c3aed' : 'transparent', color: condition === 'old' ? '#fff' : '#7c3aed', border: 'none', borderRadius: '8px', padding: '10px 32px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s' }}>
              Second Hand
            </button>
          </div>
        </div>

        {/* Category Cards with Real Images */}
        <div className="cat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '14px', maxWidth: '950px', margin: '0 auto' }}>
          {categories.map(cat => (
            <Link to="/products" key={cat.name}>
              <div className="cat-card" style={{ background: '#fff', border: '1.5px solid #e9d5ff', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.2s' }}>
                <div style={{ height: '80px', overflow: 'hidden', background: '#f5f3ff' }}>
                  <img src={cat.img} alt={cat.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={e => { e.target.style.display = 'none' }} />
                </div>
                <div style={{ padding: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', color: '#581c87', fontWeight: '700' }}>{cat.name}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="section-pad" style={{ padding: '0 24px 48px', background: '#f5f3ff' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <p style={{ fontSize: '12px', color: '#7c3aed', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px' }}>Handpicked for you</p>
          <h2 style={{ fontSize: '30px', fontWeight: '800', color: '#1e0a3c', marginBottom: '8px' }}>
            {condition === 'new' ? 'New Products' : 'Second Hand Products'}
          </h2>
          <p style={{ fontSize: '14px', color: '#757575' }}>
            {condition === 'new' ? 'Brand new components with full warranty' : 'Quality used components at unbeatable prices'}
          </p>
        </div>
        <div className="prod-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', maxWidth: '1000px', margin: '0 auto' }}>
          {filteredProducts.map(product => (
            <div key={product.id} className="prod-card" style={{ background: '#fff', border: '1px solid #e9d5ff', borderRadius: '12px', overflow: 'hidden', transition: 'all 0.2s' }}>
              <div style={{ background: '#faf5ff', height: '170px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #f3e8ff', position: 'relative', padding: '12px' }}>
                {product.condition === 'old' && (
                  <div style={{ position: 'absolute', top: '8px', left: '8px', background: '#fef3c7', color: '#92400e', fontSize: '10px', padding: '3px 8px', borderRadius: '4px', fontWeight: '700', zIndex: 2 }}>
                    USED
                  </div>
                )}
                {product.tag && (
                  <div style={{ position: 'absolute', top: product.condition === 'old' ? '32px' : '8px', left: '8px', background: product.tag === 'HOT' ? '#fee2e2' : product.tag === 'NEW' ? '#d1fae5' : '#ede9fe', color: product.tag === 'HOT' ? '#991b1b' : product.tag === 'NEW' ? '#065f46' : '#581c87', fontSize: '10px', padding: '3px 8px', borderRadius: '4px', fontWeight: '700', zIndex: 2 }}>
                    {product.tag}
                  </div>
                )}
                <div style={{ position: 'absolute', top: '8px', right: '8px', background: '#7c3aed', color: '#fff', fontSize: '10px', padding: '3px 8px', borderRadius: '4px', fontWeight: '700', zIndex: 2 }}>
                  -{discount(product.originalPrice, product.price)}%
                </div>
                <img src={product.img} alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }} />
                <div style={{ display: 'none', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', fontSize: '52px' }}>PC</div>
              </div>
              <div style={{ padding: '14px' }}>
                <div style={{ fontSize: '10px', color: '#7c3aed', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>{product.category}</div>
                <div style={{ fontSize: '14px', color: '#1e0a3c', fontWeight: '600', marginBottom: '10px', lineHeight: '1.4' }}>{product.name}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ fontSize: '20px', color: '#581c87', fontWeight: '800' }}>Rs.{product.price.toLocaleString()}</span>
                  <span style={{ fontSize: '12px', color: '#9e9e9e', textDecoration: 'line-through' }}>Rs.{product.originalPrice.toLocaleString()}</span>
                </div>
                <div style={{ fontSize: '11px', color: product.stock ? '#059669' : '#dc2626', fontWeight: '600', marginBottom: '6px' }}>
                  {product.stock ? 'In Stock' : 'Out of Stock'}
                </div>
                <div style={{ fontSize: '11px', color: '#9e9e9e', marginBottom: '12px' }}>Warranty: {product.warranty}</div>
                <button className="add-btn" onClick={() => addToCart(product)}
                  style={{ width: '100%', background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s' }}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📦</div>
            <h3 style={{ fontSize: '20px', color: '#581c87', marginBottom: '8px' }}>No {condition === 'old' ? 'second hand' : 'new'} products yet</h3>
            <p style={{ color: '#757575' }}>Check back soon or contact us directly!</p>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <Link to="/products">
            <button style={{ background: 'transparent', color: '#7c3aed', border: '2px solid #7c3aed', borderRadius: '8px', padding: '12px 36px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>
              View All Products
            </button>
          </Link>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="section-pad" style={{ padding: '48px 24px', background: '#fff' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <p style={{ fontSize: '12px', color: '#7c3aed', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px' }}>Why buy from us</p>
          <h2 style={{ fontSize: '30px', fontWeight: '800', color: '#1e0a3c', marginBottom: '8px' }}>Why Choose IFIX Computers?</h2>
          <p style={{ fontSize: '14px', color: '#757575' }}>We are committed to giving you the best experience</p>
        </div>
        <div className="why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', maxWidth: '900px', margin: '0 auto' }}>
          {whyUs.map(w => (
            <div key={w.title} style={{ textAlign: 'center', padding: '28px 16px', background: '#faf5ff', border: '1.5px solid #e9d5ff', borderRadius: '12px' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>{w.icon}</div>
              <div style={{ fontSize: '15px', fontWeight: '700', color: '#1e0a3c', marginBottom: '8px' }}>{w.title}</div>
              <div style={{ fontSize: '12px', color: '#757575', lineHeight: '1.7' }}>{w.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Banner */}
      <div style={{ background: 'linear-gradient(135deg, #1e0a3c 0%, #3b0764 100%)', padding: '56px 24px' }}>
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '34px', fontWeight: '800', color: '#fff', marginBottom: '12px' }}>Ready to Build Your Dream PC?</h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.7', marginBottom: '28px' }}>
            Browse products, add to cart, then contact us to confirm your order. Our experts will guide you!
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/products">
              <button style={{ background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '8px', padding: '14px 32px', fontWeight: '800', fontSize: '15px', cursor: 'pointer' }}>
                Browse Products
              </button>
            </Link>
            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer">
              <button style={{ background: '#25D366', color: '#fff', border: 'none', borderRadius: '8px', padding: '14px 28px', fontWeight: '700', fontSize: '15px', cursor: 'pointer' }}>
                WhatsApp Us
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* Contact Info Strip */}
      <div style={{ background: '#0f0520', padding: '28px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', maxWidth: '900px', margin: '0 auto' }}>
          {[
            { icon: '📞', label: '+91 98765 43210', sub: 'Call or WhatsApp anytime' },
            { icon: '✉', label: 'admin@ifixcomputers.com', sub: 'Email us anytime' },
            { icon: '📍', label: 'Delhi, India', sub: 'Visit our store' },
            { icon: '🕐', label: 'Mon - Sat: 10am - 7pm', sub: 'Store timings' },
          ].map((row, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '44px', height: '44px', background: '#3b0764', border: '1px solid #581c87', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>{row.icon}</div>
              <div>
                <div style={{ fontSize: '13px', color: '#e9d5ff', fontWeight: '600' }}>{row.label}</div>
                <div style={{ fontSize: '11px', color: '#6b7280' }}>{row.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: '#0a0118', borderTop: '1px solid #1e0a3c', padding: '20px 24px' }}>
        <div className="footer-inner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ fontSize: '20px', fontWeight: '800', color: '#fff' }}>
            IFIX<span style={{ color: '#a78bfa' }}>Computers</span>
          </div>
          <div style={{ fontSize: '12px', color: '#4b5563' }}>2025 IFIX Computers, Delhi. All rights reserved</div>
          <Link to="/admin"><div style={{ fontSize: '12px', color: '#0a0118', cursor: 'pointer' }}>Admin</div></Link>
        </div>
      </div>
    </div>
  )
}