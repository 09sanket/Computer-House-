import { useState, useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { authService } from '../services/authService'

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false) // Closed by default on mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      // Auto-close sidebar on mobile when switching to desktop
      if (!mobile && sidebarOpen) {
        setSidebarOpen(true)
      } else if (mobile) {
        setSidebarOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [sidebarOpen])

  const handleLogout = () => {
    // Clear JWT token and user data
    authService.logout()
    // Redirect to login page
    navigate('/admin/login', { replace: true })
  }

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/products', label: 'Products', icon: '📦' },
    { path: '/admin/orders', label: 'Orders', icon: '🛒' },
    { path: '/admin/customers', label: 'Customers', icon: '👥' },
    { path: '/admin/services', label: 'Services', icon: '🛠️' },
    { path: '/admin/settings', label: 'Settings', icon: '⚙️' },
  ]

  const currentUser = authService.getCurrentUser()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: isMobile ? -300 : 0, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: isMobile ? -300 : 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-lavender-700 to-lavender-800 text-white shadow-xl z-50 ${
              isMobile ? 'md:relative md:z-40' : ''
            }`}
          >
            <div className="flex flex-col h-full">
              {/* Logo */}
              <div className="p-6 border-b border-lavender-600">
                <h1 className="text-2xl font-bold">Computer House</h1>
                <p className="text-sm text-lavender-200 mt-1">Admin Panel</p>
              </div>

              {/* Menu Items */}
              <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.path
                  return (
                    <motion.button
                      key={item.path}
                      onClick={() => navigate(item.path)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-white text-lavender-700 shadow-lg'
                          : 'text-lavender-100 hover:bg-lavender-600'
                      }`}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </motion.button>
                  )
                })}
              </nav>

              {/* User Info & Logout */}
              <div className="p-4 border-t border-lavender-600">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-lavender-600 flex items-center justify-center">
                    <span className="text-lg">👤</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{currentUser?.name || 'Admin'}</p>
                    <p className="text-xs text-lavender-200">{currentUser?.email || 'admin@computerhouse.com'}</p>
                  </div>
                </div>
                <motion.button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white font-medium transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Logout
                </motion.button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${
        isMobile ? 'ml-0' : sidebarOpen ? 'ml-64' : 'ml-0'
      }`}>
        {/* Top Navbar */}
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4">
            <div className="flex items-center gap-2 md:gap-4">
              <motion.button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle sidebar"
              >
                <span className="text-xl md:text-2xl">☰</span>
              </motion.button>
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 truncate">
                {menuItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
              </h2>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <motion.button
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Notifications"
              >
                <span className="text-lg md:text-xl">🔔</span>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </motion.button>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-lavender-600 flex items-center justify-center text-white font-semibold text-sm md:text-base">
                {currentUser?.name?.charAt(0) || 'A'}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6 min-h-[calc(100vh-80px)]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout

