import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useState, useEffect } from 'react'

const RotatingElectronics = () => {
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
      // Optimized continuous rotation
      groupRef.current.rotation.y += 0.005 + mouse.x * 0.01
      groupRef.current.rotation.x = Math.sin(time * 0.3) * 0.1 + mouse.y * 0.01
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Central Laptop */}
      <group position={[0, 0.5, 0]}>
        {/* Laptop Base */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.5, 0.1, 1]} />
          <meshStandardMaterial
            color="#1e293b"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        
        {/* Laptop Screen */}
        <mesh 
          position={[0, 0.6, -0.5]} 
          rotation={[-0.4, 0, 0]}
          castShadow
        >
          <boxGeometry args={[1.5, 0.9, 0.08]} />
          <meshStandardMaterial
            color="#0f172a"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        
        {/* Screen Display */}
        <mesh 
          position={[0, 0.6, -0.54]} 
          rotation={[-0.4, 0, 0]}
        >
          <boxGeometry args={[1.3, 0.75, 0.02]} />
          <meshStandardMaterial
            color="#3b82f6"
            emissive="#1e40af"
            emissiveIntensity={0.4}
          />
        </mesh>
      </group>

      {/* Orbiting Mobile Phone */}
      <group position={[2, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.3, 0.6, 0.08]} />
          <meshStandardMaterial
            color="#1e293b"
            metalness={0.95}
            roughness={0.05}
          />
        </mesh>
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[0.26, 0.54, 0.02]} />
          <meshStandardMaterial
            color="#0f172a"
            emissive="#1e40af"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>

      {/* Orbiting Camera */}
      <group position={[-2, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.6, 0.45, 0.4]} />
          <meshStandardMaterial
            color="#1e293b"
            metalness={0.85}
            roughness={0.15}
          />
        </mesh>
        <mesh position={[0, 0, 0.25]}>
          <cylinderGeometry args={[0.2, 0.2, 0.15, 32]} />
          <meshStandardMaterial
            color="#0f172a"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </group>

      {/* Orbiting Headphones */}
      <group position={[0, 2, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.2, 0.2, 0.12, 32]} />
          <meshStandardMaterial
            color="#1e293b"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0.35, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.12, 32]} />
          <meshStandardMaterial
            color="#1e293b"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0.175, 0.3, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.4, 0.025, 16, 32, Math.PI]} />
          <meshStandardMaterial
            color="#334155"
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
      </group>
    </group>
  )
}

export default RotatingElectronics

