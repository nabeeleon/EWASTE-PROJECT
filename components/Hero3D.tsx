import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Html, OrbitControls, Stars, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { useRef } from 'react'

function FloatingComputer() {
  const group = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.2
      group.current.position.y = 0.2 + Math.sin(clock.getElapsedTime() * 1.2) * 0.08
    }
  })
  return (
    <group ref={group}>
      {/* Monitor */}
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.7, 0.1]} />
        <meshStandardMaterial color="#222b3a" metalness={0.5} roughness={0.2} emissive="#007AFF" emissiveIntensity={0.12} />
      </mesh>
      {/* Screen glow */}
      <mesh position={[0, 0.25, 0.055]}>
        <planeGeometry args={[1.1, 0.6]} />
        <meshBasicMaterial color="#007AFF" transparent opacity={0.18} />
      </mesh>
      {/* Stand */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.3, 32]} />
        <meshStandardMaterial color="#b0b3b8" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Base */}
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[0.18, 0.22, 0.08, 32]} />
        <meshStandardMaterial color="#222b3a" metalness={0.5} roughness={0.2} />
      </mesh>
      {/* Glow effect */}
      <mesh position={[0, 0.25, 0]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshBasicMaterial color="#007AFF" transparent opacity={0.07} />
      </mesh>
    </group>
  )
}

function ParticleField() {
  // 100 random particles
  return (
    <group>
      {Array.from({ length: 100 }).map((_, i) => (
        <mesh key={i} position={[
          (Math.random() - 0.5) * 8,
          Math.random() * 3 - 1.5,
          (Math.random() - 0.5) * 8
        ]}>
          <sphereGeometry args={[0.03 + Math.random() * 0.04, 8, 8]} />
          <meshBasicMaterial color="#007AFF" opacity={0.18 + Math.random() * 0.12} transparent />
        </mesh>
      ))}
    </group>
  )
}

export default function Hero3D() {
  return (
    <div className="w-full h-[480px] md:h-[600px] relative rounded-3xl overflow-hidden shadow-2xl">
      <Canvas camera={{ position: [0, 0.7, 3.5], fov: 38 }} shadows>
        <color attach="background" args={["#181c24"]} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 4, 2]} intensity={0.7} castShadow />
        {/* <Environment preset="city" /> */}
        <Float speed={2} rotationIntensity={0.4} floatIntensity={0.5}>
          <FloatingComputer />
        </Float>
        <ParticleField />
        <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI/3} maxPolarAngle={Math.PI/1.5} />
      </Canvas>
      {/* Overlay for glass effect */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-blue-900/40 via-transparent to-blue-800/30" />
    </div>
  )
} 