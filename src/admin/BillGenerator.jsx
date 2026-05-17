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
  const [paymentMethod, setPaymentMethod] = useState('Cash')

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
    <div style={{ minHeight: '100vh', background: '#f5f3ff', fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Inter', sans-serif !important; box-sizing: border-box; }
        a { text-decoration: none; color: inherit; }
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
        }
        @media(max-width: 768px) {
          .form-grid-2 { grid-template-columns: 1fr !important; }
          .items-grid { grid-template-columns: 2fr 60px 100px 40px !important; }
          .bill-totals { width: 100% !important; }
        }
      `}</style>

      {/* Navbar */}
      <nav className="no-print" style={{ background: '#1e0a3c', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 12px rgba(0,0,0,0.3)' }}>
        <div style={{ fontSize: '20px', fontWeight: '800', color: '#fff' }}>
          IFIX<span style={{ color: '#a78bfa' }}>Computers</span>
          <span style={{ fontSize: '11px', color: '#6b7280', marginLeft: '12px', fontWeight: '400' }}>Bill Generator</span>
        </div>
        <button onClick={logout} style={{ background: 'rgba(220,38,38,0.15)', color: '#f87171', border: '1px solid rgba(220,38,38,0.3)', borderRadius: '8px', padding: '8px 16px', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>
          Logout
        </button>
      </nav>

      {/* Mobile Nav */}
      <div className="no-print" style={{ background: '#2d0052', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '10px 20px', display: 'flex', gap: '8px', overflowX: 'auto' }}>
        {[['Products', '/admin/dashboard', false], ['History', '/admin/history', false], ['Bill', '/admin/bill', true], ['View Site', '/', false]].map(([label, to, active]) => (
          <Link key={to} to={to}>
            <button style={{ background: active ? '#7c3aed' : 'transparent', color: active ? '#fff' : '#9ca3af', border: `1px solid ${active ? '#7c3aed' : 'rgba(255,255,255,0.1)'}`, borderRadius: '6px', padding: '6px 14px', fontSize: '12px', fontWeight: active ? '700' : '400', whiteSpace: 'nowrap', cursor: 'pointer' }}>
              {label}
            </button>
          </Link>
        ))}
      </div>

      <div style={{ padding: '24px', maxWidth: '900px', margin: '0 auto' }}>
        {!showBill ? (
          <>
            <div className="no-print" style={{ marginBottom: '24px' }}>
              <p style={{ fontSize: '12px', color: '#7c3aed', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>Create Invoice</p>
              <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#1e0a3c' }}>Bill Generator</h2>
            </div>

            {/* Bill Info */}
            <div style={{ background: '#fff', border: '1.5px solid #e9d5ff', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#1e0a3c', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>Bill Information</h3>
              <div className="form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '6px', fontWeight: '600' }}>Bill Number</label>
                  <input value={billNo} onChange={e => setBillNo(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #e9d5ff', background: '#f5f3ff', color: '#1e0a3c', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '6px', fontWeight: '600' }}>Bill Date</label>
                  <input type="date" value={billDate} onChange={e => setBillDate(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #e9d5ff', background: '#f5f3ff', color: '#1e0a3c', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '6px', fontWeight: '600' }}>Payment Method</label>
                  <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #e9d5ff', background: '#f5f3ff', color: '#1e0a3c', fontSize: '13px', outline: 'none' }}>
                    {['Cash', 'UPI', 'Bank Transfer', 'Card', 'EMI'].map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div style={{ background: '#fff', border: '1.5px solid #e9d5ff', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#1e0a3c', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>Customer Details</h3>
              <div className="form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {[
                  { label: 'Customer Name *', key: 'name', placeholder: 'Rahul Sharma' },
                  { label: 'Phone Number', key: 'phone', placeholder: '9876543210' },
                  { label: 'Email', key: 'email', placeholder: 'rahul@email.com' },
                  { label: 'Address', key: 'address', placeholder: 'Rohini, Delhi' },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '6px', fontWeight: '600' }}>{f.label}</label>
                    <input placeholder={f.placeholder} value={customer[f.key]}
                      onChange={e => setCustomer({ ...customer, [f.key]: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #e9d5ff', background: '#f5f3ff', color: '#1e0a3c', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Items */}
            <div style={{ background: '#fff', border: '1.5px solid #e9d5ff', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#1e0a3c', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>Items</h3>
              <div className="items-grid" style={{ display: 'grid', gridTemplateColumns: '3fr 80px 130px 40px', gap: '8px', marginBottom: '8px' }}>
                {['Product Name', 'Qty', 'Price (Rs.)', ''].map(h => (
                  <div key={h} style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</div>
                ))}
              </div>
              {items.map((item, i) => (
                <div key={i} className="items-grid" style={{ display: 'grid', gridTemplateColumns: '3fr 80px 130px 40px', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
                  <input placeholder="Product name" value={item.name} onChange={e => updateItem(i, 'name', e.target.value)}
                    style={{ padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #e9d5ff', background: '#f5f3ff', color: '#1e0a3c', fontSize: '13px', outline: 'none' }} />
                  <input type="number" min="1" value={item.qty} onChange={e => updateItem(i, 'qty', e.target.value)}
                    style={{ padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #e9d5ff', background: '#f5f3ff', color: '#1e0a3c', fontSize: '13px', outline: 'none', textAlign: 'center' }} />
                  <input type="number" placeholder="0" value={item.price} onChange={e => updateItem(i, 'price', e.target.value)}
                    style={{ padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #e9d5ff', background: '#f5f3ff', color: '#1e0a3c', fontSize: '13px', outline: 'none' }} />
                  <button onClick={() => removeItem(i)} style={{ background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '8px', padding: '10px', fontSize: '14px', cursor: 'pointer' }}>x</button>
                </div>
              ))}
              <button onClick={addItem} style={{ background: '#ede9fe', color: '#7c3aed', border: 'none', borderRadius: '8px', padding: '9px 20px', fontSize: '13px', fontWeight: '700', marginTop: '8px', cursor: 'pointer' }}>
                + Add Item
              </button>
            </div>

            {/* GST + Totals */}
            <div style={{ background: '#fff', border: '1.5px solid #e9d5ff', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#1e0a3c', textTransform: 'uppercase', letterSpacing: '1px' }}>Totals</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '13px', color: '#6b7280', fontWeight: '500' }}>Include GST (18%)</span>
                  <div onClick={() => setGstEnabled(!gstEnabled)}
                    style={{ width: '44px', height: '24px', background: gstEnabled ? '#7c3aed' : '#d1d5db', borderRadius: '12px', cursor: 'pointer', position: 'relative', transition: 'all 0.2s' }}>
                    <div style={{ width: '20px', height: '20px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: gstEnabled ? '22px' : '2px', transition: 'all 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}></div>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div className="bill-totals" style={{ width: '280px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3e8ff', fontSize: '14px', color: '#6b7280' }}>
                    <span>Subtotal</span><span>Rs.{subtotal.toLocaleString()}</span>
                  </div>
                  {gstEnabled && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3e8ff', fontSize: '14px', color: '#6b7280' }}>
                      <span>GST (18%)</span><span>Rs.{gst.toLocaleString()}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', fontSize: '22px', fontWeight: '800', color: '#581c87' }}>
                    <span>Total</span><span>Rs.{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <button onClick={generateBill}
              style={{ width: '100%', background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '10px', padding: '16px', fontWeight: '800', fontSize: '16px', cursor: 'pointer', letterSpacing: '0.5px' }}>
              Generate & Preview Bill
            </button>
          </>
        ) : (
          <>
            {/* Print Actions */}
            <div className="no-print" style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
              <button onClick={() => setShowBill(false)}
                style={{ background: '#fff', color: '#6b7280', border: '1.5px solid #e9d5ff', borderRadius: '8px', padding: '10px 20px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
                Edit Bill
              </button>
              <button onClick={() => window.print()}
                style={{ background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 24px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>
                Print / Save as PDF
              </button>
            </div>

            {/* Bill Preview */}
            <div ref={billRef} style={{ background: 'white', color: '#1a1a1a', borderRadius: '12px', padding: '40px', border: '1px solid #e5e7eb' }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', paddingBottom: '24px', borderBottom: '3px solid #1e0a3c' }}>
                <div>
                  <div style={{ fontSize: '32px', fontWeight: '800', color: '#1e0a3c', letterSpacing: '-0.5px', marginBottom: '4px' }}>
                    IFIX<span style={{ color: '#7c3aed' }}>Computers</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '10px' }}>Computer Parts & Accessories</div>
                  <div style={{ fontSize: '12px', color: '#6b7280', lineHeight: '1.8' }}>
                    Delhi, India<br />
                    +91 98765 43210<br />
                    admin@ifixcomputers.com
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '32px', fontWeight: '800', color: '#1e0a3c', letterSpacing: '2px', marginBottom: '8px' }}>INVOICE</div>
                  <div style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.8' }}>
                    Bill No: <strong style={{ color: '#1e0a3c' }}>{billNo}</strong><br />
                    Date: <strong style={{ color: '#1e0a3c' }}>{billDate}</strong><br />
                    Payment: <strong style={{ color: '#1e0a3c' }}>{paymentMethod}</strong>
                  </div>
                  <div style={{ marginTop: '10px', background: '#7c3aed', color: '#fff', padding: '5px 14px', borderRadius: '4px', fontSize: '11px', fontWeight: '700', display: 'inline-block', letterSpacing: '1px' }}>PAID</div>
                </div>
              </div>

              {/* Customer */}
              <div style={{ background: '#f5f3ff', border: '1px solid #e9d5ff', borderRadius: '10px', padding: '16px 20px', marginBottom: '28px' }}>
                <div style={{ fontSize: '10px', color: '#7c3aed', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>Billed To</div>
                <div style={{ fontSize: '18px', fontWeight: '800', color: '#1e0a3c', marginBottom: '4px' }}>{customer.name}</div>
                {customer.phone && <div style={{ fontSize: '13px', color: '#6b7280' }}>{customer.phone}</div>}
                {customer.email && <div style={{ fontSize: '13px', color: '#6b7280' }}>{customer.email}</div>}
                {customer.address && <div style={{ fontSize: '13px', color: '#6b7280' }}>{customer.address}</div>}
              </div>

              {/* Items Table */}
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '28px' }}>
                <thead>
                  <tr style={{ background: '#1e0a3c', color: '#fff' }}>
                    {['#', 'Product', 'Qty', 'Unit Price', 'Amount'].map((h, i) => (
                      <th key={h} style={{ padding: '12px 16px', textAlign: i === 0 || i === 2 ? 'center' : i >= 3 ? 'right' : 'left', fontSize: '12px', fontWeight: '700', letterSpacing: '0.5px' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #f3e8ff', background: i % 2 === 0 ? '#fff' : '#faf5ff' }}>
                      <td style={{ padding: '12px 16px', textAlign: 'center', fontSize: '13px', color: '#9ca3af' }}>{i + 1}</td>
                      <td style={{ padding: '12px 16px', fontSize: '14px', fontWeight: '600', color: '#1e0a3c' }}>{item.name}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', fontSize: '13px', color: '#6b7280' }}>{item.qty}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', fontSize: '13px', color: '#6b7280' }}>Rs.{parseInt(item.price || 0).toLocaleString()}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', fontSize: '14px', fontWeight: '800', color: '#1e0a3c' }}>Rs.{((parseInt(item.price) || 0) * (parseInt(item.qty) || 0)).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totals */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '32px' }}>
                <div style={{ width: '280px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3e8ff', fontSize: '14px', color: '#6b7280' }}>
                    <span>Subtotal</span><span>Rs.{subtotal.toLocaleString()}</span>
                  </div>
                  {gstEnabled && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3e8ff', fontSize: '14px', color: '#6b7280' }}>
                      <span>GST (18%)</span><span>Rs.{gst.toLocaleString()}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 16px', background: '#1e0a3c', color: '#fff', borderRadius: '8px', marginTop: '8px', fontSize: '20px', fontWeight: '800' }}>
                    <span>TOTAL</span><span>Rs.{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div style={{ borderTop: '2px solid #1e0a3c', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                  <div style={{ fontWeight: '700', color: '#1e0a3c', marginBottom: '6px' }}>Terms & Conditions</div>
                  <div style={{ lineHeight: '1.8' }}>
                    No returns after 7 days of purchase<br />
                    Physical damage not covered under warranty<br />
                    Warranty as per product specification
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: '160px', borderTop: '1px solid #333', paddingTop: '8px', fontSize: '12px', color: '#6b7280' }}>Authorized Signature</div>
                  <div style={{ fontSize: '14px', fontWeight: '800', color: '#1e0a3c', marginTop: '4px' }}>IFIX Computers</div>
                </div>
              </div>

              <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '12px', color: '#9ca3af', borderTop: '1px solid #f3e8ff', paddingTop: '16px' }}>
                Thank you for shopping with IFIX Computers! · Delhi, India
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}