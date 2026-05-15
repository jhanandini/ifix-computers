import { Link } from 'react-router-dom'
import { useState } from 'react'

const products = [
  {
    id: 1, name: 'Intel Core i5-13600K', price: 24500, originalPrice: 32000, category: 'Processor',
    img: 'https://m.media-amazon.com/images/I/61o4DjXQ8PL._SX522_.jpg',
    stock: true, warranty: '3 Years', tag: 'HOT'
  },
  {
    id: 2, name: 'RTX 4060 8GB GDDR6', price: 33000, originalPrice: 40000, category: 'GPU',
    img: 'https://m.media-amazon.com/images/I/81VlsGfnORL._SX522_.jpg',
    stock: true, warranty: '3 Years', tag: 'NEW'
  },
  {
    id: 3, name: 'Samsung 16GB DDR5', price: 7200, originalPrice: 9500, category: 'RAM',
    img: 'https://m.media-amazon.com/images/I/61DBToNbayL._SX522_.jpg',
    stock: true, warranty: '5 Years', tag: ''
  },
  {
    id: 4, name: 'ASUS B760M Motherboard', price: 14800, originalPrice: 18000, category: 'Motherboard',
    img: 'https://m.media-amazon.com/images/I/81lFnHrV3kL._SX522_.jpg',
    stock: true, warranty: '3 Years', tag: ''
  },
  {
    id: 5, name: 'Samsung 980 Pro 1TB', price: 8500, originalPrice: 11000, category: 'Storage',
    img: 'https://m.media-amazon.com/images/I/81+dGDTXFKL._SX522_.jpg',
    stock: true, warranty: '5 Years', tag: 'SALE'
  },
  {
    id: 6, name: 'Cooler Master Hyper 212', price: 3100, originalPrice: 4200, category: 'Cooling',
    img: 'https://m.media-amazon.com/images/I/61s5gTMDEiL._SX522_.jpg',
    stock: false, warranty: '2 Years', tag: ''
  },
  {
    id: 7, name: 'Corsair 650W PSU', price: 7800, originalPrice: 9500, category: 'PSU',
    img: 'https://m.media-amazon.com/images/I/71DnWfBGpJL._SX522_.jpg',
    stock: true, warranty: '5 Years', tag: ''
  },
  {
    id: 8, name: 'Corsair 4000D Cabinet', price: 8200, originalPrice: 10000, category: 'Cabinet',
    img: 'https://m.media-amazon.com/images/I/81GE+wLhGjL._SX522_.jpg',
    stock: true, warranty: '2 Years', tag: 'NEW'
  },
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
    <div style={{ minHeight: '100vh', background: '#0A0A0A' }}>
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .float-anim { animation: float 4s ease-in-out infinite; }
        @media(max-width:768px){
          .nav-search{display:none!important}
          .menu-btn{display:block!important}
          .hero-inner{flex-direction:column!important;padding:32px 16px!important}
          .hero-right{display:none!important}
          .hero-h1{font-size:32px!important}
          .hero-stats{gap:16px!important}
          .cat-nav{display:none!important}
          .products-grid{grid-template-columns:repeat(2,1fr)!important;gap:10px!important}
          .why-grid{grid-template-columns:repeat(2,1fr)!important}
          .contact-grid{grid-template-columns:1fr!important}
          .footer-inner{flex-direction:column!important;text-align:center!important;gap:8px!important}
          .section-pad{padding:20px 16px!important}
          .cat-grid{grid-template-columns:repeat(4,1fr)!important}
          .topbar-right{display:none!important}
        }
        .cat-card:hover{border-color:#C9A84C!important;background:#161616!important}
        .product-card:hover{border-color:#C9A84C!important}
        .add-btn:hover{background:#C9A84C!important;color:#000!important}
        .cat-nav-item:hover{color:#C9A84C!important;border-bottom-color:#C9A84C!important}
      `}</style>

      {/* Topbar */}
      <div style={{ background: '#0d0d0d', borderBottom: '1px solid #1a1a1a', padding: '7px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: '#555' }}>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <span>✉ admin@ifixcomputers.com</span>
          <span>📞 +91 98765 43210</span>
          <span>📍 Shimla, Himachal Pradesh</span>
        </div>
        <div className="topbar-right" style={{ color: '#C9A84C', fontWeight: '600', fontSize: '11px', letterSpacing: '0.5px' }}>
          Free Expert Advice on Every Purchase!
        </div>
      </div>

      {/* Navbar */}
      <nav style={{ background: '#0A0A0A', borderBottom: '1px solid #1a1a1a', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '16px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '24px', fontWeight: '700', color: '#C9A84C', letterSpacing: '2px', whiteSpace: 'nowrap' }}>
          IFIX<span style={{ color: '#fff' }}>Computers</span>
        </div>
        <div className="nav-search" style={{ flex: 1, maxWidth: '420px', display: 'flex', background: '#141414', border: '1px solid #2a2a2a', borderRadius: '5px', overflow: 'hidden' }}>
          <input style={{ flex: 1, background: 'transparent', border: 'none', padding: '9px 14px', color: '#aaa', fontSize: '13px', outline: 'none' }} placeholder="Search products, brands..." />
          <button style={{ background: '#C9A84C', border: 'none', padding: '9px 16px', color: '#000', fontWeight: '700', fontSize: '14px' }}>🔍</button>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Link to="/cart">
            <button style={{ background: '#C9A84C', color: '#000', border: 'none', borderRadius: '5px', padding: '9px 20px', fontWeight: '700', fontSize: '13px' }}>
              🛒 Cart ({cart.length})
            </button>
          </Link>
          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'transparent', border: '1px solid #2a2a2a', color: '#fff', borderRadius: '5px', padding: '9px 12px', fontSize: '18px', display: 'none' }}>☰</button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{ background: '#111', borderBottom: '1px solid #222', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '5px', overflow: 'hidden' }}>
            <input style={{ flex: 1, background: 'transparent', border: 'none', padding: '10px 14px', color: '#fff', fontSize: '13px', outline: 'none' }} placeholder="Search products..." />
            <button style={{ background: '#C9A84C', border: 'none', padding: '10px 14px', color: '#000', fontWeight: '700' }}>🔍</button>
          </div>
          {[['Home', '/'], ['Products', '/products'], ['Cart', '/cart']].map(([label, path]) => (
            <Link key={label} to={path} onClick={() => setMenuOpen(false)}>
              <div style={{ color: '#C9A84C', fontSize: '15px', fontWeight: '600', padding: '8px 0', borderBottom: '1px solid #1a1a1a' }}>{label}</div>
            </Link>
          ))}
        </div>
      )}

      {/* Category Nav */}
      <div className="cat-nav" style={{ background: '#0d0d0d', borderBottom: '1px solid #1a1a1a', padding: '0 24px', display: 'flex', overflowX: 'auto' }}>
        {['Home', 'Processors', 'GPU / Graphics', 'Motherboards', 'RAM', 'Storage', 'Cooling', 'Cabinets', 'PSU', 'Accessories'].map((item, i) => (
          <Link to={i === 0 ? '/' : '/products'} key={item}>
            <div className="cat-nav-item" style={{ padding: '11px 16px', fontSize: '12px', color: i === 0 ? '#C9A84C' : '#555', whiteSpace: 'nowrap', borderBottom: i === 0 ? '2px solid #C9A84C' : '2px solid transparent', letterSpacing: '0.5px', fontWeight: i === 0 ? '600' : '400' }}>
              {item}
            </div>
          </Link>
        ))}
      </div>

      {/* ===== HERO BANNER ===== */}
      <div style={{ position: 'relative', overflow: 'hidden', background: '#0A0A0A', borderBottom: '1px solid #1a1a1a' }}>
        {/* Grid Background */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(201,168,76,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.05) 1px, transparent 1px)', backgroundSize: '48px 48px', pointerEvents: 'none' }}></div>
        {/* Radial Glow */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 75% 50%, rgba(201,168,76,0.09) 0%, transparent 60%), radial-gradient(ellipse at 15% 60%, rgba(201,168,76,0.04) 0%, transparent 50%)', pointerEvents: 'none' }}></div>
        {/* Corner Accent */}
        <div style={{ position: 'absolute', top: 0, right: 0, width: '400px', height: '400px', background: 'radial-gradient(ellipse at top right, rgba(201,168,76,0.07) 0%, transparent 70%)', pointerEvents: 'none' }}></div>

        <div className="hero-inner" style={{ position: 'relative', zIndex: 1, padding: '64px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px' }}>

          {/* Left Content */}
          <div style={{ flex: 1, maxWidth: '560px' }}>
            {/* Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.25)', color: '#C9A84C', fontSize: '10px', padding: '5px 14px', borderRadius: '2px', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: '20px' }}>
              ⭐ Shimla's No.1 Computer Store
            </div>

            {/* Headline */}
            <h1 className="hero-h1" style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '58px', fontWeight: '700', lineHeight: '1.05', color: '#F0EDE8', marginBottom: '4px', letterSpacing: '1px' }}>
              Premium Parts.
            </h1>
            <h1 className="hero-h1" style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '58px', fontWeight: '700', lineHeight: '1.05', color: '#C9A84C', marginBottom: '16px', letterSpacing: '1px' }}>
              Expert Advice.
            </h1>

            {/* Gold line */}
            <div style={{ width: '64px', height: '3px', background: 'linear-gradient(90deg, #C9A84C, transparent)', marginBottom: '20px', borderRadius: '2px' }}></div>

            <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.8', marginBottom: '28px', maxWidth: '440px' }}>
              Curated selection of high-performance components. Genuine warranty, best prices — trusted by builders across Himachal Pradesh.
            </p>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '40px' }}>
              <Link to="/products">
                <button style={{ background: '#C9A84C', color: '#000', border: 'none', borderRadius: '4px', padding: '14px 32px', fontWeight: '700', fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Shop Now →
                </button>
              </Link>
              <a href="tel:+919876543210">
                <button style={{ background: 'transparent', color: '#C9A84C', border: '1px solid #C9A84C', borderRadius: '4px', padding: '14px 32px', fontWeight: '600', fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  📞 Call Us
                </button>
              </a>
            </div>

            {/* Stats */}
            <div className="hero-stats" style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', paddingTop: '28px', borderTop: '1px solid #1a1a1a' }}>
              {[['500+', 'Products'], ['5★', 'Rated'], ['3yr', 'Warranty'], ['24/7', 'Support']].map(([num, label]) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '28px', fontWeight: '700', color: '#C9A84C' }}>{num}</div>
                  <div style={{ fontSize: '10px', color: '#444', letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: '2px' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual Card */}
          <div className="hero-right" style={{ flexShrink: 0, width: '280px' }}>
            <div style={{ background: '#111', border: '1px solid #2a2a2a', borderRadius: '12px', padding: '28px 20px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              {/* Card glow */}
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.08) 0%, transparent 70%)', pointerEvents: 'none' }}></div>
              {/* Top gold line */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }}></div>

              <div className="float-anim" style={{ fontSize: '80px', marginBottom: '12px', display: 'block', position: 'relative', zIndex: 1 }}>🖥️</div>
              <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '20px', color: '#F0EDE8', fontWeight: '700', marginBottom: '4px', letterSpacing: '1px', position: 'relative', zIndex: 1 }}>Expert Builds</div>
              <div style={{ fontSize: '10px', color: '#444', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px', position: 'relative', zIndex: 1 }}>Always Available</div>

              {/* Specs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px', position: 'relative', zIndex: 1 }}>
                {['Intel / AMD Processors', 'RTX 40 Series GPUs', 'DDR5 RAM & NVMe SSDs', '3 Year Warranty Included'].map(spec => (
                  <div key={spec} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: '4px', padding: '8px 12px', textAlign: 'left' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C9A84C', flexShrink: 0 }}></div>
                    <div style={{ fontSize: '11px', color: '#888' }}>{spec}</div>
                  </div>
                ))}
              </div>

              <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" style={{ position: 'relative', zIndex: 1, display: 'block' }}>
                <button style={{ width: '100%', background: '#25D366', color: '#fff', border: 'none', borderRadius: '4px', padding: '12px', fontWeight: '700', fontSize: '13px', letterSpacing: '0.5px' }}>
                  💬 WhatsApp Us
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* ===== END HERO BANNER ===== */}

      {/* Shop By Category */}
      <div className="section-pad" style={{ padding: '36px 24px 28px' }}>
        <div style={{ fontSize: '11px', color: '#C9A84C', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px' }}>Browse by type</div>
        <h2 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '24px', fontWeight: '700', color: '#F0EDE8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>Shop By Category</h2>
        <div className="cat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '12px' }}>
          {categories.map(cat => (
            <Link to="/products" key={cat.name}>
              <div className="cat-card" style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: '8px', padding: '18px 8px', textAlign: 'center', cursor: 'pointer' }}>
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>{cat.emoji}</div>
                <div style={{ fontSize: '11px', color: '#C9A84C', fontWeight: '600', letterSpacing: '0.5px' }}>{cat.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="section-pad" style={{ padding: '0 24px 36px', background: '#0A0A0A' }}>
        <div style={{ fontSize: '11px', color: '#C9A84C', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px' }}>Handpicked for you</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '24px', fontWeight: '700', color: '#F0EDE8', textTransform: 'uppercase', letterSpacing: '1px' }}>Featured Products</h2>
          <Link to="/products">
            <span style={{ fontSize: '12px', color: '#C9A84C', letterSpacing: '1px', borderBottom: '1px solid #C9A84C', paddingBottom: '2px' }}>View All →</span>
          </Link>
        </div>
        <div className="products-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
          {products.map(product => (
            <div key={product.id} className="product-card" style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: '8px', overflow: 'hidden' }}>
              {/* Product Image */}
              <div style={{ background: '#fff', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #1a1a1a', position: 'relative', overflow: 'hidden', padding: '12px' }}>
                {product.tag && (
                  <div style={{ position: 'absolute', top: '8px', left: '8px', background: product.tag === 'HOT' ? '#e53e3e' : product.tag === 'NEW' ? '#38a169' : '#C9A84C', color: product.tag === 'SALE' ? '#000' : '#fff', fontSize: '9px', padding: '3px 8px', borderRadius: '2px', fontWeight: '700', letterSpacing: '1px', zIndex: 2 }}>
                    {product.tag}
                  </div>
                )}
                <div style={{ position: 'absolute', top: '8px', right: '8px', background: '#e53e3e', color: '#fff', fontSize: '9px', padding: '3px 8px', borderRadius: '2px', fontWeight: '700', zIndex: 2 }}>
                  -{discount(product.originalPrice, product.price)}%
                </div>
                <img
                  src={product.img}
                  alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/200x160/111111/C9A84C?text=IFIX' }}
                />
              </div>
              {/* Product Info */}
              <div style={{ padding: '12px' }}>
                <div style={{ fontSize: '10px', color: '#C9A84C', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '4px' }}>{product.category}</div>
                <div style={{ fontSize: '13px', color: '#F0EDE8', fontWeight: '500', marginBottom: '8px', lineHeight: '1.4' }}>{product.name}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ fontSize: '16px', color: '#C9A84C', fontWeight: '700', fontFamily: 'Rajdhani, sans-serif' }}>₹{product.price.toLocaleString()}</span>
                  <span style={{ fontSize: '11px', color: '#333', textDecoration: 'line-through' }}>₹{product.originalPrice.toLocaleString()}</span>
                </div>
                <div style={{ fontSize: '10px', color: product.stock ? '#38a169' : '#e53e3e', marginBottom: '6px' }}>
                  {product.stock ? '● In Stock' : '● Out of Stock'}
                </div>
                <div style={{ fontSize: '10px', color: '#333', marginBottom: '10px' }}>Warranty: {product.warranty}</div>
                <button className="add-btn" onClick={() => addToCart(product)}
                  style={{ width: '100%', background: 'transparent', color: '#C9A84C', border: '1px solid #2a2a2a', borderRadius: '4px', padding: '8px', fontSize: '11px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '28px' }}>
          <Link to="/products">
            <button style={{ background: 'transparent', color: '#C9A84C', border: '1px solid #C9A84C', borderRadius: '4px', padding: '12px 32px', fontWeight: '600', fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase' }}>
              View All Products →
            </button>
          </Link>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="section-pad" style={{ background: '#0d0d0d', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a', padding: '40px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ fontSize: '11px', color: '#C9A84C', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px' }}>Our Promise</div>
          <h2 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '24px', fontWeight: '700', color: '#F0EDE8', textTransform: 'uppercase', letterSpacing: '1px' }}>Why Choose IFIX?</h2>
        </div>
        <div className="why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
          {[
            { icon: '🛡️', title: 'Genuine Parts', desc: '100% authentic components with manufacturer warranty on every product' },
            { icon: '⚡', title: 'Expert Advice', desc: 'Professional guidance for every build, upgrade and repair' },
            { icon: '💰', title: 'Best Prices', desc: 'Most competitive pricing in Shimla with no hidden charges' },
            { icon: '🔧', title: 'After Sales Support', desc: 'We are always here for you even after your purchase' },
          ].map(w => (
            <div key={w.title} style={{ textAlign: 'center', padding: '24px 16px', background: '#111', border: '1px solid #1a1a1a', borderRadius: '8px' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>{w.icon}</div>
              <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '16px', fontWeight: '700', color: '#C9A84C', marginBottom: '8px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>{w.title}</div>
              <div style={{ fontSize: '12px', color: '#555', lineHeight: '1.7' }}>{w.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="contact-grid section-pad" style={{ padding: '40px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '11px', color: '#C9A84C', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>Get in touch</div>
          <h2 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '32px', fontWeight: '700', color: '#F0EDE8', marginBottom: '12px', lineHeight: '1.2', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Ready to Build<br />Your Dream PC?
          </h2>
          <p style={{ fontSize: '13px', color: '#555', lineHeight: '1.8', marginBottom: '24px' }}>
            Browse our products, add to cart, then contact us directly to confirm your order. We guide you every step of the way.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link to="/products">
              <button style={{ background: '#C9A84C', color: '#000', border: 'none', borderRadius: '4px', padding: '12px 28px', fontWeight: '700', fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase' }}>Browse Products</button>
            </Link>
            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer">
              <button style={{ background: 'transparent', color: '#C9A84C', border: '1px solid #C9A84C', borderRadius: '4px', padding: '12px 28px', fontWeight: '600', fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase' }}>💬 WhatsApp</button>
            </a>
          </div>
        </div>
        <div style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: '8px', overflow: 'hidden' }}>
          {[
            { icon: '📞', label: '+91 98765 43210', sub: 'Call or WhatsApp anytime' },
            { icon: '✉️', label: 'admin@ifixcomputers.com', sub: 'Email us anytime' },
            { icon: '📍', label: 'Shimla, Himachal Pradesh', sub: 'Visit our store' },
            { icon: '🕐', label: 'Mon - Sat: 10am - 7pm', sub: 'Store timings' },
          ].map((row, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px 20px', borderBottom: i < 3 ? '1px solid #1a1a1a' : 'none' }}>
              <div style={{ width: '40px', height: '40px', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>{row.icon}</div>
              <div>
                <div style={{ fontSize: '13px', color: '#F0EDE8', fontWeight: '500' }}>{row.label}</div>
                <div style={{ fontSize: '11px', color: '#444' }}>{row.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: '#060606', borderTop: '1px solid #1a1a1a', padding: '20px 24px' }}>
        <div className="footer-inner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '20px', color: '#C9A84C', fontWeight: '700', letterSpacing: '2px' }}>
            IFIX<span style={{ color: '#fff' }}>Computers</span>
          </div>
          <div style={{ fontSize: '11px', color: '#333' }}>© 2025 IFIX Computers, Shimla · All rights reserved</div>
          <Link to="/admin"><div style={{ fontSize: '11px', color: '#222', cursor: 'pointer' }}>Admin</div></Link>
        </div>
      </div>
    </div>
  )
}