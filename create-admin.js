// Script to create admin user in MongoDB
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from './server/models/User.js'

dotenv.config({ path: './server/.env' })

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/computer-house')
    console.log('✅ Connected to MongoDB')

    // Get credentials from command line or use defaults
    const email = process.argv[2] || 'admin@computerhouse.com'
    const password = process.argv[3] || 'admin123'

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      console.log('⚠️  User already exists with email:', email)
      console.log('   To change password, delete the user first or use a different email')
      process.exit(0)
    }

    // Create admin user
    const user = await User.create({
      email,
      password,
      role: 'admin',
    })

    console.log('✅ Admin user created successfully!')
    console.log('📧 Email:', email)
    console.log('🔑 Password:', password)
    console.log('👤 Role: admin')
    console.log('\n💡 You can now login with these credentials')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message)
    process.exit(1)
  }
}

createAdmin()




