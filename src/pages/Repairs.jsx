import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import FadeIn from '../components/FadeIn'
import ScrollAnimation from '../components/ScrollAnimation'

const TimelineStep = ({ step, index, isInView }) => {
  return (
    <motion.div
      className="relative flex items-start gap-8 mb-8"
      whileHover={{ x: 10 }}
      transition={{ duration: 0.3 }}
    >
      {/* Animated Timeline Line */}
      {index < 3 && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 0.3, delay: index * 0.02 + 0.03 }}
          className="absolute left-8 top-20 w-1 h-full bg-gradient-to-b from-lavender-400 via-lavender-500 to-lavender-400 origin-top"
          style={{ transformOrigin: 'top' }}
        />
      )}
      
      {/* Step Number Circle - Bigger and More Animated */}
      <motion.div
        initial={{ scale: 0, opacity: 0, rotate: -180 }}
        animate={isInView ? { scale: 1, opacity: 1, rotate: 0 } : { scale: 0, opacity: 0, rotate: -180 }}
        transition={{ duration: 0.6, delay: index * 0.2, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.15, rotate: 360 }}
        className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-lavender-600 to-lavender-700 flex items-center justify-center shadow-soft-xl"
        style={{
          boxShadow: '0 10px 40px rgba(124, 58, 237, 0.4)',
        }}
      >
        <motion.span
          className="text-white font-bold text-xl"
          animate={isInView ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.3, delay: index * 0.02 + 0.03 }}
        >
          {index + 1}
        </motion.span>
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-lavender-400 opacity-0"
          animate={isInView ? { opacity: [0, 0.5, 0] } : {}}
          transition={{ duration: 0.3, delay: index * 0.02 + 0.04, repeat: Infinity, repeatDelay: 2 }}
        />
      </motion.div>
      
      {/* Step Content - Bigger */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
        transition={{ duration: 0.8, delay: index * 0.2 + 0.2 }}
        className="flex-1 pb-16"
      >
        <motion.h3
          className="text-3xl md:text-4xl font-bold mb-4 text-lavender-800"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          {step.title}
        </motion.h3>
        <motion.p
          className="text-lg md:text-xl text-lavender-700 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: index * 0.02 + 0.04 }}
        >
          {step.description}
        </motion.p>
      </motion.div>
    </motion.div>
  )
}

const RepairTypeCard = ({ repair, index }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.85, rotateY: -15 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1, rotateY: 0 } : { opacity: 0, y: 60, scale: 0.85, rotateY: -15 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      whileHover={{ 
        y: -15, 
        scale: 1.03,
        rotateY: 5,
        transition: { duration: 0.3 }
      }}
      className="card shadow-soft-lg relative overflow-hidden h-full"
      style={{ perspective: '1000px' }}
    >
      {/* Animated Gradient accent */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-lavender-500 via-lavender-600 to-lavender-500"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.3, delay: index * 0.02 + 0.03 }}
        style={{ transformOrigin: 'left' }}
      />
      
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-lavender-100/50 to-lavender-200/30 opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Animated Icon - Bigger */}
      <div className="p-8 pb-6 relative">
        <motion.div
          className="text-8xl mb-6 text-center relative z-10"
          animate={isInView ? {
            rotate: [0, 15, -15, 0],
            scale: [1, 1.15, 1],
          } : {}}
          transition={{ duration: 0.3, delay: index * 0.02 + 0.04, ease: "easeInOut" }}
          whileHover={{ 
            rotate: 360,
            scale: 1.3,
            transition: { duration: 0.6 }
          }}
        >
          {repair.icon}
        </motion.div>
        {/* Icon glow */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-32 h-32 bg-lavender-400/30 rounded-full blur-2xl" />
        </motion.div>
      </div>
      
      <div className="px-8 pb-8 relative z-10">
        <motion.h3
          className="text-2xl md:text-3xl font-bold mb-4 text-lavender-800"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          {repair.title}
        </motion.h3>
        <motion.p
          className="text-base md:text-lg text-lavender-700 leading-relaxed mb-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: index * 0.02 + 0.05 }}
        >
          {repair.description}
        </motion.p>
        <ul className="space-y-3">
          {repair.services.map((service, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -15 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }}
              transition={{ duration: 0.3, delay: index * 0.02 + 0.06 + idx * 0.01 }}
              whileHover={{ x: 5, scale: 1.02 }}
              className="text-base text-lavender-700 flex items-center font-medium"
            >
              <motion.span
                className="text-lavender-600 mr-3 text-lg"
                animate={isInView ? { scale: [0, 1.2, 1] } : {}}
                transition={{ duration: 0.2, delay: index * 0.02 + 0.06 + idx * 0.01 }}
              >
                ✓
              </motion.span>
              {service}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

const Repairs = () => {
  const timelineRef = useRef(null)
  const timelineInView = useInView(timelineRef, { once: true, margin: '-100px' })

  const timelineSteps = [
    {
      title: 'Drop Off Your Device',
      description: 'Bring your device to our store or schedule a pickup. Our team will assess the issue and provide a free diagnostic.',
    },
    {
      title: 'Expert Diagnosis',
      description: 'Our certified technicians will thoroughly examine your device, identify the problem, and provide a detailed repair estimate.',
    },
    {
      title: 'Fast & Reliable Repair',
      description: 'We use genuine parts and proven techniques to repair your device quickly and efficiently, ensuring quality workmanship.',
    },
    {
      title: 'Quality Testing & Return',
      description: 'After repair, we test your device thoroughly to ensure everything works perfectly before returning it to you with warranty.',
    },
  ]

  const repairTypes = [
    {
      title: 'Mobile Repair',
      icon: '📱',
      description: 'Professional mobile phone repair services for all major brands including screen replacement, battery issues, and software problems.',
      services: ['Screen Replacement', 'Battery Replacement', 'Charging Port Repair', 'Software Issues', 'Water Damage Repair'],
    },
    {
      title: 'Laptop Repair',
      icon: '💻',
      description: 'Comprehensive laptop repair services covering hardware and software issues for all laptop brands and models.',
      services: ['Screen Replacement', 'Keyboard Repair', 'Battery Issues', 'Motherboard Repair', 'Hardware Upgrades'],
    },
    {
      title: 'Camera Repair',
      icon: '📷',
      description: 'Expert camera repair services for DSLR, mirrorless, and compact cameras including lens and sensor repairs.',
      services: ['Lens Repair', 'Sensor Cleaning', 'Shutter Replacement', 'Battery Issues', 'General Maintenance'],
    },
    {
      title: 'Accessories Repair',
      icon: '🎧',
      description: 'Repair services for all electronics accessories including headphones, chargers, power banks, and more.',
      services: ['Headphone Repair', 'Charger Replacement', 'Cable Repair', 'Power Bank Service', 'Accessory Maintenance'],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-lavender-50/30 to-white">
      {/* Hero Section - Bigger and More Animated */}
      <section className="section pt-24 pb-20 bg-gradient-to-br from-lavender-50/40 via-white to-lavender-100/30 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-20 right-20 w-96 h-96 bg-lavender-200/30 rounded-full mix-blend-multiply filter blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [360, 180, 0],
              x: [0, -40, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute bottom-20 left-20 w-96 h-96 bg-lavender-300/20 rounded-full mix-blend-multiply filter blur-3xl"
          />
        </div>
        
        <div className="container-custom relative z-10">
          <FadeIn className="text-center mb-20">
            <motion.h1
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
              className="mb-6 text-5xl md:text-6xl lg:text-7xl font-bold"
              style={{
                background: 'linear-gradient(135deg, #4c1d95 0%, #6d28d9 50%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              REPAIR & SUPPORT
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl md:text-3xl text-lavender-700 max-w-4xl mx-auto font-semibold mb-6"
            >
              Fast & Reliable Electronics Repair Services
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.04 }}
              className="text-lg md:text-xl text-lavender-600 mt-6 max-w-3xl mx-auto leading-relaxed"
            >
              We repair Mobile, Laptop, Camera, and all Electronics Accessories with expert technicians and genuine parts. Fast turnaround times and quality guaranteed.
            </motion.p>
          </FadeIn>
        </div>
      </section>

      {/* Repair Process Timeline - Bigger and More Animated */}
      <section className="section py-20 bg-white/80 backdrop-blur-sm">
        <div className="container-custom">
          <FadeIn className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-6 text-4xl md:text-5xl lg:text-6xl font-bold text-lavender-800"
            >
              Our Repair Process
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-lavender-600"
            >
              Simple steps to get your device repaired quickly
            </motion.p>
          </FadeIn>

          <div ref={timelineRef} className="max-w-5xl mx-auto">
            {timelineSteps.map((step, index) => (
              <TimelineStep
                key={index}
                step={step}
                index={index}
                isInView={timelineInView}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Repair Types - Bigger Grid */}
      <section className="section py-20 bg-gradient-to-b from-white via-lavender-50/30 to-white">
        <div className="container-custom">
          <FadeIn className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-6 text-4xl md:text-5xl lg:text-6xl font-bold text-lavender-800"
            >
              What We Repair
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-lavender-600"
            >
              Comprehensive repair services for all your electronics
            </motion.p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
            {repairTypes.map((repair, index) => (
              <RepairTypeCard key={index} repair={repair} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Bigger and More Animated */}
      <section className="section py-24 bg-gradient-to-br from-lavender-700 via-lavender-600 to-lavender-800 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          />
        </div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8"
              animate={{
                textShadow: [
                  '0 0 20px rgba(255,255,255,0.3)',
                  '0 0 40px rgba(255,255,255,0.5)',
                  '0 0 20px rgba(255,255,255,0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Ready to Get Your Device Repaired?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-white/95 mb-12 leading-relaxed"
            >
              Fast, reliable, and affordable repair services. Visit us today or contact us for a free quote.
            </motion.p>
            <div className="flex flex-wrap justify-center gap-6">
              <motion.a
                href="/contact"
                className="px-10 py-5 bg-white text-lavender-700 rounded-xl font-bold text-lg shadow-soft-xl hover:bg-lavender-50 transition-colors"
                whileHover={{ 
                  scale: 1.1, 
                  boxShadow: '0 25px 70px rgba(255,255,255,0.4)',
                  y: -5,
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
                style={{
                  boxShadow: '0 15px 50px rgba(0,0,0,0.3)',
                }}
              >
                Contact Us
              </motion.a>
              <motion.a
                href="/services"
                className="px-10 py-5 bg-white/10 backdrop-blur-sm text-white rounded-xl font-bold text-lg shadow-soft-xl border-2 border-white/40"
                whileHover={{ 
                  scale: 1.1, 
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  y: -5,
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                View Services
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Repairs

