import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './pages/Layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from './pages/auth.tsx'
import { AuthProvider } from './context/AuthProvider.tsx'
import Admin from './pages/admin.tsx'
import Index from './pages/index.tsx'
import User from './pages/user.tsx'
import BookingTerms from './pages/bookingTerms.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/user" element={<User />} />
            <Route path="/booking-terms" element={<BookingTerms />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
