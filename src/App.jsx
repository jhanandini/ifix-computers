import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import Cart from './pages/Cart'
import AdminLogin from './admin/AdminLogin'
import Dashboard from './admin/Dashboard'
import ProductHistory from './admin/ProductHistory'
import BillGenerator from './admin/BillGenerator'

const ADMIN_LOGGED_IN = () => localStorage.getItem('ifix_admin') === 'true'

function ProtectedRoute({ children }) {
  return ADMIN_LOGGED_IN() ? children : <Navigate to="/admin" />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/admin/history" element={<ProtectedRoute><ProductHistory /></ProtectedRoute>} />
        <Route path="/admin/bill" element={<ProtectedRoute><BillGenerator /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App