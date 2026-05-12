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

  const logout = () => {
    localStorage.removeItem('ifix_admin')
    navigate('/admin')
  }

  const addItem = () => setItems([...items, { name: '', qty: 1, price: '' }])
  const removeItem = (i) => setItems(items.filter((_, idx) => idx !== i))
  const updateItem = (i, field, value) => {
    const updated = items.map((item, idx) => idx === i ? { ...item, [field]: value } : item)
    setItems(updated)
  }

  const subtotal = items.reduce((sum, i) => sum + (parseInt(i.price) || 0) * (parseInt(i.qty) || 0), 0)
  const gst = Math.round(subtotal * 0.18)
  const total = subtotal + gst

  const printBill = () => {
    window.print()
  }

  const generateBill = () => {
    if (!customer.name) { alert('Please enter customer name!'); return }
    if (items.some(i => !i.name || !i.price)) { alert('Please fill all item details!'); return }
    setShowBill(true)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--deep)' }}>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          .bill-print { background: white !important; color: black !important; padding: 20px !important; }
        }
      `}</style>

      {/* Navbar */}
      <nav className="no-print" style={{ background: 'var(--dark-olive)', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid var(--yellow)' }}>
        <div style={{ fontSize: '22px', fontWeight: '800', color: 'var(--yellow)', fontFamily: 'Rajdhani, sans-serif' }}>
          IFIX<span style={{ color: '#fff' }}>Computers</span>
          <span style={{ fontSize: '12px', color: '#aaa', marginLeft: '12px', fontFamily: 'Inter' }}>Bill Generator</span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link to="/admin/dashboard">
            <button style={{ background: 'var(--olive)', color: '#fff', border: 'none', borderRadius: '8px', padding: '8px 16px', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>📦 Products</button>
          </Link>
          <Link to="/admin/history">
            <button style={{ background: 'var(--olive)', color: '#fff', border: 'none', borderRadius: '8px', padding: '8px 16px', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>📋 History</button>
          </Link>
          <Link to="/admin/bill">
            <button style={{ background: 'var(--yellow)', color: 'var(--deep)', border: 'none', borderRadius: '8px', padding: '8px 16px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>🧾 Bill</button>
          </Link>
          <button onClick={logout} style={{ background: '#3d1515', color: '#f88', border: '1px solid #f88', borderRadius: '8px', padding: '8px 16px', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>🚪 Logout</button>
        </div>
      </nav>

      <div style={{ padding: '24px', maxWidth: '900px', margin: '0 auto' }}>
        {!showBill ? (
          <>
            <h2 className="no-print" style={{ fontSize: '28px', color: 'var(--yellow)', fontFamily: 'Rajdhani', marginBottom: '24px' }}>🧾 Generate Bill</h2>

            {/* Bill Info */}
            <div style={{ background: '#1e1410', border: '1px solid var(--olive)', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
              <h3 style={{ color: 'var(--yellow)', fontFamily: 'Rajdhani', fontSize: '18px', marginBottom: '16px' }}>📋 Bill Info</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '4px' }}>BILL NUMBER</label>
                  <input value={billNo} onChange={e => setBillNo(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--olive)', background: 'var(--deep)', color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '4px' }}>BILL DATE</label>
                  <input type="date" value={billDate} onChange={e => setBillDate(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--olive)', background: 'var(--deep)', color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div style={{ background: '#1e1410', border: '1px solid var(--olive)', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
              <h3 style={{ color: 'var(--yellow)', fontFamily: 'Rajdhani', fontSize: '18px', marginBottom: '16px' }}>👤 Customer Details</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {[
                  { label: 'Customer Name *', key: 'name', placeholder: 'e.g. Rahul Sharma' },
                  { label: 'Phone Number', key: 'phone', placeholder: 'e.g. 9876543210' },
                  { label: 'Email', key: 'email', placeholder: 'e.g. rahul@email.com' },
                  { label: 'Address', key: 'address', placeholder: 'e.g. Shimla, HP' },
                ].map(field => (
                  <div key={field.key}>
                    <label style={{ fontSize: '11px', color: '#aaa', display: 'block', marginBottom: '4px' }}>{field.label}</label>
                    <input
                      placeholder={field.placeholder}
                      value={customer[field.key]}
                      onChange={e => setCustomer({ ...customer, [field.key]: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--olive)', background: 'var(--deep)', color: '#fff', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Items */}
            <div style={{ background: '#1e1410', border: '1px solid var(--olive)', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
              <h3 style={{ color: 'var(--yellow)', fontFamily: 'Rajdhani', fontSize: '18px', marginBottom: '16px' }}>📦 Items</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr 1fr auto', gap: '8px', marginBottom: '8px' }}>
                {['Product Name', 'Qty', 'Price (₹)', ''].map(h => (
                  <div key={h} style={{ fontSize: '11px', color: '#aaa', padding: '0 4px' }}>{h}</div>
                ))}
              </div>
              {items.map((item, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '3fr 1fr 1fr auto', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
                  <input
                    placeholder="Product name"
                    value={item.name}
                    onChange={e => updateItem(i, 'name', e.target.value)}
                    style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--olive)', background: 'var(--deep)', color: '#fff', fontSize: '13px', outline: 'none' }} />
                  <input
                    type="number" min="1"
                    value={item.qty}
                    onChange={e => updateItem(i, 'qty', e.target.value)}
                    style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--olive)', background: 'var(--deep)', color: '#fff', fontSize: '13px', outline: 'none' }} />
                  <input
                    type="number"
                    placeholder="0"
                    value={item.price}
                    onChange={e => updateItem(i, 'price', e.target.value)}
                    style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--olive)', background: 'var(--deep)', color: '#fff', fontSize: '13px', outline: 'none' }} />
                  <button onClick={() => removeItem(i)}
                    style={{ background: '#3d1515', color: '#f88', border: '1px solid #f88', borderRadius: '8px', padding: '10px 12px', cursor: 'pointer', fontSize: '14px' }}>🗑️</button>
                </div>
              ))}
              <button onClick={addItem}
                style={{ background: 'var(--olive)', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 20px', fontSize: '13px', cursor: 'pointer', marginTop: '8px' }}>
                ➕ Add Item
              </button>
            </div>

            {/* Totals Preview */}
            <div style={{ background: '#1e1410', border: '1px solid var(--olive)', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
              <h3 style={{ color: 'var(--yellow)', fontFamily: 'Rajdhani', fontSize: '18px', marginBottom: '16px' }}>💰 Totals</h3>
              {[
                { label: 'Subtotal', value: `₹${subtotal.toLocaleString()}` },
                { label: 'GST (18%)', value: `₹${gst.toLocaleString()}` },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #2a2010', fontSize: '14px', color: '#ccc' }}>
                  <span>{row.label}</span><span>{row.value}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', fontSize: '20px', fontWeight: '800', color: 'var(--yellow)', fontFamily: 'Rajdhani' }}>
                <span>TOTAL</span><span>₹{total.toLocaleString()}</span>
              </div>
            </div>

            <button onClick={generateBill}
              style={{ width: '100%', background: 'var(--yellow)', color: 'var(--deep)', border: 'none', borderRadius: '10px', padding: '16px', fontWeight: '800', fontSize: '16px', cursor: 'pointer' }}>
              🧾 Generate & Preview Bill
            </button>
          </>
        ) : (
          <>
            {/* Action Buttons */}
            <div className="no-print" style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <button onClick={() => setShowBill(false)}
                style={{ background: 'var(--olive)', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 20px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}>
                ← Edit Bill
              </button>
              <button onClick={printBill}
                style={{ background: 'var(--yellow)', color: 'var(--deep)', border: 'none', borderRadius: '8px', padding: '10px 24px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>
                🖨️ Print / Save as PDF
              </button>
            </div>

            {/* Bill Preview */}
            <div ref={billRef} className="bill-print" style={{ background: 'white', color: '#1a1a1a', borderRadius: '12px', padding: '40px', border: '2px solid #ddd' }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', paddingBottom: '20px', borderBottom: '3px solid #313E17' }}>
                <div>
                  <div style={{ fontSize: '36px', fontWeight: '800', color: '#313E17', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '2px' }}>
                    IFIX<span style={{ color: '#1B0C0C' }}>Computers</span>
                  </div>
                  <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>Computer Parts & Accessories</div>
                  <div style={{ fontSize: '12px', color: '#888', marginTop: '8px' }}>
                    📍 Shimla, Himachal Pradesh<br />
                    📞 +91 98765 43210<br />
                    📧 admin@ifixcomputers.com
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '28px', fontWeight: '800', color: '#313E17', fontFamily: 'Rajdhani' }}>INVOICE</div>
                  <div style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>Bill No: <strong>{billNo}</strong></div>
                  <div style={{ fontSize: '14px', color: '#666' }}>Date: <strong>{billDate}</strong></div>
                  <div style={{ marginTop: '12px', background: '#FFDE42', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: '700', color: '#1B0C0C', display: 'inline-block' }}>
                    ✅ PAID
                  </div>
                </div>
              </div>

              {/* Customer */}
              <div style={{ background: '#f8f8f6', borderRadius: '10px', padding: '16px 20px', marginBottom: '24px', border: '1px solid #e0e0d8' }}>
                <div style={{ fontSize: '11px', color: '#888', marginBottom: '8px', fontWeight: '700', letterSpacing: '1px' }}>BILLED TO</div>
                <div style={{ fontSize: '18px', fontWeight: '700', color: '#1a1a1a', marginBottom: '4px' }}>{customer.name}</div>
                {customer.phone && <div style={{ fontSize: '13px', color: '#555' }}>📞 {customer.phone}</div>}
                {customer.email && <div style={{ fontSize: '13px', color: '#555' }}>📧 {customer.email}</div>}
                {customer.address && <div style={{ fontSize: '13px', color: '#555' }}>📍 {customer.address}</div>}
              </div>

              {/* Items Table */}
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px' }}>
                <thead>
                  <tr style={{ background: '#313E17', color: 'white' }}>
                    {['#', 'Product', 'Qty', 'Unit Price', 'Amount'].map(h => (
                      <th key={h} style={{ padding: '12px 16px', textAlign: h === '#' || h === 'Qty' ? 'center' : h === 'Unit Price' || h === 'Amount' ? 'right' : 'left', fontSize: '13px', fontWeight: '600' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #e8e8e0', background: i % 2 === 0 ? 'white' : '#fafaf8' }}>
                      <td style={{ padding: '12px 16px', textAlign: 'center', fontSize: '13px', color: '#888' }}>{i + 1}</td>
                      <td style={{ padding: '12px 16px', fontSize: '14px', fontWeight: '500', color: '#1a1a1a' }}>{item.name}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', fontSize: '13px', color: '#555' }}>{item.qty}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', fontSize: '13px', color: '#555' }}>₹{parseInt(item.price || 0).toLocaleString()}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', fontSize: '14px', fontWeight: '700', color: '#313E17' }}>₹{((parseInt(item.price) || 0) * (parseInt(item.qty) || 0)).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totals */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '32px' }}>
                <div style={{ width: '280px' }}>
                  {[
                    { label: 'Subtotal', value: `₹${subtotal.toLocaleString()}` },
                    { label: 'GST (18%)', value: `₹${gst.toLocaleString()}` },
                  ].map(row => (
                    <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e8e8e0', fontSize: '14px', color: '#555' }}>
                      <span>{row.label}</span><span>{row.value}</span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: '#313E17', color: 'white', borderRadius: '8px', marginTop: '8px', fontSize: '18px', fontWeight: '800' }}>
                    <span>TOTAL</span><span>₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div style={{ borderTop: '2px solid #313E17', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div style={{ fontSize: '12px', color: '#888' }}>
                  <div style={{ fontWeight: '700', color: '#313E17', marginBottom: '4px' }}>Terms & Conditions</div>
                  <div>• Warranty as per product specification</div>
                  <div>• No returns after 7 days of purchase</div>
                  <div>• Physical damage not covered under warranty</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: '160px', borderTop: '1px solid #333', paddingTop: '8px', fontSize: '12px', color: '#555' }}>Authorized Signature</div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#313E17', marginTop: '4px' }}>IFIX Computers</div>
                </div>
              </div>

              <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '12px', color: '#aaa' }}>
                Thank you for shopping with IFIX Computers! 🖥️
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}