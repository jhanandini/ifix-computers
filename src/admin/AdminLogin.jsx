import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  const navigate = useNavigate()

  const ADMIN_PASSWORD = 'ifix@admin2025'

  const handleLogin = () => {
    if (!password) { setError('Please enter password!'); return }
    setLoading(true)
    setError('')
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        localStorage.setItem('ifix_admin', 'true')
        navigate('/admin/dashboard')
      } else {
        setError('❌ Wrong password! Please try again.')
        setLoading(false)
      }
    }, 800)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <style>{`
        @media(max-width:480px){
          .login-card{padding:24px 16px!important;width:100%!important}
        }
        .login-btn:hover{background:#E8C97A!important}
      `}</style>

      {/* Logo */}
      <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '32px', fontWeight: '700', color: '#C9A84C', letterSpacing: '3px', marginBottom: '4px' }}>
        IFIX<span style={{ color: '#fff' }}>Computers</span>
      </div>
      <div style={{ fontSize: '11px', color: '#444', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '40px' }}>Admin Control Panel</div>

      {/* Card */}
      <div className="login-card" style={{ background: '#111', border: '1px solid #2a2a2a', borderRadius: '10px', padding: '40px', width: '100%', maxWidth: '380px' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ fontSize: '44px', marginBottom: '12px' }}>🔐</div>
          <h2 style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '26px', color: '#C9A84C', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '2px' }}>Admin Login</h2>
          <p style={{ fontSize: '12px', color: '#444', letterSpacing: '0.5px' }}>Authorized personnel only</p>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '11px', color: '#555', display: 'block', marginBottom: '8px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Password</label>
          <div style={{ display: 'flex', background: '#1a1a1a', border: `1px solid ${error ? '#e53e3e' : '#2a2a2a'}`, borderRadius: '6px', overflow: 'hidden' }}>
            <input
              type={show ? 'text' : 'password'}
              placeholder="Enter admin password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              style={{ flex: 1, background: 'transparent', border: 'none', padding: '12px 16px', color: '#fff', fontSize: '14px', outline: 'none' }}
            />
            <button onClick={() => setShow(!show)} style={{ background: 'transparent', border: 'none', padding: '12px 14px', color: '#555', fontSize: '16px', cursor: 'pointer' }}>
              {show ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        {error && (
          <div style={{ background: 'rgba(229,62,62,0.1)', border: '1px solid rgba(229,62,62,0.3)', borderRadius: '6px', padding: '10px 14px', fontSize: '13px', color: '#e53e3e', marginBottom: '16px' }}>
            {error}
          </div>
        )}

        <button
          className="login-btn"
          onClick={handleLogin}
          disabled={loading}
          style={{ width: '100%', background: '#C9A84C', color: '#000', border: 'none', borderRadius: '6px', padding: '14px', fontWeight: '700', fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? '⏳ Logging in...' : '🔓 Login to Dashboard'}
        </button>

        <div style={{ marginTop: '20px', padding: '12px', background: '#1a1a1a', borderRadius: '6px', fontSize: '12px', color: '#555', textAlign: 'center', border: '1px solid #222' }}>
          Default password: <span style={{ color: '#C9A84C', fontWeight: '600' }}>ifix@admin2025</span>
        </div>
      </div>

      <div style={{ marginTop: '24px', fontSize: '11px', color: '#333' }}>
        © 2025 IFIX Computers · Admin Access Only
      </div>
    </div>
  )
}