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
        setError('Wrong password! Please try again.')
        setLoading(false)
      }
    }, 800)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f3ff', fontFamily: "'Inter', sans-serif", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'); * { font-family: 'Inter', sans-serif !important; box-sizing: border-box; } a { text-decoration: none; color: inherit; }`}</style>

      {/* Logo */}
      <div style={{ fontSize: '32px', fontWeight: '800', color: '#581c87', letterSpacing: '-0.5px', marginBottom: '4px' }}>
        IFIX<span style={{ color: '#1e0a3c' }}>Computers</span>
      </div>
      <div style={{ fontSize: '12px', color: '#9ca3af', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '40px' }}>Admin Control Panel</div>

      {/* Card */}
      <div style={{ background: '#fff', border: '1.5px solid #e9d5ff', borderRadius: '16px', padding: '40px', width: '100%', maxWidth: '400px', boxShadow: '0 8px 32px rgba(88,28,135,0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ width: '64px', height: '64px', background: '#f5f3ff', border: '2px solid #e9d5ff', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '28px' }}>
            🔐
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1e0a3c', marginBottom: '4px' }}>Admin Login</h2>
          <p style={{ fontSize: '13px', color: '#9ca3af' }}>Authorized personnel only</p>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '12px', color: '#6b7280', display: 'block', marginBottom: '8px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>Password</label>
          <div style={{ display: 'flex', background: '#f5f3ff', border: `1.5px solid ${error ? '#fca5a5' : '#e9d5ff'}`, borderRadius: '10px', overflow: 'hidden' }}>
            <input
              type={show ? 'text' : 'password'}
              placeholder="Enter admin password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              style={{ flex: 1, background: 'transparent', border: 'none', padding: '12px 16px', color: '#1e0a3c', fontSize: '14px', outline: 'none' }}
            />
            <button onClick={() => setShow(!show)}
              style={{ background: 'transparent', border: 'none', padding: '12px 14px', color: '#9ca3af', cursor: 'pointer', fontSize: '16px' }}>
              {show ? '🙈' : '👁'}
            </button>
          </div>
        </div>

        {error && (
          <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: '#dc2626', marginBottom: '16px', fontWeight: '500' }}>
            {error}
          </div>
        )}

        <button onClick={handleLogin} disabled={loading}
          style={{ width: '100%', background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '10px', padding: '14px', fontWeight: '800', fontSize: '15px', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, letterSpacing: '0.5px' }}>
          {loading ? 'Logging in...' : 'Login to Dashboard'}
        </button>

        <div style={{ marginTop: '20px', padding: '12px', background: '#f5f3ff', borderRadius: '8px', fontSize: '12px', color: '#9ca3af', textAlign: 'center', border: '1px solid #e9d5ff' }}>
          Default password: <span style={{ color: '#7c3aed', fontWeight: '700' }}>ifix@admin2025</span>
        </div>
      </div>

      <div style={{ marginTop: '24px', fontSize: '12px', color: '#9ca3af' }}>
        2025 IFIX Computers · Admin Access Only
      </div>
    </div>
  )
}