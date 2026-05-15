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
  const [newRecord, setNewRecord] = useState({ product: '', category: '', buyer: '', phone: '', buyDate: '', price: '', warranty: '', warrantyEnd: '', stockDate: '', status: 'Delivered' })

  const logout = () => { localStorage.removeItem('ifix_admin'); navigate('/admin') }
  const saveRecords = (updated) => { setRecords(updated); localStorage.setItem('ifix_history', JSON.stringify(updated)) }

  const addRecord = () => {
    if (!newRecord.product || !newRecord.buyer || !newRecord.price) { alert('Please fill product, buyer and price!'); return }
    saveRecords([...records, { ...newRecord, id: Date.now(), price: parseInt(newRecord.price) }])
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
    <div style={{ minHeight: '100vh', background: '#0A0A0A' }}>
      <style>{`
        @media(max-width:768px){
          .stats-grid{grid-template-columns:repeat(2,1fr)!important}
          .form-grid{grid-template-columns:1fr!important}
          .detail-grid{grid-template-columns:1fr!important}
          .table-wrap{overflow-x:auto}
          .filter-row{flex-wrap:wrap!important}
        }
      `}</style>

      {/* Navbar */}
      <nav style={{ background: '#111', borderBottom: '2px solid #C9A84C', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '20px', fontWeight: '700', color: '#C9A84C', letterSpacing: '2px' }}>
          IFIX<span style={{ color: '#fff' }}>Computers</span>
          <span style={{ fontSize: '11px', color: '#444', marginLeft: '12px', fontFamily: 'Inter', letterSpacing: '1px', textTransform: 'uppercase' }}>History</span>
        </div>
        <button onClick={logout} style={{ background: 'rgba(229,62,62,0.1)', color: '#e53e3e', border: '1px solid rgba(229,62,62,0.3)', borderRadius: '6px', padding: '8px 16px', fontWeight: '600', fontSize: '13px' }}>🚪 Logout</button>
      </nav>

      {/* Mobile Nav */}
      <div style={{ background: '#111', borderBottom: '1px solid #222', padding: '10px 20px', display: 'flex', gap: '8px', overflowX: 'auto' }}>
        {[['📦 Products', '/admin/dashboard'], ['📋 History', '/admin/history'], ['🧾 Bill', '/admin/bill'], ['🌐 Site', '/']].map(([label, to]) => (
          <Link key={to} to={to}>
            <button style={{ background: label.includes('History') ? '#C9A84C' : 'transparent', color: label.includes('History') ? '#000' : '#888', border: `1px solid ${label.includes('History') ? '#C9A84C' : '#333'}`, borderRadius: '6px', padding: '6px 14px', fontSize: '12px', whiteSpace: 'nowrap' }}>
              {label}
            </button>
          </Link>
        ))}
      </div>

      <div style={{ padding: '20px' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px', marginBottom: '24px' }} className="stats-grid">
          {[
            { label: 'Total Sales', value: records.length, emoji: '📋', color: '#C9A84C' },
            { label: 'Delivered', value: records.filter(r => r.status === 'Delivered').length, emoji: '✅', color: '#38a169' },
            { label: 'Pending', value: records.filter(r => r.status === 'Pending').length, emoji: '⏳', color: '#f6ad55' },
            { label: 'Revenue', value: `₹${totalRevenue.toLocaleString()}`, emoji: '💰', color: '#C9A84C' },
          ].map(stat => (
            <div key={stat.label} style={{ background: '#111', border: '1px solid #222', borderRadius: '8px', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{stat.emoji}</div>
              <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '24px', fontWeight: '700', color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: '11px', color: '#444', marginTop: '4px' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }} className="filter-row">
          <div style={{ flex: 1, minWidth: '200px', display: 'flex', background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '6px', overflow: 'hidden' }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search by product or buyer..." style={{ flex: 1, background: 'transparent', border: 'none', padding: '10px 16px', color: '#fff', fontSize: '13px', outline: 'none' }} />
          </div>
          {['All', 'Delivered', 'Pending'].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)} style={{ background: filterStatus === s ? '#C9A84C' : 'transparent', color: filterStatus === s ? '#000' : '#888', border: `1px solid ${filterStatus === s ? '#C9A84C' : '#333'}`, borderRadius: '6px', padding: '10px 16px', fontWeight: filterStatus === s ? '700' : '400', fontSize: '13px' }}>
              {s}
            </button>
          ))}
          <button onClick={() => setShowAdd(!showAdd)} style={{ background: '#C9A84C', color: '#000', border: 'none', borderRadius: '6px', padding: '10px 20px', fontWeight: '700', fontSize: '13px' }}>
            ➕ Add Sale
          </button>
        </div>

        {/* Add Record Form */}
        {showAdd && (
          <div style={{ background: '#111', border: '1px solid #C9A84C', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
            <h3 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '20px', color: '#C9A84C', marginBottom: '16px', textTransform: 'uppercase' }}>➕ Add Sale Record</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px', marginBottom: '16px' }} className="form-grid">
              {[
                { label: 'Product Name', key: 'product', placeholder: 'e.g. RTX 4060' },
                { label: 'Category', key: 'category', placeholder: 'e.g. GPU' },
                { label: 'Buyer Name', key: 'buyer', placeholder: 'e.g. Rahul Sharma' },
                { label: 'Buyer Phone', key: 'phone', placeholder: 'e.g. 9876543210' },
                { label: 'Buy Date', key: 'buyDate', placeholder: 'YYYY-MM-DD' },
                { label: 'Price (₹)', key: 'price', placeholder: 'e.g. 33000' },
                { label: 'Warranty', key: 'warranty', placeholder: 'e.g. 3 Years' },
                { label: 'Warranty End', key: 'warrantyEnd', placeholder: 'YYYY-MM-DD' },
                { label: 'Stock Date', key: 'stockDate', placeholder: 'YYYY-MM-DD' },
              ].map(field => (
                <div key={field.key}>
                  <label style={{ fontSize: '11px', color: '#555', display: 'block', marginBottom: '6px', letterSpacing: '1px', textTransform: 'uppercase' }}>{field.label}</label>
                  <input placeholder={field.placeholder} value={newRecord[field.key]} onChange={e => setNewRecord({ ...newRecord, [field.key]: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #2a2a2a', background: '#1a1a1a', color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              ))}
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '11px', color: '#555', display: 'block', marginBottom: '6px', letterSpacing: '1px', textTransform: 'uppercase' }}>Status</label>
              <select value={newRecord.status} onChange={e => setNewRecord({ ...newRecord, status: e.target.value })}
                style={{ padding: '10px 12px', borderRadius: '6px', border: '1px solid #2a2a2a', background: '#1a1a1a', color: '#fff', fontSize: '13px', outline: 'none' }}>
                <option value="Delivered">Delivered</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={addRecord} style={{ background: '#C9A84C', color: '#000', border: 'none', borderRadius: '6px', padding: '10px 24px', fontWeight: '700', fontSize: '14px' }}>✅ Save</button>
              <button onClick={() => setShowAdd(false)} style={{ background: 'transparent', color: '#666', border: '1px solid #333', borderRadius: '6px', padding: '10px 24px', fontSize: '14px' }}>Cancel</button>
            </div>
          </div>
        )}

        {/* Table + Detail */}
        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 320px' : '1fr', gap: '16px' }} className="detail-grid">
          <div style={{ background: '#111', border: '1px solid #222', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #222', fontFamily: 'Rajdhani, sans-serif', fontSize: '18px', color: '#C9A84C', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Sales History ({filtered.length} records)
            </div>
            <div className="table-wrap" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', minWidth: '700px' }}>
                <thead>
                  <tr style={{ background: '#1a1a1a' }}>
                    {['Product', 'Buyer', 'Phone', 'Buy Date', 'Price', 'Warranty End', 'Status', ''].map(h => (
                      <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: '#C9A84C', fontWeight: '600', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase', borderBottom: '1px solid #222', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r, i) => (
                    <tr key={r.id} onClick={() => setSelected(selected?.id === r.id ? null : r)}
                      style={{ borderTop: '1px solid #1a1a1a', background: selected?.id === r.id ? '#1a1500' : i % 2 === 0 ? 'transparent' : '#0d0d0d', cursor: 'pointer' }}>
                      <td style={{ padding: '12px 16px', color: '#F0EDE8', fontWeight: '500' }}>{r.product}</td>
                      <td style={{ padding: '12px 16px', color: '#888' }}>{r.buyer}</td>
                      <td style={{ padding: '12px 16px', color: '#666' }}>{r.phone}</td>
                      <td style={{ padding: '12px 16px', color: '#666' }}>{r.buyDate}</td>
                      <td style={{ padding: '12px 16px', color: '#C9A84C', fontWeight: '700', fontFamily: 'Rajdhani, sans-serif' }}>₹{r.price.toLocaleString()}</td>
                      <td style={{ padding: '12px 16px', color: '#f6ad55' }}>{r.warrantyEnd}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ background: r.status === 'Delivered' ? 'rgba(56,161,105,0.1)' : 'rgba(246,173,85,0.1)', color: r.status === 'Delivered' ? '#38a169' : '#f6ad55', border: `1px solid ${r.status === 'Delivered' ? 'rgba(56,161,105,0.3)' : 'rgba(246,173,85,0.3)'}`, borderRadius: '20px', padding: '4px 12px', fontSize: '11px' }}>
                          {r.status === 'Delivered' ? '✅' : '⏳'} {r.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <button onClick={e => { e.stopPropagation(); deleteRecord(r.id) }} style={{ background: 'rgba(229,62,62,0.1)', color: '#e53e3e', border: '1px solid rgba(229,62,62,0.3)', borderRadius: '4px', padding: '5px 10px', fontSize: '11px' }}>🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Detail Panel */}
          {selected && (
            <div style={{ background: '#111', border: '1px solid #C9A84C', borderRadius: '8px', padding: '20px', height: 'fit-content' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '18px', color: '#C9A84C', textTransform: 'uppercase', letterSpacing: '1px' }}>Full Details</h3>
                <button onClick={() => setSelected(null)} style={{ background: 'transparent', color: '#555', border: 'none', fontSize: '20px' }}>✕</button>
              </div>
              {[
                ['📦 Product', selected.product],
                ['🏷️ Category', selected.category],
                ['👤 Buyer', selected.buyer],
                ['📞 Phone', selected.phone],
                ['📅 Buy Date', selected.buyDate],
                ['💰 Price', `₹${selected.price.toLocaleString()}`],
                ['📦 In Stock Since', selected.stockDate],
                ['🛡️ Warranty', selected.warranty],
                ['⏰ Warranty Until', selected.warrantyEnd],
                ['🚚 Status', selected.status],
              ].map(([label, value]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #1a1a1a' }}>
                  <span style={{ fontSize: '12px', color: '#555' }}>{label}</span>
                  <span style={{ fontSize: '13px', color: '#F0EDE8', fontWeight: '500', textAlign: 'right', maxWidth: '160px' }}>{value}</span>
                </div>
              ))}
              <Link to="/admin/bill">
                <button style={{ width: '100%', marginTop: '16px', background: '#C9A84C', color: '#000', border: 'none', borderRadius: '6px', padding: '12px', fontWeight: '700', fontSize: '14px', letterSpacing: '0.5px' }}>
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