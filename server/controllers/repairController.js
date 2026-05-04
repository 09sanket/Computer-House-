import RepairRequest from '../models/RepairRequest.js'
import mongoose from 'mongoose'

// @desc    Get all repair requests
// @route   GET /api/repairs
// @access  Private/Admin
export const getRepairs = async (req, res) => {
  try {
    // Check MongoDB connection first
    if (mongoose.connection.readyState !== 1) {
      console.warn('MongoDB not connected. Returning empty repairs array.')
      return res.status(200).json({
        success: true,
        count: 0,
        data: [],
        message: 'Database not connected. Please configure MongoDB.',
      })
    }

    const { status, deviceType } = req.query
    const filter = {}

    if (status) filter.status = status
    if (deviceType) filter.deviceType = deviceType

    const repairs = await RepairRequest.find(filter).sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: repairs.length,
      data: repairs,
    })
  } catch (error) {
    console.error('Get repairs error:', error)
    
    // Handle timeout errors specifically
    if (error.name === 'MongooseError' && error.message.includes('buffering timed out')) {
      return res.status(503).json({
        success: false,
        message: 'Database connection timeout. Please check MongoDB connection.',
      })
    }
    
    res.status(500).json({
      success: false,
      message: 'Error fetching repair requests',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    })
  }
}

// @desc    Get single repair request
// @route   GET /api/repairs/:id
// @access  Private/Admin
export const getRepair = async (req, res) => {
  try {
    const repair = await RepairRequest.findById(req.params.id)

    if (!repair) {
      return res.status(404).json({
        success: false,
        message: 'Repair request not found',
      })
    }

    res.status(200).json({
      success: true,
      data: repair,
    })
  } catch (error) {
    console.error('Get repair error:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching repair request',
    })
  }
}

// @desc    Create repair request
// @route   POST /api/repairs
// @access  Public
export const createRepair = async (req, res) => {
  try {
    const { customerName, phoneNumber, deviceType, problemDescription, status } = req.body

    if (!customerName || !phoneNumber || !deviceType || !problemDescription) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      })
    }

    const repair = await RepairRequest.create({
      customerName,
      phoneNumber,
      deviceType,
      problemDescription,
      status: status || 'Pending',
    })

    res.status(201).json({
      success: true,
      message: 'Repair request created successfully',
      data: repair,
    })
  } catch (error) {
    console.error('Create repair error:', error)
    res.status(500).json({
      success: false,
      message: 'Error creating repair request',
    })
  }
}

// @desc    Update repair request
// @route   PUT /api/repairs/:id
// @access  Private/Admin
export const updateRepair = async (req, res) => {
  try {
    const repair = await RepairRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )

    if (!repair) {
      return res.status(404).json({
        success: false,
        message: 'Repair request not found',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Repair request updated successfully',
      data: repair,
    })
  } catch (error) {
    console.error('Update repair error:', error)
    res.status(500).json({
      success: false,
      message: 'Error updating repair request',
    })
  }
}

// @desc    Update repair status
// @route   PATCH /api/repairs/:id/status
// @access  Private/Admin
export const updateRepairStatus = async (req, res) => {
  try {
    const { status } = req.body

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Please provide status',
      })
    }

    const validStatuses = ['Pending', 'In Progress', 'Completed', 'Cancelled']
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status',
      })
    }

    const repair = await RepairRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    )

    if (!repair) {
      return res.status(404).json({
        success: false,
        message: 'Repair request not found',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Repair status updated successfully',
      data: repair,
    })
  } catch (error) {
    console.error('Update repair status error:', error)
    res.status(500).json({
      success: false,
      message: 'Error updating repair status',
    })
  }
}

// @desc    Delete repair request
// @route   DELETE /api/repairs/:id
// @access  Private/Admin
export const deleteRepair = async (req, res) => {
  try {
    const repair = await RepairRequest.findByIdAndDelete(req.params.id)

    if (!repair) {
      return res.status(404).json({
        success: false,
        message: 'Repair request not found',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Repair request deleted successfully',
    })
  } catch (error) {
    console.error('Delete repair error:', error)
    res.status(500).json({
      success: false,
      message: 'Error deleting repair request',
    })
  }
}


