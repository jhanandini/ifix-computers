import { Link } from 'react-router-dom'
import { useState } from 'react'

const allProducts = [
  { id: 1, name: 'Intel Core i5-13600K', price: 24500, originalPrice: 32000, category: 'Processor', emoji: '⚙️', stock: true, warranty: '3 Years', tag: 'HOT' },
  { id: 2, name: 'Intel Core i7-13700K', price: 35000, originalPrice: 44000, category: 'Processor', emoji: '⚙️', stock: true, warranty: '3 Years', tag: '' },
  { id: 3, name: 'AMD Ryzen 5 7600X', price: 22000, originalPrice: 28000, category: 'Processor', emoji: '⚙️', stock: true, warranty: '3 Years', tag: 'SALE' },
  { id: 4, name: 'RTX 4060 8GB', price: 33000, originalPrice: 40000, category: 'GPU', emoji: '🎮', stock: true, warranty: '3 Years', tag: 'HOT' },
  { id: 5, name: 'RTX 4070 12GB', price: 55000, originalPrice: 65000, category: 'GPU', emoji: '🎮', stock: true, warranty: '3 Years', tag: 'NEW' },
  { id: 6, name: 'RX 7600 8GB', price: 28000, originalPrice: 34000, category: 'GPU', emoji: '🎮', stock: false, warranty: '3 Years', tag: '' },
  { id: 7, name: 'Samsung 16GB DDR5', price: 7200, originalPrice: 9500, category: 'RAM', emoji: '💾', stock: true, warranty: '5 Years', tag: '' },
  { id: 8, name: 'Corsair 32GB DDR5', price: 13500, originalPrice: 17000, category: 'RAM', emoji: '💾', stock: true, warranty: '5 Years', tag: 'NEW' },
  { id: 9, name: 'ASUS B760M Motherboard', price: 14800, originalPrice: 18000, category: 'Motherboard', emoji: '🔌', stock: true, warranty: '3 Years', tag: '' },
  { id: 10, name: 'MSI Z790 Tomahawk', price: 28000, originalPrice: 34000, category: 'Motherboard', emoji: '🔌', stock: true, warranty: '3 Years', tag: 'HOT' },
  { id: 11, name: 'Samsung 980 Pro 1TB', price: 8500, originalPrice: 11000, category: 'Storage', emoji: '💿', stock: true, warranty: '5 Years', tag: 'SALE' },
  { id: 12, name: 'WD Black 2TB SSD', price: 16000, originalPrice: 20000, category: 'Storage', emoji: '💿', stock: true, warranty: '5 Years', tag: '' },
  { id: 13, name: 'Cooler Master Hyper 212', price: 3100, originalPrice: 4200, category: 'Cooling', emoji: '❄️', stock: false, warranty: '2 Years', tag: '' },
  { id: 14, name: 'Noctua NH-D15', price: 9500, originalPrice: 12000, category: 'Cooling', emoji: '❄️', stock: true, warranty: '6 Years', tag: '' },
  { id: 15, name: 'Corsair 4000D Cabinet', price: 8200, originalPrice: 10000, category: 'Cabinet', emoji: '🖥️', stock: true, warranty: '2 Years', tag: 'NEW' },
  { id: 16, name: 'Corsair 650W PSU', price: 7800, originalPrice: 9500, category: 'PSU', emoji: '⚡', stock: true, warranty: '5 Years', tag: '' },
]

const categories = ['All', 'Processor', 'GPU', 'RAM', 'Motherboard', 'Storage', 'Cooling', 'Cabinet', 'PSU']

export default function Products() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('ifix_cart') || '[]'))
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('default')
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

  let filtered = allProducts.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  if (sort === 'low') filtered = [...filtered].sort((a, b) => a.price - b.price)
  if (sort === 'high') filtered = [...filtered].sort((a, b) => b.price - a.price)

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A' }}>
      <style>{`
        @media(max-width:768px){
          .nav-search{display:none!important}
          .menu-btn{display:block!important}
          .products-grid{grid-template-columns:repeat(2,1fr)!important;gap:10px!important}
          .filter-row{flex-wrap:wrap!important;gap:8px!important}
          .cat-scroll{gap:6px!important}
        }
        .add-btn:hover{background:#C9A84C!important;color:#000!important}
        .product-card:hover{border-color:#C9A84C!important}
        .cat-btn:hover{background:#C9A84C!important;color:#000!important;border-color:#C9A84C!important}
      `}</style>

      {/* Topbar */}
      <div style={{ background: '#111', borderBottom: '1px solid #222', padding: '6px 20px', display: 'flex', gap: '16px', fontSize: '11px', color: '#888', flexWrap: 'wrap' }}>
        <span>📧 admin@ifixcomputers.com</span>
        <span>📞 +91 98765 43210</span>
        <span>📍 Shimla, HP</span>
      </div>

      {/* Navbar */}
      <nav style={{ background: '#0A0A0A', borderBottom: '1px solid #222', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', position: 'sticky', top: 0, zIndex: 100 }}>
        <Link to="/"><div style={{ fontSize: '22px', fontWeight: '700', color: '#C9A84C', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '2px', whiteSpace: 'nowrap' }}>IFIX<span style={{ color: '#fff' }}>Computers</span></div></Link>
        <div style={{ flex: 1, maxWidth: '400px', display: 'flex', background: '#1a1a1a', border: '1px solid #333', borderRadius: '6px', overflow: 'hidden' }} className="nav-search">
          <input style={{ flex: 1, background: 'transparent', border: 'none', padding: '8px 14px', color: '#fff', fontSize: '13px', outline: 'none' }} placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
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
          <div style={{ display: 'flex', background: '#1a1a1a', border: '1px solid #333', borderRadius: '6px', overflow: 'hidden' }}>
            <input value={search} onChange={e => setSearch(e.target.value)} style={{ flex: 1, background: 'transparent', border: 'none', padding: '10px 14px', color: '#fff', fontSize: '13px', outline: 'none' }} placeholder="Search products..." />
            <button style={{ background: '#C9A84C', border: 'none', padding: '10px 14px', color: '#000', fontWeight: '700' }}>🔍</button>
          </div>
          {['Home', 'Cart'].map(item => (
            <Link key={item} to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
              <div style={{ color: '#C9A84C', fontSize: '14px', fontWeight: '600', padding: '8px 0', borderBottom: '1px solid #222' }}>{item}</div>
            </Link>
          ))}
        </div>
      )}

      {/* Page Header */}
      <div style={{ background: '#111', borderBottom: '1px solid #222', padding: '20px' }}>
        <div style={{ fontSize: '11px', color: '#C9A84C', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>Browse our collection</div>
        <h1 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '28px', fontWeight: '700', color: '#F0EDE8', textTransform: 'uppercase', letterSpacing: '1px' }}>All Products</h1>
      </div>

      {/* Filters */}
      <div style={{ background: '#0A0A0A', borderBottom: '1px solid #1a1a1a', padding: '14px 20px' }}>
        {/* Category Buttons */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', marginBottom: '12px', paddingBottom: '4px' }} className="cat-scroll">
          {categories.map(cat => (
            <button key={cat} className="cat-btn"
              onClick={() => setActiveCategory(cat)}
              style={{ background: activeCategory === cat ? '#C9A84C' : 'transparent', color: activeCategory === cat ? '#000' : '#888', border: `1px solid ${activeCategory === cat ? '#C9A84C' : '#333'}`, borderRadius: '4px', padding: '6px 16px', fontSize: '12px', fontWeight: activeCategory === cat ? '700' : '400', whiteSpace: 'nowrap', letterSpacing: '0.5px' }}>
              {cat}
            </button>
          ))}
        </div>
        {/* Sort + Count */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }} className="filter-row">
          <div style={{ fontSize: '12px', color: '#555' }}>Showing <span style={{ color: '#C9A84C', fontWeight: '600' }}>{filtered.length}</span> products</div>
          <select value={sort} onChange={e => setSort(e.target.value)}
            style={{ background: '#1a1a1a', border: '1px solid #333', color: '#888', padding: '6px 12px', borderRadius: '4px', fontSize: '12px', outline: 'none' }}>
            <option value="default">Sort: Default</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' }} className="products-grid">
          {filtered.map(product => (
            <div key={product.id} style={{ background: '#111', border: '1px solid #222', borderRadius: '8px', overflow: 'hidden', position: 'relative' }} className="product-card">
              <div style={{ background: '#1a1a1a', height: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', borderBottom: '1px solid #222', position: 'relative' }}>
                {product.tag && <div style={{ position: 'absolute', top: '8px', left: '8px', background: product.tag === 'HOT' ? '#e53e3e' : product.tag === 'NEW' ? '#38a169' : '#C9A84C', color: '#fff', fontSize: '9px', padding: '3px 8px', borderRadius: '2px', fontWeight: '700', letterSpacing: '1px' }}>{product.tag}</div>}
                <div style={{ position: 'absolute', top: '8px', right: '8px', background: '#e53e3e', color: '#fff', fontSize: '9px', padding: '3px 8px', borderRadius: '2px', fontWeight: '700' }}>-{discount(product.originalPrice, product.price)}%</div>
                {product.emoji}
              </div>
              <div style={{ padding: '12px' }}>
                <div style={{ fontSize: '10px', color: '#C9A84C', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '4px' }}>{product.category}</div>
                <div style={{ fontSize: '13px', color: '#F0EDE8', fontWeight: '500', marginBottom: '8px', lineHeight: '1.4' }}>{product.name}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '16px', color: '#C9A84C', fontWeight: '700', fontFamily: 'Rajdhani, sans-serif' }}>₹{product.price.toLocaleString()}</span>
                  <span style={{ fontSize: '11px', color: '#444', textDecoration: 'line-through' }}>₹{product.originalPrice.toLocaleString()}</span>
                </div>
                <div style={{ fontSize: '10px', color: product.stock ? '#38a169' : '#e53e3e', marginBottom: '6px' }}>{product.stock ? '● In Stock' : '● Out of Stock'}</div>
                <div style={{ fontSize: '10px', color: '#444', marginBottom: '10px' }}>Warranty: {product.warranty}</div>
                <button className="add-btn"
                  onClick={() => addToCart(product)}
                  style={{ width: '100%', background: 'transparent', color: '#C9A84C', border: '1px solid #C9A84C', borderRadius: '4px', padding: '8px', fontSize: '11px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
            <div style={{ color: '#C9A84C', fontSize: '18px', fontFamily: 'Rajdhani, sans-serif', marginBottom: '8px' }}>No products found</div>
            <div style={{ color: '#555', fontSize: '13px' }}>Try a different search or category</div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ background: '#060606', borderTop: '1px solid #1a1a1a', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '18px', color: '#C9A84C', fontWeight: '700' }}>IFIX Computers</div>
        <div style={{ fontSize: '11px', color: '#444' }}>© 2025 IFIX Computers, Shimla · All rights reserved</div>
        <Link to="/admin"><div style={{ fontSize: '11px', color: '#333' }}>Admin</div></Link>
      </div>
    </div>
  )
}