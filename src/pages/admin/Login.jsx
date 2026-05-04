import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { authService } from '../../services/authService'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  // Redirect if already logged in
  useEffect(() => {
    if (authService.isAuthenticated()) {
      navigate('/admin/dashboard', { replace: true })
    }
  }, [navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Validate email format
      if (!email || !email.includes('@')) {
        setError('Please enter a valid email address')
        setLoading(false)
        return
      }

      // Validate password
      if (!password || password.length < 6) {
        setError('Password must be at least 6 characters')
        setLoading(false)
        return
      }

      // Login with JWT authentication
      console.log('Attempting login...')
      const result = await authService.login(email, password)
      console.log('Login result:', result)
      
      // Verify token was stored
      const token = localStorage.getItem('adminToken')
      const user = localStorage.getItem('adminUser')
      console.log('Token stored:', !!token)
      console.log('User stored:', !!user)
      
      if (!token || !user) {
        console.error('Token or user not stored after login')
        setError('Failed to store authentication data')
        setLoading(false)
        return
      }
      
      // Verify authentication status
      const isAuth = authService.isAuthenticated()
      console.log('Authentication status after login:', isAuth)
      
      if (!isAuth) {
        console.error('Authentication check failed after login')
        setError('Authentication verification failed')
        setLoading(false)
        return
      }
      
      console.log('Login successful, redirecting...')
      // Redirect to dashboard after successful login
      navigate('/admin/dashboard', { replace: true })
    } catch (err) {
      console.error('Login error caught:', err)
      const errorMessage = err.message || err.toString() || 'Login failed. Please try again.'
      setError(errorMessage)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender-50 via-white to-lavender-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-lavender-600 to-lavender-700 rounded-2xl flex items-center justify-center"
            >
              <span className="text-4xl">💻</span>
            </motion.div>
            <h1 className="text-3xl font-bold text-lavender-800 mb-2">Computer House</h1>
            <p className="text-gray-600">Admin Login</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm"
              >
                {error}
              </motion.div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-transparent transition-all"
                placeholder="admin@computerhouse.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-transparent transition-all"
                placeholder="Enter your password"
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-lavender-700 to-lavender-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </motion.button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-lavender-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-2 font-semibold">Demo Credentials:</p>
            <p className="text-xs text-gray-600">Email: admin@computerhouse.com</p>
            <p className="text-xs text-gray-600">Password: Sanket123</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Login

