import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import api from '../../services/api'
import { useToast } from '../../hooks/useToast'
import Toast from '../../components/Toast'
import LoadingSpinner from '../../components/LoadingSpinner'

const Contacts = () => {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedContact, setSelectedContact] = useState(null)
  const [showViewModal, setShowViewModal] = useState(false)
  const { toast, showSuccess, showError, hideToast } = useToast()

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await api.get('/contacts')
      if (response.data.success) {
        const formattedContacts = response.data.data.map(contact => ({
          ...contact,
          id: contact._id || contact.id,
          date: contact.createdAt || contact.date
        }))
        setContacts(formattedContacts)
      }
    } catch (err) {
      console.error('Error fetching contacts:', err)
      setError(err.response?.data?.message || 'Failed to load contacts')
      // Fallback to empty array
      setContacts([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact message?')) return

    try {
      const contactId = contacts.find(c => c.id === id)?._id || id
      await api.delete(`/contacts/${contactId}`)
      setContacts(contacts.filter((contact) => contact.id !== id && contact._id !== contactId))
      if (selectedContact?.id === id || selectedContact?._id === contactId) {
        setShowViewModal(false)
        setSelectedContact(null)
      }
      showSuccess('Contact message deleted successfully')
      fetchContacts() // Refresh list
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to delete contact message')
    }
  }

  const handleView = (contact) => {
    setSelectedContact(contact)
    setShowViewModal(true)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-lavender-200 border-t-lavender-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading contact messages...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Contact Messages</h1>
        <p className="text-gray-600">View and manage all customer contact form submissions</p>
      </motion.div>

      {/* Stats Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-gradient-to-r from-lavender-600 to-lavender-700 rounded-xl shadow-lg p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lavender-200 text-sm mb-1">Total Messages</p>
            <h2 className="text-4xl font-bold">{contacts.length}</h2>
          </div>
          <div className="text-5xl">📧</div>
        </div>
      </motion.div>

      {/* Contact Messages Table */}
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
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Message
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <AnimatePresence>
                {contacts.map((contact, index) => (
                  <motion.tr
                    key={contact.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">{contact.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{contact.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{contact.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 max-w-md truncate" title={contact.message}>
                        {contact.message}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">
                        {new Date(contact.date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <motion.button
                          onClick={() => handleView(contact)}
                          className="text-blue-600 hover:text-blue-700"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          title="View Details"
                        >
                          👁️
                        </motion.button>
                        <motion.a
                          href={`mailto:${contact.email}`}
                          className="text-green-600 hover:text-green-700"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          title="Send Email"
                        >
                          ✉️
                        </motion.a>
                        <motion.a
                          href={`tel:${contact.phone}`}
                          className="text-purple-600 hover:text-purple-700"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          title="Call"
                        >
                          📞
                        </motion.a>
                        <motion.button
                          onClick={() => handleDelete(contact.id)}
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

        {contacts.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-gray-500">No contact messages found</p>
          </div>
        )}
      </motion.div>

      {/* View Message Modal */}
      <AnimatePresence>
        {showViewModal && selectedContact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => {
              setShowViewModal(false)
              setSelectedContact(null)
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">Contact Message Details</h2>
                  <motion.button
                    onClick={() => {
                      setShowViewModal(false)
                      setSelectedContact(null)
                    }}
                    className="text-gray-400 hover:text-gray-600"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    ✕
                  </motion.button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Customer Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">
                      Name
                    </label>
                    <p className="text-lg font-semibold text-gray-900">{selectedContact.name}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">
                      Date
                    </label>
                    <p className="text-lg font-semibold text-gray-900">
                      {new Date(selectedContact.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">
                      Email
                    </label>
                    <a
                      href={`mailto:${selectedContact.email}`}
                      className="text-lg font-semibold text-lavender-600 hover:text-lavender-700 break-all"
                    >
                      {selectedContact.email}
                    </a>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">
                      Phone
                    </label>
                    <a
                      href={`tel:${selectedContact.phone}`}
                      className="text-lg font-semibold text-lavender-600 hover:text-lavender-700"
                    >
                      {selectedContact.phone}
                    </a>
                  </div>
                </div>

                {/* Message */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">
                    Message
                  </label>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {selectedContact.message}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                  <motion.a
                    href={`mailto:${selectedContact.email}?subject=Re: Your Contact Form Submission`}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>✉️</span>
                    <span>Reply via Email</span>
                  </motion.a>
                  <motion.a
                    href={`tel:${selectedContact.phone}`}
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>📞</span>
                    <span>Call Customer</span>
                  </motion.a>
                  <motion.button
                    onClick={() => handleDelete(selectedContact.id)}
                    className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>🗑️</span>
                    <span>Delete</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Contacts

