import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import authRoutes from './routes/authRoutes.js'
import serviceRoutes from './routes/serviceRoutes.js'
import productRoutes from './routes/productRoutes.js'
import repairRoutes from './routes/repairRoutes.js'
import contactRoutes from './routes/contactRoutes.js'

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load environment variables from server/.env
dotenv.config({ path: join(__dirname, '.env') })

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// MongoDB Connection with improved error handling
const connectDB = async () => {
  try {
    // Get MongoDB URI from environment
    let mongoURI = process.env.MONGODB_URI
    
    // Debug: Check if .env is loaded
    if (!mongoURI) {
      console.warn('⚠️  MONGODB_URI not found in environment variables')
      console.warn('📝 Using default localhost connection (will fail if MongoDB not running locally)')
      mongoURI = 'mongodb://localhost:27017/computer-house'
    }
    
    // Validate connection string format
    if (mongoURI.includes('localhost') || mongoURI.includes('127.0.0.1')) {
      console.warn('⚠️  WARNING: Using localhost MongoDB connection')
      console.warn('💡 To use MongoDB Atlas, update MONGODB_URI in server/.env')
      console.warn('   Format: mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/database-name?retryWrites=true&w=majority')
    }
    
    console.log('🔄 Attempting to connect to MongoDB...')
    console.log('📍 Connection string:', mongoURI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')) // Hide credentials
    console.log('🔍 Connection type:', mongoURI.includes('mongodb+srv') ? 'MongoDB Atlas (Cloud)' : 'Local MongoDB')
    
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // 30 seconds timeout for Atlas
      socketTimeoutMS: 45000,
    })
    
    console.log('✅ MongoDB Connected Successfully')
    console.log(`📊 Database: ${conn.connection.name}`)
    console.log(`🌐 Host: ${conn.connection.host}`)
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err)
    })
    
    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB disconnected')
    })
    
    mongoose.connection.on('reconnected', () => {
      console.log('✅ MongoDB reconnected')
    })
    
    return true
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message)
    console.error('📝 Error details:', {
      name: error.name,
      code: error.code,
      message: error.message
    })
    
    // Provide specific error guidance
    if (error.message.includes('ECONNREFUSED') || error.message.includes('127.0.0.1')) {
      console.log('\n🔴 LOCALHOST CONNECTION ERROR DETECTED')
      console.log('📋 Current MONGODB_URI is set to localhost')
      console.log('\n💡 To fix and use MongoDB Atlas:')
      console.log('   1. Go to: https://www.mongodb.com/cloud/atlas')
      console.log('   2. Create a free account and cluster')
      console.log('   3. Click "Connect" → "Connect your application"')
      console.log('   4. Copy the connection string')
      console.log('   5. Update server/.env file:')
      console.log('      MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/computer-house?retryWrites=true&w=majority')
      console.log('   6. Replace <password> with your actual password')
      console.log('   7. Whitelist IP: Network Access → Add IP Address → 0.0.0.0/0 (for all IPs)')
      console.log('   8. Restart the server\n')
    } else {
      console.log('\n💡 To fix:')
      console.log('   1. Check if MongoDB Atlas connection string is correct')
      console.log('   2. Ensure IP address is whitelisted in MongoDB Atlas')
      console.log('   3. Verify database name in connection string')
      console.log('   4. Update MONGODB_URI in server/.env file')
      console.log('   5. MongoDB Atlas: https://www.mongodb.com/cloud/atlas\n')
    }
    return false
  }
}

// Connect to MongoDB
let dbConnected = false
connectDB().then(connected => {
  dbConnected = connected
  if (!connected) {
    console.log('⚠️  Server will continue running, but database operations will not work.')
  }
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/services', serviceRoutes)
app.use('/api/products', productRoutes)
app.use('/api/repairs', repairRoutes)
app.use('/api/contacts', contactRoutes)

// Health Check
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    database: dbStatus,
    timestamp: new Date().toISOString()
  })
})

// Database Status Check
app.get('/api/health/db', (req, res) => {
  const readyState = mongoose.connection.readyState
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  }
  
  res.json({
    status: readyState === 1 ? 'connected' : 'disconnected',
    readyState: states[readyState] || 'unknown',
    database: mongoose.connection.name || 'N/A',
    host: mongoose.connection.host || 'N/A'
  })
})

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  })
})

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  })
})

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📍 API URL: http://localhost:${PORT}/api`)
})

export default app

