import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { db } from '../firebase'
import { collection, addDoc, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore'

export default function ProductHistory() {
  const navigate = useNavigate()
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [showAdd, setShowAdd] = useState(false)
  const [selected, setSelected] = useState(null)
  const [newRecord, setNewRecord] = useState({
    product: '', category: '', buyerName: '', buyerPhone: '',
    buyerEmail: '', buyerAddress: '', purchaseDate: '',
    price: '', paymentMethod: 'Cash', warrantyAtPurchase: '',
    warrantyStartDate: '', warrantyEndDate: '', totalWarrantyMonths: '',
    condition: 'new', status: 'Delivered', notes: ''
  })

  const logout = () => { localStorage.removeItem('ifix_admin'); navigate('/admin') }

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'sales'), (snap) => {
      setRecords(snap.docs.map(d => ({ id: d.id, ...d.data() })))
      setLoading(false)
    })
    return unsub
  }, [])

  const calcWarrantyEnd = (startDate, months) => {
    if (!startDate || !months) return ''
    const d = new Date(startDate)
    d.setMonth(d.getMonth() + parseInt(months))
    return d.toISOString().split('T')[0]
  }

  const addRecord = async () => {
    if (!newRecord.product || !newRecord.buyerName || !newRecord.price) {
      alert('Please fill product, buyer name and price!')
      return
    }
    const warrantyEnd = calcWarrantyEnd(newRecord.warrantyStartDate, newRecord.totalWarrantyMonths)
    await addDoc(collection(db, 'sales'), {
      ...newRecord,
      price: parseInt(newRecord.price),
      warrantyEndDate: warrantyEnd,
      createdAt: new Date().toISOString()
    })
    setNewRecord({
      product: '', category: '', buyerName: '', buyerPhone: '',
      buyerEmail: '', buyerAddress: '', purchaseDate: '',
      price: '', paymentMethod: 'Cash', warrantyAtPurchase: '',
      warrantyStartDate: '', warrantyEndDate: '', totalWarrantyMonths: '',
      condition: 'new', status: 'Delivered', notes: ''
    })
    setShowAdd(false)
    alert('Sale record added!')
  }

  const deleteRecord = async (id) => {
    if (window.confirm('Delete this record?')) {
      await deleteDoc(doc(db, 'sales', id))
      if (selected?.id === id) setSelected(null)
    }
  }

  const updateStatus = async (id, status) => {
    await updateDoc(doc(db, 'sales', id), { status })
  }

  const filtered = records.filter(r => {
    const matchSearch = r.product?.toLowerCase().includes(search.toLowerCase()) ||
      r.buyerName?.toLowerCase().includes(search.toLowerCase())
    const matchStatus = filterStatus === 'All' || r.status === filterStatus
    return matchSearch && matchStatus
  })

  const totalRevenue = records.reduce((sum, r) => sum + (r.price || 0), 0)

  const isWarrantyExpiring = (endDate) => {
    if (!endDate) return false
    const end = new Date(endDate)
    const now = new Date()
    const diff = (end - now) / (1000 * 60 * 60 * 24)
    return diff <= 30 && diff > 0
  }

  const isWarrantyExpired = (endDate) => {
    if (!endDate) return false
    return new Date(endDate) < new Date()
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f3ff', fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Inter', sans-serif !important; box-sizing: border-box; }
        a { text-decoration: none; color: inherit; }
        @media(max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
          .form-grid { grid-template-columns: 1fr !important; }
          .detail-grid { grid-template-columns: 1fr !important; }
          .table-wrap { overflow-x: auto; }
          .filter-row { flex-wrap: wrap !important; }
        }
      `}</style>

      {/* Navbar */}
      <nav style={{ background: '#1e0a3c', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 12px rgba(0,0,0,0.3)' }}>
        <div style={{ fontSize: '20px', fontWeight: '800', color: '#fff' }}>
          IFIX<span style={{ color: '#a78bfa' }}>Computers</span>
          <span style={{ fontSize: '11px', color: '#6b7280', marginLeft: '12px', fontWeight: '400' }}>Sales History</span>
        </div>
        <button onClick={logout} style={{ background: 'rgba(220,38,38,0.15)', color: '#f87171', border: '1px solid rgba(220,38,38,0.3)', borderRadius: '8px', padding: '8px 16px', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>
          Logout
        </button>
      </nav>

      {/* Mobile Nav */}
      <div style={{ background: '#2d0052', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '10px 20px', display: 'flex', gap: '8px', overflowX: 'auto' }}>
        {[['Products', '/admin/dashboard', false], ['History', '/admin/history', true], ['Bill', '/admin/bill', false], ['View Site', '/', false]].map(([label, to, active]) => (
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
            { label: 'Total Sales', value: records.length, color: '#7c3aed' },
            { label: 'Delivered', value: records.filter(r => r.status === 'Delivered').length, color: '#059669' },
            { label: 'Pending', value: records.filter(r => r.status === 'Pending').length, color: '#d97706' },
            { label: 'Revenue', value: `Rs.${totalRevenue.toLocaleString()}`, color: '#2563eb' },
          ].map(stat => (
            <div key={stat.label} style={{ background: '#fff', border: '1.5px solid #e9d5ff', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: '800', color: stat.color, marginBottom: '4px' }}>{stat.value}</div>
              <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="filter-row" style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px', display: 'flex', background: '#fff', border: '1.5px solid #e9d5ff', borderRadius: '8px', overflow: 'hidden' }}>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by product or buyer..."
              style={{ flex: 1, background: 'transparent', border: 'none', padding: '10px 16px', color: '#1e0a3c', fontSize: '14px', outline: 'none' }} />
          </div>
          {['All', 'Delivered', 'Pending', 'Cancelled'].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              style={{ background: filterStatus === s ? '#7c3aed' : '#fff', color: filterStatus === s ? '#fff' : '#6b7280', border: `1.5px solid ${filterStatus === s ? '#7c3aed' : '#e9d5ff'}`, borderRadius: '8px', padding: '10px 16px', fontWeight: filterStatus === s ? '700' : '500', fontSize: '13px', cursor: 'pointer' }}>
              {s}
            </button>
          ))}
          <button onClick={() => setShowAdd(!showAdd)}
            style={{ background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 20px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>
            + Add Sale
          </button>
        </div>

        {/* Add Sale Form */}
        {showAdd && (
          <div style={{ background: '#fff', border: '2px solid #7c3aed', borderRadius: '12px', padding: '24px', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1e0a3c', marginBottom: '20px' }}>Add Sale Record</h3>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#581c87', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Product Info</div>
              <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px' }}>
                {[
                  { label: 'Product Name *', key: 'product', placeholder: 'e.g. RTX 4060' },
                  { label: 'Category', key: 'category', placeholder: 'e.g. GPU' },
                  { label: 'Sale Price (Rs.) *', key: 'price', placeholder: 'e.g. 33000' },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '5px', fontWeight: '600' }}>{f.label}</label>
                    <input placeholder={f.placeholder} value={newRecord[f.key]}
                      onChange={e => setNewRecord({ ...newRecord, [f.key]: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1.5px solid #e9d5ff', background: '#f5f3ff', color: '#1e0a3c', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                ))}
                <div>
                  <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '5px', fontWeight: '600' }}>Condition</label>
                  <select value={newRecord.condition} onChange={e => setNewRecord({ ...newRecord, condition: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1.5px solid #e9d5ff', background: '#f5f3ff', color: '#1e0a3c', fontSize: '13px', outline: 'none' }}>
                    <option value="new">New</option>
                    <option value="old">Second Hand</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '5px', fontWeight: '600' }}>Payment Method</label>
                  <select value={newRecord.paymentMethod} onChange={e => setNewRecord({ ...newRecord, paymentMethod: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1.5px solid #e9d5ff', background: '#f5f3ff', color: '#1e0a3c', fontSize: '13px', outline: 'none' }}>
                    {['Cash', 'UPI', 'Bank Transfer', 'Card', 'EMI'].map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '5px', fontWeight: '600' }}>Purchase Date</label>
                  <input type="date" value={newRecord.purchaseDate}
                    onChange={e => setNewRecord({ ...newRecord, purchaseDate: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1.5px solid #e9d5ff', background: '#f5f3ff', color: '#1e0a3c', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#581c87', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Warranty Info</div>
              <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px' }}>
                {[
                  { label: 'Warranty at Purchase', key: 'warrantyAtPurchase', placeholder: 'e.g. 3 Years' },
                  { label: 'Total Warranty (Months)', key: 'totalWarrantyMonths', placeholder: 'e.g. 36' },
                  { label: 'Warranty Start Date', key: 'warrantyStartDate', type: 'date', placeholder: '' },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '5px', fontWeight: '600' }}>{f.label}</label>
                    <input type={f.type || 'text'} placeholder={f.placeholder} value={newRecord[f.key]}
                      onChange={e => setNewRecord({ ...newRecord, [f.key]: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1.5px solid #e9d5ff', background: '#f5f3ff', color: '#1e0a3c', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                ))}
              </div>
              {newRecord.warrantyStartDate && newRecord.totalWarrantyMonths && (
                <div style={{ marginTop: '10px', background: '#d1fae5', border: '1px solid #6ee7b7', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: '#065f46', fontWeight: '600' }}>
                  Warranty End Date: {calcWarrantyEnd(newRecord.warrantyStartDate, newRecord.totalWarrantyMonths)}
                </div>
              )}
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#581c87', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Buyer Info</div>
              <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px' }}>
                {[
                  { label: 'Buyer Name *', key: 'buyerName', placeholder: 'e.g. Rahul Sharma' },
                  { label: 'Phone Number', key: 'buyerPhone', placeholder: 'e.g. 9876543210' },
                  { label: 'Email', key: 'buyerEmail', placeholder: 'e.g. rahul@email.com' },
                  { label: 'Address', key: 'buyerAddress', placeholder: 'e.g. Rohini, Delhi' },
                  { label: 'Notes', key: 'notes', placeholder: 'Any special notes...' },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '5px', fontWeight: '600' }}>{f.label}</label>
                    <input placeholder={f.placeholder} value={newRecord[f.key]}
                      onChange={e => setNewRecord({ ...newRecord, [f.key]: e.target.value })}
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1.5px solid #e9d5ff', background: '#f5f3ff', color: '#1e0a3c', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                ))}
                <div>
                  <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '5px', fontWeight: '600' }}>Status</label>
                  <select value={newRecord.status} onChange={e => setNewRecord({ ...newRecord, status: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1.5px solid #e9d5ff', background: '#f5f3ff', color: '#1e0a3c', fontSize: '13px', outline: 'none' }}>
                    {['Delivered', 'Pending', 'Cancelled'].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={addRecord} style={{ background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '8px', padding: '11px 28px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>
                Save Record
              </button>
              <button onClick={() => setShowAdd(false)} style={{ background: 'transparent', color: '#6b7280', border: '1.5px solid #e9d5ff', borderRadius: '8px', padding: '11px 28px', fontSize: '14px', cursor: 'pointer' }}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Table + Detail Panel */}
        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 340px' : '1fr', gap: '16px' }} className="detail-grid">
          <div style={{ background: '#fff', border: '1.5px solid #e9d5ff', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #f3e8ff', fontSize: '16px', fontWeight: '800', color: '#1e0a3c' }}>
              Sales History ({filtered.length} records)
            </div>
            {loading ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#7c3aed', fontWeight: '600' }}>Loading...</div>
            ) : (
              <div className="table-wrap" style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', minWidth: '800px' }}>
                  <thead>
                    <tr style={{ background: '#f5f3ff' }}>
                      {['Product', 'Buyer', 'Phone', 'Date', 'Price', 'Warranty', 'Warranty End', 'Status', 'Actions'].map(h => (
                        <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: '#581c87', fontWeight: '700', fontSize: '12px', borderBottom: '1.5px solid #e9d5ff', whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((r, i) => (
                      <tr key={r.id} onClick={() => setSelected(selected?.id === r.id ? null : r)}
                        style={{ borderTop: '1px solid #f3e8ff', background: selected?.id === r.id ? '#ede9fe' : i % 2 === 0 ? '#fff' : '#faf5ff', cursor: 'pointer' }}>
                        <td style={{ padding: '12px 16px', color: '#1e0a3c', fontWeight: '600' }}>
                          {r.product}
                          <div style={{ fontSize: '10px', color: '#9ca3af' }}>{r.category}</div>
                        </td>
                        <td style={{ padding: '12px 16px', color: '#374151' }}>{r.buyerName}</td>
                        <td style={{ padding: '12px 16px', color: '#6b7280' }}>{r.buyerPhone}</td>
                        <td style={{ padding: '12px 16px', color: '#6b7280' }}>{r.purchaseDate}</td>
                        <td style={{ padding: '12px 16px', color: '#581c87', fontWeight: '700' }}>Rs.{r.price?.toLocaleString()}</td>
                        <td style={{ padding: '12px 16px', color: '#6b7280' }}>{r.warrantyAtPurchase}</td>
                        <td style={{ padding: '12px 16px' }}>
                          <span style={{ color: isWarrantyExpired(r.warrantyEndDate) ? '#dc2626' : isWarrantyExpiring(r.warrantyEndDate) ? '#d97706' : '#059669', fontWeight: '600', fontSize: '12px' }}>
                            {r.warrantyEndDate || '-'}
                            {isWarrantyExpiring(r.warrantyEndDate) && ' ⚠️'}
                            {isWarrantyExpired(r.warrantyEndDate) && ' (Expired)'}
                          </span>
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <select value={r.status} onChange={e => { e.stopPropagation(); updateStatus(r.id, e.target.value) }}
                            onClick={e => e.stopPropagation()}
                            style={{ background: r.status === 'Delivered' ? '#d1fae5' : r.status === 'Pending' ? '#fef3c7' : '#fee2e2', color: r.status === 'Delivered' ? '#065f46' : r.status === 'Pending' ? '#92400e' : '#991b1b', border: 'none', borderRadius: '6px', padding: '4px 8px', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}>
                            <option value="Delivered">Delivered</option>
                            <option value="Pending">Pending</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <Link to="/admin/bill" onClick={e => e.stopPropagation()}>
                              <button style={{ background: '#ede9fe', color: '#7c3aed', border: 'none', borderRadius: '6px', padding: '5px 10px', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}>Bill</button>
                            </Link>
                            <button onClick={e => { e.stopPropagation(); deleteRecord(r.id) }}
                              style={{ background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '6px', padding: '5px 10px', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filtered.length === 0 && !loading && (
                  <div style={{ padding: '40px', textAlign: 'center', color: '#9ca3af' }}>No records found.</div>
                )}
              </div>
            )}
          </div>

          {/* Detail Panel */}
          {selected && (
            <div style={{ background: '#fff', border: '2px solid #7c3aed', borderRadius: '12px', padding: '20px', height: 'fit-content' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#1e0a3c' }}>Full Details</h3>
                <button onClick={() => setSelected(null)} style={{ background: 'transparent', border: 'none', color: '#9ca3af', fontSize: '20px', cursor: 'pointer' }}>x</button>
              </div>

              {/* Product Info */}
              <div style={{ background: '#f5f3ff', borderRadius: '8px', padding: '12px', marginBottom: '12px' }}>
                <div style={{ fontSize: '11px', color: '#7c3aed', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>Product</div>
                {[
                  ['Name', selected.product],
                  ['Category', selected.category],
                  ['Condition', selected.condition === 'new' ? 'New' : 'Second Hand'],
                  ['Price Paid', `Rs.${selected.price?.toLocaleString()}`],
                  ['Payment', selected.paymentMethod],
                  ['Purchase Date', selected.purchaseDate],
                ].map(([label, value]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #e9d5ff', fontSize: '12px' }}>
                    <span style={{ color: '#6b7280' }}>{label}</span>
                    <span style={{ color: '#1e0a3c', fontWeight: '600', textAlign: 'right', maxWidth: '160px' }}>{value || '-'}</span>
                  </div>
                ))}
              </div>

              {/* Warranty Info */}
              <div style={{ background: '#f0fdf4', borderRadius: '8px', padding: '12px', marginBottom: '12px', border: '1px solid #bbf7d0' }}>
                <div style={{ fontSize: '11px', color: '#059669', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>Warranty</div>
                {[
                  ['Warranty Given', selected.warrantyAtPurchase],
                  ['Total Duration', `${selected.totalWarrantyMonths} months`],
                  ['Start Date', selected.warrantyStartDate],
                  ['End Date', selected.warrantyEndDate],
                  ['Status', isWarrantyExpired(selected.warrantyEndDate) ? 'EXPIRED' : isWarrantyExpiring(selected.warrantyEndDate) ? 'EXPIRING SOON' : 'ACTIVE'],
                ].map(([label, value]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #bbf7d0', fontSize: '12px' }}>
                    <span style={{ color: '#6b7280' }}>{label}</span>
                    <span style={{ color: label === 'Status' ? (isWarrantyExpired(selected.warrantyEndDate) ? '#dc2626' : isWarrantyExpiring(selected.warrantyEndDate) ? '#d97706' : '#059669') : '#1e0a3c', fontWeight: '600', textAlign: 'right' }}>{value || '-'}</span>
                  </div>
                ))}
              </div>

              {/* Buyer Info */}
              <div style={{ background: '#eff6ff', borderRadius: '8px', padding: '12px', marginBottom: '12px', border: '1px solid #bfdbfe' }}>
                <div style={{ fontSize: '11px', color: '#2563eb', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>Buyer</div>
                {[
                  ['Name', selected.buyerName],
                  ['Phone', selected.buyerPhone],
                  ['Email', selected.buyerEmail],
                  ['Address', selected.buyerAddress],
                ].map(([label, value]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #bfdbfe', fontSize: '12px' }}>
                    <span style={{ color: '#6b7280' }}>{label}</span>
                    <span style={{ color: '#1e0a3c', fontWeight: '600', textAlign: 'right', maxWidth: '160px' }}>{value || '-'}</span>
                  </div>
                ))}
              </div>

              {selected.notes && (
                <div style={{ background: '#fef3c7', borderRadius: '8px', padding: '12px', marginBottom: '12px', border: '1px solid #fcd34d' }}>
                  <div style={{ fontSize: '11px', color: '#92400e', fontWeight: '700', marginBottom: '4px' }}>NOTES</div>
                  <div style={{ fontSize: '12px', color: '#78350f' }}>{selected.notes}</div>
                </div>
              )}

              <Link to="/admin/bill">
                <button style={{ width: '100%', background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '8px', padding: '12px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>
                  Generate Bill
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}