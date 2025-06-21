'use client'

import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, OrbitControls, Text, Float, MeshDistortMaterial, Trail, Environment } from '@react-three/drei'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { Suspense } from 'react'

function ToxicSmoke() {
  const count = 500
  const particlesRef = useRef<THREE.Points>(null)
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const sizes = new Float32Array(count)
  
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10
    positions[i * 3 + 1] = Math.random() * 5
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    
    colors[i * 3] = Math.random() * 0.3 + 0.2 // R
    colors[i * 3 + 1] = Math.random() * 0.3 // G
    colors[i * 3 + 2] = Math.random() * 0.3 // B

    sizes[i] = Math.random() * 0.5 + 0.1
  }

  useFrame((state) => {
    if (particlesRef.current) {
      const time = state.clock.getElapsedTime()
      const particles = particlesRef.current
      const positions = particles.geometry.attributes.position.array as Float32Array
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3
        positions[i3 + 1] += Math.sin(time + i) * 0.01
        positions[i3] += Math.cos(time + i) * 0.01
        positions[i3 + 2] += Math.sin(time + i) * 0.01

        // Reset particles that go too high
        if (positions[i3 + 1] > 5) {
          positions[i3 + 1] = 0
        }
      }
      
      particles.geometry.attributes.position.needsUpdate = true
      particles.rotation.y = time * 0.05
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function Device({ position, rotation, scale, onClick }: any) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [glowIntensity, setGlowIntensity] = useState(0)

  useEffect(() => {
    if (hovered && meshRef.current?.material) {
      gsap.to(meshRef.current.material as THREE.Material, {
        duration: 0.5,
        distort: 0.5,
        emissiveIntensity: 2
      })
    } else if (meshRef.current?.material) {
      gsap.to(meshRef.current.material as THREE.Material, {
        duration: 0.5,
        distort: 0.2,
        emissiveIntensity: 0.5
      })
    }
  }, [hovered])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime()) * 0.1
      meshRef.current.rotation.y += 0.01
      
      // Pulsating glow effect
      const pulseIntensity = Math.sin(state.clock.getElapsedTime() * 2) * 0.5 + 1
      setGlowIntensity(hovered ? pulseIntensity * 2 : pulseIntensity * 0.5)
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Trail
        width={1}
        length={8}
        color={hovered ? '#ff0000' : '#666666'}
        attenuation={(t) => t * t}
      >
        <mesh
          ref={meshRef}
          position={position}
          rotation={rotation}
          scale={scale}
          onClick={onClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <boxGeometry args={[1, 0.1, 0.7]} />
          <MeshDistortMaterial
            color={hovered ? '#E74C3C' : '#666666'}
            emissive={hovered ? '#E74C3C' : '#666666'}
            emissiveIntensity={glowIntensity}
            speed={5}
            distort={hovered ? 0.5 : 0.2}
            radius={1}
          />
        </mesh>
      </Trail>
      
      {hovered && (
        <Text
          position={[position[0], position[1] + 0.5, position[2]]}
          fontSize={0.2}
          color="#E74C3C"
          anchorX="center"
          anchorY="middle"
        >
          Toxic Device
        </Text>
      )}
    </Float>
  )
}

function StatsOverlay({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed inset-0 flex items-center justify-center z-50"
        >
          <motion.div 
            className="bg-black bg-opacity-90 p-8 rounded-lg max-w-2xl text-white"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-red-500">Toxic Impact</h3>
            <ul className="space-y-4">
              <motion.li 
                className="flex items-center"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span className="w-4 h-4 bg-red-500 rounded-full mr-3"></span>
                Lead contamination: 2.9 million tons
              </motion.li>
              <motion.li 
                className="flex items-center"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <span className="w-4 h-4 bg-yellow-500 rounded-full mr-3"></span>
                Mercury release: 50 tons annually
              </motion.li>
              <motion.li 
                className="flex items-center"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <span className="w-4 h-4 bg-purple-500 rounded-full mr-3"></span>
                Toxic fumes: 80% of children affected
              </motion.li>
            </ul>
            <motion.button
              onClick={onClose}
              className="mt-6 px-4 py-2 bg-red-500 hover:bg-red-600 rounded"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Close
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Scene() {
  return (
    <group>
      <Environment preset="night" background />
      
      {/* Main lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} castShadow />
      <pointLight position={[-5, 5, -5]} intensity={0.5} color="#ff4040" />

      {/* Ground with waste pile */}
      <mesh
        receiveShadow
        position={[0, -2, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial
          color="#1a1a1a"
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* E-waste pile representation */}
      {Array.from({ length: 50 }).map((_, i) => (
        <mesh
          key={i}
          castShadow
          position={[
            Math.sin(i) * 3 + Math.random() * 2,
            Math.random() * 2 - 2,
            Math.cos(i) * 3 + Math.random() * 2
          ]}
          rotation={[
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
          ]}
        >
          <boxGeometry args={[0.5, 0.5, 0.2]} />
          <meshStandardMaterial
            color={new THREE.Color().setHSL(Math.random() * 0.1 + 0.05, 0.5, 0.2)}
            roughness={0.7}
            metalness={0.3}
          />
        </mesh>
      ))}

      {/* Toxic smoke particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh
          key={`smoke-${i}`}
          position={[
            Math.sin(i) * 2,
            Math.random() * 3,
            Math.cos(i) * 2
          ]}
        >
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial
            color="#40ff40"
            transparent
            opacity={0.3}
            emissive="#40ff40"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}

      {/* Scene controls */}
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minDistance={5}
        maxDistance={20}
        maxPolarAngle={Math.PI / 2}
      />
    </group>
  )
}

export default function LandfillScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [showStats, setShowStats] = useState(false)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const devices = [
    { position: [-2, 0, 0], rotation: [0, 0, 0], scale: 1 },
    { position: [1.5, 0.5, 1], rotation: [0, Math.PI / 4, 0], scale: 0.8 },
    { position: [0, 0.2, -1.5], rotation: [0, -Math.PI / 6, 0], scale: 1.2 },
    { position: [-1, -0.5, 1], rotation: [0, Math.PI / 3, 0], scale: 0.9 },
    { position: [2, -0.3, -0.5], rotation: [0, -Math.PI / 5, 0], scale: 1.1 }
  ]

  return (
    <motion.div
      ref={containerRef}
      className="h-screen w-full relative bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ y }}
      >
        <Canvas
          shadows
          camera={{ position: [8, 5, 8], fov: 45 }}
          gl={{
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            outputEncoding: THREE.sRGBEncoding
          }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </motion.div>
      
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-2xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-bold mb-4 text-red-500"
        >
          The Growing Crisis
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-xl text-gray-300"
        >
          Every year, millions of electronic devices end up in landfills,
          leaching toxic chemicals into our environment.
        </motion.p>
        <motion.div
          className="mt-8 text-8xl font-bold cursor-pointer pointer-events-auto text-red-500"
          whileHover={{
            scale: 1.2,
            filter: "drop-shadow(0 0 8px rgb(231, 76, 60))"
          }}
          onClick={() => setShowStats(true)}
        >
          53M Tons
        </motion.div>
      </div>

      <StatsOverlay isVisible={showStats} onClose={() => setShowStats(false)} />
    </motion.div>
  )
} 