import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const historyData = [
  { id: 1, product: 'Intel Core i5-13600K', category: 'Processor', buyer: 'Rahul Sharma', phone: '9876543210', buyDate: '2025-03-15', price: 24500, warranty: '3 Years', warrantyEnd: '2028-03-15', stockDate: '2025-01-10', status: 'Delivered' },
  { id: 2, product: 'RTX 4060 8GB', category: 'GPU', buyer: 'Amit Singh', phone: '9812345678', buyDate: '2025-03-18', price: 33000, warranty: '3 Years', warrantyEnd: '2028-03-18', stockDate: '2025-01-15', status: 'Delivered' },
  { id: 3, product: 'Samsung 16GB DDR5', category: 'RAM', buyer: 'Priya Thakur', phone: '9856781234', buyDate: '2025-03-20', price: 7200, warranty: '5 Years', warrantyEnd: '2030-03-20', stockDate: '2025-01-20', status: 'Delivered' },
  { id: 4, product: 'ASUS B760M Motherboard', category: 'Motherboard', buyer: 'Vikram Verma', phone: '9834567890', buyDate: '2025-04-01', price: 14800, warranty: '3 Years', warrantyEnd: '2028-04-01', stockDate: '2025-01-25', status: 'Delivered' },
  { id: 5, product: 'Samsung 980 Pro 1TB', category: 'Storage', buyer: 'Neha Gupta', phone: '9867452310', buyDate: '2025-04-05', price: 8500, warranty: '5 Years', warrantyEnd: '2030-04-05', stockDate: '2025-02-05', status: 'Delivered' },
  { id: 6, product: 'RTX 4070 12GB', category: 'GPU', buyer: 'Suresh Kumar', phone: '9845671230', buyDate: '2025-04-10', price: 55000, warranty: '3 Years', warrantyEnd: '2028-04-10', stockDate: '2025-02-10', status: 'Pending' },
  { id: 7, product: 'Intel Core i7-13700K', category: 'Processor', buyer: 'Deepak Negi', phone: '9878901234', buyDate: '2025-04-12', price: 35000, warranty: '3 Years', warrantyEnd: '2028-04-12', stockDate: '2025-01-10', status: 'Delivered' },
  { id: 8, product: 'Corsair 32GB DDR5', category: 'RAM', buyer: 'Anjali Mehta', phone: '9823456789', buyDate: '2025-04-15', price: 13500, warranty: '5 Years', warrantyEnd: '2030-04-15', stockDate: '2025-02-15', status: 'Pending' },
]

export default function ProductHistory() {
  const navigate = useNavigate()
  const [records, setRecords] = useState(JSON.parse(localStorage.getItem('ifix_history') || JSON.stringify(historyData)))
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [showAdd, setShowAdd] = useState(false)
  const [selected, setSelected] = useState(null)
  const [newRecord, setNewRecord] = useState({
    product: '', category: '', buyer: '', phone: '', buyDate: '', price: '', warranty: '', warrantyEnd: '', stockDate: '', status: 'Delivered'
  })

  const logout = () => {
    localStorage.removeItem('ifix_admin')
    navigate('/admin')
  }

  const saveRecords = (updated) => {
    setRecords(updated)
    localStorage.setItem('ifix_history', JSON.stringify(updated))
  }

  const addRecord = () => {
    if (!newRecord.product || !newRecord.buyer || !newRecord.price) {
      alert('Please fill product, buyer and price!')
      return
    }
    const record = { ...newRecord, id: Date.now(), price: parseInt(newRecord.price) }
    saveRecords([...records, record])
    setNewRecord({ product: '', category: '', buyer: '', phone: '', buyDate: '', price: '', warranty: '', warrantyEnd: '', stockDate: '', status: 'Delivered' })
    setShowAdd(false)
    alert('✅ Sale record added!')
  }

  const deleteRecord = (id) => {
    if (window.confirm('Delete this record?')) {
      saveRecords(records.filter(r => r.id !== id))
      if (selected?.id === id) setSelected(null)
    }
  }

  const filtered = records.filter(r => {
    const matchSearch = r.product.toLowerCase().includes(search.toLowerCase()) || r.buyer.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'All' || r.status === filterStatus
    return matchSearch && matchStatus
  })

  const totalRevenue = records.reduce((sum, r) => sum + r.price, 0)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--deep)' }}>
      {/* Navbar */}
      <nav style={{ background: 'var(--dark-olive)', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid var(--yellow)' }}>
        <div style={{ fontSize: '22px', fontWeight: '800', color: 'var(--yellow)', fontFamily: 'Rajdhani, sans-serif' }}>
          IFIX<span style={{ color: '#fff' }}>Computers</span>
          <span style={{ fontSize: '12px', color: '#aaa', marginLeft: '12px', fontFamily: 'Inter' }}>Product History</span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link to="/admin/dashboard">
            <button style={{ background: 'var(--olive)', color: '#fff', border: 'none', borderRadius: '8px', padding: '8px 16px', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>📦 Products</button>
          </Link>
          <Link to="/admin/history">
            <button style={{ background: 'var(--yellow)', color: 'var(--deep)', border: 'none', borderRadius: '8px', padding: '8px 16px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>📋 History</button>
          </Link>
          <Link to="/admin/bill">
            <button style={{ background: 'var(--olive)', color: '#fff', border: 'none', borderRadius: '8px', padding: '8px 16px', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>🧾 Bill</button>
          </Link>
          <button onClick={logout} style={{ background: '#3d1515', color: '#f88', border: '1px solid #f88', borderRadius: '8px', padding: '8px 16px', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>🚪 Logout</button>
        </div>
      </nav>

      <div style={{ padding: '24px' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
          {[
            { label: 'Total Sales', value: records.length, emoji: '📋', color: 'var(--yellow)' },
            { label: 'Delivered', value: records.filter(r => r.status === 'Delivered').length, emoji: '✅', color: '#6abf69' },
            { label: 'Pending', value: records.filter(r => r.status === 'Pending').length, emoji: '⏳', color: '#f0a500' },
            { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, emoji: '💰', color: '#ffb74d' },
          ].map(stat => (
            <div key={stat.label} style={{ background: '#1e1410', border: '1px solid var(--olive)', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{stat.emoji}</div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: stat.color, fontFamily: 'Rajdhani' }}>{stat.value}</div>
              <div style={{ fontSize: '12px', color: '#aaa', marginTop: '4px' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Search + Filter + Add */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="🔍 Search by product or buyer..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--olive)', background: '#1e1410', color: '#fff', fontSize: '14px', outline: 'none' }}
          />
          {['All', 'Delivered', 'Pending'].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              style={{ background: filterStatus === s ? 'var(--yellow)' : 'var(--olive)', color: filterStatus === s ? 'var(--deep)' : '#fff', border: 'none', borderRadius: '8px', padding: '10px 16px', fontWeight: filterStatus === s ? '700' : '400', fontSize: '13px', cursor: 'pointer' }}>
              {s}
            </button>
          ))}
          <button onClick={() => setShowAdd(!showAdd)}
            style={{ background: 'var(--yellow)', color: 'var(--deep)', border: 'none', borderRadius: '8px', padding: '10px 20px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>
            ➕ Add Sale
          </button>
        </div>

        {/* Add Record Form */}
        {showAdd && (
          <div style={{ background: '#1e1410', border: '2px solid var(--yellow)', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
            <h3 style={{ color: 'var(--yellow)', fontFamily: 'Rajdhani', fontSize: '20px', marginBottom: '16px' }}>➕ Add Sale Record</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
              {[
                { label: 'Product Name', key: 'product', placeholder: 'e.g. RTX 4060' },
                { label: 'Category', key: 'category', placeholder: 'e.g. GPU' },
                { label: 'Buyer Name', key: 'buyer', placeholder: 'e.g. Rahul Sharma' },
                { label: 'Buyer Phone', key: 'phone', placeholder: 'e.g. 9876543210' },
                { label: 'Buy Date', key: 'buyDate', placeholder: 'YYYY-MM-DD' },
                { label: 'Price (₹)', key: 'price', placeholder: 'e.g. 33000' },
                { label: 'Warranty', key: 'warranty', placeholder: 'e.g. 3 Years' },
                { label: 'Warranty End Date', key: 'warrantyEnd', placeholder: 'YYYY-MM-DD' },
                { label: 'Stock Date', key: 'stockDate', placeholder: 'YYYY-MM-DD' },
              ].map(field => (
                <div key={field.key}>
                  <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '4px' }}>{field.label}</label>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    value={newRecord[field.key]}
                    onChange={e => setNewRecord({ ...newRecord, [field.key]: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--olive)', background: 'var(--deep)', color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              ))}
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '4px' }}>STATUS</label>
              <select
                value={newRecord.status}
                onChange={e => setNewRecord({ ...newRecord, status: e.target.value })}
                style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--olive)', background: 'var(--deep)', color: '#fff', fontSize: '13px', outline: 'none' }}>
                <option value="Delivered">Delivered</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={addRecord} style={{ background: 'var(--yellow)', color: 'var(--deep)', border: 'none', borderRadius: '8px', padding: '10px 24px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>✅ Save Record</button>
              <button onClick={() => setShowAdd(false)} style={{ background: 'transparent', color: '#aaa', border: '1px solid #444', borderRadius: '8px', padding: '10px 24px', fontSize: '14px', cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        )}

        {/* History Table + Detail Panel */}
        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 340px' : '1fr', gap: '20px' }}>
          <div style={{ background: '#1e1410', border: '1px solid var(--olive)', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--olive)', fontSize: '16px', color: 'var(--yellow)', fontFamily: 'Rajdhani', fontWeight: '700' }}>
              📋 Sales History ({filtered.length} records)
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: 'var(--dark-olive)' }}>
                    {['Product', 'Buyer', 'Phone', 'Buy Date', 'Price', 'Warranty End', 'Status', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: 'var(--yellow)', fontWeight: '600', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r, i) => (
                    <tr key={r.id} style={{ borderTop: '1px solid #2a2010', background: selected?.id === r.id ? '#2a1f0a' : i % 2 === 0 ? 'transparent' : '#1a1008', cursor: 'pointer' }}
                      onClick={() => setSelected(selected?.id === r.id ? null : r)}>
                      <td style={{ padding: '12px 16px', color: '#ddd', fontWeight: '500' }}>{r.product}</td>
                      <td style={{ padding: '12px 16px', color: '#ccc' }}>{r.buyer}</td>
                      <td style={{ padding: '12px 16px', color: '#aaa' }}>{r.phone}</td>
                      <td style={{ padding: '12px 16px', color: '#aaa' }}>{r.buyDate}</td>
                      <td style={{ padding: '12px 16px', color: 'var(--yellow)', fontWeight: '700' }}>₹{r.price.toLocaleString()}</td>
                      <td style={{ padding: '12px 16px', color: '#f0a500' }}>{r.warrantyEnd}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ background: r.status === 'Delivered' ? '#1a3d1a' : '#3d2a0a', color: r.status === 'Delivered' ? '#6abf69' : '#f0a500', borderRadius: '20px', padding: '4px 12px', fontSize: '11px' }}>
                          {r.status === 'Delivered' ? '✅' : '⏳'} {r.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <button onClick={e => { e.stopPropagation(); deleteRecord(r.id) }}
                          style={{ background: '#3d1515', color: '#f88', border: '1px solid #f88', borderRadius: '6px', padding: '5px 10px', fontSize: '11px', cursor: 'pointer' }}>🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Detail Panel */}
          {selected && (
            <div style={{ background: '#1e1410', border: '2px solid var(--yellow)', borderRadius: '12px', padding: '20px', height: 'fit-content' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ color: 'var(--yellow)', fontFamily: 'Rajdhani', fontSize: '18px' }}>📋 Full Details</h3>
                <button onClick={() => setSelected(null)} style={{ background: 'transparent', color: '#aaa', border: 'none', fontSize: '18px', cursor: 'pointer' }}>✕</button>
              </div>
              {[
                { label: '📦 Product', value: selected.product },
                { label: '🏷️ Category', value: selected.category },
                { label: '👤 Buyer', value: selected.buyer },
                { label: '📞 Phone', value: selected.phone },
                { label: '📅 Buy Date', value: selected.buyDate },
                { label: '💰 Price Paid', value: `₹${selected.price.toLocaleString()}` },
                { label: '📦 Stock Since', value: selected.stockDate },
                { label: '🛡️ Warranty', value: selected.warranty },
                { label: '⏰ Warranty Until', value: selected.warrantyEnd },
                { label: '🚚 Status', value: selected.status },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #2a2010' }}>
                  <span style={{ fontSize: '12px', color: '#aaa' }}>{item.label}</span>
                  <span style={{ fontSize: '13px', color: '#ddd', fontWeight: '500', textAlign: 'right', maxWidth: '160px' }}>{item.value}</span>
                </div>
              ))}
              <Link to="/admin/bill">
                <button style={{ width: '100%', marginTop: '16px', background: 'var(--yellow)', color: 'var(--deep)', border: 'none', borderRadius: '8px', padding: '12px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>
                  🧾 Generate Bill
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}