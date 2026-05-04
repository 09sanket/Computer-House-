import Service from '../models/Service.js'
import mongoose from 'mongoose'

// @desc    Get all services
// @route   GET /api/services
// @access  Public
export const getServices = async (req, res) => {
  try {
    // Check MongoDB connection first
    if (mongoose.connection.readyState !== 1) {
      console.warn('MongoDB not connected. Returning empty services array.')
      return res.status(200).json({
        success: true,
        count: 0,
        data: [],
        message: 'Database not connected. Please configure MongoDB.',
      })
    }

    const { category, status } = req.query
    const filter = {}

    if (category) filter.category = category
    if (status) filter.status = status

    const services = await Service.find(filter).sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    })
  } catch (error) {
    console.error('Get services error:', error)
    
    // Handle timeout errors specifically
    if (error.name === 'MongooseError' && error.message.includes('buffering timed out')) {
      return res.status(503).json({
        success: false,
        message: 'Database connection timeout. Please check MongoDB connection.',
      })
    }
    
    res.status(500).json({
      success: false,
      message: 'Error fetching services',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    })
  }
}

// @desc    Get single service
// @route   GET /api/services/:id
// @access  Public
export const getService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      })
    }

    res.status(200).json({
      success: true,
      data: service,
    })
  } catch (error) {
    console.error('Get service error:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching service',
    })
  }
}

// @desc    Create service
// @route   POST /api/services
// @access  Private/Admin
export const createService = async (req, res) => {
  try {
    const { name, category, description, status } = req.body

    if (!name || !category || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, category, and description',
      })
    }

    const service = await Service.create({
      name,
      category,
      description,
      status: status || 'active',
    })

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: service,
    })
  } catch (error) {
    console.error('Create service error:', error)
    res.status(500).json({
      success: false,
      message: 'Error creating service',
    })
  }
}

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private/Admin
export const updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Service updated successfully',
      data: service,
    })
  } catch (error) {
    console.error('Update service error:', error)
    res.status(500).json({
      success: false,
      message: 'Error updating service',
    })
  }
}

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private/Admin
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id)

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Service deleted successfully',
    })
  } catch (error) {
    console.error('Delete service error:', error)
    res.status(500).json({
      success: false,
      message: 'Error deleting service',
    })
  }
}


