import { Link } from 'react-router-dom'
import { useState } from 'react'

const products = [
  { id: 1, name: 'Intel Core i5-13600K', price: 24500, originalPrice: 32000, category: 'Processor', emoji: '⚙️', stock: true, warranty: '3 Years', tag: 'HOT' },
  { id: 2, name: 'RTX 4060 8GB GDDR6', price: 33000, originalPrice: 40000, category: 'GPU', emoji: '🎮', stock: true, warranty: '3 Years', tag: 'NEW' },
  { id: 3, name: 'Samsung 16GB DDR5', price: 7200, originalPrice: 9500, category: 'RAM', emoji: '💾', stock: true, warranty: '5 Years', tag: '' },
  { id: 4, name: 'ASUS B760M Motherboard', price: 14800, originalPrice: 18000, category: 'Motherboard', emoji: '🔌', stock: true, warranty: '3 Years', tag: '' },
  { id: 5, name: 'Samsung 980 Pro 1TB', price: 8500, originalPrice: 11000, category: 'Storage', emoji: '💿', stock: true, warranty: '5 Years', tag: 'SALE' },
  { id: 6, name: 'Cooler Master Hyper 212', price: 3100, originalPrice: 4200, category: 'Cooling', emoji: '❄️', stock: false, warranty: '2 Years', tag: '' },
  { id: 7, name: 'Corsair 650W PSU', price: 7800, originalPrice: 9500, category: 'PSU', emoji: '⚡', stock: true, warranty: '5 Years', tag: '' },
  { id: 8, name: 'Corsair 4000D Cabinet', price: 8200, originalPrice: 10000, category: 'Cabinet', emoji: '🖥️', stock: true, warranty: '2 Years', tag: 'NEW' },
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
  const [search, setSearch] = useState('')
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

  const s = {
    topbar: { background: '#111', borderBottom: '1px solid #222', padding: '6px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: '#888', flexWrap: 'wrap', gap: '4px' },
    topLeft: { display: 'flex', gap: '16px', flexWrap: 'wrap' },
    topRight: { color: '#C9A84C', fontWeight: '600' },
    nav: { background: '#0A0A0A', borderBottom: '1px solid #222', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', position: 'sticky', top: 0, zIndex: 100 },
    logo: { fontSize: '22px', fontWeight: '700', color: '#C9A84C', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '2px', whiteSpace: 'nowrap' },
    searchBox: { flex: 1, maxWidth: '400px', display: 'flex', background: '#1a1a1a', border: '1px solid #333', borderRadius: '6px', overflow: 'hidden' },
    searchInput: { flex: 1, background: 'transparent', border: 'none', padding: '8px 14px', color: '#fff', fontSize: '13px', outline: 'none' },
    searchBtn: { background: '#C9A84C', border: 'none', padding: '8px 14px', color: '#000', fontWeight: '700', fontSize: '13px' },
    navRight: { display: 'flex', alignItems: 'center', gap: '12px' },
    cartBtn: { background: '#C9A84C', color: '#000', border: 'none', borderRadius: '6px', padding: '8px 16px', fontWeight: '700', fontSize: '13px', whiteSpace: 'nowrap' },
    menuBtn: { background: 'transparent', border: '1px solid #333', color: '#fff', borderRadius: '6px', padding: '8px 12px', fontSize: '18px', display: 'none' },
    catNav: { background: '#111', borderBottom: '1px solid #222', padding: '0 20px', display: 'flex', gap: '0', overflowX: 'auto' },
    catNavItem: { padding: '12px 16px', fontSize: '12px', color: '#999', whiteSpace: 'nowrap', borderBottom: '2px solid transparent', cursor: 'pointer', fontWeight: '500', letterSpacing: '0.5px' },
    catNavItemActive: { padding: '12px 16px', fontSize: '12px', color: '#C9A84C', whiteSpace: 'nowrap', borderBottom: '2px solid #C9A84C', cursor: 'pointer', fontWeight: '600', letterSpacing: '0.5px' },
    hero: { background: '#111', borderBottom: '1px solid #222', padding: '48px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '32px', flexWrap: 'wrap' },
    heroBadge: { background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C', fontSize: '11px', padding: '4px 14px', borderRadius: '2px', letterSpacing: '2px', display: 'inline-block', marginBottom: '16px', textTransform: 'uppercase' },
    heroH1: { fontSize: '42px', fontWeight: '700', color: '#F0EDE8', lineHeight: '1.15', marginBottom: '14px', fontFamily: 'Rajdhani, sans-serif' },
    heroP: { fontSize: '14px', color: '#888', lineHeight: '1.8', marginBottom: '24px', maxWidth: '420px' },
    heroBtns: { display: 'flex', gap: '12px', flexWrap: 'wrap' },
    btnPrimary: { background: '#C9A84C', color: '#000', border: 'none', borderRadius: '4px', padding: '13px 28px', fontWeight: '700', fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase' },
    btnOutline: { background: 'transparent', color: '#C9A84C', border: '1px solid #C9A84C', borderRadius: '4px', padding: '13px 28px', fontWeight: '600', fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase' },
    heroStats: { display: 'flex', gap: '32px', marginTop: '32px', flexWrap: 'wrap' },
    heroStat: { textAlign: 'center' },
    heroStatNum: { fontSize: '28px', fontWeight: '700', color: '#C9A84C', fontFamily: 'Rajdhani, sans-serif' },
    heroStatLabel: { fontSize: '11px', color: '#666', letterSpacing: '1px', textTransform: 'uppercase' },
    heroRight: { background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '12px', padding: '28px', textAlign: 'center', minWidth: '200px' },
    catSection: { padding: '32px 20px' },
    sectionTitle: { fontSize: '22px', fontWeight: '700', color: '#F0EDE8', fontFamily: 'Rajdhani, sans-serif', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' },
    sectionSub: { fontSize: '12px', color: '#C9A84C', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' },
    catGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '12px' },
    catCard: { background: '#111', border: '1px solid #222', borderRadius: '8px', padding: '16px 8px', textAlign: 'center', cursor: 'pointer', transition: 'border-color 0.2s' },
    catCardEmoji: { fontSize: '28px', marginBottom: '8px' },
    catCardName: { fontSize: '11px', color: '#C9A84C', fontWeight: '600', letterSpacing: '0.5px' },
    productsSection: { padding: '0 20px 32px', background: '#0A0A0A' },
    productsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' },
    productCard: { background: '#111', border: '1px solid #222', borderRadius: '8px', overflow: 'hidden', position: 'relative' },
    productImg: { background: '#1a1a1a', height: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', borderBottom: '1px solid #222', position: 'relative' },
    productBadge: (tag) => ({ position: 'absolute', top: '8px', left: '8px', background: tag === 'HOT' ? '#e53e3e' : tag === 'NEW' ? '#38a169' : '#C9A84C', color: '#fff', fontSize: '9px', padding: '3px 8px', borderRadius: '2px', fontWeight: '700', letterSpacing: '1px' }),
    discountBadge: { position: 'absolute', top: '8px', right: '8px', background: '#e53e3e', color: '#fff', fontSize: '9px', padding: '3px 8px', borderRadius: '2px', fontWeight: '700' },
    productBody: { padding: '12px' },
    productCat: { fontSize: '10px', color: '#C9A84C', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '4px' },
    productName: { fontSize: '13px', color: '#F0EDE8', fontWeight: '500', marginBottom: '8px', lineHeight: '1.4' },
    productPriceRow: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' },
    productPrice: { fontSize: '16px', color: '#C9A84C', fontWeight: '700', fontFamily: 'Rajdhani, sans-serif' },
    productOrigPrice: { fontSize: '11px', color: '#555', textDecoration: 'line-through' },
    productStock: (s) => ({ fontSize: '10px', color: s ? '#38a169' : '#e53e3e', marginBottom: '10px', letterSpacing: '0.5px' }),
    addBtn: { width: '100%', background: 'transparent', color: '#C9A84C', border: '1px solid #C9A84C', borderRadius: '4px', padding: '8px', fontSize: '11px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' },
    whySection: { background: '#111', borderTop: '1px solid #222', borderBottom: '1px solid #222', padding: '40px 20px' },
    whyGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px', marginTop: '24px' },
    whyCard: { textAlign: 'center', padding: '20px 12px', background: '#0A0A0A', border: '1px solid #222', borderRadius: '8px' },
    contactSection: { padding: '40px 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', alignItems: 'center' },
    contactBox: { background: '#111', border: '1px solid #222', borderRadius: '8px', overflow: 'hidden' },
    contactRow: { display: 'flex', alignItems: 'center', gap: '14px', padding: '16px 20px', borderBottom: '1px solid #222' },
    contactIcon: { width: '40px', height: '40px', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 },
    footer: { background: '#060606', borderTop: '1px solid #1a1a1a', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' },
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A' }}>
      <style>{`
        @media(max-width:768px){
          .hero-content{flex-direction:column!important}
          .hero-right{display:none!important}
          .hero-h1{font-size:28px!important}
          .nav-search{display:none!important}
          .menu-btn{display:block!important}
          .mobile-menu{display:block}
          .cat-nav{display:none!important}
          .hero-stats{gap:16px!important}
          .hero-section{padding:28px 16px!important}
          .section-pad{padding:20px 16px!important}
          .products-grid{grid-template-columns:repeat(2,1fr)!important;gap:10px!important}
          .why-grid{grid-template-columns:repeat(2,1fr)!important}
          .footer-inner{flex-direction:column;text-align:center;gap:8px}
          .topbar-inner{justify-content:center!important}
          .topbar-right{display:none!important}
          .contact-section{padding:24px 16px!important}
        }
        @media(max-width:400px){
          .products-grid{grid-template-columns:repeat(2,1fr)!important}
          .why-grid{grid-template-columns:1fr 1fr!important}
        }
        .cat-nav-item:hover{color:#C9A84C!important;border-bottom-color:#C9A84C!important}
        .cat-card:hover{border-color:#C9A84C!important}
        .product-card:hover{border-color:#C9A84C!important}
        .add-btn:hover{background:#C9A84C!important;color:#000!important}
      `}</style>

      {/* Topbar */}
      <div style={s.topbar}>
        <div style={s.topLeft} className="topbar-inner">
          <span>📧 admin@ifixcomputers.com</span>
          <span>📞 +91 98765 43210</span>
          <span>📍 Delhi</span>
        </div>
        <div style={s.topRight} className="topbar-right">Free Expert Advice on Every Purchase!</div>
      </div>

      {/* Navbar */}
      <nav style={s.nav}>
        <div style={s.logo}>IFIX<span style={{ color: '#fff' }}>Computers</span></div>
        <div style={s.searchBox} className="nav-search">
          <input style={s.searchInput} placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
          <button style={s.searchBtn}>🔍</button>
        </div>
        <div style={s.navRight}>
          <Link to="/cart">
            <button style={s.cartBtn}>🛒 Cart ({cart.length})</button>
          </Link>
          <button style={{ ...s.menuBtn, display: 'none' }} className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{ background: '#111', borderBottom: '1px solid #222', padding: '12px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', background: '#1a1a1a', border: '1px solid #333', borderRadius: '6px', overflow: 'hidden' }}>
            <input style={{ flex: 1, background: 'transparent', border: 'none', padding: '10px 14px', color: '#fff', fontSize: '13px', outline: 'none' }} placeholder="Search products..." />
            <button style={{ background: '#C9A84C', border: 'none', padding: '10px 14px', color: '#000', fontWeight: '700' }}>🔍</button>
          </div>
          {['Home', 'Products', 'Cart'].map(item => (
            <Link key={item} to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
              <div style={{ color: '#C9A84C', fontSize: '14px', fontWeight: '600', padding: '8px 0', borderBottom: '1px solid #222' }}>{item}</div>
            </Link>
          ))}
        </div>
      )}

      {/* Category Nav Bar */}
      <div style={s.catNav} className="cat-nav">
        {['Home', 'Processors', 'GPU / Graphics', 'Motherboards', 'RAM', 'Storage', 'Cooling', 'Cabinets', 'PSU', 'Accessories'].map((item, i) => (
          <Link to={i === 0 ? '/' : '/products'} key={item}>
            <div style={i === 0 ? s.catNavItemActive : s.catNavItem} className="cat-nav-item">{item}</div>
          </Link>
        ))}
      </div>

      {/* Hero */}
      <div style={{ ...s.hero, flexWrap: 'wrap' }} className="hero-section">
        <div className="hero-content" style={{ display: 'flex', alignItems: 'center', gap: '32px', width: '100%', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '260px' }}>
            <div style={s.heroBadge}>⭐ Delhi's No.1 Computer Store</div>
            <h1 style={s.heroH1} className="hero-h1">
              Premium Computer<br />
              Parts & <span style={{ color: '#C9A84C' }}>Accessories</span>
            </h1>
            <p style={s.heroP}>Curated selection of high-performance components. Expert advice, genuine warranty, best prices — trusted by builders across Himachal Pradesh.</p>
            <div style={s.heroBtns}>
              <Link to="/products"><button style={s.btnPrimary}>Shop Now →</button></Link>
              <a href="tel:+919876543210"><button style={s.btnOutline}>📞 Call Us</button></a>
            </div>
            <div style={s.heroStats} className="hero-stats">
              {[['500+', 'Products'], ['5★', 'Rated'], ['3yr', 'Warranty'], ['24/7', 'Support']].map(([num, label]) => (
                <div key={label} style={s.heroStat}>
                  <div style={s.heroStatNum}>{num}</div>
                  <div style={s.heroStatLabel}>{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={s.heroRight} className="hero-right">
            <div style={{ fontSize: '72px', marginBottom: '12px' }}>🖥️</div>
            <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '20px', color: '#fff', marginBottom: '4px' }}>Expert Advice</div>
            <div style={{ fontSize: '11px', color: '#666', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>Always Available</div>
            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer">
              <button style={{ ...s.btnPrimary, width: '100%', fontSize: '12px' }}>💬 WhatsApp Us</button>
            </a>
          </div>
        </div>
      </div>

      {/* Shop By Category */}
      <div style={s.catSection} className="section-pad">
        <div style={s.sectionSub}>Browse by type</div>
        <div style={s.sectionTitle}>Shop By Category</div>
        <div style={s.catGrid} className="cat-grid">
          {categories.map(cat => (
            <Link to="/products" key={cat.name}>
              <div style={s.catCard} className="cat-card">
                <div style={s.catCardEmoji}>{cat.emoji}</div>
                <div style={s.catCardName}>{cat.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div style={s.productsSection} className="section-pad">
        <div style={s.sectionSub}>Handpicked for you</div>
        <div style={{ ...s.sectionTitle, marginBottom: '20px' }}>Featured Products</div>
        <div style={s.productsGrid} className="products-grid">
          {products.map(product => (
            <div key={product.id} style={s.productCard} className="product-card">
              <div style={s.productImg}>
                {product.tag && <div style={s.productBadge(product.tag)}>{product.tag}</div>}
                <div style={s.discountBadge}>-{discount(product.originalPrice, product.price)}%</div>
                {product.emoji}
              </div>
              <div style={s.productBody}>
                <div style={s.productCat}>{product.category}</div>
                <div style={s.productName}>{product.name}</div>
                <div style={s.productPriceRow}>
                  <span style={s.productPrice}>₹{product.price.toLocaleString()}</span>
                  <span style={s.productOrigPrice}>₹{product.originalPrice.toLocaleString()}</span>
                </div>
                <div style={s.productStock(product.stock)}>{product.stock ? '● In Stock' : '● Out of Stock'}</div>
                <div style={{ fontSize: '10px', color: '#555', marginBottom: '10px' }}>Warranty: {product.warranty}</div>
                <button style={s.addBtn} className="add-btn" onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '28px' }}>
          <Link to="/products">
            <button style={{ ...s.btnOutline, fontSize: '13px' }}>View All Products →</button>
          </Link>
        </div>
      </div>

      {/* Why Choose Us */}
      <div style={s.whySection}>
        <div style={{ textAlign: 'center' }}>
          <div style={s.sectionSub}>Our promise</div>
          <div style={s.sectionTitle}>Why Choose IFIX?</div>
        </div>
        <div style={s.whyGrid} className="why-grid">
          {[
            { icon: '🛡️', title: 'Genuine Parts', desc: '100% authentic components with manufacturer warranty on every product' },
            { icon: '⚡', title: 'Expert Advice', desc: 'Professional guidance for every build, upgrade and repair' },
            { icon: '💰', title: 'Best Prices', desc: 'Most competitive pricing in Shimla with no hidden charges' },
            { icon: '🔧', title: 'After Sales Support', desc: 'We are always here for you even after your purchase' },
          ].map(w => (
            <div key={w.title} style={s.whyCard}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>{w.icon}</div>
              <div style={{ fontSize: '15px', fontWeight: '700', color: '#C9A84C', fontFamily: 'Rajdhani, sans-serif', marginBottom: '6px', letterSpacing: '0.5px' }}>{w.title}</div>
              <div style={{ fontSize: '12px', color: '#666', lineHeight: '1.7' }}>{w.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div style={s.contactSection} className="contact-section">
        <div>
          <div style={s.sectionSub}>Get in touch</div>
          <h2 style={{ ...s.sectionTitle, fontSize: '30px', marginBottom: '12px' }}>Ready to Build<br />Your Dream PC?</h2>
          <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.8', marginBottom: '20px' }}>Browse our products, add to cart, then contact us directly to confirm your order. We guide you every step of the way.</p>
          <div style={s.heroBtns}>
            <Link to="/products"><button style={s.btnPrimary}>Browse Products</button></Link>
            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer">
              <button style={{ ...s.btnOutline }}>💬 WhatsApp</button>
            </a>
          </div>
        </div>
        <div style={s.contactBox}>
          {[
            { icon: '📞', label: '+91 98765 43210', sub: 'Call or WhatsApp anytime' },
            { icon: '✉️', label: 'admin@ifixcomputers.com', sub: 'Email us anytime' },
            { icon: '📍', label: 'Delhi', sub: 'Visit our store' },
            { icon: '🕐', label: 'Mon - Sat: 10am - 7pm', sub: 'Store timings' },
          ].map((row, i) => (
            <div key={i} style={{ ...s.contactRow, borderBottom: i === 3 ? 'none' : '1px solid #1a1a1a' }}>
              <div style={s.contactIcon}>{row.icon}</div>
              <div>
                <div style={{ fontSize: '13px', color: '#F0EDE8', fontWeight: '500' }}>{row.label}</div>
                <div style={{ fontSize: '11px', color: '#555' }}>{row.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={s.footer}>
        <div className="footer-inner" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
          <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '18px', color: '#C9A84C', fontWeight: '700' }}>IFIX Computers</div>
          <div style={{ fontSize: '11px', color: '#444' }}>© 2025 IFIX Computers, Shimla · All rights reserved</div>
          <Link to="/admin"><div style={{ fontSize: '11px', color: '#333', cursor: 'pointer' }}>Admin</div></Link>
        </div>
      </div>
    </div>
  )
}