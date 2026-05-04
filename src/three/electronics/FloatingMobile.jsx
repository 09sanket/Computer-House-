import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'

const FloatingMobile = ({ position, delay = 0 }) => {
  const groupRef = useRef(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime
      // Optimized rotation
      groupRef.current.rotation.y += 0.005
      groupRef.current.rotation.z = Math.sin(time * 0.5 + delay) * 0.1
      
      // Optimized parallax
      groupRef.current.position.x = position[0] + mouse.x * -0.3
      groupRef.current.position.y = position[1] + Math.sin(time * 0.8 + delay) * 0.2 + mouse.y * 0.2
      groupRef.current.position.z = position[2] + Math.cos(time * 0.6 + delay) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Phone Body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.4, 0.8, 0.1]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.95}
          roughness={0.05}
        />
      </mesh>
      
      {/* Screen */}
      <mesh position={[0, 0, 0.06]}>
        <boxGeometry args={[0.36, 0.72, 0.02]} />
        <meshStandardMaterial
          color="#0f172a"
          emissive="#1e40af"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Home Button */}
      <mesh position={[0, -0.32, 0.06]}>
        <cylinderGeometry args={[0.05, 0.05, 0.01, 16]} />
        <meshStandardMaterial
          color="#64748b"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Camera */}
      <mesh position={[0, 0.3, 0.06]}>
        <cylinderGeometry args={[0.02, 0.02, 0.01, 16]} />
        <meshStandardMaterial
          color="#0f172a"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </group>
  )
}

export default FloatingMobile

