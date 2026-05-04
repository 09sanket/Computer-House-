import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import { Suspense } from 'react'
import RotatingElectronics from './RotatingElectronics'

const AboutScene3D = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true
        }}
        dpr={Math.min(window.devicePixelRatio, 2)}
        performance={{ min: 0.5 }}
        frameloop="always"
      >
        <Suspense fallback={null}>
          {/* Optimized Lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <directionalLight position={[-5, 5, -5]} intensity={0.4} />
          <pointLight position={[0, 10, 0]} intensity={0.5} />
          
          {/* Environment - Lazy loaded */}
          <Environment preset="sunset" />
          
          {/* Rotating Electronics Model */}
          <RotatingElectronics />
          
          {/* Optimized shadows */}
          <ContactShadows
            position={[0, -2, 0]}
            opacity={0.15}
            scale={8}
            blur={1.5}
            far={4}
            resolution={256}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default AboutScene3D

