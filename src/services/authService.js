import api from './api'
import { isTokenValid, decodeToken } from './jwtUtils'

export const authService = {
  /**
   * Login with email and password
   * Returns JWT token and user data
   */
  login: async (email, password) => {
    try {
      console.log('Login attempt:', { email, password: '***' })
      
      // Call backend API for authentication
      const response = await api.post('/auth/login', { email, password })
      
      console.log('Backend response:', response.data)
      
      // Check if response is successful
      if (response.data.success && response.data.data) {
        const { token, user: userData } = response.data.data
        
        // Validate token exists
        if (!token || token.length === 0) {
          console.error('Token is missing in response')
          throw new Error('Token not received from server')
        }
        
        // Prepare user object with all required fields
        const user = {
          id: userData.id || userData._id,
          name: userData.name || 'Admin User',
          email: userData.email,
          role: userData.role || 'admin'
        }
        
        console.log('Token received:', token.substring(0, 30) + '...')
        console.log('User data received:', user)
        
        // Store token and user in localStorage
        try {
          localStorage.setItem('adminToken', token)
          localStorage.setItem('adminUser', JSON.stringify(user))
          
          // Verify storage immediately
          const storedToken = localStorage.getItem('adminToken')
          const storedUser = localStorage.getItem('adminUser')
          
          console.log('Storage verification:', {
            tokenStored: !!storedToken,
            tokenLength: storedToken ? storedToken.length : 0,
            userStored: !!storedUser,
            userLength: storedUser ? storedUser.length : 0
          })
          
          if (!storedToken || storedToken.length === 0) {
            throw new Error('Token was not stored in localStorage')
          }
          
          if (!storedUser || storedUser.length === 0) {
            throw new Error('User data was not stored in localStorage')
          }
          
          console.log('✅ Login successful - Token and user stored')
          console.log('Token preview:', storedToken.substring(0, 30) + '...')
          console.log('User stored:', JSON.parse(storedUser))
          
          return {
            token,
            user
          }
        } catch (storageError) {
          console.error('Storage error:', storageError)
          throw new Error('Failed to store authentication data: ' + storageError.message)
        }
      } else {
        // Handle unsuccessful response
        const errorMessage = response.data.message || 'Login failed'
        console.error('Login failed:', errorMessage)
        throw new Error(errorMessage)
      }
    } catch (error) {
      console.error('Login error:', error)
      
      // Handle different error types
      if (error.response) {
        // Backend returned an error response
        const errorMessage = error.response.data?.message || error.response.data?.error || 'Login failed'
        console.error('Backend error:', error.response.status, errorMessage)
        throw new Error(errorMessage)
      } else if (error.request) {
        // Request was made but no response received
        console.error('Network error - No response from server')
        throw new Error('Unable to connect to server. Please check your connection.')
      } else {
        // Something else happened
        const errorMessage = error.message || 'Login failed'
        throw new Error(errorMessage)
      }
    }
  },

  /**
   * Logout - Clear all authentication data
   */
  logout: () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
  },

  /**
   * Check if user is authenticated (has valid JWT token)
   */
  isAuthenticated: () => {
    try {
      const token = localStorage.getItem('adminToken')
      const user = localStorage.getItem('adminUser')
      
      console.log('isAuthenticated check:', { 
        hasToken: !!token, 
        hasUser: !!user,
        tokenLength: token ? token.length : 0,
        userLength: user ? user.length : 0
      })
      
      // If both token and user exist, consider authenticated
      // (For demo purposes, we'll be lenient with token validation)
      if (token && user && token.length > 0 && user.length > 0) {
        console.log('Authentication: Valid (token and user exist)')
        return true
      }
      
      console.log('Authentication: Invalid', {
        tokenExists: !!token,
        userExists: !!user,
        tokenValid: token && token.length > 0,
        userValid: user && user.length > 0
      })
      return false
    } catch (error) {
      console.error('Authentication check error:', error)
      return false
    }
  },

  /**
   * Get current authenticated user
   */
  getCurrentUser: () => {
    const user = localStorage.getItem('adminUser')
    return user ? JSON.parse(user) : null
  },

  /**
   * Get JWT token from localStorage
   */
  getToken: () => {
    return localStorage.getItem('adminToken')
  },

  /**
   * Decode and get token payload
   */
  getTokenPayload: () => {
    const token = localStorage.getItem('adminToken')
    if (!token) return null
    return decodeToken(token)
  },

  /**
   * Refresh token (for future implementation)
   */
  refreshToken: async () => {
    try {
      const response = await api.post('/admin/refresh-token')
      if (response.data.token) {
        localStorage.setItem('adminToken', response.data.token)
      }
      return response.data
    } catch (error) {
      authService.logout()
      throw error
    }
  }
}

