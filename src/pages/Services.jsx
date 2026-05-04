import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import FadeIn from '../components/FadeIn'
import { LazyServicesScene } from '../components/Lazy3DScene'

const ServiceCard = ({ service, index }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateY: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : { opacity: 0, y: 50, rotateY: -15 }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      whileHover={{ 
        y: -15,
        rotateY: 5,
        transition: { duration: 0.3 }
      }}
      className="relative group"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="card relative overflow-hidden h-full"
        style={{ willChange: 'transform, box-shadow' }}
        whileHover={{
          boxShadow: '0 25px 70px rgba(124, 58, 237, 0.4)',
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-lavender-50 to-lavender-100/50 opacity-0 group-hover:opacity-100"
          transition={{ duration: 0.4 }}
        />
        
        {/* Gradient accent line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-lavender-500 via-lavender-600 to-lavender-500"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: index * 0.02 + 0.05 }}
        />
        
        <div className="relative z-10 p-6 h-full flex flex-col">
          {/* Icon with 3D effect */}
          <motion.div
            className="text-5xl mb-4 flex justify-center"
            whileHover={{ scale: 1.2, rotate: 360 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {service.icon}
          </motion.div>
          
          {/* Title */}
          <motion.h2
            className="text-xl font-bold mb-3 text-lavender-800"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            {service.title}
          </motion.h2>
          
          {/* Description */}
          {service.description && (
            <p className="text-lavender-600 text-sm mb-4 leading-relaxed">
              {service.description}
            </p>
          )}
          
          {/* Service List */}
          {service.services && (
            <ul className="space-y-2 text-lavender-700 text-sm flex-grow">
              {service.services.map((item, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                      transition={{ duration: 0.2, delay: index * 0.02 + idx * 0.01 }}
                  className="flex items-center"
                >
                  <span className="text-lavender-600 mr-2">✓</span>
                  {item}
                </motion.li>
              ))}
            </ul>
          )}
          
          {/* Additional info */}
          {service.additional && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.02 + 0.08 }}
              className="text-lavender-600 text-xs mt-4 italic"
            >
              {service.additional}
            </motion.p>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

const Services = () => {
  const services = [
    {
      title: 'Repairing Services',
      description: 'Expert repairing services for all major electronic devices. Our technicians ensure accurate diagnosis and reliable repair using quality parts.',
      icon: '🔧',
      services: [
        'Laptop Repairing',
        'Desktop Repairing',
        'Motherboard Repairing',
        'Screen Replacement',
        'Keyboard Replacement',
        'Battery Replacement',
      ],
    },
    {
      title: 'Software Services',
      description: 'Our software services are designed to keep your system fast, secure, and updated.',
      icon: '💻',
      services: [
        'Windows Installation',
        'Software Installation',
        'Virus Removal',
        'System Formatting',
        'Driver Installation',
      ],
    },
    {
      title: 'Upgrade Services',
      description: 'Upgrade your device to improve performance and efficiency.',
      icon: '⚡',
      services: [
        'RAM Upgrade',
        'SSD / HDD Upgrade',
        'Operating System Upgrade',
      ],
      additional: 'These upgrades help increase speed, storage capacity, and overall system life.',
    },
    {
      title: 'Data Services',
      description: 'We provide safe and secure data handling services.',
      icon: '💾',
      services: [
        'Data Backup',
        'Data Recovery',
        'Data Transfer',
      ],
      additional: 'Your important data is handled with complete care and confidentiality.',
    },
    {
      title: 'Other Services',
      description: 'Additional technical and maintenance services:',
      icon: '🛠️',
      services: [
        'Laptop Cleaning (Dust Cleaning)',
        'Annual Maintenance Contract (AMC)',
        'On-site Service (Home / Office Visit)',
        'Laptop Buyback and Exchange',
      ],
    },
    {
      title: 'CCTV Products',
      description: 'Complete range of CCTV products for home, office, and commercial use.',
      icon: '📹',
      services: [
        'CCTV Cameras (Dome & Bullet)',
        'DVR / NVR',
        'CCTV Hard Disk',
        'CCTV Power Adapter',
        'CCTV Cables & Connectors',
      ],
    },
    {
      title: 'Printer Services',
      description: 'Complete printer support under one roof:',
      icon: '🖨️',
      services: [
        'Printer Installation and Setup',
        'Printer Repairing',
        'Cartridge Refilling',
        'Printer Cleaning',
        'Scanner Repair',
      ],
    },
    {
      title: 'CCTV Camera Services',
      description: 'Professional CCTV installation and maintenance services.',
      icon: '📷',
      services: [
        'CCTV Camera Installation',
        'CCTV Repairing',
        'DVR / NVR Setup',
        'Hard Disk Replacement',
        'CCTV Maintenance',
        'Home / Office / Shop CCTV Setup',
      ],
    },
  ]

  const whyChoose = [
    'Experienced technicians',
    'Genuine parts and accessories',
    'Affordable pricing',
    'Fast service support',
    'On-site service available',
    'One-stop solution for all electronics needs',
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-lavender-50/20 to-white">
      {/* Hero Section with 3D */}
      <section className="section pt-20 pb-12 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left - Text */}
            <FadeIn>
              <motion.h1
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                style={{
                  background: 'linear-gradient(135deg, #4c1d95 0%, #6d28d9 50%, #8b5cf6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                OUR SERVICES
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl text-lavender-700 leading-relaxed"
              >
                At Computer House, we provide complete electronics sales, repair, and support services. Our goal is to deliver reliable, affordable, and professional solutions for all your technical needs. Below is a detailed overview of the services we offer.
              </motion.p>
            </FadeIn>

            {/* Right - 3D Scene - Services Related Objects */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-[400px] lg:h-[500px] relative"
              style={{ perspective: '1000px' }}
            >
              <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-soft-lg bg-gradient-to-br from-lavender-50 to-lavender-100/50">
                <LazyServicesScene />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="section py-16">
        <div className="container-custom">
          <FadeIn>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-lavender-600 to-lavender-700 rounded-3xl p-8 md:p-12 shadow-soft-xl"
            >
              <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-bold text-white mb-8 text-center"
              >
                    Why Choose Us?
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {whyChoose.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, x: 10 }}
                    className="flex items-center space-x-3 bg-white/90 rounded-lg p-4 shadow-sm"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 + 0.2, type: "spring" }}
                      className="text-lavender-600 text-xl font-bold"
                    >
                      ✓
                    </motion.div>
                    <span className="text-lavender-700 font-medium">{point}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}

export default Services

