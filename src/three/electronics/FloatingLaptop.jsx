import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'

const FloatingLaptop = ({ position, delay = 0 }) => {
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
      groupRef.current.rotation.y += 0.005
      groupRef.current.rotation.x = Math.sin(time * 0.5 + delay) * 0.1
      groupRef.current.position.x = position[0] + mouse.x * 0.3
      groupRef.current.position.y = position[1] + Math.sin(time + delay) * 0.2 + mouse.y * 0.2
      groupRef.current.position.z = position[2] + Math.cos(time * 0.7 + delay) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Laptop Base - Realistic */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.12, 1.5]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.95}
          roughness={0.05}
        />
      </mesh>
      
      {/* Keyboard Area */}
      <mesh position={[0, 0.06, 0]} castShadow>
        <boxGeometry args={[2, 0.03, 1.3]} />
        <meshStandardMaterial
          color="#0f172a"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Trackpad */}
      <mesh position={[0, 0.06, -0.4]} castShadow>
        <boxGeometry args={[0.4, 0.02, 0.3]} />
        <meshStandardMaterial
          color="#334155"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      
      {/* Screen - Open */}
      <mesh 
        position={[0, 0.9, -0.8]} 
        rotation={[-0.4, 0, 0]}
        castShadow
      >
        <boxGeometry args={[2.2, 1.4, 0.08]} />
        <meshStandardMaterial
          color="#0f172a"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Screen Display - Glowing */}
      <mesh 
        position={[0, 0.9, -0.84]} 
        rotation={[-0.4, 0, 0]}
      >
        <boxGeometry args={[2, 1.2, 0.02]} />
        <meshStandardMaterial
          color="#1e40af"
          emissive="#3b82f6"
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Screen Bezel */}
      <mesh 
        position={[0, 0.9, -0.85]} 
        rotation={[-0.4, 0, 0]}
      >
        <boxGeometry args={[2.15, 1.35, 0.01]} />
        <meshStandardMaterial
          color="#0f172a"
          metalness={0.95}
          roughness={0.05}
        />
      </mesh>
      
      {/* Hinge */}
      <mesh position={[0, 0.12, -0.75]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 2.2, 16]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </group>
  )
}

export default FloatingLaptop

