import express from 'express'
import {
  getRepairs,
  getRepair,
  createRepair,
  updateRepair,
  updateRepairStatus,
  deleteRepair,
} from '../controllers/repairController.js'
import { authenticateToken, requireAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

// Public route (for customers to submit repair requests)
router.post('/', createRepair)

// Protected/Admin routes
router.get('/', authenticateToken, requireAdmin, getRepairs)
router.get('/:id', authenticateToken, requireAdmin, getRepair)
router.put('/:id', authenticateToken, requireAdmin, updateRepair)
router.patch('/:id/status', authenticateToken, requireAdmin, updateRepairStatus)
router.delete('/:id', authenticateToken, requireAdmin, deleteRepair)

export default router




