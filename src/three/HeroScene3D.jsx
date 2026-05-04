import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import { Suspense } from 'react'
import FloatingLaptop from './electronics/FloatingLaptop'
import FloatingCamera from './electronics/FloatingCamera'
import FloatingKeyboard from './electronics/FloatingKeyboard'
import FloatingSoundbox from './electronics/FloatingSoundbox'

const HeroScene3D = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [-2.5, 0, 8], fov: 50 }}
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
          
          {/* Realistic 3D Electronics - Spread out more for better spacing */}
          <FloatingLaptop position={[-1.5, 1, 0]} delay={0} />
          <FloatingCamera position={[3.5, 1.2, 0]} delay={0.3} />
          <FloatingKeyboard position={[-0.5, -1.8, 1.5]} delay={0.6} />
          <FloatingSoundbox position={[3, -1.8, 1.5]} delay={0.9} />
          
          {/* Optimized shadows */}
          <ContactShadows
            position={[0, -2.5, 0]}
            opacity={0.2}
            scale={10}
            blur={1.5}
            far={4}
            resolution={256}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default HeroScene3D

