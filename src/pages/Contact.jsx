import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import FadeIn from '../components/FadeIn'
import ScrollAnimation from '../components/ScrollAnimation'
import { SHOP_ADDRESS } from '../constants/address'
import api from '../services/api'

const AnimatedInput = ({ label, type, name, value, onChange, required = false, rows = null }) => {
  const [isFocused, setIsFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)

  const handleChange = (e) => {
    onChange(e)
    setHasValue(e.target.value.length > 0)
  }

  const handleFocus = () => setIsFocused(true)
  const handleBlur = () => setIsFocused(false)

  const InputComponent = rows ? 'textarea' : 'input'

  return (
    <div className="relative">
      <motion.label
        htmlFor={name}
        className="block text-lavender-700 font-semibold mb-2"
        animate={{
          color: isFocused ? '#7c3aed' : '#5b21b6',
        }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.label>
      <motion.div
        className="relative"
        animate={{
          scale: isFocused ? 1.02 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        <InputComponent
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={required}
          rows={rows}
          className="w-full px-4 py-3 rounded-lg border-2 glass transition-all duration-300 focus:outline-none focus:border-lavender-600 focus:ring-4 focus:ring-lavender-200"
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-lavender-600 rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isFocused ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </div>
  )
}

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitSuccess(false)

    try {
      await api.post('/contacts', {
        name: formData.name,
        phone: formData.phone,
        message: formData.message,
        email: '' // Optional field
      })
      setSubmitSuccess(true)
      setFormData({ name: '', phone: '', message: '' })
      setTimeout(() => setSubmitSuccess(false), 5000)
    } catch (err) {
      console.error('Error submitting contact form:', err)
      alert('Failed to send message. Please try again or call us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const mapRef = useRef(null)
  const mapInView = useInView(mapRef, { once: true, margin: '-100px' })

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-lavender-50/10 to-lightGray-50">
      <div className="container-custom section">
        {/* Header */}
        <FadeIn className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="mb-6 text-4xl md:text-5xl lg:text-6xl font-bold"
            style={{
              background: 'linear-gradient(135deg, #4c1d95 0%, #6d28d9 50%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            CONTACT US
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.03 }}
            className="text-xl md:text-2xl text-lavender-700 max-w-3xl mx-auto leading-relaxed"
          >
            Get in touch with us - we're here to help!
          </motion.p>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100px' }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="h-1.5 bg-gradient-to-r from-lavender-600 via-lavender-500 to-lavender-400 rounded-full mx-auto mt-6"
            style={{ boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)' }}
          />
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-12">
          {/* Contact Form */}
          <ScrollAnimation direction="right" delay={0.2}>
            <motion.div
              initial={{ opacity: 0, x: -50, rotateY: -10 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
              className="glass-card shadow-soft-lg rounded-2xl overflow-hidden"
              whileHover={{ scale: 1.01, y: -5 }}
              style={{ perspective: '1000px' }}
            >
              <motion.h2 
                className="text-2xl md:text-3xl font-bold mb-6 text-lavender-800"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Send us a Message
              </motion.h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <AnimatedInput
                  label="Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <AnimatedInput
                  label="Phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                <AnimatedInput
                  label="Message"
                  type="text"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                />
                <motion.button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 px-6 bg-gradient-to-r from-lavender-700 to-lavender-600 text-white rounded-xl font-semibold text-lg shadow-lg relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ 
                    scale: submitting ? 1 : 1.05,
                    boxShadow: submitting ? 'none' : '0 20px 60px rgba(124, 58, 237, 0.5)',
                  }}
                  whileTap={{ scale: submitting ? 1 : 0.95 }}
                  transition={{ duration: 0.3, type: "spring" }}
                >
                  {submitting ? (
                    <motion.span
                      className="relative z-10 flex items-center justify-center gap-2"
                      initial={{ opacity: 1 }}
                    >
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </motion.span>
                  ) : (
                    <>
                      <motion.span
                        className="relative z-10 flex items-center justify-center gap-2"
                        initial={{ opacity: 1 }}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span>Send Message</span>
                        <motion.span
                          animate={{
                            x: [0, 5, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatDelay: 2,
                          }}
                        >
                          →
                        </motion.span>
                      </motion.span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-lavender-600 to-lavender-500"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </>
                  )}
                </motion.button>
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm text-center"
                  >
                    ✅ Thank you for your message! We will get back to you soon.
                  </motion.div>
                )}
              </form>
            </motion.div>
          </ScrollAnimation>

          {/* Contact Information */}
          <ScrollAnimation direction="left" delay={0.03}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.03 }}
              className="space-y-6"
            >
              {/* Shop Address */}
              <motion.div 
                className="glass-card shadow-soft-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <motion.h2 
                  className="text-2xl font-bold mb-6 text-lavender-800"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Visit Our Shop
                </motion.h2>
                <div className="flex items-start mb-6">
                  <motion.div
                    className="text-4xl mr-4"
                    whileHover={{ scale: 1.3, rotate: 15 }}
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      y: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                      scale: {
                        duration: 0.3,
                        type: "spring",
                      },
                      rotate: {
                        duration: 0.3,
                        type: "spring",
                      },
                    }}
                  >
                    📍
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <h3 className="font-semibold text-lavender-800 mb-2 text-lg">Address</h3>
                    <motion.p 
                      className="text-lavender-700 leading-relaxed"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.03 }}
                    >
                      {SHOP_ADDRESS.formatted.map((line, index) => (
                        <span key={index}>
                          {line}
                          {index < SHOP_ADDRESS.formatted.length - 1 && <br />}
                        </span>
                      ))}
                    </motion.p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Phone & WhatsApp Buttons */}
              <motion.div 
                className="glass-card shadow-soft-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <motion.h3 
                  className="font-semibold text-lavender-800 mb-4 text-lg"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Quick Contact
                </motion.h3>
                <div className="space-y-3">
                  <motion.a
                    href="tel:7000621188"
                    className="flex items-center justify-center gap-3 w-full py-4 px-6 bg-gradient-to-r from-lavender-700 to-lavender-600 text-white rounded-xl font-semibold shadow-lg relative overflow-hidden group"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 15px 40px rgba(124, 58, 237, 0.5)',
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3, type: "spring" }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <motion.span 
                      className="text-2xl relative z-10"
                      animate={{
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                      }}
                    >
                      📞
                    </motion.span>
                    <span className="relative z-10">Call Us: 7000621188</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-lavender-600 to-lavender-500"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                  <motion.a
                    href="https://www.whatsapp.com/business/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full py-4 px-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold shadow-lg relative overflow-hidden group"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 15px 40px rgba(16, 185, 129, 0.5)',
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3, type: "spring" }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <motion.span 
                      className="text-2xl relative z-10"
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                    >
                      💬
                    </motion.span>
                    <span className="relative z-10">WhatsApp Us</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-500"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          </ScrollAnimation>
        </div>

        {/* Google Map Embed */}
        <ScrollAnimation delay={0.05} direction="up">
          <motion.div
            ref={mapRef}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={mapInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.3, delay: 0.05, type: "spring", stiffness: 100 }}
            className="max-w-6xl mx-auto mb-12"
          >
            <motion.div 
              className="glass-card shadow-soft-xl overflow-hidden rounded-2xl"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <motion.h3 
                className="text-2xl md:text-3xl font-bold mb-6 text-lavender-800 px-6 pt-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Find Us on Map
              </motion.h3>
              <div className="relative h-[500px] md:h-[600px] bg-gradient-to-br from-lavender-50 to-lavender-100 overflow-hidden">
                {/* Animated Map Container */}
                <motion.div
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={mapInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.3, delay: 0.07 }}
                  className="absolute inset-0"
                >
                  <iframe
                    src="https://www.google.com/maps?q=New+Sarafa+Market,+Near+Shyam+Mall,+Hanuman+Chowk,+Balaghat,+Madhya+Pradesh+481001&output=embed&z=16"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                    title="Computer House Location - New Sarafa Market, Hanuman Chowk, Balaghat"
                  />
                </motion.div>
                
                {/* Animated Overlay Gradient */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={mapInView ? { opacity: 0 } : { opacity: 0.3 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(124, 58, 237, 0.05) 100%)',
                  }}
                />
              </div>
              
              {/* Address Display Below Map */}
              <motion.div
                className="px-6 pb-6 pt-4 space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.08 }}
              >
                <div className="flex items-center justify-center gap-3 bg-lavender-50/50 rounded-xl p-4">
                  <motion.div
                    className="text-2xl"
                    animate={{
                      y: [0, -3, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    📍
                  </motion.div>
                  <p className="text-lavender-700 font-medium text-center">
                    {SHOP_ADDRESS.full}
                  </p>
                </div>
                <motion.a
                  href="https://www.google.com/maps/dir//Chaturmohta+hospital,+MP+SH+26,+New+sarafa+market,+Hanuman+chowk,+Madhya+Pradesh+481001/@21.807104,80.19968,14z/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x3a2a597cc254eb9b:0xb482ca92998aaac3!2m2!1d80.1932321!2d21.8132988?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 px-6 bg-gradient-to-r from-lavender-600 to-lavender-700 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.09 }}
                >
                  <span>🗺️</span>
                  <span>Get Directions</span>
                </motion.a>
              </motion.div>
            </motion.div>
          </motion.div>
        </ScrollAnimation>
      </div>
    </div>
  )
}

export default Contact

