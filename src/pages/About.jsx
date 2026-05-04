import { motion } from 'framer-motion'
import ScrollAnimation from '../components/ScrollAnimation'
import FadeIn from '../components/FadeIn'
import { LazyAboutScene } from '../components/Lazy3DScene'
import { SHOP_ADDRESS } from '../constants/address'

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-lavender-50/30 to-white">
      {/* Hero Section with 3D */}
      <section className="section bg-white pt-20">
        <div className="container-custom">
          <FadeIn className="text-center mb-16">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              style={{
                background: 'linear-gradient(135deg, #4c1d95 0%, #6d28d9 50%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              ABOUT US
            </motion.h1>
            <p className="text-xl md:text-2xl text-lavender-700 max-w-3xl mx-auto">
              Your Trusted Electronics Service and Solution Center
            </p>
          </FadeIn>

          {/* Main Content with 3D Objects */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left Side - Text Content */}
            <ScrollAnimation delay={0.02} direction="right">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="card"
                >
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-lavender-800 uppercase">Who We Are</h2>
                  <p className="text-lavender-700 leading-relaxed text-lg">
                    Computer House is a trusted electronics service and solution center providing complete support for computers and electronic devices. We focus on delivering reliable services, quality products, and customer satisfaction under one roof.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.02 }}
                  className="card"
                >
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-lavender-800 uppercase">What We Offer</h2>
                  <p className="text-lavender-700 leading-relaxed text-lg mb-4">
                    We deal in laptops, desktops, mobile devices, CCTV systems, printers, and other electronic accessories. Our services include repairing, upgrading, installation, and maintenance of all major electronic devices.
                  </p>
                  <p className="text-lavender-700 leading-relaxed text-lg">
                    Whether it is a hardware issue or software-related problem, our experienced technicians handle everything with accuracy and care.
                  </p>
                </motion.div>
              </div>
            </ScrollAnimation>

            {/* Right Side - 3D Scene */}
            <ScrollAnimation delay={0.03} direction="left">
              <div className="h-[500px] lg:h-[600px] relative">
                <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-soft-lg">
                  <LazyAboutScene />
                </div>
              </div>
            </ScrollAnimation>
          </div>

          {/* Quality & Solutions Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left - 3D Objects Placeholder */}
            <ScrollAnimation delay={0.04} direction="right">
              <div className="h-[400px] lg:h-[500px] relative">
                <div className="absolute inset-0 bg-gradient-to-br from-lavender-100 to-lavender-50 rounded-3xl p-8 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-6 w-full">
                    <motion.div
                      whileHover={{ scale: 1.1, y: -10 }}
                      className="bg-white rounded-xl p-6 shadow-soft text-center"
                    >
                      <div className="text-5xl mb-3">💻</div>
                      <p className="text-lavender-700 font-semibold">Laptops</p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.1, y: -10 }}
                      className="bg-white rounded-xl p-6 shadow-soft text-center"
                    >
                      <div className="text-5xl mb-3">📱</div>
                      <p className="text-lavender-700 font-semibold">Mobiles</p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.1, y: -10 }}
                      className="bg-white rounded-xl p-6 shadow-soft text-center"
                    >
                      <div className="text-5xl mb-3">📹</div>
                      <p className="text-lavender-700 font-semibold">CCTV</p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.1, y: -10 }}
                      className="bg-white rounded-xl p-6 shadow-soft text-center"
                    >
                      <div className="text-5xl mb-3">🖨️</div>
                      <p className="text-lavender-700 font-semibold">Printers</p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            {/* Right - Text Content */}
            <ScrollAnimation delay={0.05} direction="left">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="card"
                >
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-lavender-800 uppercase">Our Commitment</h2>
                  <p className="text-lavender-700 leading-relaxed text-lg">
                    At Computer House, we believe in providing long-lasting solutions. That's why we use genuine parts, modern tools, and updated technology to ensure the best performance of your devices. Our team carefully understands customer requirements and provides the most suitable solution at an affordable price.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.02 }}
                  className="card"
                >
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-lavender-800 uppercase">On-Site Services</h2>
                  <p className="text-lavender-700 leading-relaxed text-lg">
                    We also offer on-site services, where our technicians visit homes, offices, or shops to provide quick and reliable support. From system upgrades and data recovery to CCTV installation and printer servicing, we cover all technical needs efficiently.
                  </p>
                </motion.div>
              </div>
            </ScrollAnimation>
          </div>

          {/* Mission Section */}
          <ScrollAnimation delay={0.06} direction="up">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="card max-w-4xl mx-auto mb-16"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-lavender-800 text-center uppercase">Our Goal</h2>
              <p className="text-lavender-700 leading-relaxed text-lg text-center">
                Our goal is to become a one-stop destination for all electronics-related services by maintaining transparency, quality service, and customer trust.
              </p>
            </motion.div>
          </ScrollAnimation>

          {/* Animated Address Section */}
          <ScrollAnimation delay={0.07} direction="up">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="bg-gradient-to-r from-lavender-600 to-lavender-700 rounded-3xl p-8 md:p-12 shadow-soft-xl"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.03, type: "spring" }}
                  className="text-5xl mb-6"
                >
                  📍
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.04 }}
                  className="text-2xl md:text-3xl font-bold text-white mb-6"
                >
                  Visit Us
                </motion.h3>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                  className="space-y-2"
                >
                  {SHOP_ADDRESS.formatted.map((line, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.06 + index * 0.01 }}
                      className={`text-lg md:text-xl text-lavender-100 ${index === 0 ? 'text-xl md:text-2xl text-white font-semibold' : ''}`}
                    >
                      {line}
                    </motion.p>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  )
}

export default About

