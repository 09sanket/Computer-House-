import { lazy, Suspense } from 'react'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

// Lazy load 3D scenes
const HeroScene3D = lazy(() => import('../three/HeroScene3D'))
const AboutScene3D = lazy(() => import('../three/AboutScene3D'))
const ServicesScene3D = lazy(() => import('../three/ServicesScene3D'))

const LoadingPlaceholder = () => (
  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-lavender-50 to-lavender-100 rounded-2xl">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-lavender-200 border-t-lavender-600 rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-lavender-600 text-sm">Loading 3D scene...</p>
    </div>
  </div>
)

export const LazyHeroScene = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '200px' })

  return (
    <div ref={ref} className="w-full h-full">
      {isInView ? (
        <Suspense fallback={<LoadingPlaceholder />}>
          <HeroScene3D />
        </Suspense>
      ) : (
        <LoadingPlaceholder />
      )}
    </div>
  )
}

export const LazyAboutScene = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '200px' })

  return (
    <div ref={ref} className="w-full h-full">
      {isInView ? (
        <Suspense fallback={<LoadingPlaceholder />}>
          <AboutScene3D />
        </Suspense>
      ) : (
        <LoadingPlaceholder />
      )}
    </div>
  )
}

export const LazyServicesScene = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '200px' })

  return (
    <div ref={ref} className="w-full h-full">
      {isInView ? (
        <Suspense fallback={<LoadingPlaceholder />}>
          <ServicesScene3D />
        </Suspense>
      ) : (
        <LoadingPlaceholder />
      )}
    </div>
  )
}

