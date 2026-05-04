import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import { Suspense } from 'react'
import FloatingLaptop from './electronics/FloatingLaptop'
import FloatingMobile from './electronics/FloatingMobile'
import FloatingCamera from './electronics/FloatingCamera'
import FloatingHeadphones from './electronics/FloatingHeadphones'

import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'

// Printer 3D Model
const FloatingPrinter = ({ position, delay = 0 }) => {
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
      groupRef.current.rotation.y += 0.003
      groupRef.current.rotation.x = Math.sin(time * 0.5 + delay) * 0.08
      groupRef.current.position.x = position[0] + mouse.x * 0.2
      groupRef.current.position.y = position[1] + Math.sin(time * 0.8 + delay) * 0.15 + mouse.y * 0.15
      groupRef.current.position.z = position[2] + Math.cos(time * 0.6 + delay) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Printer Base */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.8, 1.2]} />
        <meshStandardMaterial
          color="#2d3748"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      {/* Paper Tray */}
      <mesh position={[0, -0.5, 0.6]} castShadow>
        <boxGeometry args={[1.3, 0.1, 0.3]} />
        <meshStandardMaterial color="#1a202c" />
      </mesh>
      {/* Control Panel */}
      <mesh position={[0, 0.5, 0.6]} castShadow>
        <boxGeometry args={[0.8, 0.2, 0.1]} />
        <meshStandardMaterial color="#4a5568" />
      </mesh>
      {/* LED Indicator */}
      <mesh position={[0.4, 0.5, 0.65]}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0.8} />
      </mesh>
    </group>
  )
}

// CCTV Camera 3D Model
const FloatingCCTVCamera = ({ position, delay = 0 }) => {
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
      groupRef.current.rotation.x = Math.sin(time * 0.4 + delay) * 0.1
      groupRef.current.position.x = position[0] + mouse.x * 0.25
      groupRef.current.position.y = position[1] + Math.sin(time * 0.7 + delay) * 0.2 + mouse.y * 0.2
      groupRef.current.position.z = position[2] + Math.cos(time * 0.5 + delay) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Camera Body */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.6, 0.6, 0.8]} />
        <meshStandardMaterial
          color="#1a202c"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      {/* Lens */}
      <mesh position={[0, 0, 0.45]} castShadow>
        <cylinderGeometry args={[0.25, 0.25, 0.2, 32]} />
        <meshStandardMaterial
          color="#0f172a"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      {/* IR LEDs */}
      <mesh position={[0.2, 0.2, 0.4]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[-0.2, 0.2, 0.4]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}

// Hard Drive / SSD 3D Model
const FloatingHardDrive = ({ position, delay = 0 }) => {
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
      groupRef.current.rotation.z = Math.cos(time * 0.5 + delay) * 0.1
      groupRef.current.position.x = position[0] + mouse.x * 0.2
      groupRef.current.position.y = position[1] + Math.sin(time * 0.9 + delay) * 0.15 + mouse.y * 0.15
      groupRef.current.position.z = position[2] + Math.sin(time * 0.7 + delay) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Drive Body */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.3, 0.8]} />
        <meshStandardMaterial
          color="#334155"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      {/* Label */}
      <mesh position={[0, 0.16, 0]}>
        <boxGeometry args={[0.8, 0.05, 0.6]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      {/* Connector */}
      <mesh position={[0, 0, -0.45]}>
        <boxGeometry args={[0.3, 0.15, 0.1]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
    </group>
  )
}

const ServicesScene3D = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
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
          
          {/* Environment */}
          <Environment preset="sunset" />
          
          {/* Services-related 3D Electronics - Different arrangement */}
          <FloatingPrinter position={[-2.5, 1, 0]} delay={0} />
          <FloatingCCTVCamera position={[2.5, 1.2, 0]} delay={0.3} />
          <FloatingHardDrive position={[-1, -1.5, 1.5]} delay={0.6} />
          <FloatingMobile position={[1.5, -1.5, 1]} delay={0.9} />
          <FloatingLaptop position={[0, 0.5, -1]} delay={1.2} />
          
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

export default ServicesScene3D

