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

  const logout = () => {
    localStorage.removeItem('ifix_admin')
    navigate('/admin')
  }

  const saveProducts = (updated) => {
    setProducts(updated)
    localStorage.setItem('ifix_products', JSON.stringify(updated))
  }

  const addProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      alert('Please fill name, price and category!')
      return
    }
    const product = {
      ...newProduct,
      id: Date.now(),
      price: parseInt(newProduct.price),
      stock: true,
      sold: 0,
      stockDate: newProduct.stockDate || new Date().toISOString().split('T')[0]
    }
    saveProducts([...products, product])
    setNewProduct({ name: '', price: '', category: '', warranty: '', stockDate: '', emoji: '📦' })
    setShowAdd(false)
    alert('✅ Product added successfully!')
  }

  const deleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      saveProducts(products.filter(p => p.id !== id))
    }
  }

  const toggleStock = (id) => {
    saveProducts(products.map(p => p.id === id ? { ...p, stock: !p.stock } : p))
  }

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
  const totalRevenue = products.reduce((sum, p) => sum + (p.price * p.sold), 0)
  const totalSold = products.reduce((sum, p) => sum + p.sold, 0)
  const inStock = products.filter(p => p.stock).length

  return (
    <div style={{ minHeight: '100vh', background: 'var(--deep)' }}>
      {/* Admin Navbar */}
      <nav style={{ background: 'var(--dark-olive)', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid var(--yellow)' }}>
        <div style={{ fontSize: '22px', fontWeight: '800', color: 'var(--yellow)', fontFamily: 'Rajdhani, sans-serif' }}>
          IFIX<span style={{ color: '#fff' }}>Computers</span>
          <span style={{ fontSize: '12px', color: '#aaa', marginLeft: '12px', fontFamily: 'Inter' }}>Admin Panel</span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link to="/admin/dashboard">
            <button style={{ background: 'var(--yellow)', color: 'var(--deep)', border: 'none', borderRadius: '8px', padding: '8px 16px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>📦 Products</button>
          </Link>
          <Link to="/admin/history">
            <button style={{ background: 'var(--olive)', color: '#fff', border: 'none', borderRadius: '8px', padding: '8px 16px', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>📋 History</button>
          </Link>
          <Link to="/admin/bill">
            <button style={{ background: 'var(--olive)', color: '#fff', border: 'none', borderRadius: '8px', padding: '8px 16px', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>🧾 Bill</button>
          </Link>
          <Link to="/" target="_blank">
            <button style={{ background: 'var(--olive)', color: '#fff', border: 'none', borderRadius: '8px', padding: '8px 16px', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>🌐 View Site</button>
          </Link>
          <button onClick={logout} style={{ background: '#3d1515', color: '#f88', border: '1px solid #f88', borderRadius: '8px', padding: '8px 16px', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>🚪 Logout</button>
        </div>
      </nav>

      <div style={{ padding: '24px' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
          {[
            { label: 'Total Products', value: products.length, emoji: '📦', color: 'var(--yellow)' },
            { label: 'In Stock', value: inStock, emoji: '✅', color: '#6abf69' },
            { label: 'Total Sold', value: totalSold, emoji: '🛒', color: '#64b5f6' },
            { label: 'Revenue', value: `₹${totalRevenue.toLocaleString()}`, emoji: '💰', color: '#ffb74d' },
          ].map(stat => (
            <div key={stat.label} style={{ background: '#1e1410', border: '1px solid var(--olive)', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{stat.emoji}</div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: stat.color, fontFamily: 'Rajdhani' }}>{stat.value}</div>
              <div style={{ fontSize: '12px', color: '#aaa', marginTop: '4px' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Search + Add */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="🔍 Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--olive)', background: '#1e1410', color: '#fff', fontSize: '14px', outline: 'none' }}
          />
          <button
            onClick={() => setShowAdd(!showAdd)}
            style={{ background: 'var(--yellow)', color: 'var(--deep)', border: 'none', borderRadius: '8px', padding: '10px 20px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>
            ➕ Add Product
          </button>
        </div>

        {/* Add Product Form */}
        {showAdd && (
          <div style={{ background: '#1e1410', border: '2px solid var(--yellow)', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
            <h3 style={{ color: 'var(--yellow)', fontFamily: 'Rajdhani', fontSize: '20px', marginBottom: '16px' }}>➕ Add New Product</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
              {[
                { label: 'Product Name', key: 'name', placeholder: 'e.g. Intel Core i9' },
                { label: 'Price (₹)', key: 'price', placeholder: 'e.g. 45000' },
                { label: 'Category', key: 'category', placeholder: 'e.g. Processor' },
                { label: 'Warranty', key: 'warranty', placeholder: 'e.g. 3 Years' },
                { label: 'Stock Date', key: 'stockDate', placeholder: 'YYYY-MM-DD' },
                { label: 'Emoji', key: 'emoji', placeholder: 'e.g. ⚙️' },
              ].map(field => (
                <div key={field.key}>
                  <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '4px' }}>{field.label}</label>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    value={newProduct[field.key]}
                    onChange={e => setNewProduct({ ...newProduct, [field.key]: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--olive)', background: 'var(--deep)', color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={addProduct} style={{ background: 'var(--yellow)', color: 'var(--deep)', border: 'none', borderRadius: '8px', padding: '10px 24px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>
                ✅ Save Product
              </button>
              <button onClick={() => setShowAdd(false)} style={{ background: 'transparent', color: '#aaa', border: '1px solid #444', borderRadius: '8px', padding: '10px 24px', fontSize: '14px', cursor: 'pointer' }}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Products Table */}
        <div style={{ background: '#1e1410', border: '1px solid var(--olive)', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--olive)', fontSize: '16px', color: 'var(--yellow)', fontFamily: 'Rajdhani', fontWeight: '700' }}>
            📦 All Products ({filtered.length})
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: 'var(--dark-olive)' }}>
                  {['Product', 'Category', 'Price', 'Stock Date', 'Warranty', 'Sold', 'Status', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: 'var(--yellow)', fontWeight: '600', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => (
                  <tr key={p.id} style={{ borderTop: '1px solid #2a2010', background: i % 2 === 0 ? 'transparent' : '#1a1008' }}>
                    <td style={{ padding: '12px 16px', color: '#ddd', fontWeight: '500' }}>
                      <span style={{ marginRight: '8px' }}>{p.emoji}</span>{p.name}
                    </td>
                    <td style={{ padding: '12px 16px', color: '#aaa' }}>{p.category}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--yellow)', fontWeight: '700' }}>₹{p.price.toLocaleString()}</td>
                    <td style={{ padding: '12px 16px', color: '#aaa' }}>{p.stockDate}</td>
                    <td style={{ padding: '12px 16px', color: '#aaa' }}>{p.warranty}</td>
                    <td style={{ padding: '12px 16px', color: '#64b5f6', fontWeight: '700' }}>{p.sold}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <button
                        onClick={() => toggleStock(p.id)}
                        style={{ background: p.stock ? '#1a3d1a' : '#3d2a0a', color: p.stock ? '#6abf69' : '#f0a500', border: `1px solid ${p.stock ? '#6abf69' : '#f0a500'}`, borderRadius: '20px', padding: '4px 12px', fontSize: '11px', cursor: 'pointer' }}>
                        {p.stock ? '● In Stock' : '● Low Stock'}
                      </button>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <Link to="/admin/history">
                          <button style={{ background: 'var(--dark-olive)', color: 'var(--yellow)', border: '1px solid var(--olive)', borderRadius: '6px', padding: '5px 10px', fontSize: '11px', cursor: 'pointer' }}>📋 History</button>
                        </Link>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          style={{ background: '#3d1515', color: '#f88', border: '1px solid #f88', borderRadius: '6px', padding: '5px 10px', fontSize: '11px', cursor: 'pointer' }}>🗑️ Delete</button>
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