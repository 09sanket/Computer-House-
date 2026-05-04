import { motion } from 'framer-motion'

const LoadingSpinner = ({ size = 'md', text = 'Loading...', fullScreen = false }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  }

  const containerClass = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50'
    : 'flex items-center justify-center p-8'

  return (
    <div className={containerClass}>
      <div className="text-center">
        <motion.div
          className={`${sizeClasses[size]} border-4 border-lavender-200 border-t-lavender-600 rounded-full animate-spin mx-auto mb-4`}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        {text && <p className="text-gray-600 text-sm md:text-base">{text}</p>}
      </div>
    </div>
  )
}

export default LoadingSpinner




