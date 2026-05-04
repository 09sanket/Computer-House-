import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'

const FloatingSoundbox = ({ position, delay = 0 }) => {
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
      groupRef.current.rotation.y += 0.006
      groupRef.current.rotation.x = Math.sin(time * 0.5 + delay) * 0.1
      groupRef.current.position.x = position[0] + mouse.x * -0.2
      groupRef.current.position.y = position[1] + Math.sin(time * 0.7 + delay) * 0.2 + mouse.y * 0.15
      groupRef.current.position.z = position[2] + Math.cos(time * 0.6 + delay) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Speaker Box - Left */}
      <mesh position={[-0.5, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.4, 0.5, 0.4]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Speaker Box - Right */}
      <mesh position={[0.5, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.4, 0.5, 0.4]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Speaker Grille - Left */}
      <mesh position={[-0.5, 0, 0.21]}>
        <cylinderGeometry args={[0.18, 0.18, 0.05, 32]} />
        <meshStandardMaterial
          color="#0f172a"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Speaker Grille - Right */}
      <mesh position={[0.5, 0, 0.21]}>
        <cylinderGeometry args={[0.18, 0.18, 0.05, 32]} />
        <meshStandardMaterial
          color="#0f172a"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Speaker Cone - Left */}
      <mesh position={[-0.5, 0, 0.23]}>
        <coneGeometry args={[0.15, 0.08, 16]} />
        <meshStandardMaterial
          color="#475569"
          metalness={0.5}
          roughness={0.6}
        />
      </mesh>
      
      {/* Speaker Cone - Right */}
      <mesh position={[0.5, 0, 0.23]}>
        <coneGeometry args={[0.15, 0.08, 16]} />
        <meshStandardMaterial
          color="#475569"
          metalness={0.5}
          roughness={0.6}
        />
      </mesh>
      
      {/* Control Panel */}
      <mesh position={[0, -0.3, 0.2]} castShadow>
        <boxGeometry args={[0.6, 0.15, 0.1]} />
        <meshStandardMaterial
          color="#0f172a"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Control Buttons */}
      {[...Array(5)].map((_, i) => (
        <mesh 
          key={i}
          position={[-0.2 + (i * 0.1), -0.3, 0.25]} 
          castShadow
        >
          <cylinderGeometry args={[0.02, 0.02, 0.03, 16]} />
          <meshStandardMaterial
            color="#3b82f6"
            emissive="#1e40af"
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
      
      {/* LED Indicator */}
      <mesh position={[0, 0.3, 0.2]}>
        <cylinderGeometry args={[0.03, 0.03, 0.02, 16]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#059669"
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Base Stand */}
      <mesh position={[0, -0.4, 0]} castShadow>
        <boxGeometry args={[1.2, 0.1, 0.5]} />
        <meshStandardMaterial
          color="#334155"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
    </group>
  )
}

export default FloatingSoundbox





