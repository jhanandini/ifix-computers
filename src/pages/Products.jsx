import { Link } from 'react-router-dom'
import { useState } from 'react'

const newProducts = [
  { id: 1, name: 'Intel Core i5-13600K', price: 24500, originalPrice: 32000, category: 'Processor', img: '/images/cpu.jpg', stock: true, warranty: '3 Years', tag: 'HOT' },
  { id: 2, name: 'Intel Core i7-13700K', price: 35000, originalPrice: 44000, category: 'Processor', img: '/images/cpu.jpg', stock: true, warranty: '3 Years', tag: '' },
  { id: 3, name: 'AMD Ryzen 5 7600X', price: 22000, originalPrice: 28000, category: 'Processor', img: '/images/cpu.jpg', stock: true, warranty: '3 Years', tag: 'SALE' },
  { id: 4, name: 'RTX 4060 8GB', price: 33000, originalPrice: 40000, category: 'GPU', img: '/images/gpu.jpg', stock: true, warranty: '3 Years', tag: 'HOT' },
  { id: 5, name: 'RTX 4070 12GB', price: 55000, originalPrice: 65000, category: 'GPU', img: '/images/gpu.jpg', stock: true, warranty: '3 Years', tag: 'NEW' },
  { id: 6, name: 'RX 7600 8GB', price: 28000, originalPrice: 34000, category: 'GPU', img: '/images/gpu.jpg', stock: false, warranty: '3 Years', tag: '' },
  { id: 7, name: 'Samsung 16GB DDR5', price: 7200, originalPrice: 9500, category: 'RAM', img: '/images/ram.jpg', stock: true, warranty: '5 Years', tag: '' },
  { id: 8, name: 'Corsair 32GB DDR5', price: 13500, originalPrice: 17000, category: 'RAM', img: '/images/ram.jpg', stock: true, warranty: '5 Years', tag: 'NEW' },
  { id: 9, name: 'ASUS B760M Motherboard', price: 14800, originalPrice: 18000, category: 'Motherboard', img: '/images/mobo.jpg', stock: true, warranty: '3 Years', tag: '' },
  { id: 10, name: 'MSI Z790 Tomahawk', price: 28000, originalPrice: 34000, category: 'Motherboard', img: '/images/mobo.jpg', stock: true, warranty: '3 Years', tag: 'HOT' },
  { id: 11, name: 'Samsung 980 Pro 1TB', price: 8500, originalPrice: 11000, category: 'Storage', img: '/images/ssd.jpg', stock: true, warranty: '5 Years', tag: 'SALE' },
  { id: 12, name: 'WD Black 2TB SSD', price: 16000, originalPrice: 20000, category: 'Storage', img: '/images/ssd.jpg', stock: true, warranty: '5 Years', tag: '' },
  { id: 13, name: 'Cooler Master Hyper 212', price: 3100, originalPrice: 4200, category: 'Cooling', img: '/images/cooler.jpg', stock: false, warranty: '2 Years', tag: '' },
  { id: 14, name: 'Noctua NH-D15', price: 9500, originalPrice: 12000, category: 'Cooling', img: '/images/cooler.jpg', stock: true, warranty: '6 Years', tag: '' },
  { id: 15, name: 'Corsair 4000D Cabinet', price: 8200, originalPrice: 10000, category: 'Cabinet', img: '/images/cabinet.jpg', stock: true, warranty: '2 Years', tag: 'NEW' },
  { id: 16, name: 'Corsair 650W PSU', price: 7800, originalPrice: 9500, category: 'PSU', img: '/images/psu.jpg', stock: true, warranty: '5 Years', tag: '' },
]

const oldProducts = [
  { id: 17, name: 'Used Intel Core i7-10700K', price: 8000, originalPrice: 22000, category: 'Processor', img: '/images/cpu.jpg', stock: true, warranty: '3 Months', tag: '' },
  { id: 18, name: 'Used RTX 3060 12GB', price: 12000, originalPrice: 28000, category: 'GPU', img: '/images/gpu.jpg', stock: true, warranty: '3 Months', tag: '' },
  { id: 19, name: 'Used Corsair 16GB DDR4', price: 2500, originalPrice: 6000, category: 'RAM', img: '/images/ram.jpg', stock: true, warranty: '3 Months', tag: '' },
  { id: 20, name: 'Used MSI B450 Motherboard', price: 4000, originalPrice: 10000, category: 'Motherboard', img: '/images/mobo.jpg', stock: true, warranty: '3 Months', tag: '' },
  { id: 21, name: 'Used Samsung 860 EVO 500GB', price: 1500, originalPrice: 5000, category: 'Storage', img: '/images/ssd.jpg', stock: true, warranty: '3 Months', tag: '' },
  { id: 22, name: 'Used Corsair 550W PSU', price: 2000, originalPrice: 6000, category: 'PSU', img: '/images/psu.jpg', stock: true, warranty: '3 Months', tag: '' },
]

const categories = ['All', 'Processor', 'GPU', 'RAM', 'Motherboard', 'Storage', 'Cooling', 'Cabinet', 'PSU']

export default function Products() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('ifix_cart') || '[]'))
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('default')
  const [condition, setCondition] = useState('new')
  const [menuOpen, setMenuOpen] = useState(false)

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
  const allProducts = condition === 'new' ? newProducts : oldProducts

  let filtered = allProducts.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  if (sort === 'low') filtered = [...filtered].sort((a, b) => a.price - b.price)
  if (sort === 'high') filtered = [...filtered].sort((a, b) => b.price - a.price)

  return (
    <div style={{ minHeight: '100vh', background: '#f5f3ff', fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Inter', sans-serif !important; box-sizing: border-box; }
        a { text-decoration: none; color: inherit; }
        .prod-card:hover { box-shadow: 0 8px 24px rgba(88,28,135,0.15) !important; transform: translateY(-3px); }
        .add-btn:hover { background: #4c1d95 !important; }
        .cat-btn:hover { background: #ede9fe !important; }
        @media(max-width: 768px) {
          .topbar { display: none !important; }
          .nav-search { display: none !important; }
          .menu-btn { display: flex !important; }
          .cat-nav-bar { display: none !important; }
          .prod-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
          .filter-row { flex-wrap: wrap !important; }
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
          <input value={search} onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, background: 'transparent', border: 'none', padding: '10px 16px', color: '#1e0a3c', fontSize: '14px', outline: 'none' }}
            placeholder="Search products..." />
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
          <div style={{ display: 'flex', background: '#f5f3ff', border: '1.5px solid #e9d5ff', borderRadius: '8px', overflow: 'hidden' }}>
            <input value={search} onChange={e => setSearch(e.target.value)} style={{ flex: 1, background: 'transparent', border: 'none', padding: '10px 16px', color: '#1e0a3c', fontSize: '13px', outline: 'none' }} placeholder="Search..." />
            <button style={{ background: '#7c3aed', border: 'none', padding: '10px 14px', color: '#fff', fontWeight: '600' }}>Search</button>
          </div>
          {[['Home', '/'], ['Cart', '/cart']].map(([label, path]) => (
            <Link key={label} to={path} onClick={() => setMenuOpen(false)}>
              <div style={{ color: '#581c87', fontSize: '15px', fontWeight: '600', padding: '10px 0', borderBottom: '1px solid #f3f4f6' }}>{label}</div>
            </Link>
          ))}
        </div>
      )}

      {/* Category Nav */}
      <div className="cat-nav-bar" style={{ background: '#fff', borderBottom: '1px solid #e9d5ff', padding: '0 24px', display: 'flex', overflowX: 'auto' }}>
        {['Home', 'Processors', 'GPU / Graphics', 'Motherboards', 'RAM', 'Storage', 'Cooling', 'Cabinets', 'PSU', 'Accessories'].map((item, i) => (
          <Link to={i === 0 ? '/' : '/products'} key={item}>
            <div style={{ padding: '12px 16px', fontSize: '13px', color: i === 0 ? '#616161' : '#7c3aed', whiteSpace: 'nowrap', borderBottom: i !== 0 ? '2px solid #7c3aed' : '2px solid transparent', fontWeight: i !== 0 ? '600' : '400' }}>
              {item}
            </div>
          </Link>
        ))}
      </div>

      {/* Page Header */}
      <div style={{ background: 'linear-gradient(135deg, #1e0a3c 0%, #3b0764 100%)', padding: '32px 24px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <p style={{ fontSize: '12px', color: '#a78bfa', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px' }}>Browse our collection</p>
          <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#fff', marginBottom: '16px' }}>All Products</h1>
          {/* New/Old Toggle */}
          <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(167,139,250,0.3)', borderRadius: '10px', padding: '4px', gap: '4px' }}>
            <button onClick={() => { setCondition('new'); setActiveCategory('All') }}
              style={{ background: condition === 'new' ? '#7c3aed' : 'transparent', color: '#fff', border: 'none', borderRadius: '7px', padding: '8px 28px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s' }}>
              New
            </button>
            <button onClick={() => { setCondition('old'); setActiveCategory('All') }}
              style={{ background: condition === 'old' ? '#7c3aed' : 'transparent', color: '#fff', border: 'none', borderRadius: '7px', padding: '8px 28px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s' }}>
              Second Hand
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e9d5ff', padding: '14px 24px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', marginBottom: '12px', paddingBottom: '4px' }}>
            {categories.map(cat => (
              <button key={cat} className="cat-btn"
                onClick={() => setActiveCategory(cat)}
                style={{ background: activeCategory === cat ? '#7c3aed' : '#f5f3ff', color: activeCategory === cat ? '#fff' : '#581c87', border: `1.5px solid ${activeCategory === cat ? '#7c3aed' : '#e9d5ff'}`, borderRadius: '6px', padding: '7px 16px', fontSize: '13px', fontWeight: activeCategory === cat ? '700' : '500', whiteSpace: 'nowrap', cursor: 'pointer', transition: 'all 0.2s' }}>
                {cat}
              </button>
            ))}
          </div>
          <div className="filter-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
            <div style={{ fontSize: '13px', color: '#6b7280' }}>
              Showing <span style={{ color: '#7c3aed', fontWeight: '700' }}>{filtered.length}</span> products
            </div>
            <select value={sort} onChange={e => setSort(e.target.value)}
              style={{ background: '#f5f3ff', border: '1.5px solid #e9d5ff', color: '#581c87', padding: '7px 12px', borderRadius: '6px', fontSize: '13px', outline: 'none', fontWeight: '500', cursor: 'pointer' }}>
              <option value="default">Sort: Default</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="section-pad" style={{ padding: '24px', maxWidth: '1048px', margin: '0 auto' }}>
        <div className="prod-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
          {filtered.map(product => (
            <div key={product.id} className="prod-card" style={{ background: '#fff', border: '1px solid #e9d5ff', borderRadius: '12px', overflow: 'hidden', transition: 'all 0.2s' }}>
              <div style={{ background: '#faf5ff', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #f3e8ff', position: 'relative', padding: '12px' }}>
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
                <div style={{ display: 'none', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', color: '#7c3aed', fontSize: '32px', fontWeight: '800' }}>PC</div>
              </div>
              <div style={{ padding: '14px' }}>
                <div style={{ fontSize: '10px', color: '#7c3aed', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>{product.category}</div>
                <div style={{ fontSize: '14px', color: '#1e0a3c', fontWeight: '600', marginBottom: '10px', lineHeight: '1.4' }}>{product.name}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ fontSize: '18px', color: '#581c87', fontWeight: '800' }}>Rs.{product.price.toLocaleString()}</span>
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

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '48px', color: '#7c3aed', fontWeight: '800', marginBottom: '16px' }}>?</div>
            <h3 style={{ fontSize: '20px', color: '#581c87', marginBottom: '8px' }}>No products found</h3>
            <p style={{ color: '#6b7280' }}>Try a different search or category</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ background: '#0a0118', borderTop: '1px solid #1e0a3c', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ fontSize: '20px', fontWeight: '800', color: '#fff' }}>IFIX<span style={{ color: '#a78bfa' }}>Computers</span></div>
        <div style={{ fontSize: '12px', color: '#4b5563' }}>2025 IFIX Computers, Delhi. All rights reserved</div>
        <Link to="/terms"><div style={{ fontSize: '12px', color: '#a78bfa', cursor: 'pointer' }}>Terms & Conditions</div></Link>
      </div>
    </div>
  )
}