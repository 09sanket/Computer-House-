import express from 'express'
import { login, register, getMe } from '../controllers/authController.js'
import { authenticateToken } from '../middleware/authMiddleware.js'

const router = express.Router()

// Public routes
router.post('/login', login)
router.post('/register', register)

// Protected routes
router.get('/me', authenticateToken, getMe)

export default router




