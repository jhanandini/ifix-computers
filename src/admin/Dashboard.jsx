import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { db } from '../firebase'
import { collection, addDoc, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore'

export default function Dashboard() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAdd, setShowAdd] = useState(false)
  const [search, setSearch] = useState('')
  const [newProduct, setNewProduct] = useState({
    name: '', price: '', originalPrice: '', category: 'Processor',
    imgUrl: '', warranty: '', stock: true, condition: 'new', description: ''
  })

  const logout = () => { localStorage.removeItem('ifix_admin'); navigate('/admin') }

  // Load products from Firebase
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'products'), (snap) => {
      setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })))
      setLoading(false)
    })
    return unsub
  }, [])

  const addProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      alert('Please fill name, price and category!')
      return
    }
    await addDoc(collection(db, 'products'), {
      ...newProduct,
      price: parseInt(newProduct.price),
      originalPrice: parseInt(newProduct.originalPrice) || parseInt(newProduct.price),
      sold: 0,
      addedDate: new Date().toISOString().split('T')[0]
    })
    setNewProduct({ name: '', price: '', originalPrice: '', category: 'Processor', imgUrl: '', warranty: '', stock: true, condition: 'new', description: '' })
    setShowAdd(false)
    alert('Product added!')
  }

  const deleteProduct = async (id) => {
    if (window.confirm('Delete this product?')) {
      await deleteDoc(doc(db, 'products', id))
    }
  }

  const toggleStock = async (id, current) => {
    await updateDoc(doc(db, 'products', id), { stock: !current })
  }

  const filtered = products.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  )

  const totalRevenue = products.reduce((sum, p) => sum + (p.price * (p.sold || 0)), 0)
  const inStock = products.filter(p => p.stock).length
  const totalSold = products.reduce((sum, p) => sum + (p.sold || 0), 0)

  const navBtn = (label, to, active) => (
    <Link to={to}>
      <button style={{ background: active ? '#7c3aed' : 'transparent', color: active ? '#fff' : '#6b7280', border: `1px solid ${active ? '#7c3aed' : '#e9d5ff'}`, borderRadius: '8px', padding: '8px 16px', fontWeight: active ? '700' : '500', fontSize: '13px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
        {label}
      </button>
    </Link>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#f5f3ff', fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Inter', sans-serif !important; box-sizing: border-box; }
        a { text-decoration: none; color: inherit; }
        @media(max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
          .form-grid { grid-template-columns: 1fr !important; }
          .table-wrap { overflow-x: auto; }
          .admin-nav-btns { display: none !important; }
        }
      `}</style>

      {/* Navbar */}
      <nav style={{ background: '#1e0a3c', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 12px rgba(0,0,0,0.3)' }}>
        <div style={{ fontSize: '20px', fontWeight: '800', color: '#fff' }}>
          IFIX<span style={{ color: '#a78bfa' }}>Computers</span>
          <span style={{ fontSize: '11px', color: '#6b7280', marginLeft: '12px', fontWeight: '400' }}>Admin Panel</span>
        </div>
        <div className="admin-nav-btns" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {navBtn('Products', '/admin/dashboard', true)}
          {navBtn('History', '/admin/history', false)}
          {navBtn('Bill', '/admin/bill', false)}
          {navBtn('View Site', '/', false)}
        </div>
        <button onClick={logout} style={{ background: 'rgba(220,38,38,0.15)', color: '#f87171', border: '1px solid rgba(220,38,38,0.3)', borderRadius: '8px', padding: '8px 16px', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>
          Logout
        </button>
      </nav>

      {/* Mobile Nav */}
      <div style={{ background: '#2d0052', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '10px 20px', display: 'flex', gap: '8px', overflowX: 'auto' }}>
        {[['Products', '/admin/dashboard', true], ['History', '/admin/history', false], ['Bill', '/admin/bill', false], ['View Site', '/', false]].map(([label, to, active]) => (
          <Link key={to} to={to}>
            <button style={{ background: active ? '#7c3aed' : 'transparent', color: active ? '#fff' : '#9ca3af', border: `1px solid ${active ? '#7c3aed' : 'rgba(255,255,255,0.1)'}`, borderRadius: '6px', padding: '6px 14px', fontSize: '12px', fontWeight: active ? '700' : '400', whiteSpace: 'nowrap', cursor: 'pointer' }}>
              {label}
            </button>
          </Link>
        ))}
      </div>

      <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Stats */}
        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px', marginBottom: '24px' }}>
          {[
            { label: 'Total Products', value: products.length, color: '#7c3aed' },
            { label: 'In Stock', value: inStock, color: '#059669' },
            { label: 'Total Sold', value: totalSold, color: '#2563eb' },
            { label: 'Revenue', value: `Rs.${totalRevenue.toLocaleString()}`, color: '#d97706' },
          ].map(stat => (
            <div key={stat.label} style={{ background: '#fff', border: '1.5px solid #e9d5ff', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: '800', color: stat.color, marginBottom: '4px' }}>{stat.value}</div>
              <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Search + Add */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px', display: 'flex', background: '#fff', border: '1.5px solid #e9d5ff', borderRadius: '8px', overflow: 'hidden' }}>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search products..."
              style={{ flex: 1, background: 'transparent', border: 'none', padding: '10px 16px', color: '#1e0a3c', fontSize: '14px', outline: 'none' }} />
          </div>
          <button onClick={() => setShowAdd(!showAdd)}
            style={{ background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 20px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>
            + Add Product
          </button>
        </div>

        {/* Add Product Form */}
        {showAdd && (
          <div style={{ background: '#fff', border: '2px solid #7c3aed', borderRadius: '12px', padding: '24px', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1e0a3c', marginBottom: '20px' }}>Add New Product</h3>
            <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px', marginBottom: '16px' }}>
              {[
                { label: 'Product Name *', key: 'name', placeholder: 'e.g. Intel Core i9' },
                { label: 'Sale Price (Rs.) *', key: 'price', placeholder: 'e.g. 45000' },
                { label: 'Original Price (Rs.)', key: 'originalPrice', placeholder: 'e.g. 55000' },
                { label: 'Warranty', key: 'warranty', placeholder: 'e.g. 3 Years' },
                { label: 'Image URL', key: 'imgUrl', placeholder: 'https://...' },
                { label: 'Description', key: 'description', placeholder: 'Short description' },
              ].map(field => (
                <div key={field.key}>
                  <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '6px', fontWeight: '600' }}>{field.label}</label>
                  <input placeholder={field.placeholder} value={newProduct[field.key]}
                    onChange={e => setNewProduct({ ...newProduct, [field.key]: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #e9d5ff', background: '#f5f3ff', color: '#1e0a3c', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px', marginBottom: '20px' }}>
              <div>
                <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '6px', fontWeight: '600' }}>Category *</label>
                <select value={newProduct.category} onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #e9d5ff', background: '#f5f3ff', color: '#1e0a3c', fontSize: '13px', outline: 'none' }}>
                  {['Processor', 'GPU', 'RAM', 'Motherboard', 'Storage', 'Cooling', 'Cabinet', 'PSU', 'Accessories'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '6px', fontWeight: '600' }}>Condition</label>
                <select value={newProduct.condition} onChange={e => setNewProduct({ ...newProduct, condition: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #e9d5ff', background: '#f5f3ff', color: '#1e0a3c', fontSize: '13px', outline: 'none' }}>
                  <option value="new">New</option>
                  <option value="old">Second Hand</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '6px', fontWeight: '600' }}>Stock Status</label>
                <select value={newProduct.stock} onChange={e => setNewProduct({ ...newProduct, stock: e.target.value === 'true' })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #e9d5ff', background: '#f5f3ff', color: '#1e0a3c', fontSize: '13px', outline: 'none' }}>
                  <option value="true">In Stock</option>
                  <option value="false">Out of Stock</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={addProduct} style={{ background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '8px', padding: '11px 28px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>
                Save Product
              </button>
              <button onClick={() => setShowAdd(false)} style={{ background: 'transparent', color: '#6b7280', border: '1.5px solid #e9d5ff', borderRadius: '8px', padding: '11px 28px', fontSize: '14px', cursor: 'pointer' }}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Products Table */}
        <div style={{ background: '#fff', border: '1.5px solid #e9d5ff', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #f3e8ff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '16px', fontWeight: '800', color: '#1e0a3c' }}>All Products ({filtered.length})</div>
          </div>
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#7c3aed', fontWeight: '600' }}>Loading products...</div>
          ) : (
            <div className="table-wrap" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', minWidth: '800px' }}>
                <thead>
                  <tr style={{ background: '#f5f3ff' }}>
                    {['Image', 'Product', 'Category', 'Condition', 'Price', 'Warranty', 'Sold', 'Status', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: '#581c87', fontWeight: '700', fontSize: '12px', letterSpacing: '0.5px', borderBottom: '1.5px solid #e9d5ff', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p, i) => (
                    <tr key={p.id} style={{ borderTop: '1px solid #f3e8ff', background: i % 2 === 0 ? '#fff' : '#faf5ff' }}>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '8px', overflow: 'hidden', background: '#f5f3ff', border: '1px solid #e9d5ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {p.imgUrl ? (
                            <img src={p.imgUrl} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                          ) : (
                            <span style={{ fontSize: '20px', color: '#7c3aed', fontWeight: '800' }}>?</span>
                          )}
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ fontWeight: '600', color: '#1e0a3c', marginBottom: '2px' }}>{p.name}</div>
                        {p.description && <div style={{ fontSize: '11px', color: '#9ca3af' }}>{p.description}</div>}
                      </td>
                      <td style={{ padding: '12px 16px', color: '#6b7280' }}>{p.category}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ background: p.condition === 'new' ? '#d1fae5' : '#fef3c7', color: p.condition === 'new' ? '#065f46' : '#92400e', fontSize: '11px', padding: '3px 8px', borderRadius: '4px', fontWeight: '700' }}>
                          {p.condition === 'new' ? 'New' : 'Used'}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ fontWeight: '800', color: '#581c87', fontSize: '15px' }}>Rs.{p.price?.toLocaleString()}</div>
                        {p.originalPrice && p.originalPrice !== p.price && (
                          <div style={{ fontSize: '11px', color: '#9ca3af', textDecoration: 'line-through' }}>Rs.{p.originalPrice?.toLocaleString()}</div>
                        )}
                      </td>
                      <td style={{ padding: '12px 16px', color: '#6b7280' }}>{p.warranty || '-'}</td>
                      <td style={{ padding: '12px 16px', color: '#2563eb', fontWeight: '700' }}>{p.sold || 0}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <button onClick={() => toggleStock(p.id, p.stock)}
                          style={{ background: p.stock ? '#d1fae5' : '#fee2e2', color: p.stock ? '#065f46' : '#991b1b', border: 'none', borderRadius: '20px', padding: '4px 12px', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}>
                          {p.stock ? 'In Stock' : 'Out of Stock'}
                        </button>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <Link to="/admin/history">
                            <button style={{ background: '#ede9fe', color: '#7c3aed', border: 'none', borderRadius: '6px', padding: '6px 10px', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}>History</button>
                          </Link>
                          <button onClick={() => deleteProduct(p.id)}
                            style={{ background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '6px', padding: '6px 10px', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && !loading && (
                <div style={{ padding: '40px', textAlign: 'center', color: '#9ca3af' }}>
                  No products found. Click "Add Product" to add your first product!
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}