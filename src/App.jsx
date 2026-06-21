import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import ReferralDetails from './pages/ReferralDetails'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/referrals/:id" element={
          <ProtectedRoute>
            <ReferralDetails />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App