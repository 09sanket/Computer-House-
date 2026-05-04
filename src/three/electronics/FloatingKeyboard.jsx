import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'

const FloatingKeyboard = ({ position, delay = 0 }) => {
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
      groupRef.current.rotation.y += 0.004
      groupRef.current.rotation.z = Math.sin(time * 0.4 + delay) * 0.05
      groupRef.current.position.x = position[0] + mouse.x * 0.2
      groupRef.current.position.y = position[1] + Math.sin(time * 0.7 + delay) * 0.15 + mouse.y * 0.15
      groupRef.current.position.z = position[2] + Math.cos(time * 0.6 + delay) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Keyboard Base */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 0.08, 0.8]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.85}
          roughness={0.15}
        />
      </mesh>
      
      {/* Keyboard Surface */}
      <mesh position={[0, 0.05, 0]} castShadow>
        <boxGeometry args={[2.4, 0.02, 0.75]} />
        <meshStandardMaterial
          color="#0f172a"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Key Rows - Top Row */}
      {[...Array(12)].map((_, i) => (
        <mesh 
          key={`top-${i}`}
          position={[-1 + (i * 0.17), 0.07, 0.25]} 
          castShadow
        >
          <boxGeometry args={[0.15, 0.03, 0.15]} />
          <meshStandardMaterial
            color="#334155"
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
      ))}
      
      {/* Key Rows - Middle Row */}
      {[...Array(12)].map((_, i) => (
        <mesh 
          key={`mid-${i}`}
          position={[-1 + (i * 0.17), 0.07, 0]} 
          castShadow
        >
          <boxGeometry args={[0.15, 0.03, 0.15]} />
          <meshStandardMaterial
            color="#334155"
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
      ))}
      
      {/* Key Rows - Bottom Row */}
      {[...Array(10)].map((_, i) => (
        <mesh 
          key={`bot-${i}`}
          position={[-0.85 + (i * 0.17), 0.07, -0.25]} 
          castShadow
        >
          <boxGeometry args={[0.15, 0.03, 0.15]} />
          <meshStandardMaterial
            color="#334155"
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
      ))}
      
      {/* Space Bar */}
      <mesh position={[0, 0.07, -0.4]} castShadow>
        <boxGeometry args={[1.2, 0.03, 0.2]} />
        <meshStandardMaterial
          color="#475569"
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>
      
      {/* RGB Lighting Effect */}
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[2.3, 0.01, 0.7]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#1e40af"
          emissiveIntensity={0.2}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  )
}

export default FloatingKeyboard





