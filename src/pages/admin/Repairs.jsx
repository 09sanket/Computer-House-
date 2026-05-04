import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import api from '../../services/api'
import { useToast } from '../../hooks/useToast'
import Toast from '../../components/Toast'
import LoadingSpinner from '../../components/LoadingSpinner'

const Repairs = () => {
  const [repairs, setRepairs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [editingRepair, setEditingRepair] = useState(null)
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [submitting, setSubmitting] = useState(false)
  const { toast, showSuccess, showError, hideToast } = useToast()
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    deviceType: '',
    problemDescription: '',
    status: 'Pending',
  })

  const deviceTypes = [
    'Laptop',
    'Desktop',
    'Mobile',
    'Tablet',
    'Camera',
    'Printer',
    'CCTV',
    'Other',
  ]

  const statusOptions = ['Pending', 'In Progress', 'Completed', 'Cancelled']

  useEffect(() => {
    fetchRepairs()
  }, [])

  const fetchRepairs = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await api.get('/repairs')
      if (response.data.success) {
        const formattedRepairs = response.data.data.map(repair => ({
          ...repair,
          id: repair._id || repair.id,
          date: repair.createdAt || repair.date
        }))
        setRepairs(formattedRepairs)
      }
    } catch (err) {
      console.error('Error fetching repairs:', err)
      setError(err.response?.data?.message || 'Failed to load repair requests')
      // Fallback to empty array
      setRepairs([])
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = () => {
    setEditingRepair(null)
    setFormData({
      customerName: '',
      phoneNumber: '',
      deviceType: '',
      problemDescription: '',
      status: 'Pending',
    })
    setShowModal(true)
  }

  const handleEdit = (repair) => {
    setEditingRepair(repair)
    setFormData({
      customerName: repair.customerName,
      phoneNumber: repair.phoneNumber,
      deviceType: repair.deviceType,
      problemDescription: repair.problemDescription,
      status: repair.status,
    })
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this repair request?')) {
      setRepairs(repairs.filter((repair) => repair.id !== id))
    }
  }

  const handleStatusUpdate = (id, newStatus) => {
    setRepairs(
      repairs.map((repair) =>
        repair.id === id ? { ...repair, status: newStatus } : repair
      )
    )
    // Show success notification
    const repair = repairs.find((r) => r.id === id)
    if (repair) {
      alert(`Status updated to "${newStatus}" for ${repair.customerName}'s ${repair.deviceType}`)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      if (!formData.customerName || !formData.phoneNumber || !formData.deviceType || !formData.problemDescription) {
        showError('Please fill in all required fields')
        setSubmitting(false)
        return
      }

      const repairData = {
        customerName: formData.customerName,
        phoneNumber: formData.phoneNumber,
        deviceType: formData.deviceType,
        problemDescription: formData.problemDescription,
        status: formData.status,
      }

      if (editingRepair) {
        // Update existing repair
        const repairId = editingRepair._id || editingRepair.id
        await api.put(`/repairs/${repairId}`, repairData)
        showSuccess('Repair request updated successfully')
      } else {
        // Add new repair
        await api.post('/repairs', repairData)
        showSuccess('Repair request added successfully')
      }

      setShowModal(false)
      setFormData({
        customerName: '',
        phoneNumber: '',
        deviceType: '',
        problemDescription: '',
        status: 'Pending',
      })
      fetchRepairs() // Refresh list
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to save repair request')
    } finally {
      setSubmitting(false)
    }
  }

  const filteredRepairs =
    selectedStatus === 'All'
      ? repairs
      : repairs.filter((repair) => repair.status === selectedStatus)

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'In Progress':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'Cancelled':
        return 'bg-red-100 text-red-700 border-red-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  if (loading) {
    return <LoadingSpinner text="Loading repair requests..." />
  }

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
        duration={toast.duration}
      />

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm"
        >
          {error}
        </motion.div>
      )}
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Repair Requests Management</h1>
          <p className="text-gray-600">Manage all repair requests and track their status</p>
        </div>
        <motion.button
          onClick={handleAdd}
          className="px-6 py-3 bg-gradient-to-r from-lavender-700 to-lavender-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-xl">➕</span>
          <span>Add Request</span>
        </motion.button>
      </motion.div>

      {/* Status Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-xl shadow-md p-4"
      >
        <div className="flex flex-wrap gap-2">
          {['All', ...statusOptions].map((status) => (
            <motion.button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                selectedStatus === status
                  ? 'bg-lavender-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {status}
            </motion.button>
          ))}
        </div>
        <p className="text-sm text-gray-600 mt-3">
          Showing {filteredRepairs.length} request{filteredRepairs.length !== 1 ? 's' : ''} with status{' '}
          {selectedStatus}
        </p>
      </motion.div>

      {/* Repair Requests Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Device Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Problem Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <AnimatePresence>
                {filteredRepairs.map((repair, index) => {
                  const repairId = repair._id || repair.id
                  return (
                    <motion.tr
                    key={repairId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">{repair.customerName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{repair.phoneNumber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 text-xs font-medium bg-lavender-100 text-lavender-700 rounded-full">
                        {repair.deviceType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 max-w-md truncate" title={repair.problemDescription}>
                        {repair.problemDescription}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">
                        {new Date(repair.date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <motion.select
                        value={repair.status}
                        onChange={(e) => handleStatusUpdate(repairId, e.target.value)}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 cursor-pointer transition-all duration-300 hover:shadow-md ${getStatusColor(
                          repair.status
                        )}`}
                        whileHover={{ scale: 1.05 }}
                        whileFocus={{ scale: 1.05 }}
                        title="Click to update status"
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </motion.select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <motion.button
                          onClick={() => handleEdit(repair)}
                          className="text-blue-600 hover:text-blue-700"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          title="Edit"
                        >
                          ✏️
                        </motion.button>
                        <motion.button
                          onClick={() => handleDelete(repairId)}
                          className="text-red-600 hover:text-red-700"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          title="Delete"
                        >
                          🗑️
                        </motion.button>
                        <motion.a
                          href={`tel:${repair.phoneNumber}`}
                          className="text-green-600 hover:text-green-700"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          title="Call Customer"
                        >
                          📞
                        </motion.a>
                      </div>
                    </td>
                  </motion.tr>
                  )
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {filteredRepairs.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-gray-500">No repair requests found with this status</p>
          </div>
        )}
      </motion.div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">
                  {editingRepair ? 'Edit Repair Request' : 'Add New Repair Request'}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    id="customerName"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-transparent transition-all"
                    placeholder="Enter customer name"
                  />
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-transparent transition-all"
                    placeholder="+91 9876543210"
                  />
                </div>

                <div>
                  <label htmlFor="deviceType" className="block text-sm font-medium text-gray-700 mb-2">
                    Device Type *
                  </label>
                  <select
                    id="deviceType"
                    value={formData.deviceType}
                    onChange={(e) => setFormData({ ...formData, deviceType: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select Device Type</option>
                    {deviceTypes.map((device) => (
                      <option key={device} value={device}>
                        {device}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="problemDescription" className="block text-sm font-medium text-gray-700 mb-2">
                    Problem Description *
                  </label>
                  <textarea
                    id="problemDescription"
                    value={formData.problemDescription}
                    onChange={(e) => setFormData({ ...formData, problemDescription: e.target.value })}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-transparent transition-all resize-none"
                    placeholder="Describe the problem in detail..."
                  />
                </div>

                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                    Status *
                  </label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-transparent transition-all"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4">
                  <motion.button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-3 bg-gradient-to-r from-lavender-700 to-lavender-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    whileHover={{ scale: submitting ? 1 : 1.05 }}
                    whileTap={{ scale: submitting ? 1 : 0.95 }}
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <span>{editingRepair ? 'Update Request' : 'Add Request'}</span>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Repairs

