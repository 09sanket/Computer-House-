import express from 'express'
import {
  getContacts,
  getContact,
  createContact,
  updateContact,
  markAsRead,
  deleteContact,
} from '../controllers/contactController.js'
import { authenticateToken, requireAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

// Public route (for customers to submit contact form)
router.post('/', createContact)

// Protected/Admin routes
router.get('/', authenticateToken, requireAdmin, getContacts)
router.get('/:id', authenticateToken, requireAdmin, getContact)
router.put('/:id', authenticateToken, requireAdmin, updateContact)
router.patch('/:id/read', authenticateToken, requireAdmin, markAsRead)
router.delete('/:id', authenticateToken, requireAdmin, deleteContact)

export default router




