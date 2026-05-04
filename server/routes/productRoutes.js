import express from 'express'
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js'
import { authenticateToken, requireAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

// Public routes
router.get('/', getProducts)
router.get('/:id', getProduct)

// Protected/Admin routes
router.post('/', authenticateToken, requireAdmin, createProduct)
router.put('/:id', authenticateToken, requireAdmin, updateProduct)
router.delete('/:id', authenticateToken, requireAdmin, deleteProduct)

export default router




