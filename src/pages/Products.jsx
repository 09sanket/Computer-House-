import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import FadeIn from '../components/FadeIn'
import api from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'

const ProductCard = ({ product, index }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateXValue = (y - centerY) / 10
    const rotateYValue = (centerX - x) / 10
    
    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.01 }}
      layout
      className="h-full"
    >
      <motion.div
        className="glass-card shadow-soft relative overflow-hidden h-full cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px',
          willChange: 'transform',
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <motion.div
          style={{
            rotateX: rotateX,
            rotateY: rotateY,
            transformStyle: 'preserve-3d',
          }}
          transition={{ duration: 0.1 }}
        >
          {/* Gradient accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-lavender-600" />
          
          {/* Product Icon with Advanced Animation */}
          <div className="p-6 pb-4 relative">
            <motion.div
              className="text-7xl mb-4 text-center relative z-10"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              {product.icon}
            </motion.div>
            {/* Glow effect behind icon */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-24 h-24 bg-lavender-400/20 rounded-full blur-xl" />
            </motion.div>
          </div>
          
          {/* Product Info */}
          <div className="px-6 pb-6">
            <div className="mb-2">
              <span className="text-xs text-lavender-600 font-semibold uppercase tracking-wide">
                {product.category}
              </span>
            </div>
            <h2 className="text-xl font-bold mb-3 text-lavender-800">
              {product.name}
            </h2>
            <p className="text-lavender-600 text-sm mb-4 line-clamp-2">
              {product.description}
            </p>
            <div className="text-2xl font-bold text-lavender-700 mb-4">
              {product.price}
            </div>
            <motion.button
              className="w-full py-2 px-4 bg-lavender-700 text-white rounded-lg font-semibold text-sm hover:bg-lavender-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              View Details
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const categories = [
    'All',
    'Laptops',
    'Mobiles',
    'Cameras',
    'Printers',
    'Mobile Accessories',
    'Computer Accessories',
    'Other Electronics',
  ]

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await api.get('/products')
      if (response.data.success) {
        // Format products for display
        const formattedProducts = response.data.data.map(product => ({
          ...product,
          price: product.price.toString().includes('₹') 
            ? product.price 
            : `₹${product.price.toLocaleString('en-IN')}`,
          icon: product.image || product.icon || '📦',
          name: product.name,
          category: product.category,
          description: product.description || ''
        }))
        setProducts(formattedProducts)
      }
    } catch (err) {
      // Only log network errors in development
      if (err.code !== 'ERR_NETWORK') {
        console.error('Error fetching products:', err)
      }
      // Fallback to mock data if API fails
      const mockProducts = [
    // Laptops - 2 MacBook + 4 Windows (6 total)
    {
      name: 'MacBook Pro 16"',
      category: 'Laptops',
      price: '₹1,99,999',
      description: 'Apple M2 Pro chip, 16GB RAM, 512GB SSD. Professional performance for creators.',
      icon: '💻'
    },
    {
      name: 'MacBook Air M2',
      category: 'Laptops',
      price: '₹1,24,999',
      description: 'Apple M2 chip, 8GB RAM, 256GB SSD. Ultra-thin and lightweight design.',
      icon: '💻'
    },
    {
      name: 'Dell XPS 15',
      category: 'Laptops',
      price: '₹1,49,999',
      description: 'Intel i7, 16GB RAM, 512GB SSD, RTX 3050. Premium Windows laptop.',
      icon: '💻'
    },
    {
      name: 'HP Pavilion 15',
      category: 'Laptops',
      price: '₹64,999',
      description: 'AMD Ryzen 7, 16GB RAM, 512GB SSD. Perfect for work and entertainment.',
      icon: '💻'
    },
    {
      name: 'Lenovo ThinkPad E14',
      category: 'Laptops',
      price: '₹59,999',
      description: 'Intel i5, 8GB RAM, 256GB SSD. Business-class reliability and performance.',
      icon: '💻'
    },
    {
      name: 'ASUS VivoBook 15',
      category: 'Laptops',
      price: '₹54,999',
      description: 'AMD Ryzen 5, 8GB RAM, 512GB SSD. Stylish and affordable everyday laptop.',
      icon: '💻'
    },
    // Mobiles - 2 iPhone + 4 Android (6 total)
    {
      name: 'iPhone 15 Pro Max',
      category: 'Mobiles',
      price: '₹1,39,900',
      description: 'A17 Pro chip, 256GB storage, Pro camera system. Latest flagship iPhone.',
      icon: '📱'
    },
    {
      name: 'iPhone 14',
      category: 'Mobiles',
      price: '₹79,900',
      description: 'A15 Bionic chip, 128GB storage, Dual camera. Premium iPhone experience.',
      icon: '📱'
    },
    {
      name: 'Samsung Galaxy S24 Ultra',
      category: 'Mobiles',
      price: '₹1,24,999',
      description: 'Snapdragon 8 Gen 3, 256GB, 200MP camera. Ultimate Android flagship.',
      icon: '📱'
    },
    {
      name: 'OnePlus 12',
      category: 'Mobiles',
      price: '₹64,999',
      description: 'Snapdragon 8 Gen 3, 256GB, 50MP camera. Fast charging and smooth performance.',
      icon: '📱'
    },
    {
      name: 'Xiaomi 14 Pro',
      category: 'Mobiles',
      price: '₹79,999',
      description: 'Snapdragon 8 Gen 3, 256GB, Leica camera. Premium photography smartphone.',
      icon: '📱'
    },
    {
      name: 'Realme GT 6',
      category: 'Mobiles',
      price: '₹39,999',
      description: 'Snapdragon 8s Gen 3, 256GB, 120W fast charging. Gaming powerhouse.',
      icon: '📱'
    },
    // Cameras - 6 products
    {
      name: 'Canon EOS R6 Mark II',
      category: 'Cameras',
      price: '₹2,19,999',
      description: '24MP full-frame mirrorless, 4K video, advanced autofocus system.',
      icon: '📷'
    },
    {
      name: 'Nikon D850',
      category: 'Cameras',
      price: '₹2,49,999',
      description: '45.7MP DSLR, 4K video, professional photography camera.',
      icon: '📷'
    },
    {
      name: 'Sony Alpha A7 IV',
      category: 'Cameras',
      price: '₹1,99,999',
      description: '33MP full-frame mirrorless, 4K 60p, real-time tracking autofocus.',
      icon: '📷'
    },
    {
      name: 'Fujifilm X-T5',
      category: 'Cameras',
      price: '₹1,49,999',
      description: '40MP APS-C sensor, 6K video, classic film simulation modes.',
      icon: '📷'
    },
    {
      name: 'GoPro Hero 12',
      category: 'Cameras',
      price: '₹44,999',
      description: '5.3K video, waterproof, action camera for adventures.',
      icon: '📷'
    },
    {
      name: 'DJI Mini 4 Pro',
      category: 'Cameras',
      price: '₹1,24,999',
      description: '4K drone camera, obstacle avoidance, 34-min flight time.',
      icon: '📷'
    },
    // Printers - 6 products
    {
      name: 'HP LaserJet Pro',
      category: 'Printers',
      price: '₹24,999',
      description: 'Laser printer, fast printing, wireless connectivity, office-ready.',
      icon: '🖨️'
    },
    {
      name: 'Canon PIXMA G3010',
      category: 'Printers',
      price: '₹18,999',
      description: 'Inkjet printer, ink tank system, wireless printing, economical.',
      icon: '🖨️'
    },
    {
      name: 'Epson EcoTank L3250',
      category: 'Printers',
      price: '₹16,999',
      description: 'All-in-one inkjet, refillable ink tanks, wireless printing.',
      icon: '🖨️'
    },
    {
      name: 'Brother DCP-L2550DW',
      category: 'Printers',
      price: '₹22,999',
      description: 'Laser all-in-one, duplex printing, wireless, compact design.',
      icon: '🖨️'
    },
    {
      name: 'HP DeskJet 4155e',
      category: 'Printers',
      price: '₹12,999',
      description: 'Compact all-in-one, wireless printing, mobile printing support.',
      icon: '🖨️'
    },
    {
      name: 'Canon imageCLASS MF445dw',
      category: 'Printers',
      price: '₹34,999',
      description: 'Laser multifunction, fast printing, network connectivity, office use.',
      icon: '🖨️'
    },
    // Mobile Accessories - 6 products
    {
      name: 'AirPods Pro 2',
      category: 'Mobile Accessories',
      price: '₹24,900',
      description: 'Active noise cancellation, spatial audio, MagSafe charging case.',
      icon: '🎧'
    },
    {
      name: 'Samsung Galaxy Buds2 Pro',
      category: 'Mobile Accessories',
      price: '₹19,999',
      description: 'Active noise cancellation, 360 audio, IPX7 water resistance.',
      icon: '🎧'
    },
    {
      name: 'Anker Power Bank 20000mAh',
      category: 'Mobile Accessories',
      price: '₹2,999',
      description: 'High capacity, fast charging, USB-C and USB-A ports.',
      icon: '🔋'
    },
    {
      name: 'Spigen Phone Case',
      category: 'Mobile Accessories',
      price: '₹1,299',
      description: 'Shockproof protection, clear design, wireless charging compatible.',
      icon: '📱'
    },
    {
      name: 'Belkin Wireless Charger',
      category: 'Mobile Accessories',
      price: '₹2,499',
      description: '15W fast wireless charging, compatible with all phones.',
      icon: '⚡'
    },
    {
      name: 'Sony WH-1000XM5',
      category: 'Mobile Accessories',
      price: '₹34,990',
      description: 'Premium noise cancellation, 30hr battery, exceptional sound quality.',
      icon: '🎧'
    },
    // Computer Accessories - 6 products
    {
      name: 'Logitech MX Master 3S',
      category: 'Computer Accessories',
      price: '₹9,995',
      description: 'Wireless mouse, precision tracking, ergonomic design, multi-device.',
      icon: '🖱️'
    },
    {
      name: 'Corsair K70 RGB',
      category: 'Computer Accessories',
      price: '₹14,999',
      description: 'Mechanical keyboard, RGB lighting, Cherry MX switches, gaming ready.',
      icon: '⌨️'
    },
    {
      name: 'Samsung 27" 4K Monitor',
      category: 'Computer Accessories',
      price: '₹24,999',
      description: '4K UHD display, HDR10, USB-C connectivity, professional monitor.',
      icon: '🖥️'
    },
    {
      name: 'WD Black SN850X SSD 1TB',
      category: 'Computer Accessories',
      price: '₹8,999',
      description: 'NVMe SSD, 7300MB/s read speed, gaming and professional storage.',
      icon: '💾'
    },
    {
      name: 'Logitech C920 HD Webcam',
      category: 'Computer Accessories',
      price: '₹6,499',
      description: '1080p HD video, autofocus, stereo audio, perfect for video calls.',
      icon: '📹'
    },
    {
      name: 'Anker USB-C Hub',
      category: 'Computer Accessories',
      price: '₹3,999',
      description: '7-in-1 hub, HDMI, USB 3.0, SD card reader, USB-C power delivery.',
      icon: '🔌'
    },
    // Other Electronics - 6 products
    {
      name: 'Apple Watch Series 9',
      category: 'Other Electronics',
      price: '₹41,900',
      description: 'S9 chip, always-on display, health tracking, GPS, cellular option.',
      icon: '⌚'
    },
    {
      name: 'iPad Air M2',
      category: 'Other Electronics',
      price: '₹59,900',
      description: 'M2 chip, 11" display, Apple Pencil support, versatile tablet.',
      icon: '📱'
    },
    {
      name: 'JBL Flip 6 Speaker',
      category: 'Other Electronics',
      price: '₹8,999',
      description: 'Portable Bluetooth speaker, waterproof, 12-hour battery, powerful sound.',
      icon: '🔊'
    },
    {
      name: 'Sony WH-1000XM4',
      category: 'Other Electronics',
      price: '₹29,990',
      description: 'Noise cancelling headphones, 30hr battery, premium audio quality.',
      icon: '🎧'
    },
    {
      name: 'Kindle Paperwhite',
      category: 'Other Electronics',
      price: '₹13,999',
      description: '6.8" e-reader, waterproof, adjustable warm light, 10-week battery.',
      icon: '📖'
    },
    {
      name: 'DJI Mini 3',
      category: 'Other Electronics',
      price: '₹79,999',
      description: '4K drone, 3-axis gimbal, 38-min flight, lightweight and portable.',
      icon: '🚁'
    }
      ]
      setProducts(mockProducts)
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category === selectedCategory)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-lavender-200 border-t-lavender-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-lavender-50/20 to-white">
      <div className="container-custom py-16">
        <FadeIn className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{
              background: 'linear-gradient(135deg, #4c1d95 0%, #6d28d9 50%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
                OUR PRODUCTS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.02 }}
            className="text-xl md:text-2xl text-lavender-700"
          >
            Explore our wide range of electronics and accessories
          </motion.p>
        </FadeIn>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-lavender-700 text-white shadow-soft-lg'
                  : 'glass text-lavender-700 hover:bg-lavender-50 border border-lavender-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Category Info */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <p className="text-lavender-600 text-lg">
            Showing <span className="font-bold text-lavender-700">{filteredProducts.length}</span> products
            {selectedCategory !== 'All' && (
              <span> in <span className="font-bold text-lavender-700">{selectedCategory}</span></span>
            )}
          </p>
        </motion.div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProducts.map((product, index) => (
              <ProductCard key={`${product.name}-${index}`} product={product} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <p className="text-lavender-600 text-lg">No products found in this category.</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Products

