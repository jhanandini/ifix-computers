import { Link } from 'react-router-dom'
import { useState } from 'react'

const newProducts = [
  { id: 1, name: 'Intel Core i5-13600K', price: 24500, originalPrice: 32000, category: 'Processor', img: '/images/cpu.jpg', stock: true, warranty: '3 Years', tag: 'HOT' },
  { id: 2, name: 'RTX 4060 8GB GDDR6', price: 33000, originalPrice: 40000, category: 'GPU', img: '/images/gpu.jpg', stock: true, warranty: '3 Years', tag: 'NEW' },
  { id: 3, name: 'Samsung 16GB DDR5', price: 7200, originalPrice: 9500, category: 'RAM', img: '/images/ram.jpg', stock: true, warranty: '5 Years', tag: '' },
  { id: 4, name: 'ASUS B760M Motherboard', price: 14800, originalPrice: 18000, category: 'Motherboard', img: '/images/mobo.jpg', stock: true, warranty: '3 Years', tag: '' },
  { id: 5, name: 'Samsung 980 Pro 1TB', price: 8500, originalPrice: 11000, category: 'Storage', img: '/images/ssd.jpg', stock: true, warranty: '5 Years', tag: 'SALE' },
  { id: 6, name: 'Cooler Master Hyper 212', price: 3100, originalPrice: 4200, category: 'Cooling', img: '/images/cooler.jpg', stock: false, warranty: '2 Years', tag: '' },
  { id: 7, name: 'Corsair 650W PSU', price: 7800, originalPrice: 9500, category: 'PSU', img: '/images/psu.jpg', stock: true, warranty: '5 Years', tag: '' },
  { id: 8, name: 'Corsair 4000D Cabinet', price: 8200, originalPrice: 10000, category: 'Cabinet', img: '/images/cabinet.jpg', stock: true, warranty: '2 Years', tag: 'NEW' },
]

const oldProducts = [
  { id: 9, name: 'Used Intel Core i7-10700K', price: 8000, originalPrice: 22000, category: 'Processor', img: '/images/cpu.jpg', stock: true, warranty: '3 Months', tag: '' },
  { id: 10, name: 'Used RTX 3060 12GB', price: 12000, originalPrice: 28000, category: 'GPU', img: '/images/gpu.jpg', stock: true, warranty: '3 Months', tag: '' },
  { id: 11, name: 'Used Corsair 16GB DDR4', price: 2500, originalPrice: 6000, category: 'RAM', img: '/images/ram.jpg', stock: true, warranty: '3 Months', tag: '' },
  { id: 12, name: 'Used MSI B450 Motherboard', price: 4000, originalPrice: 10000, category: 'Motherboard', img: '/images/mobo.jpg', stock: true, warranty: '3 Months', tag: '' },
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
  const displayProducts = condition === 'new' ? newProducts : oldProducts

  return (
    <div style={{ minHeight: '100vh', background: '#f5f3ff', fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Inter', sans-serif !important; box-sizing: border-box; }
        a { text-decoration: none; color: inherit; }
        .prod-card { transition: all 0.2s; }
        .prod-card:hover { box-shadow: 0 8px 24px rgba(88,28,135,0.15) !important; transform: translateY(-3px); }
        .cat-card { transition: all 0.2s; }
        .cat-card:hover { border-color: #7c3aed !important; transform: translateY(-2px); box-shadow: 0 4px 16px rgba(124,58,237,0.15) !important; }
        .add-btn:hover { background: #4c1d95 !important; }
        .nav-link:hover { color: #7c3aed !important; }
        @media(max-width: 768px) {
          .topbar { display: none !important; }
          .nav-search { display: none !important; }
          .menu-btn { display: flex !important; }
          .cat-nav-bar { display: none !important; }
          .hero-inner { flex-direction: column !important; padding: 36px 16px !important; }
          .hero-right { display: none !important; }
          .hero-h1 { font-size: 30px !important; }
          .hero-stats { gap: 20px !important; }
          .cat-grid { grid-template-columns: repeat(4, 1fr) !important; gap: 8px !important; }
          .prod-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
          .why-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .contact-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .footer-inner { flex-direction: column !important; text-align: center !important; gap: 12px !important; }
          .section-pad { padding: 28px 16px !important; }
        }
        @media(max-width: 480px) {
          .prod-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .hero-h1 { font-size: 24px !important; }
          .cat-grid { grid-template-columns: repeat(4, 1fr) !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
          .why-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Topbar */}
      <div className="topbar" style={{ background: '#1e0a3c', padding: '7px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#c4b5fd' }}>
        <div style={{ display: 'flex', gap: '24px' }}>
          <span>+91 98765 43210</span>
          <span>admin@ifixcomputers.com</span>
          <span>Delhi, India</span>
        </div>
        <div style={{ fontWeight: '600', color: '#a78bfa' }}>Free Expert Advice on Every Purchase!</div>
      </div>

      {/* Navbar - White Background */}
      <nav style={{ background: '#ffffff', borderBottom: '1px solid #e9d5ff', padding: '0 24px', display: 'flex', alignItems: 'center', gap: '16px', position: 'sticky', top: 0, zIndex: 100, height: '64px', boxShadow: '0 2px 12px rgba(88,28,135,0.08)' }}>
        <Link to="/">
          <div style={{ fontSize: '22px', fontWeight: '800', color: '#581c87', letterSpacing: '-0.5px', whiteSpace: 'nowrap' }}>
            IFIX<span style={{ color: '#1e0a3c' }}>Computers</span>
          </div>
        </Link>
        <div className="nav-search" style={{ flex: 1, maxWidth: '480px', display: 'flex', background: '#f5f3ff', border: '1.5px solid #e9d5ff', borderRadius: '8px', overflow: 'hidden' }}>
          <input style={{ flex: 1, background: 'transparent', border: 'none', padding: '10px 16px', color: '#1e0a3c', fontSize: '14px', outline: 'none' }} placeholder="Search for processors, GPUs, RAM..." />
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
        <div style={{ background: '#fff', borderBottom: '1px solid #e9d5ff', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: '0 4px 12px rgba(88,28,135,0.1)' }}>
          <div style={{ display: 'flex', background: '#f5f3ff', border: '1.5px solid #e9d5ff', borderRadius: '8px', overflow: 'hidden' }}>
            <input style={{ flex: 1, background: 'transparent', border: 'none', padding: '10px 16px', color: '#1e0a3c', fontSize: '13px', outline: 'none' }} placeholder="Search products..." />
            <button style={{ background: '#7c3aed', border: 'none', padding: '10px 14px', color: '#fff', fontWeight: '600' }}>Search</button>
          </div>
          {[['Home', '/'], ['Products', '/products'], ['Cart', '/cart']].map(([label, path]) => (
            <Link key={label} to={path} onClick={() => setMenuOpen(false)}>
              <div style={{ color: '#581c87', fontSize: '15px', fontWeight: '600', padding: '10px 0', borderBottom: '1px solid #f3f4f6' }}>{label}</div>
            </Link>
          ))}
        </div>
      )}

      {/* Category Nav Bar */}
      <div className="cat-nav-bar" style={{ background: '#ffffff', borderBottom: '1px solid #e9d5ff', padding: '0 24px', display: 'flex', overflowX: 'auto' }}>
        {['Home', 'Processors', 'GPU / Graphics', 'Motherboards', 'RAM', 'Storage', 'Cooling', 'Cabinets', 'PSU', 'Accessories'].map((item, i) => (
          <Link to={i === 0 ? '/' : '/products'} key={item}>
            <div className="nav-link" style={{ padding: '12px 16px', fontSize: '13px', color: i === 0 ? '#7c3aed' : '#616161', whiteSpace: 'nowrap', borderBottom: i === 0 ? '2px solid #7c3aed' : '2px solid transparent', fontWeight: i === 0 ? '600' : '400', display: 'block' }}>
              {item}
            </div>
          </Link>
        ))}
      </div>

      {/* HERO BANNER */}
      <div style={{ position: 'relative', overflow: 'hidden', background: '#3b0764', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        {/* Hero BG image */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/hero.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.25 }}></div>
        {/* Gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(30,10,60,0.95) 0%, rgba(59,7,100,0.85) 50%, rgba(76,29,149,0.75) 100%)' }}></div>
        {/* Grid pattern */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(167,139,250,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.05) 1px, transparent 1px)', backgroundSize: '48px 48px' }}></div>
        {/* Glow */}
        <div style={{ position: 'absolute', right: 0, top: 0, width: '50%', height: '100%', background: 'radial-gradient(ellipse at right, rgba(109,40,217,0.2) 0%, transparent 70%)' }}></div>

        <div className="hero-inner" style={{ position: 'relative', zIndex: 1, padding: '72px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px' }}>
          {/* Left */}
          <div style={{ flex: 1, maxWidth: '580px' }}>
            <div style={{ display: 'inline-block', background: 'rgba(167,139,250,0.12)', border: '1px solid rgba(167,139,250,0.3)', color: '#c4b5fd', fontSize: '11px', padding: '5px 14px', borderRadius: '4px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px', fontWeight: '600' }}>
              Delhi's No.1 Computer Store
            </div>
            <h1 className="hero-h1" style={{ fontSize: '54px', fontWeight: '800', color: '#fff', lineHeight: '1.1', marginBottom: '8px', letterSpacing: '-1px' }}>
              Premium Parts.
            </h1>
            <h1 className="hero-h1" style={{ fontSize: '54px', fontWeight: '800', color: '#a78bfa', lineHeight: '1.1', marginBottom: '20px', letterSpacing: '-1px' }}>
              Expert Advice.
            </h1>
            <div style={{ width: '60px', height: '4px', background: '#7c3aed', borderRadius: '2px', marginBottom: '20px' }}></div>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.75)', lineHeight: '1.8', marginBottom: '32px', maxWidth: '460px' }}>
              Curated selection of new and second hand high-performance components. Genuine warranty, best prices — trusted by builders across Delhi NCR.
            </p>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '44px' }}>
              <Link to="/products">
                <button style={{ background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '8px', padding: '14px 32px', fontWeight: '800', fontSize: '15px', cursor: 'pointer' }}>
                  Shop Now
                </button>
              </Link>
              <a href="tel:+919876543210">
                <button style={{ background: 'transparent', color: '#c4b5fd', border: '2px solid rgba(167,139,250,0.5)', borderRadius: '8px', padding: '12px 28px', fontWeight: '700', fontSize: '15px', cursor: 'pointer' }}>
                  Call Us
                </button>
              </a>
            </div>
            <div className="hero-stats" style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', paddingTop: '28px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              {[['500+', 'Products'], ['10K+', 'Customers'], ['3yr', 'Warranty'], ['24/7', 'Support']].map(([num, label]) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '28px', fontWeight: '800', color: '#a78bfa' }}>{num}</div>
                  <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1.5px', marginTop: '2px' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Card */}
          <div className="hero-right" style={{ flexShrink: 0, width: '260px' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(167,139,250,0.25)', borderRadius: '14px', padding: '28px 20px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #7c3aed, #a78bfa)' }}></div>
              <div style={{ fontSize: '72px', marginBottom: '12px' }}>💻</div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#fff', marginBottom: '4px' }}>Expert Builds</div>
              <div style={{ fontSize: '10px', color: '#6b7280', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' }}>Always Available</div>
              {['Intel & AMD Processors', 'RTX 40 Series GPUs', 'DDR5 RAM & NVMe SSDs', 'New & Used Parts'].map(spec => (
                <div key={spec} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '6px', padding: '8px 12px', marginBottom: '8px', textAlign: 'left' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#a78bfa', flexShrink: 0 }}></div>
                  <div style={{ fontSize: '12px', color: '#9ca3af' }}>{spec}</div>
                </div>
              ))}
              <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer">
                <button style={{ width: '100%', background: '#25D366', color: '#fff', border: 'none', borderRadius: '8px', padding: '12px', fontWeight: '700', fontSize: '13px', marginTop: '8px', cursor: 'pointer' }}>
                  WhatsApp Us
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Shop By Category */}
      <div className="section-pad" style={{ padding: '52px 24px', background: '#fff' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <p style={{ fontSize: '12px', color: '#7c3aed', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px' }}>Browse by type</p>
          <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#1e0a3c', marginBottom: '8px' }}>Shop By Category</h2>
          <p style={{ fontSize: '15px', color: '#6b7280', marginBottom: '24px' }}>Find exactly what you need — new or second hand</p>

          {/* New / Old Toggle */}
          <div style={{ display: 'inline-flex', background: '#f5f3ff', border: '2px solid #e9d5ff', borderRadius: '12px', padding: '4px', gap: '4px' }}>
            <button onClick={() => setCondition('new')}
              style={{ background: condition === 'new' ? '#7c3aed' : 'transparent', color: condition === 'new' ? '#fff' : '#7c3aed', border: 'none', borderRadius: '8px', padding: '10px 36px', fontWeight: '700', fontSize: '15px', cursor: 'pointer', transition: 'all 0.2s' }}>
              New
            </button>
            <button onClick={() => setCondition('old')}
              style={{ background: condition === 'old' ? '#7c3aed' : 'transparent', color: condition === 'old' ? '#fff' : '#7c3aed', border: 'none', borderRadius: '8px', padding: '10px 36px', fontWeight: '700', fontSize: '15px', cursor: 'pointer', transition: 'all 0.2s' }}>
              Second Hand
            </button>
          </div>
        </div>

        {/* Real Image Category Cards */}
        <div className="cat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '14px', maxWidth: '950px', margin: '0 auto' }}>
          {categories.map(cat => (
            <Link to="/products" key={cat.name}>
              <div className="cat-card" style={{ background: '#fff', border: '1.5px solid #e9d5ff', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer' }}>
                <div style={{ height: '82px', overflow: 'hidden', background: '#faf5ff' }}>
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
      <div className="section-pad" style={{ padding: '0 24px 52px', background: '#f5f3ff' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <p style={{ fontSize: '12px', color: '#7c3aed', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px' }}>Handpicked for you</p>
          <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#1e0a3c', marginBottom: '8px' }}>
            {condition === 'new' ? 'New Products' : 'Second Hand Products'}
          </h2>
          <p style={{ fontSize: '15px', color: '#6b7280' }}>
            {condition === 'new' ? 'Brand new components with full manufacturer warranty' : 'Quality tested used components at unbeatable prices'}
          </p>
        </div>
        <div className="prod-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', maxWidth: '1000px', margin: '0 auto' }}>
          {displayProducts.map(product => (
            <div key={product.id} className="prod-card" style={{ background: '#fff', border: '1px solid #e9d5ff', borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{ background: '#faf5ff', height: '170px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #f3e8ff', position: 'relative', padding: '12px' }}>
                {condition === 'old' && (
                  <div style={{ position: 'absolute', top: '8px', left: '8px', background: '#fef3c7', color: '#92400e', fontSize: '10px', padding: '3px 8px', borderRadius: '4px', fontWeight: '700', zIndex: 2 }}>USED</div>
                )}
                {product.tag && (
                  <div style={{ position: 'absolute', top: condition === 'old' ? '34px' : '8px', left: '8px', background: product.tag === 'HOT' ? '#fee2e2' : product.tag === 'NEW' ? '#d1fae5' : '#ede9fe', color: product.tag === 'HOT' ? '#991b1b' : product.tag === 'NEW' ? '#065f46' : '#581c87', fontSize: '10px', padding: '3px 8px', borderRadius: '4px', fontWeight: '700', zIndex: 2 }}>
                    {product.tag}
                  </div>
                )}
                <div style={{ position: 'absolute', top: '8px', right: '8px', background: '#7c3aed', color: '#fff', fontSize: '10px', padding: '3px 8px', borderRadius: '4px', fontWeight: '700', zIndex: 2 }}>
                  -{discount(product.originalPrice, product.price)}%
                </div>
                <img src={product.img} alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }} />
                <div style={{ display: 'none', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', fontSize: '48px', color: '#7c3aed', fontWeight: '800' }}>PC</div>
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
                  style={{ width: '100%', background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <Link to="/products">
            <button style={{ background: 'transparent', color: '#7c3aed', border: '2px solid #7c3aed', borderRadius: '8px', padding: '12px 36px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>
              View All Products
            </button>
          </Link>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="section-pad" style={{ padding: '52px 24px', background: '#fff' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <p style={{ fontSize: '12px', color: '#7c3aed', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px' }}>Why buy from us</p>
          <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#1e0a3c', marginBottom: '8px' }}>Why Choose IFIX Computers?</h2>
          <p style={{ fontSize: '15px', color: '#6b7280' }}>Committed to giving you the best experience every time</p>
        </div>
        <div className="why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', maxWidth: '900px', margin: '0 auto' }}>
          {[
            { icon: '✅', title: 'Genuine Products', desc: '100% authentic components with official manufacturer warranty' },
            { icon: '💰', title: 'Best Prices', desc: 'Lowest prices in Delhi NCR with no hidden charges' },
            { icon: '🔧', title: 'Expert Support', desc: 'Free technical advice and after-sales support always' },
            { icon: '🔄', title: 'Easy Returns', desc: '7-day hassle free return policy on all products' },
          ].map(w => (
            <div key={w.title} style={{ textAlign: 'center', padding: '28px 16px', background: '#faf5ff', border: '1.5px solid #e9d5ff', borderRadius: '12px' }}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>{w.icon}</div>
              <div style={{ fontSize: '16px', fontWeight: '700', color: '#1e0a3c', marginBottom: '8px' }}>{w.title}</div>
              <div style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.7' }}>{w.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Banner */}
      <div style={{ background: 'linear-gradient(135deg, #1e0a3c 0%, #3b0764 100%)', padding: '64px 24px' }}>
        <div style={{ textAlign: 'center', maxWidth: '620px', margin: '0 auto' }}>
          <p style={{ fontSize: '12px', color: '#a78bfa', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>Get in touch</p>
          <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#fff', marginBottom: '14px', lineHeight: '1.2' }}>Ready to Build Your Dream PC?</h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', lineHeight: '1.8', marginBottom: '32px' }}>
            Browse products, add to cart, then contact us to confirm your order. Our experts will guide you every step of the way!
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

      {/* Contact Info */}
      <div style={{ background: '#0f0520', padding: '32px 24px' }}>
        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', maxWidth: '900px', margin: '0 auto' }}>
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