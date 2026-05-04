import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Suspense } from 'react'
import FloatingCube from './FloatingCube'

const Scene3D = () => {
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden shadow-soft-lg">
      <Canvas>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <directionalLight position={[-10, -10, -5]} intensity={0.3} />
          
          <FloatingCube position={[0, 0, 0]} />
          <FloatingCube position={[-2, 1, -1]} delay={0.5} />
          <FloatingCube position={[2, -1, -1]} delay={1} />
          
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Scene3D





