import mongoose from 'mongoose'

const repairRequestSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    deviceType: {
      type: String,
      required: [true, 'Device type is required'],
      trim: true,
    },
    problemDescription: {
      type: String,
      required: [true, 'Problem description is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
)

const RepairRequest = mongoose.model('RepairRequest', repairRequestSchema)

export default RepairRequest




