import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'

const FloatingCamera = ({ position, delay = 0 }) => {
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
      groupRef.current.rotation.y += 0.004
      groupRef.current.rotation.x = Math.cos(time * 0.4 + delay) * 0.1
      
      // Optimized parallax
      groupRef.current.position.x = position[0] + mouse.x * 0.2
      groupRef.current.position.y = position[1] + Math.sin(time * 0.6 + delay) * 0.2 + mouse.y * 0.15
      groupRef.current.position.z = position[2] + Math.sin(time * 0.5 + delay) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Camera Body - More Realistic */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.9, 0.65, 0.55]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Camera Body Top */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[0.7, 0.15, 0.5]} />
        <meshStandardMaterial
          color="#0f172a"
          metalness={0.95}
          roughness={0.05}
        />
      </mesh>
      
      {/* Main Lens - Large and Realistic */}
      <mesh position={[0, 0, 0.35]}>
        <cylinderGeometry args={[0.3, 0.28, 0.25, 32]} />
        <meshStandardMaterial
          color="#0f172a"
          metalness={0.95}
          roughness={0.05}
        />
      </mesh>
      
      {/* Lens Glass - Reflective */}
      <mesh position={[0, 0, 0.48]}>
        <cylinderGeometry args={[0.25, 0.25, 0.03, 32]} />
        <meshStandardMaterial
          color="#1e40af"
          emissive="#3b82f6"
          emissiveIntensity={0.3}
          transparent
          opacity={0.9}
          metalness={0.8}
          roughness={0.1}
        />
      </mesh>
      
      {/* Lens Ring */}
      <mesh position={[0, 0, 0.35]}>
        <torusGeometry args={[0.3, 0.02, 16, 32]} />
        <meshStandardMaterial
          color="#334155"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Viewfinder - Realistic */}
      <mesh position={[0, 0.3, 0.25]} castShadow>
        <boxGeometry args={[0.35, 0.12, 0.06]} />
        <meshStandardMaterial
          color="#0f172a"
          metalness={0.85}
          roughness={0.15}
        />
      </mesh>
      
      {/* Viewfinder Glass */}
      <mesh position={[0, 0.3, 0.28]}>
        <boxGeometry args={[0.3, 0.08, 0.01]} />
        <meshStandardMaterial
          color="#1e40af"
          transparent
          opacity={0.6}
        />
      </mesh>
      
      {/* Flash Unit */}
      <mesh position={[0.3, 0.25, 0.25]} castShadow>
        <boxGeometry args={[0.1, 0.08, 0.06]} />
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#f59e0b"
          emissiveIntensity={0.4}
        />
      </mesh>
      
      {/* Mode Dial */}
      <mesh position={[0.35, 0.15, 0.1]}>
        <cylinderGeometry args={[0.08, 0.08, 0.05, 16]} />
        <meshStandardMaterial
          color="#334155"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Grip Texture */}
      <mesh position={[-0.4, -0.1, 0]} castShadow>
        <boxGeometry args={[0.1, 0.4, 0.5]} />
        <meshStandardMaterial
          color="#0f172a"
          metalness={0.7}
          roughness={0.4}
        />
      </mesh>
    </group>
  )
}

export default FloatingCamera

