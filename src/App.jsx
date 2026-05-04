import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './layout/Navbar'
import Footer from './layout/Footer'
import PageTransition from './components/PageTransition'
import ScrollableHome from './pages/ScrollableHome'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Products from './pages/Products'
import Repairs from './pages/Repairs'
import Contact from './pages/Contact'
// Admin Panel
import AdminLayout from './layout/AdminLayout'
import AdminLogin from './pages/admin/Login'
import AdminDashboard from './pages/admin/Dashboard'
import AdminServices from './pages/admin/Services'
import AdminProducts from './pages/admin/Products'
import AdminRepairs from './pages/admin/Repairs'
import AdminContacts from './pages/admin/Contacts'
import ProtectedRoute from './components/ProtectedRoute'
import { ToastProvider } from './hooks/useToast'

function AppRoutes() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public Routes */}
          <Route path="/" element={<PageTransition><ScrollableHome /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
          <Route path="/products" element={<PageTransition><Products /></PageTransition>} />
          <Route path="/repairs" element={<PageTransition><Repairs /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<div className="p-6"><h1 className="text-2xl font-bold">Orders Management</h1></div>} />
            <Route path="customers" element={<div className="p-6"><h1 className="text-2xl font-bold">Customers Management</h1></div>} />
            <Route path="services" element={<AdminServices />} />
            <Route path="repairs" element={<AdminRepairs />} />
            <Route path="contacts" element={<AdminContacts />} />
            <Route path="settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Settings</h1></div>} />
          </Route>
        </Routes>
      </AnimatePresence>
      {!isAdminRoute && <Footer />}
    </>
  )
}

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <ToastProvider>
        <div className="min-h-screen flex flex-col bg-white">
          <main className="flex-grow">
            <AppRoutes />
          </main>
        </div>
      </ToastProvider>
    </Router>
  )
}

export default App

