import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import api from '../../services/api'
import LoadingSpinner from '../../components/LoadingSpinner'

const Dashboard = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  const [stats, setStats] = useState({
    services: 0,
    products: 0,
    enquiries: 0,
    repairs: 0,
  })

  const [recentEnquiries, setRecentEnquiries] = useState([])

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      // Fetch all data in parallel
      const [servicesRes, productsRes, contactsRes, repairsRes] = await Promise.allSettled([
        api.get('/services'),
        api.get('/products'),
        api.get('/contacts'),
        api.get('/repairs'),
      ])

      const servicesCount = servicesRes.status === 'fulfilled' && servicesRes.value.data.success
        ? servicesRes.value.data.data.length : 0
      const productsCount = productsRes.status === 'fulfilled' && productsRes.value.data.success
        ? productsRes.value.data.data.length : 0
      const contactsCount = contactsRes.status === 'fulfilled' && contactsRes.value.data.success
        ? contactsRes.value.data.data.length : 0
      const repairsCount = repairsRes.status === 'fulfilled' && repairsRes.value.data.success
        ? repairsRes.value.data.data.length : 0

      setStats({
        services: servicesCount,
        products: productsCount,
        enquiries: contactsCount,
        repairs: repairsCount,
      })

      // Get recent contacts (enquiries)
      if (contactsRes.status === 'fulfilled' && contactsRes.value.data.success) {
        const contacts = contactsRes.value.data.data
          .slice(0, 5)
          .map(contact => ({
            id: contact._id || contact.id,
            name: contact.name,
            email: contact.email || 'N/A',
            phone: contact.phone,
            service: 'Contact',
            message: contact.message,
            date: contact.createdAt || contact.date,
            status: 'New',
          }))
        setRecentEnquiries(contacts)
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err)
      // Set default values on error
      setStats({ services: 0, products: 0, enquiries: 0, repairs: 0 })
      setRecentEnquiries([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <LoadingSpinner text="Loading dashboard..." />
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'In Progress':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const statsCards = [
    {
      label: 'Total Services',
      value: stats.services,
      icon: '🛠️',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconBg: 'bg-blue-100',
      change: '+2',
      changeType: 'new',
    },
    {
      label: 'Total Products',
      value: stats.products,
      icon: '📦',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      iconBg: 'bg-purple-100',
      change: '+12',
      changeType: 'new',
    },
    {
      label: 'Total Enquiries',
      value: stats.enquiries,
      icon: '📧',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      iconBg: 'bg-green-100',
      change: '+28',
      changeType: 'new',
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-lavender-200 border-t-lavender-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <motion.div
                  className={`w-14 h-14 ${stat.iconBg} rounded-xl flex items-center justify-center text-3xl`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  {stat.icon}
                </motion.div>
                <motion.span
                  className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                >
                  {stat.change}
                </motion.span>
              </div>
              <motion.h3
                className="text-3xl font-bold text-gray-800 mb-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              >
                {stat.value.toLocaleString()}
              </motion.h3>
              <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
            </div>
            <motion.div
              className={`h-1 bg-gradient-to-r ${stat.color}`}
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.8, delay: index * 0.1 + 0.4 }}
            />
          </motion.div>
        ))}
      </div>

      {/* Recent Enquiries Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Recent Enquiries</h2>
              <p className="text-sm text-gray-600 mt-1">Latest customer enquiries and requests</p>
            </div>
            <motion.button
              onClick={() => navigate('/admin/enquiries')}
              className="px-4 py-2 bg-lavender-600 text-white rounded-lg font-medium hover:bg-lavender-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All
            </motion.button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Message
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
              {recentEnquiries.map((enquiry, index) => (
                <motion.tr
                  key={enquiry.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{enquiry.name}</div>
                      <div className="text-sm text-gray-500">{enquiry.email}</div>
                      <div className="text-xs text-gray-400">{enquiry.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-medium">{enquiry.service}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600 max-w-xs truncate" title={enquiry.message}>
                      {enquiry.message}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">
                      {new Date(enquiry.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <motion.span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(enquiry.status)}`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {enquiry.status}
                    </motion.span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <motion.button
                        className="text-lavender-600 hover:text-lavender-700"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        title="View Details"
                      >
                        👁️
                      </motion.button>
                      <motion.button
                        className="text-green-600 hover:text-green-700"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        title="Contact"
                      >
                        📞
                      </motion.button>
                      <motion.button
                        className="text-blue-600 hover:text-blue-700"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        title="Edit"
                      >
                        ✏️
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {recentEnquiries.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-gray-500">No enquiries found</p>
          </div>
        )}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-white rounded-xl shadow-md p-6"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Add Service', icon: '➕', path: '/admin/services', color: 'bg-blue-500' },
            { label: 'Add Product', icon: '📦', path: '/admin/products', color: 'bg-purple-500' },
            { label: 'View Enquiries', icon: '📧', path: '/admin/enquiries', color: 'bg-green-500' },
            { label: 'Settings', icon: '⚙️', path: '/admin/settings', color: 'bg-orange-500' },
          ].map((action, index) => (
            <motion.button
              key={action.label}
              onClick={() => navigate(action.path)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`${action.color} text-white p-6 rounded-xl flex flex-col items-center justify-center gap-2 hover:shadow-lg transition-shadow`}
            >
              <span className="text-3xl">{action.icon}</span>
              <span className="font-semibold text-sm">{action.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Dashboard
