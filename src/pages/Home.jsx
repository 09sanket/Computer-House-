import { motion } from 'framer-motion'
import { LazyHeroScene } from '../components/Lazy3DScene'
import ScrollAnimation from '../components/ScrollAnimation'
import FadeIn from '../components/FadeIn'

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Premium 3D Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-lavender-50/30 to-lavender-100/20 min-h-[95vh] flex items-center">
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[42%_5%_48%] gap-0 items-center">
            {/* Content - 42% width, increased background width */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
              className="space-y-6 text-center md:text-left w-full pr-0 md:pr-8"
              style={{
                maxWidth: '100%',
                overflow: 'visible',
              }}
            >
              {/* Main Heading - Computer House Balaghat */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
                className="relative"
                style={{
                  width: '100%',
                  maxWidth: '100%',
                }}
              >
                <motion.h1
                  className="text-[42px] sm:text-[52px] md:text-[62px] lg:text-[58px] xl:text-[76px] font-black leading-[1.2] tracking-tight"
                  style={{
                    background: 'linear-gradient(135deg, #4c1d95 0%, #6d28d9 50%, #8b5cf6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: '0 0 80px rgba(139, 92, 246, 0.3)',
                    width: '100%',
                    maxWidth: '100%',
                    wordBreak: 'normal',
                    overflow: 'visible',
                    letterSpacing: '-0.02em',
                  }}
                >
                  <span className="block whitespace-nowrap" style={{ width: '100%', overflow: 'visible' }}>Computer</span>
                  <span className="block whitespace-nowrap" style={{ width: '100%', overflow: 'visible' }}>House</span>
                </motion.h1>
                
                {/* Balaghat Subtitle */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="mt-2"
                >
                  <span className="text-[28px] sm:text-[32px] md:text-[40px] lg:text-[36px] font-bold text-lavender-700 tracking-wider">
                    Balaghat
                  </span>
                </motion.div>
                
                {/* Decorative underline */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1, delay: 0.7, ease: "easeInOut" }}
                  className="h-1.5 bg-gradient-to-r from-lavender-600 via-lavender-500 to-lavender-400 rounded-full mt-4"
                  style={{ boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)' }}
                />
              </motion.div>
              
              {/* CTA Buttons - Call Us & WhatsApp */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="flex flex-wrap justify-center md:justify-start gap-5 pt-8"
              >
                <motion.a
                  href="tel:7000621188"
                  className="flex items-center justify-center gap-3 px-8 md:px-10 py-4 bg-gradient-to-r from-lavender-700 to-lavender-600 text-white rounded-xl font-semibold text-base md:text-lg shadow-lg relative overflow-hidden group"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 15px 40px rgba(124, 58, 237, 0.5)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3, type: "spring" }}
                >
                  <motion.span 
                    className="text-xl md:text-2xl relative z-10"
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
                  className="flex items-center justify-center gap-3 px-8 md:px-10 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold text-base md:text-lg shadow-lg relative overflow-hidden group"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 15px 40px rgba(16, 185, 129, 0.5)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3, type: "spring" }}
                >
                  <motion.span 
                    className="text-xl md:text-2xl relative z-10"
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
              </motion.div>
            </motion.div>

            {/* Gap divider - 5% space between sections */}
            <div className="hidden lg:block w-full h-px lg:h-full lg:w-px bg-gradient-to-b lg:bg-gradient-to-r from-transparent via-lavender-200 to-transparent opacity-30" />

            {/* 3D Scene - 48% width section, right aligned with wider background shadow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
              className="h-[400px] sm:h-[450px] md:h-[500px] lg:h-[650px] xl:h-[700px] relative w-full overflow-visible flex justify-center lg:justify-end items-center mt-8 lg:mt-0"
              style={{ 
                willChange: 'transform',
                perspective: '1000px',
              }}
            >
              {/* Background shadow - much wider to accommodate object movement */}
              <div 
                className="absolute rounded-2xl opacity-30 blur-2xl"
                style={{
                  background: 'radial-gradient(circle, rgba(196, 181, 253, 0.25) 0%, rgba(139, 92, 246, 0.15) 50%, transparent 75%)',
                  width: '150%',
                  height: '150%',
                  right: '-10%',
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              />
              <div 
                className="w-full h-full relative z-10" 
                style={{ 
                  width: '100%',
                  height: '100%',
                  padding: '15px sm:20px lg:30px',
                  display: 'flex',
                  justifyContent: 'center lg:flex-end',
                  alignItems: 'center',
                  overflow: 'visible',
                }}
              >
                <div style={{ width: '100%', height: '100%', overflow: 'visible', minHeight: '350px' }}>
                  <LazyHeroScene />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
      </section>

      {/* Why Choose Us Section - Comprehensive */}
      <section className="section bg-gradient-to-b from-white to-lightGray-50 py-16">
        <div className="container-custom">
          {/* Main Heading */}
          <FadeIn className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-lavender-800 mb-4 uppercase">
              Why Choose Us
            </h2>
            <p className="text-lg md:text-xl text-lavender-700 max-w-4xl mx-auto leading-relaxed">
              At Computer House, we provide complete electronics solutions under one roof. We focus on quality service, reliable support, and customer satisfaction. From repairing to upgrading and installation, we handle everything professionally.
            </p>
          </FadeIn>

          {/* Services Grid - 9 Cards with equal size */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Repairing Services */}
            <ScrollAnimation delay={0.01} direction="up">
              <div className="card hover:shadow-soft-lg transition-all duration-300 h-full flex flex-col">
                <div className="text-4xl mb-4">🔧</div>
                <h3 className="text-xl font-bold text-lavender-800 mb-3">Repairing Services</h3>
                <p className="text-lavender-600 mb-4 text-sm">Expert repair services for all types of electronic devices:</p>
                <ul className="space-y-2 text-lavender-700 text-sm flex-grow">
                  <li>• Laptop Repairing</li>
                  <li>• Desktop Repairing</li>
                  <li>• Motherboard Repairing</li>
                  <li>• Screen Replacement</li>
                  <li>• Keyboard Replacement</li>
                  <li>• Battery Replacement</li>
                </ul>
                <p className="text-lavender-600 text-sm mt-3 italic">Our technicians ensure accurate diagnosis and long-lasting solutions.</p>
              </div>
            </ScrollAnimation>

            {/* Software Services */}
            <ScrollAnimation delay={0.02} direction="up">
              <div className="card hover:shadow-soft-lg transition-all duration-300 h-full flex flex-col">
                <div className="text-4xl mb-4">💻</div>
                <h3 className="text-xl font-bold text-lavender-800 mb-3">Software Services</h3>
                <p className="text-lavender-600 mb-4 text-sm">Professional software-related services:</p>
                <ul className="space-y-2 text-lavender-700 text-sm flex-grow">
                  <li>• Windows Installation</li>
                  <li>• Software Installation</li>
                  <li>• Virus Removal</li>
                  <li>• System Formatting</li>
                  <li>• Driver Installation</li>
                </ul>
                <p className="text-lavender-600 text-sm mt-3 italic">All services done safely with proper system optimization.</p>
              </div>
            </ScrollAnimation>

            {/* Upgrade Services */}
            <ScrollAnimation delay={0.03} direction="up">
              <div className="card hover:shadow-soft-lg transition-all duration-300 h-full flex flex-col">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-lavender-800 mb-3">Upgrade Services</h3>
                <p className="text-lavender-600 mb-4 text-sm">Improve your device performance:</p>
                <ul className="space-y-2 text-lavender-700 text-sm flex-grow">
                  <li>• RAM Upgrade</li>
                  <li>• SSD / HDD Upgrade</li>
                  <li>• Operating System Upgrade</li>
                </ul>
                <p className="text-lavender-600 text-sm mt-3 italic">Upgrading helps increase speed, storage, and overall performance.</p>
              </div>
            </ScrollAnimation>

            {/* Data Services */}
            <ScrollAnimation delay={0.04} direction="up">
              <div className="card hover:shadow-soft-lg transition-all duration-300 h-full flex flex-col">
                <div className="text-4xl mb-4">💾</div>
                <h3 className="text-xl font-bold text-lavender-800 mb-3">Data Services</h3>
                <p className="text-lavender-600 mb-4 text-sm">We handle data carefully and securely:</p>
                <ul className="space-y-2 text-lavender-700 text-sm flex-grow">
                  <li>• Data Backup</li>
                  <li>• Data Recovery</li>
                  <li>• Data Transfer</li>
                </ul>
                <p className="text-lavender-600 text-sm mt-3 italic">Your important data handled with complete safety and confidentiality.</p>
              </div>
            </ScrollAnimation>

            {/* Other Services */}
            <ScrollAnimation delay={0.05} direction="up">
              <div className="card hover:shadow-soft-lg transition-all duration-300 h-full flex flex-col">
                <div className="text-4xl mb-4">🛠️</div>
                <h3 className="text-xl font-bold text-lavender-800 mb-3">Other Services</h3>
                <p className="text-lavender-600 mb-4 text-sm">Additional technical services:</p>
                <ul className="space-y-2 text-lavender-700 text-sm flex-grow">
                  <li>• Laptop Cleaning (Dust Cleaning)</li>
                  <li>• Annual Maintenance Contract (AMC)</li>
                  <li>• On-site Service (Home / Office Visit)</li>
                  <li>• Laptop Buyback and Exchange</li>
                </ul>
                <p className="text-lavender-600 text-sm mt-3 italic">These services help maintain long-term performance.</p>
              </div>
            </ScrollAnimation>

            {/* CCTV Products */}
            <ScrollAnimation delay={0.06} direction="up">
              <div className="card hover:shadow-soft-lg transition-all duration-300 h-full flex flex-col">
                <div className="text-4xl mb-4">📹</div>
                <h3 className="text-xl font-bold text-lavender-800 mb-3">CCTV Products</h3>
                <p className="text-lavender-600 mb-4 text-sm">Wide range of CCTV products:</p>
                <ul className="space-y-2 text-lavender-700 text-sm flex-grow">
                  <li>• Dome and Bullet Cameras</li>
                  <li>• DVR and NVR</li>
                  <li>• CCTV Hard Disks</li>
                  <li>• Power Adapters and Cables</li>
                </ul>
                <p className="text-lavender-600 text-sm mt-3 italic">Suitable for home, office, and shop security.</p>
              </div>
            </ScrollAnimation>

            {/* Printer Services */}
            <ScrollAnimation delay={0.07} direction="up">
              <div className="card hover:shadow-soft-lg transition-all duration-300 h-full flex flex-col">
                <div className="text-4xl mb-4">🖨️</div>
                <h3 className="text-xl font-bold text-lavender-800 mb-3">Printer Services</h3>
                <p className="text-lavender-600 mb-4 text-sm">Complete printer support:</p>
                <ul className="space-y-2 text-lavender-700 text-sm flex-grow">
                  <li>• Printer Installation and Setup</li>
                  <li>• Printer Repairing</li>
                  <li>• Cartridge Refilling</li>
                  <li>• Printer Cleaning</li>
                  <li>• Scanner Repair</li>
                </ul>
                <p className="text-lavender-600 text-sm mt-3 italic">We support most printer brands and models.</p>
              </div>
            </ScrollAnimation>

            {/* CCTV Camera Services */}
            <ScrollAnimation delay={0.08} direction="up">
              <div className="card hover:shadow-soft-lg transition-all duration-300 h-full flex flex-col">
                <div className="text-4xl mb-4">📷</div>
                <h3 className="text-xl font-bold text-lavender-800 mb-3">CCTV Camera Services</h3>
                <p className="text-lavender-600 mb-4 text-sm">Complete CCTV installation and maintenance:</p>
                <ul className="space-y-2 text-lavender-700 text-sm flex-grow">
                  <li>• CCTV Camera Installation</li>
                  <li>• CCTV Repairing</li>
                  <li>• DVR / NVR Setup</li>
                  <li>• Hard Disk Replacement</li>
                  <li>• CCTV Maintenance</li>
                  <li>• Home, Office, and Shop Setup</li>
                </ul>
                <p className="text-lavender-600 text-sm mt-3 italic">Professional installation and maintenance services.</p>
              </div>
            </ScrollAnimation>

            {/* Mobile Services - 9th Card */}
            <ScrollAnimation delay={0.09} direction="up">
              <div className="card hover:shadow-soft-lg transition-all duration-300 h-full flex flex-col">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="text-xl font-bold text-lavender-800 mb-3">Mobile Services</h3>
                <p className="text-lavender-600 mb-4 text-sm">Complete mobile phone solutions:</p>
                <ul className="space-y-2 text-lavender-700 text-sm flex-grow">
                  <li>• Mobile Phone Repairing</li>
                  <li>• Screen Replacement</li>
                  <li>• Battery Replacement</li>
                  <li>• Software Updates</li>
                  <li>• Data Recovery</li>
                </ul>
                <p className="text-lavender-600 text-sm mt-3 italic">Expert mobile repair and support services.</p>
              </div>
            </ScrollAnimation>
          </div>

          {/* Why Customers Choose Us */}
          <FadeIn className="mt-16">
            <div className="bg-gradient-to-r from-lavender-50 to-lavender-100/50 rounded-2xl p-8 md:p-12 shadow-soft">
                  <h3 className="text-3xl md:text-4xl font-bold text-lavender-800 mb-6 text-center uppercase">
                    Why Customers Choose Us
                  </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  'Experienced and skilled technicians',
                  'Genuine parts and reliable service',
                  'Affordable pricing',
                  'Fast service support',
                  'On-site service availability',
                  'One-stop solution for all electronic needs',
                ].map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center space-x-3 bg-white/80 rounded-lg p-4 shadow-sm"
                  >
                    <div className="text-lavender-600 text-xl">✓</div>
                    <span className="text-lavender-700 font-medium">{point}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}

export default Home

