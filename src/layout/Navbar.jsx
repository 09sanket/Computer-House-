import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import logImg from '../assets/log.jpg'

const Navbar = () => {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  // Scroll spy to detect active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'products', 'repairs', 'contact']
      const scrollPosition = window.scrollY + 150 // Offset for navbar

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { path: '/', label: 'Home', section: 'home' },
    { path: '/about', label: 'About', section: 'about' },
    { path: '/services', label: 'Services', section: 'services' },
    { path: '/products', label: 'Products', section: 'products' },
    { path: '/repairs', label: 'Repairs', section: 'repairs' },
    { path: '/contact', label: 'Contact', section: 'contact' },
  ]

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80 // Navbar height offset
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const handleNavClick = (e, link) => {
    e.preventDefault()
    if (link.section) {
      scrollToSection(link.section)
    } else {
      // Fallback to routing if no section
      window.location.href = link.path
    }
  }

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const mobileItemVariants = {
    closed: {
      opacity: 0,
      x: -20,
    },
    open: {
      opacity: 1,
      x: 0,
    },
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm"
      style={{ 
        willChange: 'transform, opacity',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05)',
      }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Bigger size, no background */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Link to="/" className="flex items-center space-x-3">
              <motion.img 
                src={logImg} 
                alt="Computer House Logo" 
                className="h-12 md:h-14 lg:h-16 w-auto object-contain"
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5,
                }}
                transition={{ duration: 0.3 }}
                style={{
                  backgroundColor: 'transparent',
                  mixBlendMode: 'normal',
                }}
              />
              <span 
                className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-normal text-lavender-800 hidden sm:block"
                style={{
                  fontFamily: "'Dancing Script', 'Playfair Display', cursive",
                  letterSpacing: '0.5px',
                }}
              >
                Computer House
              </span>
            </Link>
          </motion.div>

          {/* Desktop Menu - Clean and professional */}
          <div className="hidden md:flex items-center space-x-0.5 lg:space-x-1">
            {navLinks.map((link) => {
              const isActive = (location.pathname === '/' && activeSection === link.section) ||
                (location.pathname === link.path && link.section !== 'home')
              return (
                <a
                  key={link.path}
                  href={`#${link.section}`}
                  onClick={(e) => handleNavClick(e, link)}
                  className="relative px-2 md:px-3 lg:px-4 py-2 group cursor-pointer"
                >
                  <motion.span
                    className={`block transition-colors duration-200 text-xs md:text-sm lg:text-base ${
                      isActive
                        ? 'text-lavender-700 font-semibold'
                        : 'text-lavender-600 group-hover:text-lavender-700'
                    }`}
                    style={{
                      fontFamily: "'Inter', 'Montserrat', sans-serif",
                      fontWeight: isActive ? 600 : 400,
                      letterSpacing: '0.2px',
                    }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.label}
                  </motion.span>
                  
                  {/* Active underline */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-lavender-600 rounded-full"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  
                  {/* Hover underline */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-lavender-500 rounded-full"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{ opacity: isActive ? 0 : 1 }}
                  />
                    </a>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-lavender-700 focus:outline-none p-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
            aria-label="Toggle menu"
          >
            <motion.svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={isOpen ? { rotate: 90 } : { rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? (
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3 }}
                />
              ) : (
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.svg>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden mt-4 space-y-2 overflow-hidden"
            >
              {navLinks.map((link, index) => {
                const isActive = (location.pathname === '/' && activeSection === link.section) ||
                  (location.pathname === link.path && link.section !== 'home')
                return (
                  <motion.div
                    key={link.path}
                    variants={mobileItemVariants}
                    transition={{ duration: 0.3 }}
                  >
                    <a
                      href={`#${link.section}`}
                      onClick={(e) => {
                        handleNavClick(e, link)
                        setIsOpen(false)
                      }}
                      className={`block px-4 py-3 rounded-lg transition-all duration-300 relative ${
                        isActive
                          ? 'bg-lavender-700 text-white shadow-soft'
                          : 'text-lavender-700 hover:bg-lavender-50 hover:text-lavender-600'
                      }`}
                    >
                      <motion.span
                        className="block"
                        style={{
                          fontFamily: "'Inter', 'Montserrat', sans-serif",
                          fontWeight: isActive ? 500 : 400,
                          letterSpacing: '0.3px',
                        }}
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {link.label}
                      </motion.span>
                      {isActive && (
                        <motion.div
                          layoutId="mobileActiveIndicator"
                          className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"
                          initial={false}
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </a>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

export default Navbar

