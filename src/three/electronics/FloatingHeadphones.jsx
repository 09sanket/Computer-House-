import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'

const FloatingHeadphones = ({ position, delay = 0 }) => {
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
      groupRef.current.rotation.y += 0.006
      groupRef.current.rotation.z = Math.sin(time * 0.5 + delay) * 0.1
      
      // Optimized parallax
      groupRef.current.position.x = position[0] + mouse.x * -0.2
      groupRef.current.position.y = position[1] + Math.sin(time * 0.7 + delay) * 0.2 + mouse.y * 0.15
      groupRef.current.position.z = position[2] + Math.cos(time * 0.6 + delay) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Left Ear Cup */}
      <mesh position={[-0.4, 0, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.25, 0.15, 32]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Right Ear Cup */}
      <mesh position={[0.4, 0, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.25, 0.15, 32]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Headband */}
      <mesh position={[0, 0.3, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.5, 0.03, 16, 32, Math.PI]} />
        <meshStandardMaterial
          color="#334155"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      
      {/* Left Cushion */}
      <mesh position={[-0.4, 0, 0.08]}>
        <torusGeometry args={[0.2, 0.05, 16, 32]} />
        <meshStandardMaterial
          color="#475569"
          roughness={0.8}
        />
      </mesh>
      
      {/* Right Cushion */}
      <mesh position={[0.4, 0, 0.08]}>
        <torusGeometry args={[0.2, 0.05, 16, 32]} />
        <meshStandardMaterial
          color="#475569"
          roughness={0.8}
        />
      </mesh>
      
      {/* Left Speaker */}
      <mesh position={[-0.4, 0, 0.1]}>
        <cylinderGeometry args={[0.15, 0.15, 0.02, 32]} />
        <meshStandardMaterial
          color="#0f172a"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Right Speaker */}
      <mesh position={[0.4, 0, 0.1]}>
        <cylinderGeometry args={[0.15, 0.15, 0.02, 32]} />
        <meshStandardMaterial
          color="#0f172a"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </group>
  )
}

export default FloatingHeadphones

