import express from 'express'
import {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
} from '../controllers/serviceController.js'
import { authenticateToken, requireAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

// Public routes
router.get('/', getServices)
router.get('/:id', getService)

// Protected/Admin routes
router.post('/', authenticateToken, requireAdmin, createService)
router.put('/:id', authenticateToken, requireAdmin, updateService)
router.delete('/:id', authenticateToken, requireAdmin, deleteService)

export default router




