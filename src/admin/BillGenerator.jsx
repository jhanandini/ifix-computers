import { Link, useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'

export default function BillGenerator() {
  const navigate = useNavigate()
  const billRef = useRef()
  const [items, setItems] = useState([{ name: '', qty: 1, price: '' }])
  const [customer, setCustomer] = useState({ name: '', phone: '', address: '', email: '' })
  const [billNo, setBillNo] = useState(`IFIX-${Date.now().toString().slice(-6)}`)
  const [billDate, setBillDate] = useState(new Date().toISOString().split('T')[0])
  const [showBill, setShowBill] = useState(false)
  const [gstEnabled, setGstEnabled] = useState(true)

  const logout = () => { localStorage.removeItem('ifix_admin'); navigate('/admin') }
  const addItem = () => setItems([...items, { name: '', qty: 1, price: '' }])
  const removeItem = (i) => setItems(items.filter((_, idx) => idx !== i))
  const updateItem = (i, field, value) => setItems(items.map((item, idx) => idx === i ? { ...item, [field]: value } : item))

  const subtotal = items.reduce((sum, i) => sum + (parseInt(i.price) || 0) * (parseInt(i.qty) || 0), 0)
  const gst = gstEnabled ? Math.round(subtotal * 0.18) : 0
  const total = subtotal + gst

  const generateBill = () => {
    if (!customer.name) { alert('Please enter customer name!'); return }
    if (items.some(i => !i.name || !i.price)) { alert('Please fill all item details!'); return }
    setShowBill(true)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A' }}>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
        }
        @media(max-width:768px){
          .form-grid-2{grid-template-columns:1fr!important}
          .items-grid{grid-template-columns:1fr 60px 80px 40px!important}
          .bill-totals{width:100%!important}
        }
      `}</style>

      {/* Navbar */}
      <nav className="no-print" style={{ background: '#111', borderBottom: '2px solid #C9A84C', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '20px', fontWeight: '700', color: '#C9A84C', letterSpacing: '2px' }}>
          IFIX<span style={{ color: '#fff' }}>Computers</span>
          <span style={{ fontSize: '11px', color: '#444', marginLeft: '12px', fontFamily: 'Inter', letterSpacing: '1px', textTransform: 'uppercase' }}>Bill Generator</span>
        </div>
        <button onClick={logout} style={{ background: 'rgba(229,62,62,0.1)', color: '#e53e3e', border: '1px solid rgba(229,62,62,0.3)', borderRadius: '6px', padding: '8px 16px', fontWeight: '600', fontSize: '13px' }}>🚪 Logout</button>
      </nav>

      {/* Mobile Nav */}
      <div className="no-print" style={{ background: '#111', borderBottom: '1px solid #222', padding: '10px 20px', display: 'flex', gap: '8px', overflowX: 'auto' }}>
        {[['📦 Products', '/admin/dashboard'], ['📋 History', '/admin/history'], ['🧾 Bill', '/admin/bill'], ['🌐 Site', '/']].map(([label, to]) => (
          <Link key={to} to={to}>
            <button style={{ background: label.includes('Bill') ? '#C9A84C' : 'transparent', color: label.includes('Bill') ? '#000' : '#888', border: `1px solid ${label.includes('Bill') ? '#C9A84C' : '#333'}`, borderRadius: '6px', padding: '6px 14px', fontSize: '12px', whiteSpace: 'nowrap' }}>
              {label}
            </button>
          </Link>
        ))}
      </div>

      <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
        {!showBill ? (
          <>
            <div className="no-print" style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '11px', color: '#C9A84C', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>Create Invoice</div>
              <h2 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '28px', color: '#F0EDE8', textTransform: 'uppercase', letterSpacing: '1px' }}>Bill Generator</h2>
            </div>

            {/* Bill Info */}
            <div style={{ background: '#111', border: '1px solid #222', borderRadius: '8px', padding: '20px', marginBottom: '16px' }}>
              <h3 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '16px', color: '#C9A84C', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>📋 Bill Information</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }} className="form-grid-2">
                {[
                  { label: 'Bill Number', val: billNo, set: setBillNo, type: 'text' },
                  { label: 'Bill Date', val: billDate, set: setBillDate, type: 'date' },
                ].map(f => (
                  <div key={f.label}>
                    <label style={{ fontSize: '11px', color: '#555', display: 'block', marginBottom: '6px', letterSpacing: '1px', textTransform: 'uppercase' }}>{f.label}</label>
                    <input type={f.type} value={f.val} onChange={e => f.set(e.target.value)}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #2a2a2a', background: '#1a1a1a', color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Info */}
            <div style={{ background: '#111', border: '1px solid #222', borderRadius: '8px', padding: '20px', marginBottom: '16px' }}>
              <h3 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '16px', color: '#C9A84C', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>👤 Customer Details</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }} className="form-grid-2">
                {[
                  { label: 'Customer Name *', key: 'name', placeholder: 'Rahul Sharma' },
                  { label: 'Phone Number', key: 'phone', placeholder: '9876543210' },
                  { label: 'Email', key: 'email', placeholder: 'rahul@email.com' },
                  { label: 'Address', key: 'address', placeholder: 'Shimla, HP' },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ fontSize: '11px', color: '#555', display: 'block', marginBottom: '6px', letterSpacing: '1px', textTransform: 'uppercase' }}>{f.label}</label>
                    <input placeholder={f.placeholder} value={customer[f.key]} onChange={e => setCustomer({ ...customer, [f.key]: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #2a2a2a', background: '#1a1a1a', color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Items */}
            <div style={{ background: '#111', border: '1px solid #222', borderRadius: '8px', padding: '20px', marginBottom: '16px' }}>
              <h3 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '16px', color: '#C9A84C', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>📦 Items</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '3fr 80px 120px 40px', gap: '8px', marginBottom: '8px' }} className="items-grid">
                {['Product Name', 'Qty', 'Price (₹)', ''].map(h => (
                  <div key={h} style={{ fontSize: '11px', color: '#555', letterSpacing: '1px', textTransform: 'uppercase' }}>{h}</div>
                ))}
              </div>
              {items.map((item, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '3fr 80px 120px 40px', gap: '8px', marginBottom: '8px', alignItems: 'center' }} className="items-grid">
                  <input placeholder="Product name" value={item.name} onChange={e => updateItem(i, 'name', e.target.value)}
                    style={{ padding: '10px 12px', borderRadius: '6px', border: '1px solid #2a2a2a', background: '#1a1a1a', color: '#fff', fontSize: '13px', outline: 'none' }} />
                  <input type="number" min="1" value={item.qty} onChange={e => updateItem(i, 'qty', e.target.value)}
                    style={{ padding: '10px 12px', borderRadius: '6px', border: '1px solid #2a2a2a', background: '#1a1a1a', color: '#fff', fontSize: '13px', outline: 'none', textAlign: 'center' }} />
                  <input type="number" placeholder="0" value={item.price} onChange={e => updateItem(i, 'price', e.target.value)}
                    style={{ padding: '10px 12px', borderRadius: '6px', border: '1px solid #2a2a2a', background: '#1a1a1a', color: '#fff', fontSize: '13px', outline: 'none' }} />
                  <button onClick={() => removeItem(i)} style={{ background: 'rgba(229,62,62,0.1)', color: '#e53e3e', border: '1px solid rgba(229,62,62,0.3)', borderRadius: '6px', padding: '10px', fontSize: '14px' }}>🗑️</button>
                </div>
              ))}
              <button onClick={addItem} style={{ background: 'transparent', color: '#C9A84C', border: '1px solid #C9A84C', borderRadius: '6px', padding: '8px 20px', fontSize: '13px', marginTop: '8px', letterSpacing: '0.5px' }}>
                ➕ Add Item
              </button>
            </div>

            {/* GST Toggle + Totals */}
            <div style={{ background: '#111', border: '1px solid #222', borderRadius: '8px', padding: '20px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '16px', color: '#C9A84C', textTransform: 'uppercase', letterSpacing: '1px' }}>💰 Totals</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '12px', color: '#666' }}>Include GST (18%)</span>
                  <div onClick={() => setGstEnabled(!gstEnabled)} style={{ width: '40px', height: '22px', background: gstEnabled ? '#C9A84C' : '#333', borderRadius: '11px', cursor: 'pointer', position: 'relative', transition: '0.2s' }}>
                    <div style={{ width: '18px', height: '18px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: gstEnabled ? '20px' : '2px', transition: '0.2s' }}></div>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ width: '280px' }} className="bill-totals">
                  {[
                    { label: 'Subtotal', value: `₹${subtotal.toLocaleString()}` },
                    ...(gstEnabled ? [{ label: 'GST (18%)', value: `₹${gst.toLocaleString()}` }] : []),
                  ].map(row => (
                    <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #1a1a1a', fontSize: '14px', color: '#666' }}>
                      <span>{row.label}</span><span>{row.value}</span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', fontFamily: 'Rajdhani, sans-serif', fontSize: '22px', fontWeight: '700', color: '#C9A84C' }}>
                    <span>TOTAL</span><span>₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <button onClick={generateBill} style={{ width: '100%', background: '#C9A84C', color: '#000', border: 'none', borderRadius: '8px', padding: '16px', fontWeight: '800', fontSize: '16px', letterSpacing: '1px', textTransform: 'uppercase' }}>
              🧾 Generate & Preview Bill
            </button>
          </>
        ) : (
          <>
            {/* Print Actions */}
            <div className="no-print" style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
              <button onClick={() => setShowBill(false)} style={{ background: 'transparent', color: '#888', border: '1px solid #333', borderRadius: '6px', padding: '10px 20px', fontSize: '14px' }}>← Edit Bill</button>
              <button onClick={() => window.print()} style={{ background: '#C9A84C', color: '#000', border: 'none', borderRadius: '6px', padding: '10px 24px', fontWeight: '700', fontSize: '14px' }}>🖨️ Print / Save PDF</button>
            </div>

            {/* Bill Preview */}
            <div ref={billRef} style={{ background: 'white', color: '#1a1a1a', borderRadius: '10px', padding: '40px', border: '1px solid #ddd' }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', paddingBottom: '24px', borderBottom: '3px solid #1a1a1a' }}>
                <div>
                  <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '32px', fontWeight: '800', color: '#1a1a1a', letterSpacing: '3px', marginBottom: '4px' }}>
                    IFIX<span style={{ color: '#C9A84C' }}>Computers</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#888', marginBottom: '10px' }}>Computer Parts & Accessories</div>
                  <div style={{ fontSize: '12px', color: '#666', lineHeight: '1.8' }}>
                    📍 Delhi<br />
                    📞 +91 98765 43210<br />
                    ✉️ admin@ifixcomputers.com
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '32px', fontWeight: '800', color: '#1a1a1a', letterSpacing: '2px' }}>INVOICE</div>
                  <div style={{ fontSize: '13px', color: '#666', marginTop: '8px', lineHeight: '1.8' }}>
                    Bill No: <strong style={{ color: '#1a1a1a' }}>{billNo}</strong><br />
                    Date: <strong style={{ color: '#1a1a1a' }}>{billDate}</strong>
                  </div>
                  <div style={{ marginTop: '12px', background: '#C9A84C', padding: '6px 16px', borderRadius: '4px', fontSize: '12px', fontWeight: '700', color: '#000', display: 'inline-block', letterSpacing: '1px' }}>
                    ✅ PAID
                  </div>
                </div>
              </div>

              {/* Customer */}
              <div style={{ background: '#f9f9f7', border: '1px solid #eee', borderRadius: '8px', padding: '16px 20px', marginBottom: '28px' }}>
                <div style={{ fontSize: '10px', color: '#999', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px', fontWeight: '700' }}>Billed To</div>
                <div style={{ fontSize: '18px', fontWeight: '700', color: '#1a1a1a', marginBottom: '4px' }}>{customer.name}</div>
                {customer.phone && <div style={{ fontSize: '13px', color: '#666' }}>📞 {customer.phone}</div>}
                {customer.email && <div style={{ fontSize: '13px', color: '#666' }}>✉️ {customer.email}</div>}
                {customer.address && <div style={{ fontSize: '13px', color: '#666' }}>📍 {customer.address}</div>}
              </div>

              {/* Items Table */}
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '28px' }}>
                <thead>
                  <tr style={{ background: '#1a1a1a', color: 'white' }}>
                    {['#', 'Product', 'Qty', 'Unit Price', 'Amount'].map((h, i) => (
                      <th key={h} style={{ padding: '12px 16px', textAlign: i === 0 || i === 2 ? 'center' : i >= 3 ? 'right' : 'left', fontSize: '12px', fontWeight: '600', letterSpacing: '0.5px' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #eee', background: i % 2 === 0 ? 'white' : '#fafaf8' }}>
                      <td style={{ padding: '12px 16px', textAlign: 'center', fontSize: '13px', color: '#999' }}>{i + 1}</td>
                      <td style={{ padding: '12px 16px', fontSize: '14px', fontWeight: '500', color: '#1a1a1a' }}>{item.name}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', fontSize: '13px', color: '#555' }}>{item.qty}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', fontSize: '13px', color: '#555' }}>₹{parseInt(item.price || 0).toLocaleString()}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', fontSize: '14px', fontWeight: '700', color: '#1a1a1a' }}>₹{((parseInt(item.price) || 0) * (parseInt(item.qty) || 0)).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totals */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '32px' }}>
                <div style={{ width: '280px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee', fontSize: '14px', color: '#666' }}>
                    <span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  {gstEnabled && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee', fontSize: '14px', color: '#666' }}>
                      <span>GST (18%)</span><span>₹{gst.toLocaleString()}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 16px', background: '#1a1a1a', color: 'white', borderRadius: '6px', marginTop: '8px', fontFamily: 'Rajdhani, sans-serif', fontSize: '20px', fontWeight: '800', letterSpacing: '1px' }}>
                    <span>TOTAL</span><span>₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div style={{ borderTop: '2px solid #1a1a1a', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ fontSize: '12px', color: '#888' }}>
                  <div style={{ fontWeight: '700', color: '#1a1a1a', marginBottom: '6px', letterSpacing: '0.5px' }}>Terms & Conditions</div>
                  <div style={{ lineHeight: '1.8' }}>
                    • Warranty as per product specification<br />
                    • No returns after 7 days of purchase<br />
                    • Physical damage not covered under warranty
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: '160px', borderTop: '1px solid #333', paddingTop: '8px', fontSize: '12px', color: '#666' }}>Authorized Signature</div>
                  <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '14px', fontWeight: '700', color: '#1a1a1a', marginTop: '4px' }}>IFIX Computers</div>
                </div>
              </div>

              <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '12px', color: '#aaa', borderTop: '1px solid #eee', paddingTop: '16px' }}>
                Thank you for shopping with IFIX Computers! 🖥️ · Shimla, Himachal Pradesh
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}