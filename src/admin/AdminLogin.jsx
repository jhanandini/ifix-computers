import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const ADMIN_PASSWORD = 'ifix@admin2025'

  const handleLogin = () => {
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

  const handleKey = (e) => {
    if (e.key === 'Enter') handleLogin()
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--deep)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

      {/* Logo */}
      <div style={{ fontSize: '36px', fontWeight: '800', color: 'var(--yellow)', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '2px', marginBottom: '8px' }}>
        IFIX<span style={{ color: '#fff' }}>Computers</span>
      </div>
      <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '40px' }}>Admin Control Panel</div>

      {/* Login Card */}
      <div style={{ background: '#1e1410', border: '2px solid var(--olive)', borderRadius: '16px', padding: '40px', width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', fontSize: '48px', marginBottom: '16px' }}>🔐</div>
        <h2 style={{ textAlign: 'center', fontSize: '24px', color: 'var(--yellow)', fontFamily: 'Rajdhani', marginBottom: '8px' }}>Admin Login</h2>
        <p style={{ textAlign: 'center', fontSize: '13px', color: '#aaa', marginBottom: '28px' }}>Only authorized personnel</p>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>PASSWORD</label>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={handleKey}
            style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--olive)', background: 'var(--deep)', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        {error && (
          <div style={{ background: '#3d1515', border: '1px solid #f88', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: '#f88', marginBottom: '16px' }}>
            {error}
          </div>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{ width: '100%', background: 'var(--yellow)', color: 'var(--deep)', border: 'none', borderRadius: '8px', padding: '14px', fontWeight: '700', fontSize: '15px', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
          {loading ? '⏳ Logging in...' : '🔓 Login to Dashboard'}
        </button>

        <div style={{ marginTop: '20px', padding: '12px', background: 'var(--dark-olive)', borderRadius: '8px', fontSize: '12px', color: '#aaa', textAlign: 'center' }}>
          💡 Default password: <span style={{ color: 'var(--yellow)', fontWeight: '600' }}>ifix@admin2025</span>
        </div>
      </div>

      <div style={{ marginTop: '24px', fontSize: '12px', color: '#444' }}>
        © 2025 IFIX Computers · Admin Access Only
      </div>
    </div>
  )
}