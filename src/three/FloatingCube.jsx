import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const FloatingCube = ({ position, delay = 0 }) => {
  const meshRef = useRef(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.y += 0.01
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + delay) * 0.3
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#3b82f6"
        metalness={0.8}
        roughness={0.2}
        emissive="#06b6d4"
        emissiveIntensity={0.2}
      />
    </mesh>
  )
}

export default FloatingCube

