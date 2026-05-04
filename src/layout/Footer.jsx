import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import logImg from '../assets/log.jpg'

const SocialIcon = ({ icon, href, label, delay = 0, bgColor = 'bg-lavender-50', hoverColor = 'hover:bg-lavender-100' }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0, rotate: -180 }}
      transition={{ duration: 0.5, delay, type: "spring", stiffness: 200 }}
      whileHover={{ 
        scale: 1.2,
        rotate: 360,
        y: -5,
      }}
      whileTap={{ scale: 0.9 }}
      className={`w-12 h-12 flex items-center justify-center rounded-full ${bgColor} text-lavender-600 transition-all duration-300 ${hoverColor} shadow-md hover:shadow-lg`}
    >
      <motion.span 
        className="text-2xl"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
        }}
      >
        {icon}
      </motion.span>
    </motion.a>
  )
}

const ContactIcon = ({ icon, children, href = null, delay = 0 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const content = (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.5, delay }}
      className="flex items-start gap-3 group"
    >
      <motion.div
        className="text-xl text-lavender-600 mt-1"
        whileHover={{ scale: 1.3, rotate: 15 }}
        animate={{
          y: [0, -3, 0],
        }}
        transition={{
          y: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
          scale: {
            duration: 0.3,
          },
          rotate: {
            duration: 0.3,
          },
        }}
      >
        {icon}
      </motion.div>
      <motion.span
        className="text-lavender-600 text-sm leading-relaxed group-hover:text-lavender-700 transition-colors"
        whileHover={{ x: 5 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
    </motion.div>
  )

  if (href) {
    return (
      <motion.a
        href={href}
        className="block"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        {content}
      </motion.a>
    )
  }

  return content
}

const Footer = () => {
  const footerRef = useRef(null)
  const isInView = useInView(footerRef, { once: true, margin: '-100px' })

  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/products', label: 'Products' },
    { path: '/repairs', label: 'Repairs' },
    { path: '/contact', label: 'Contact' },
  ]

  const socialLinks = [
    { icon: '📘', href: 'https://facebook.com', label: 'Facebook', bgColor: 'bg-blue-50', hoverColor: 'hover:bg-blue-100' },
    { icon: '📷', href: 'https://instagram.com', label: 'Instagram', bgColor: 'bg-pink-50', hoverColor: 'hover:bg-pink-100' },
    { icon: '🐦', href: 'https://twitter.com', label: 'Twitter', bgColor: 'bg-sky-50', hoverColor: 'hover:bg-sky-100' },
    { icon: '💼', href: 'https://linkedin.com', label: 'LinkedIn', bgColor: 'bg-blue-50', hoverColor: 'hover:bg-blue-100' },
  ]

  return (
    <motion.footer
      ref={footerRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, type: "spring" }}
      className="bg-gradient-to-b from-white to-lavender-50/30 border-t-2 border-lavender-200 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full opacity-5"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(124, 58, 237, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <div className="container-custom py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <motion.div
            initial={{ opacity: 0, x: -30, scale: 0.9 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -30, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.1, type: "spring" }}
            whileHover={{ scale: 1.02 }}
          >
            <Link to="/" className="inline-block mb-4">
              <motion.div
                className="flex items-center gap-3 mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <motion.img
                  src={logImg}
                  alt="Computer House Logo"
                  className="h-16 w-auto object-contain"
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 10,
                  }}
                  style={{
                    backgroundColor: 'transparent',
                    mixBlendMode: 'normal',
                  }}
                />
                <motion.span
                  className="text-2xl font-bold"
                  style={{
                    background: 'linear-gradient(135deg, #4c1d95 0%, #6d28d9 50%, #8b5cf6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Computer House
                </motion.span>
              </motion.div>
            </Link>
            <motion.p
              className="text-lavender-600 text-sm leading-relaxed mb-6"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Your trusted local electronics solution. We sell and repair all electronics devices with fast and reliable service.
            </motion.p>
            {/* Social Icons */}
            <motion.div
              className="flex gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {socialLinks.map((social, index) => (
                <SocialIcon
                  key={index}
                  icon={social.icon}
                  href={social.href}
                  label={social.label}
                  delay={0.5 + index * 0.1}
                  bgColor={social.bgColor}
                  hoverColor={social.hoverColor}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.h4
              className="font-semibold text-lavender-800 mb-6 text-lg flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.span
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                🔗
              </motion.span>
              Quick Links
            </motion.h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.05, type: "spring" }}
                >
                  <Link
                    to={link.path}
                    className="text-lavender-600 text-sm hover:text-lavender-700 transition-all duration-300 relative group flex items-center gap-2"
                  >
                    <motion.span
                      className="text-lavender-400"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      →
                    </motion.span>
                    <span className="relative">
                      {link.label}
                      <motion.span
                        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-lavender-600 to-lavender-400 rounded-full"
                        initial={{ width: 0 }}
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.h4
              className="font-semibold text-lavender-800 mb-6 text-lg flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                🛠️
              </motion.span>
              Services
            </motion.h4>
            <ul className="space-y-3 text-sm">
              {[
                'Laptop Selling & Repair',
                'Mobile Selling & Repair',
                'Camera Accessories',
                'Electronics Gadgets',
                'Software & Hardware Support',
              ].map((service, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -15 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.05, type: "spring" }}
                  className="flex items-center gap-2 group"
                  whileHover={{ x: 5 }}
                >
                  <motion.span
                    className="text-lavender-500"
                    whileHover={{ scale: 1.3, rotate: 90 }}
                    transition={{ duration: 0.3 }}
                  >
                    ✓
                  </motion.span>
                  <span className="text-lavender-600 group-hover:text-lavender-700 transition-colors">
                    {service}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.4, type: "spring" }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.h4
              className="font-semibold text-lavender-800 mb-6 text-lg flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <motion.span
                animate={{
                  rotate: [0, 15, -15, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                📞
              </motion.span>
              Contact
            </motion.h4>
            <ul className="space-y-4">
              <ContactIcon
                icon="📍"
                delay={0.6}
              >
                New Sarafa Market<br />
                Near Shyam Mall<br />
                Hanuman Chowk<br />
                Balaghat, 481001
              </ContactIcon>
              <ContactIcon
                icon="📞"
                href="tel:7000621188"
                delay={0.7}
              >
                7000621188
              </ContactIcon>
              <ContactIcon
                icon="💬"
                href="https://www.whatsapp.com/business/"
                delay={0.8}
              >
                WhatsApp Business
              </ContactIcon>
              <ContactIcon
                icon="✉️"
                href="mailto:info@computerhouse.com"
                delay={0.9}
              >
                info@computerhouse.com
              </ContactIcon>
            </ul>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.7, type: "spring" }}
          className="pt-8 border-t-2 border-lavender-200 text-center relative"
        >
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-lavender-500 to-transparent"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          />
          <motion.p
            className="text-lavender-600 text-sm mt-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            &copy; {new Date().getFullYear()} Computer House. All rights reserved.
          </motion.p>
          <motion.p
            className="text-lavender-500 text-xs mt-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            Made by Technoskill Coding Community
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer

