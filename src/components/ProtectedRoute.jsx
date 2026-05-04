import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { authService } from '../services/authService'

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      try {
        // Check localStorage directly first
        const token = localStorage.getItem('adminToken')
        const user = localStorage.getItem('adminUser')
        console.log('ProtectedRoute: Direct localStorage check:', {
          hasToken: !!token,
          hasUser: !!user
        })
        
        const authenticated = authService.isAuthenticated()
        console.log('ProtectedRoute: Authentication check result:', authenticated)
        setIsAuthenticated(authenticated)
        setLoading(false)
      } catch (error) {
        console.error('ProtectedRoute: Auth check error:', error)
        setIsAuthenticated(false)
        setLoading(false)
      }
    }

    // Check immediately and also after a small delay
    checkAuth()
    const timeoutId = setTimeout(checkAuth, 100)

    // Listen for storage changes (logout from other tabs)
    const handleStorageChange = (e) => {
      if (e.key === 'adminToken' || e.key === 'adminUser') {
        console.log('ProtectedRoute: Storage changed:', e.key)
        checkAuth()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-lavender-200 border-t-lavender-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  // Render protected content
  return children
}

export default ProtectedRoute

