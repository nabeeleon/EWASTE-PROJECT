import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, Trail, Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function ParticleRing() {
  const particles = useRef<THREE.Points>(null)
  const count = 1000
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2
    const radius = 1 + Math.random() * 0.2
    positions[i * 3] = Math.cos(angle) * radius
    positions[i * 3 + 1] = Math.sin(angle) * radius
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.2

    const color = new THREE.Color()
    color.setHSL(Math.random() * 0.2 + 0.5, 0.8, 0.6)
    colors[i * 3] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b
  }

  useFrame((state) => {
    if (!particles.current) return
    particles.current.rotation.z += 0.001
    particles.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
  })

  return (
    <points ref={particles}>
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
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function CompanionCore() {
  const sphere = useRef<THREE.Mesh>(null)
  const [time, setTime] = useState(0)

  useFrame((state) => {
    setTime(state.clock.elapsedTime)
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Trail
        width={0.2}
        length={8}
        color={new THREE.Color(0x00ffff)}
        attenuation={(t) => t * t}
      >
        <Sphere args={[0.3, 32, 32]} ref={sphere}>
          <MeshDistortMaterial
            color={0x00ffff}
            roughness={0.1}
            metalness={1}
            distort={0.4}
            speed={2}
            time={time}
          />
        </Sphere>
      </Trail>
      <ParticleRing />
    </Float>
  )
}

export default function FloatingCompanion() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0vh', '100vh'])
  const smoothY = useSpring(y, { damping: 15, stiffness: 100 })

  return (
    <motion.div
      className="fixed right-8 z-50 w-24 h-24"
      style={{ y: smoothY }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <Canvas camera={{ position: [0, 0, 2] }}>
        <CompanionCore />
      </Canvas>
    </motion.div>
  )
} 