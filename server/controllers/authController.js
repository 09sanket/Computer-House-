import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d'

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRE })
}

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    console.log('Login attempt:', { email })

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      })
    }

    // Check MongoDB connection
    if (mongoose.connection.readyState !== 1) {
      console.error('MongoDB not connected. Connection state:', mongoose.connection.readyState)
      return res.status(503).json({
        success: false,
        message: 'Database connection error. Please check MongoDB connection.',
      })
    }

    // Check if user exists
    let user
    try {
      user = await User.findOne({ email })
    } catch (dbError) {
      console.error('Database query error:', dbError)
      return res.status(503).json({
        success: false,
        message: 'Database error. Please check MongoDB connection.',
        error: dbError.message,
      })
    }

    if (!user) {
      console.log('User not found:', email)
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      })
    }

    // Check password
    let isPasswordValid
    try {
      isPasswordValid = await user.comparePassword(password)
    } catch (passwordError) {
      console.error('Password comparison error:', passwordError)
      return res.status(500).json({
        success: false,
        message: 'Error validating password',
        error: passwordError.message,
      })
    }

    if (!isPasswordValid) {
      console.log('Invalid password for user:', email)
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      })
    }

    // Generate token
    let token
    try {
      token = generateToken(user._id)
    } catch (tokenError) {
      console.error('Token generation error:', tokenError)
      return res.status(500).json({
        success: false,
        message: 'Error generating authentication token',
        error: tokenError.message,
      })
    }

    console.log('Login successful for user:', email)

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user._id,
          name: user.name || user.email.split('@')[0] || 'Admin User',
          email: user.email,
          role: user.role,
        },
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    console.error('Error stack:', error.stack)
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    })
  }
}

// @desc    Register admin (for initial setup)
// @route   POST /api/auth/register
// @access  Public (should be protected in production)
export const register = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      })
    }

    // Create user
    const user = await User.create({
      email,
      password,
      role: 'admin',
    })

    // Generate token
    const token = generateToken(user._id)

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
        },
      },
    })
  } catch (error) {
    console.error('Register error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error during registration',
    })
  }
}

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password')
    res.status(200).json({
      success: true,
      data: user,
    })
  } catch (error) {
    console.error('Get me error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error',
    })
  }
}


