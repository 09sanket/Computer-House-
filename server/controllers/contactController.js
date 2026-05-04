import Contact from '../models/Contact.js'
import mongoose from 'mongoose'

// @desc    Get all contacts
// @route   GET /api/contacts
// @access  Private/Admin
export const getContacts = async (req, res) => {
  try {
    // Check MongoDB connection first
    if (mongoose.connection.readyState !== 1) {
      console.warn('MongoDB not connected. Returning empty contacts array.')
      return res.status(200).json({
        success: true,
        count: 0,
        data: [],
        message: 'Database not connected. Please configure MongoDB.',
      })
    }

    const { isRead } = req.query
    const filter = {}

    if (isRead !== undefined) filter.isRead = isRead === 'true'

    const contacts = await Contact.find(filter).sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    })
  } catch (error) {
    console.error('Get contacts error:', error)
    
    // Handle timeout errors specifically
    if (error.name === 'MongooseError' && error.message.includes('buffering timed out')) {
      return res.status(503).json({
        success: false,
        message: 'Database connection timeout. Please check MongoDB connection.',
      })
    }
    
    res.status(500).json({
      success: false,
      message: 'Error fetching contacts',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    })
  }
}

// @desc    Get single contact
// @route   GET /api/contacts/:id
// @access  Private/Admin
export const getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      })
    }

    // Mark as read when viewed
    if (!contact.isRead) {
      contact.isRead = true
      await contact.save()
    }

    res.status(200).json({
      success: true,
      data: contact,
    })
  } catch (error) {
    console.error('Get contact error:', error)
    res.status(500).json({
      success: false,
      message: 'Error fetching contact',
    })
  }
}

// @desc    Create contact
// @route   POST /api/contacts
// @access  Public
export const createContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body

    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      })
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      message,
    })

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: contact,
    })
  } catch (error) {
    console.error('Create contact error:', error)
    res.status(500).json({
      success: false,
      message: 'Error submitting contact form',
    })
  }
}

// @desc    Update contact
// @route   PUT /api/contacts/:id
// @access  Private/Admin
export const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Contact updated successfully',
      data: contact,
    })
  } catch (error) {
    console.error('Update contact error:', error)
    res.status(500).json({
      success: false,
      message: 'Error updating contact',
    })
  }
}

// @desc    Mark contact as read/unread
// @route   PATCH /api/contacts/:id/read
// @access  Private/Admin
export const markAsRead = async (req, res) => {
  try {
    const { isRead } = req.body

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: isRead !== false },
      {
        new: true,
      }
    )

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Contact status updated successfully',
      data: contact,
    })
  } catch (error) {
    console.error('Mark as read error:', error)
    res.status(500).json({
      success: false,
      message: 'Error updating contact status',
    })
  }
}

// @desc    Delete contact
// @route   DELETE /api/contacts/:id
// @access  Private/Admin
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id)

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully',
    })
  } catch (error) {
    console.error('Delete contact error:', error)
    res.status(500).json({
      success: false,
      message: 'Error deleting contact',
    })
  }
}


