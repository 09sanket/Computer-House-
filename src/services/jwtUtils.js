// JWT Token Utility Functions

/**
 * Decode JWT token without verification (for client-side use)
 * In production, token verification should be done on the server
 */
export const decodeToken = (token) => {
  try {
    if (!token) return null
    
    const base64Url = token.split('.')[1]
    if (!base64Url) return null
    
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    
    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error('Error decoding token:', error)
    return null
  }
}

/**
 * Check if JWT token is expired
 */
export const isTokenExpired = (token) => {
  const decoded = decodeToken(token)
  if (!decoded || !decoded.exp) return true
  
  const currentTime = Date.now() / 1000
  return decoded.exp < currentTime
}

/**
 * Check if JWT token is valid (exists and not expired)
 */
export const isTokenValid = (token) => {
  if (!token) return false
  
  try {
    // Try to decode the token
    const decoded = decodeToken(token)
    if (!decoded) return false
    
    // If token has exp field, check if it's expired
    if (decoded.exp) {
      const currentTime = Date.now() / 1000
      if (decoded.exp < currentTime) {
        return false // Token expired
      }
    }
    
    // Token exists and is not expired (or doesn't have exp field)
    return true
  } catch (error) {
    console.error('Token validation error:', error)
    return false
  }
}

/**
 * Generate a mock JWT token for demo purposes
 * In production, this should come from the backend
 */
export const generateMockToken = (user) => {
  try {
    const header = {
      alg: 'HS256',
      typ: 'JWT'
    }
    
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
    }
    
    // For demo: create a simple token-like string
    // In production, use proper JWT library like 'jsonwebtoken'
    const headerEncoded = btoa(JSON.stringify(header))
    const payloadEncoded = btoa(JSON.stringify(payload))
    const signature = btoa('mock-signature-' + Date.now())
    
    const token = `${headerEncoded}.${payloadEncoded}.${signature}`
    
    // Verify token was created
    if (!token || token.length === 0) {
      throw new Error('Token generation returned empty string')
    }
    
    return token
  } catch (error) {
    console.error('Error generating mock token:', error)
    // Return a simple fallback token
    return `mock-token-${Date.now()}-${user.id}-${user.email}`
  }
}


