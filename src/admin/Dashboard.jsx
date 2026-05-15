import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const initialProducts = [
  { id: 1, name: 'Intel Core i5-13600K', price: 24500, category: 'Processor', emoji: '⚙️', stock: true, warranty: '3 Years', stockDate: '2025-01-10', sold: 4 },
  { id: 2, name: 'Intel Core i7-13700K', price: 35000, category: 'Processor', emoji: '⚙️', stock: true, warranty: '3 Years', stockDate: '2025-01-10', sold: 2 },
  { id: 3, name: 'AMD Ryzen 5 7600X', price: 22000, category: 'Processor', emoji: '⚙️', stock: true, warranty: '3 Years', stockDate: '2025-02-01', sold: 3 },
  { id: 4, name: 'RTX 4060 8GB', price: 33000, category: 'GPU', emoji: '🎮', stock: true, warranty: '3 Years', stockDate: '2025-01-15', sold: 5 },
  { id: 5, name: 'RTX 4070 12GB', price: 55000, category: 'GPU', emoji: '🎮', stock: true, warranty: '3 Years', stockDate: '2025-02-10', sold: 1 },
  { id: 6, name: 'Samsung 16GB DDR5', price: 7200, category: 'RAM', emoji: '💾', stock: true, warranty: '5 Years', stockDate: '2025-01-20', sold: 8 },
  { id: 7, name: 'ASUS B760M Motherboard', price: 14800, category: 'Motherboard', emoji: '🔌', stock: true, warranty: '3 Years', stockDate: '2025-01-25', sold: 3 },
  { id: 8, name: 'Samsung 980 Pro 1TB', price: 8500, category: 'Storage', emoji: '💿', stock: true, warranty: '5 Years', stockDate: '2025-02-05', sold: 6 },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const [products, setProducts] = useState(JSON.parse(localStorage.getItem('ifix_products') || JSON.stringify(initialProducts)))
  const [showAdd, setShowAdd] = useState(false)
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '', warranty: '', stockDate: '', emoji: '📦' })
  const [search, setSearch] = useState('')

  const logout = () => { localStorage.removeItem('ifix_admin'); navigate('/admin') }
  const saveProducts = (updated) => { setProducts(updated); localStorage.setItem('ifix_products', JSON.stringify(updated)) }

  const addProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category) { alert('Please fill name, price and category!'); return }
    const product = { ...newProduct, id: Date.now(), price: parseInt(newProduct.price), stock: true, sold: 0, stockDate: newProduct.stockDate || new Date().toISOString().split('T')[0] }
    saveProducts([...products, product])
    setNewProduct({ name: '', price: '', category: '', warranty: '', stockDate: '', emoji: '📦' })
    setShowAdd(false)
    alert('✅ Product added!')
  }

  const deleteProduct = (id) => { if (window.confirm('Delete this product?')) saveProducts(products.filter(p => p.id !== id)) }
  const toggleStock = (id) => saveProducts(products.map(p => p.id === id ? { ...p, stock: !p.stock } : p))

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
  const totalRevenue = products.reduce((sum, p) => sum + p.price * p.sold, 0)
  const totalSold = products.reduce((sum, p) => sum + p.sold, 0)
  const inStock = products.filter(p => p.stock).length

  const navBtn = (label, to, active) => (
    <Link to={to}>
      <button style={{ background: active ? '#C9A84C' : 'transparent', color: active ? '#000' : '#888', border: `1px solid ${active ? '#C9A84C' : '#333'}`, borderRadius: '6px', padding: '8px 16px', fontWeight: active ? '700' : '400', fontSize: '13px', whiteSpace: 'nowrap' }}>
        {label}
      </button>
    </Link>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A' }}>
      <style>{`
        @media(max-width:768px){
          .admin-nav-btns{display:none!important}
          .stats-grid{grid-template-columns:repeat(2,1fr)!important}
          .form-grid{grid-template-columns:1fr!important}
          .table-wrap{overflow-x:auto}
        }
      `}</style>

      {/* Navbar */}
      <nav style={{ background: '#111', borderBottom: '2px solid #C9A84C', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '20px', fontWeight: '700', color: '#C9A84C', letterSpacing: '2px' }}>
          IFIX<span style={{ color: '#fff' }}>Computers</span>
          <span style={{ fontSize: '11px', color: '#444', marginLeft: '12px', fontFamily: 'Inter, sans-serif', letterSpacing: '1px', textTransform: 'uppercase' }}>Admin</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }} className="admin-nav-btns">
          {navBtn('📦 Products', '/admin/dashboard', true)}
          {navBtn('📋 History', '/admin/history', false)}
          {navBtn('🧾 Bill', '/admin/bill', false)}
          {navBtn('🌐 View Site', '/', false)}
        </div>
        <button onClick={logout} style={{ background: 'rgba(229,62,62,0.1)', color: '#e53e3e', border: '1px solid rgba(229,62,62,0.3)', borderRadius: '6px', padding: '8px 16px', fontWeight: '600', fontSize: '13px' }}>
          🚪 Logout
        </button>
      </nav>

      {/* Mobile Nav */}
      <div style={{ background: '#111', borderBottom: '1px solid #222', padding: '10px 20px', display: 'flex', gap: '8px', overflowX: 'auto' }}>
        {[['📦 Products', '/admin/dashboard'], ['📋 History', '/admin/history'], ['🧾 Bill', '/admin/bill'], ['🌐 Site', '/']].map(([label, to]) => (
          <Link key={to} to={to}>
            <button style={{ background: label.includes('Products') ? '#C9A84C' : 'transparent', color: label.includes('Products') ? '#000' : '#888', border: `1px solid ${label.includes('Products') ? '#C9A84C' : '#333'}`, borderRadius: '6px', padding: '6px 14px', fontSize: '12px', whiteSpace: 'nowrap' }}>
              {label}
            </button>
          </Link>
        ))}
      </div>

      <div style={{ padding: '20px' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px', marginBottom: '24px' }} className="stats-grid">
          {[
            { label: 'Total Products', value: products.length, emoji: '📦', color: '#C9A84C' },
            { label: 'In Stock', value: inStock, emoji: '✅', color: '#38a169' },
            { label: 'Total Sold', value: totalSold, emoji: '🛒', color: '#63b3ed' },
            { label: 'Revenue', value: `₹${totalRevenue.toLocaleString()}`, emoji: '💰', color: '#C9A84C' },
          ].map(stat => (
            <div key={stat.label} style={{ background: '#111', border: '1px solid #222', borderRadius: '8px', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{stat.emoji}</div>
              <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '24px', fontWeight: '700', color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: '11px', color: '#444', marginTop: '4px', letterSpacing: '0.5px' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Search + Add */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px', display: 'flex', background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '6px', overflow: 'hidden' }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search products..." style={{ flex: 1, background: 'transparent', border: 'none', padding: '10px 16px', color: '#fff', fontSize: '14px', outline: 'none' }} />
          </div>
          <button onClick={() => setShowAdd(!showAdd)} style={{ background: '#C9A84C', color: '#000', border: 'none', borderRadius: '6px', padding: '10px 20px', fontWeight: '700', fontSize: '14px' }}>
            ➕ Add Product
          </button>
        </div>

        {/* Add Product Form */}
        {showAdd && (
          <div style={{ background: '#111', border: '1px solid #C9A84C', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
            <h3 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '20px', color: '#C9A84C', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>➕ Add New Product</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px', marginBottom: '16px' }} className="form-grid">
              {[
                { label: 'Product Name *', key: 'name', placeholder: 'e.g. Intel Core i9' },
                { label: 'Price (₹) *', key: 'price', placeholder: 'e.g. 45000' },
                { label: 'Category *', key: 'category', placeholder: 'e.g. Processor' },
                { label: 'Warranty', key: 'warranty', placeholder: 'e.g. 3 Years' },
                { label: 'Stock Date', key: 'stockDate', placeholder: 'YYYY-MM-DD' },
                { label: 'Emoji', key: 'emoji', placeholder: 'e.g. ⚙️' },
              ].map(field => (
                <div key={field.key}>
                  <label style={{ fontSize: '11px', color: '#555', display: 'block', marginBottom: '6px', letterSpacing: '1px', textTransform: 'uppercase' }}>{field.label}</label>
                  <input
                    placeholder={field.placeholder}
                    value={newProduct[field.key]}
                    onChange={e => setNewProduct({ ...newProduct, [field.key]: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #2a2a2a', background: '#1a1a1a', color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={addProduct} style={{ background: '#C9A84C', color: '#000', border: 'none', borderRadius: '6px', padding: '10px 24px', fontWeight: '700', fontSize: '14px' }}>✅ Save Product</button>
              <button onClick={() => setShowAdd(false)} style={{ background: 'transparent', color: '#666', border: '1px solid #333', borderRadius: '6px', padding: '10px 24px', fontSize: '14px' }}>Cancel</button>
            </div>
          </div>
        )}

        {/* Products Table */}
        <div style={{ background: '#111', border: '1px solid #222', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '18px', color: '#C9A84C', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
              All Products ({filtered.length})
            </div>
          </div>
          <div className="table-wrap" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', minWidth: '700px' }}>
              <thead>
                <tr style={{ background: '#1a1a1a' }}>
                  {['Product', 'Category', 'Price', 'Stock Date', 'Warranty', 'Sold', 'Status', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: '#C9A84C', fontWeight: '600', whiteSpace: 'nowrap', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', borderBottom: '1px solid #222' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => (
                  <tr key={p.id} style={{ borderTop: '1px solid #1a1a1a', background: i % 2 === 0 ? 'transparent' : '#0d0d0d' }}>
                    <td style={{ padding: '12px 16px', color: '#F0EDE8', fontWeight: '500' }}><span style={{ marginRight: '8px' }}>{p.emoji}</span>{p.name}</td>
                    <td style={{ padding: '12px 16px', color: '#666' }}>{p.category}</td>
                    <td style={{ padding: '12px 16px', color: '#C9A84C', fontWeight: '700', fontFamily: 'Rajdhani, sans-serif' }}>₹{p.price.toLocaleString()}</td>
                    <td style={{ padding: '12px 16px', color: '#555' }}>{p.stockDate}</td>
                    <td style={{ padding: '12px 16px', color: '#555' }}>{p.warranty}</td>
                    <td style={{ padding: '12px 16px', color: '#63b3ed', fontWeight: '700' }}>{p.sold}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <button onClick={() => toggleStock(p.id)} style={{ background: p.stock ? 'rgba(56,161,105,0.1)' : 'rgba(229,62,62,0.1)', color: p.stock ? '#38a169' : '#e53e3e', border: `1px solid ${p.stock ? 'rgba(56,161,105,0.3)' : 'rgba(229,62,62,0.3)'}`, borderRadius: '20px', padding: '4px 12px', fontSize: '11px' }}>
                        {p.stock ? '● In Stock' : '● Out of Stock'}
                      </button>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <Link to="/admin/history">
                          <button style={{ background: 'transparent', color: '#C9A84C', border: '1px solid #333', borderRadius: '4px', padding: '5px 10px', fontSize: '11px' }}>📋 History</button>
                        </Link>
                        <button onClick={() => deleteProduct(p.id)} style={{ background: 'rgba(229,62,62,0.1)', color: '#e53e3e', border: '1px solid rgba(229,62,62,0.3)', borderRadius: '4px', padding: '5px 10px', fontSize: '11px' }}>🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}