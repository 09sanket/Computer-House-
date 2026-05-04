import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useToast } from '../../hooks/useToast'
import Toast from '../../components/Toast'
import LoadingSpinner from '../../components/LoadingSpinner'
import api from '../../services/api'

const Services = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [editingService, setEditingService] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [submitting, setSubmitting] = useState(false)
  const { toast, showSuccess, showError, hideToast } = useToast()
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    status: 'Active',
  })

  const categories = [
    'Repairing Services',
    'Software Services',
    'Upgrade Services',
    'Data Services',
    'Other Services',
    'CCTV Products',
    'Printer Services',
    'CCTV Camera Services',
    'Mobile Services',
  ]

  const statusOptions = ['Active', 'Inactive', 'Coming Soon']

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await api.get('/services')
      if (response.data.success) {
        const formattedServices = response.data.data.map(service => ({
          ...service,
          id: service._id || service.id,
          status: service.status === 'active' ? 'Active' : service.status === 'inactive' ? 'Inactive' : service.status
        }))
        setServices(formattedServices)
      }
    } catch (err) {
      console.error('Error fetching services:', err)
      setError(err.response?.data?.message || 'Failed to load services')
      // Fallback to empty array if API fails
      setServices([])
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = () => {
    setEditingService(null)
    setFormData({
      name: '',
      category: '',
      description: '',
      status: 'Active',
    })
    setShowModal(true)
  }

  const handleEdit = (service) => {
    setEditingService(service)
    setFormData({
      name: service.name,
      category: service.category,
      description: service.description,
      status: service.status,
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return

    try {
      const serviceId = services.find(s => s.id === id)?._id || id
      await api.delete(`/services/${serviceId}`)
      setServices(services.filter((service) => service.id !== id && service._id !== serviceId))
      showSuccess('Service deleted successfully')
      fetchServices() // Refresh list
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to delete service. Please try again.')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      // Validate form
      if (!formData.name || !formData.category || !formData.description) {
        showError('Please fill in all required fields')
        setSubmitting(false)
        return
      }

      // Simulate API call - Replace with actual API
      await new Promise(resolve => setTimeout(resolve, 300))

      if (editingService) {
        // Update existing service
        setServices(
          services.map((service) =>
            service.id === editingService.id ? { ...editingService, ...formData } : service
          )
        )
        showSuccess('Service updated successfully')
      } else {
        // Add new service
        const newService = {
          id: services.length + 1,
          ...formData,
        }
        setServices([...services, newService])
        showSuccess('Service added successfully')
      }

      setShowModal(false)
      setFormData({
        name: '',
        category: '',
        description: '',
        status: 'Active',
      })
    } catch (err) {
      showError(err.message || 'Failed to save service. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const filteredServices =
    selectedCategory === 'All'
      ? services
      : services.filter((service) => service.category === selectedCategory)

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'Inactive':
        return 'bg-red-100 text-red-700 border-red-200'
      case 'Coming Soon':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  if (loading) {
    return <LoadingSpinner text="Loading services..." />
  }

  return (
    <div className="space-y-4 md:space-y-6">
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
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1 md:mb-2">Services Management</h1>
          <p className="text-sm md:text-base text-gray-600">Manage all your services and categories</p>
        </div>
        <motion.button
          onClick={handleAdd}
          className="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-lavender-700 to-lavender-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-lg md:text-xl">➕</span>
          <span>Add Service</span>
        </motion.button>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-xl shadow-md p-4"
      >
        <div className="flex flex-wrap gap-2">
          {['All', ...categories].map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-lavender-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
        <p className="text-sm text-gray-600 mt-3">
          Showing {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} in{' '}
          {selectedCategory}
        </p>
      </motion.div>

      {/* Services Table - Responsive */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Service Name
                </th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <AnimatePresence>
                {filteredServices.map((service, index) => (
                  <motion.tr
                    key={service.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">{service.name}</div>
                    </td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 text-xs font-medium bg-lavender-100 text-lavender-700 rounded-full">
                        {service.category}
                      </span>
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      <div className="text-sm text-gray-600 max-w-md truncate" title={service.description}>
                        {service.description}
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                      <motion.span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                          service.status
                        )}`}
                        whileHover={{ scale: 1.05 }}
                      >
                        {service.status}
                      </motion.span>
                    </td>
                    <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <motion.button
                          onClick={() => handleEdit(service)}
                          className="text-blue-600 hover:text-blue-700"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          title="Edit"
                        >
                          ✏️
                        </motion.button>
                        <motion.button
                          onClick={() => handleDelete(service.id)}
                          className="text-red-600 hover:text-red-700"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          title="Delete"
                        >
                          🗑️
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-gray-200">
          <AnimatePresence>
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="p-4 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">{service.name}</h3>
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-lavender-100 text-lavender-700 rounded-full mb-2">
                      {service.category}
                    </span>
                    <p className="text-xs text-gray-600 line-clamp-2">{service.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <motion.span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                      service.status
                    )}`}
                  >
                    {service.status}
                  </motion.span>
                  <div className="flex items-center gap-3">
                    <motion.button
                      onClick={() => handleEdit(service)}
                      className="text-blue-600 hover:text-blue-700 text-lg"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      title="Edit"
                    >
                      ✏️
                    </motion.button>
                    <motion.button
                      onClick={() => handleDelete(service.id)}
                      className="text-red-600 hover:text-red-700 text-lg"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      title="Delete"
                    >
                      🗑️
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredServices.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-gray-500">No services found in this category</p>
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
                  {editingService ? 'Edit Service' : 'Add New Service'}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Service Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-transparent transition-all"
                    placeholder="Enter service name"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-transparent transition-all resize-none"
                    placeholder="Enter service description"
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
                      <span>{editingService ? 'Update Service' : 'Add Service'}</span>
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

export default Services

