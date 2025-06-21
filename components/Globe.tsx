'use client'

import { useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Sphere, useTexture, Trail, Float, Text, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'

function EWasteParticle({ position, delay }: { position: [number, number, number], delay: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [isRecycled, setIsRecycled] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setIsRecycled(true), delay)
    return () => clearTimeout(timeout)
  }, [delay])

  useFrame((state) => {
    if (meshRef.current && isRecycled) {
      const time = state.clock.getElapsedTime()
      meshRef.current.position.y += Math.sin(time + delay) * 0.01
      meshRef.current.rotation.x += 0.02
      meshRef.current.rotation.y += 0.03

      if (isHovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(2, 2, 2), 0.1)
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
      }
    }
  })

  return (
    <Trail
      width={2}
      length={8}
      color={isRecycled ? '#2ECC71' : '#E74C3C'}
      attenuation={(t) => t * t}
    >
      <mesh 
        ref={meshRef} 
        position={position}
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
      >
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial
          color={isRecycled ? '#2ECC71' : '#E74C3C'}
          emissive={isRecycled ? '#2ECC71' : '#E74C3C'}
          emissiveIntensity={isHovered ? 2 : 0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Trail>
  )
}

function GlobeMesh() {
  const meshRef = useRef<THREE.Mesh>(null)
  const [isTransformed, setIsTransformed] = useState(false)
  const [particles, setParticles] = useState<Array<[number, number, number]>>([])
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)
  
  const regions = [
    { name: "North America", position: new THREE.Vector3(0.7, 0.5, 0), stats: "12M tons/year" },
    { name: "Europe", position: new THREE.Vector3(0, 0.7, 0.7), stats: "10M tons/year" },
    { name: "Asia", position: new THREE.Vector3(-0.7, 0.3, 0.5), stats: "20M tons/year" },
    { name: "Africa", position: new THREE.Vector3(0, -0.5, 0.7), stats: "5M tons/year" },
    { name: "South America", position: new THREE.Vector3(0.5, -0.7, 0), stats: "6M tons/year" }
  ]
  
  useEffect(() => {
    // Generate random particles around the globe
    const newParticles = Array.from({ length: 100 }, () => {
      const radius = 1.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos((Math.random() * 2) - 1)
      return [
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      ] as [number, number, number]
    })
    setParticles(newParticles)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      if (scrollPercent > 0.1 && !isTransformed) {
        setIsTransformed(true)
        if (meshRef.current?.material) {
          gsap.to(meshRef.current.material, {
            duration: 2,
            wireframe: false,
            emissiveIntensity: 0.5,
            roughness: 0.2,
            metalness: 0.8,
          })
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isTransformed])

  // Memoized geometry and material for better performance
  const geometry = useMemo(() => new THREE.SphereGeometry(1, 64, 64), [])
  const material = useMemo(() => new THREE.MeshPhongMaterial({
    color: '#00ffff',
    transparent: true,
    opacity: 0.8,
    wireframe: true
  }), [])

  // Optimized rotation animation
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.3
    }
  })

  return (
    <>
      <Float
        speed={2}
        rotationIntensity={0.5}
        floatIntensity={0.5}
      >
        <mesh ref={meshRef} geometry={geometry}>
          <primitive object={material} attach="material" />
        </mesh>

        {regions.map((region, i) => (
          <group key={i} position={region.position}>
            <mesh
              onPointerOver={() => setHoveredRegion(region.name)}
              onPointerOut={() => setHoveredRegion(null)}
            >
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshStandardMaterial
                color="#00ffff"
                emissive="#00ffff"
                emissiveIntensity={hoveredRegion === region.name ? 2 : 0.5}
              />
            </mesh>
            {hoveredRegion === region.name && (
              <group position={[0.2, 0.2, 0]}>
                <Text
                  position={[0, 0.1, 0]}
                  fontSize={0.1}
                  color="#00ffff"
                  anchorX="left"
                  anchorY="middle"
                >
                  {region.name}
                </Text>
                <Text
                  position={[0, -0.1, 0]}
                  fontSize={0.08}
                  color="#ff0000"
                  anchorX="left"
                  anchorY="middle"
                >
                  {region.stats}
                </Text>
              </group>
            )}
          </group>
        ))}
      </Float>
      
      {particles.map((position, i) => (
        <EWasteParticle
          key={i}
          position={position}
          delay={i * 100 + (isTransformed ? 0 : 2000)}
        />
      ))}
    </>
  )
}

export default function Globe() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center relative bg-transparent">
      <div className="flex items-center justify-center w-full h-full" style={{ minHeight: '80vh' }}>
        <Canvas 
          camera={{ position: [0, 0, 3] }} 
          style={{ width: '80vw', height: '80vh', maxWidth: '900px', maxHeight: '80vh', background: 'transparent' }}
          frameloop="demand"
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={2} color="#00ffff" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#ff0000" />
          <GlobeMesh />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
            enableDamping={true}
            dampingFactor={0.05}
          />
        </Canvas>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-8 text-white bg-black bg-opacity-60 p-4 rounded-lg shadow-lg flex flex-col items-center w-[320px]">
        <h3 className="text-xl font-bold text-cyan-300 mb-2 text-center">Global E-Waste Impact</h3>
        <ul className="space-y-2 w-full">
          <li className="flex items-center">
            <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
            Unrecycled E-Waste
          </li>
          <li className="flex items-center">
            <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
            Recycled E-Waste
          </li>
        </ul>
      </div>
    </div>
  )
} 