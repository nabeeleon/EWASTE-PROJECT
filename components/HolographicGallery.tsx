'use client'

import * as THREE from 'three'
import { useState, useRef, useEffect, Suspense, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial, OrbitControls, useTexture, Environment, Stars, Html } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { FaRecycle, FaLightbulb, FaHandsHelping, FaLeaf } from 'react-icons/fa'

// Dynamically import Text component with SSR disabled
const Text = dynamic(() => import('@react-three/drei').then((mod) => mod.Text), {
  ssr: false,
  loading: () => null
})

interface Item {
  title: string
  description: string
  model: string
  solution: string
  link: string
  imageUrl: string
}

const items: Item[] = [
  {
    title: "Obsolete Phones",
    description: "Over 150 million phones discarded annually. These devices contain valuable materials like gold, silver, and rare earth elements.",
    model: "phone",
    solution: "Recycled into solar panels and circuit components. The precious metals are extracted and reused in new electronics.",
    link: "https://www.epa.gov/recycle/electronics-donation-and-recycling",
    imageUrl: "/images/phone-recycling.jpg"
  },
  {
    title: "Dead Laptops",
    description: "40 million tons of e-waste from computers. Laptops contain toxic materials that can harm the environment if not properly disposed of.",
    model: "laptop",
    solution: "Components are separated and recycled. Metals are extracted, plastics are repurposed, and hazardous materials are safely disposed of.",
    link: "https://www.energystar.gov/products/recycle/recycle_old_computer",
    imageUrl: "/images/laptop-recycling.jpg"
  },
  {
    title: "Old Monitors",
    description: "CRT monitors contain 4 pounds of lead each. Modern LCD screens contain mercury and other harmful substances.",
    model: "monitor",
    solution: "Glass is recycled for new products, metals are recovered, and harmful materials are properly contained.",
    link: "https://www.epa.gov/warm/electronics",
    imageUrl: "/images/monitor-recycling.jpg"
  },
  {
    title: "Wasted Tablets",
    description: "Tablets contain rare earth elements essential for modern technology. These elements are finite and must be recycled.",
    model: "tablet",
    solution: "Tablets are dismantled, and components are sorted. Rare earth elements are extracted for reuse in new devices.",
    link: "https://www.apple.com/recycling/",
    imageUrl: "/images/tablet-recycling.jpg"
  },
  {
    title: "Broken Consoles",
    description: "Gaming consoles contribute to toxic waste. They contain valuable metals and recyclable plastics.",
    model: "console",
    solution: "Consoles are broken down into components. Plastics are recycled, and metals are recovered for new products.",
    link: "https://www.nintendo.com/recycling/",
    imageUrl: "/images/console-recycling.jpg"
  },
  {
    title: "Dead Batteries",
    description: "Lithium batteries are environmental hazards. Proper recycling is crucial to prevent pollution.",
    model: "battery",
    solution: "Batteries are processed to recover lithium and other metals. Materials are used in new battery production.",
    link: "https://www.call2recycle.org/",
    imageUrl: "/images/battery-recycling.jpg"
  }
]

const solutions = [
  {
    id: 1,
    title: 'Smart Recycling',
    description: 'AI-powered sorting systems that can identify and separate different types of e-waste with 99.9% accuracy.',
    icon: <FaRecycle className="w-12 h-12" />,
    stats: ['45% faster processing', '99.9% accuracy', '30% cost reduction']
  },
  {
    id: 2,
    title: 'Innovative Recovery',
    description: 'Advanced techniques to extract precious metals and rare earth elements from electronic waste.',
    icon: <FaLightbulb className="w-12 h-12" />,
    stats: ['95% metal recovery', '60% energy saving', 'Zero toxic emissions']
  },
  {
    id: 3,
    title: 'Community Impact',
    description: 'Creating local jobs and supporting communities through responsible recycling programs.',
    icon: <FaHandsHelping className="w-12 h-12" />,
    stats: ['500+ jobs created', '100+ communities served', '$2M+ community investment']
  },
  {
    id: 4,
    title: 'Environmental Benefits',
    description: 'Reducing landfill waste and preventing toxic materials from entering our ecosystem.',
    icon: <FaLeaf className="w-12 h-12" />,
    stats: ['1M+ devices recycled', '500K tons CO₂ saved', '95% landfill reduction']
  }
]

function HolographicItem({ item, index, onClick, isActive }: { item: Item; index: number; onClick: (item: Item) => void; isActive: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  // Create a more sophisticated holographic texture
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512
    const context = canvas.getContext('2d')
    
    if (context) {
      // Create a more complex gradient for holographic effect
      const gradient = context.createRadialGradient(256, 256, 0, 256, 256, 256)
      gradient.addColorStop(0, 'rgba(0, 255, 255, 0.9)')
      gradient.addColorStop(0.5, 'rgba(0, 128, 255, 0.6)')
      gradient.addColorStop(1, 'rgba(0, 64, 255, 0.3)')
      
      context.fillStyle = gradient
      context.fillRect(0, 0, 512, 512)
      
      // Add circuit pattern
      context.strokeStyle = 'rgba(255, 255, 255, 0.2)'
      context.lineWidth = 2
      for (let i = 0; i < 20; i++) {
        context.beginPath()
        context.moveTo(Math.random() * 512, Math.random() * 512)
        context.lineTo(Math.random() * 512, Math.random() * 512)
        context.stroke()
      }
    }
    
    return new THREE.CanvasTexture(canvas)
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      const angle = (index / items.length) * Math.PI * 2
      const radius = 5
      
      // Enhanced floating animation
      meshRef.current.position.x = Math.cos(angle + time * 0.2) * radius
      meshRef.current.position.z = Math.sin(angle + time * 0.2) * radius
      meshRef.current.position.y = Math.sin(time * 0.5 + index) * 0.5 + 1.5

      // Smooth rotation animation
      meshRef.current.rotation.y += 0.01
      meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.1
      
      // Enhanced hover effect
      const scale = hovered ? 1.2 : 1
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1)
    }
  })

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => onClick(item)}
    >
      {/* Main cube body */}
      <boxGeometry args={[2, 2, 2]} />
      <meshPhysicalMaterial
        color={hovered ? "#00ffff" : "#004466"}
        metalness={0.9}
        roughness={0.1}
        transmission={0.5}
        thickness={0.5}
        envMapIntensity={2}
        clearcoat={1}
        clearcoatRoughness={0.1}
        map={texture}
        emissiveMap={texture}
        emissiveIntensity={hovered ? 0.5 : 0.2}
      />

      {/* Holographic text display */}
      <Html
        position={[0, 0, 1.1]}
        center
        style={{
          color: '#00ffff',
          textShadow: '0 0 10px #00ffff',
          fontSize: '14px',
          fontWeight: 'bold',
          textAlign: 'center',
          width: '200px',
          opacity: hovered ? 1 : 0.7,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none'
        }}
      >
        <div>
          <h3 className="text-xl mb-2">{item.title}</h3>
          {hovered && (
            <p className="text-sm opacity-80">{item.description}</p>
          )}
        </div>
      </Html>
    </mesh>
  )
}

function SolutionReveal({ item, onClose }: { item: Item; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 backdrop-blur-lg"
    >
      <div className="bg-black bg-opacity-90 p-8 rounded-3xl max-w-3xl w-full mx-4 text-cyan-300 border-2 border-cyan-500 shadow-[0_0_50px_rgba(0,255,255,0.3)] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-blue-900/20" />
        <div className="relative z-10">
          <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
            {item.title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-xl mb-6 leading-relaxed text-cyan-100">{item.description}</p>
              <div className="bg-cyan-900/30 p-6 rounded-xl mb-6">
                <h4 className="text-2xl font-bold mb-4 text-cyan-200">Solution</h4>
                <p className="text-lg text-cyan-100">{item.solution}</p>
              </div>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl text-white font-bold
                         transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,255,0.5)] hover:scale-105"
              >
                Learn More & Take Action
              </a>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-xl overflow-hidden shadow-[0_0_30px_rgba(0,255,255,0.2)]">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-cyan-300 hover:text-cyan-100 transition-colors"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

function Scene({ onItemClick }: { onItemClick: (item: Item) => void }) {
  const { camera } = useThree()
  
  useEffect(() => {
    camera.position.set(0, 2, 12)
  }, [camera])

  return (
    <>
      <OrbitControls
        enableZoom={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
      />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      {/* <Environment preset="city" /> */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <fog attach="fog" args={['#000', 8, 25]} />
      {items.map((item, index) => (
        <HolographicItem
          key={index}
          item={item}
          index={index}
          onClick={onItemClick}
          isActive={false}
        />
      ))}
    </>
  )
}

export default function HolographicGallery() {
  const [mounted, setMounted] = useState(false)
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const [activeCard, setActiveCard] = useState<number | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black">
        <div className="text-cyan-300 text-2xl animate-pulse">
          Loading Solutions Gallery...
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            Our Solutions
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover how we're revolutionizing e-waste recycling through
            innovation and sustainable practices.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <motion.div
                className={`bg-surface-dark/80 backdrop-blur-md p-8 rounded-xl border border-primary-500/20
                           transition-all duration-300 cursor-pointer
                           ${activeCard === solution.id ? 'scale-105 border-primary-500' : 'hover:border-primary-500/50'}`}
                onClick={() => setActiveCard(activeCard === solution.id ? null : solution.id)}
              >
                <div className="flex items-start space-x-6">
                  <div className="text-primary-400">
                    {solution.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gradient mb-2">
                      {solution.title}
                    </h3>
                    <p className="text-gray-300 mb-4">
                      {solution.description}
                    </p>
                    <AnimatePresence>
                      {activeCard === solution.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-2"
                        >
                          {solution.stats.map((stat, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-center space-x-2"
                            >
                              <span className="w-2 h-2 rounded-full bg-primary-400" />
                              <span className="text-gray-300">{stat}</span>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>

              {/* Holographic effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-transparent opacity-20 rounded-xl pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 