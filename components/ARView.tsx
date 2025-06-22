'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'
import Loading from '@/components/Loading'
import { Suspense } from 'react'
import { FaExpand, FaCompress, FaInfoCircle, FaVrCardboard, FaHandPointer, FaEye, FaTimes } from 'react-icons/fa'
import { Cpu, Gpu, Ram } from './RealisticModels'

const components = [
  {
    id: 'cpu',
    name: 'Processor (CPU)',
    description: 'The brain of the computer. Contains toxic materials like lead and cadmium.',
    impact: 'Improper disposal can lead to soil and water contamination, harming ecosystems and human health.',
    recycling: 'Specialized recycling can recover valuable materials like gold, silver, and copper.',
    position: [0, 0.1, 0] as [number, number, number],
    scale: [0.3, 0.3, 0.3] as [number, number, number],
    rotation: [Math.PI, 0, 0] as [number, number, number],
    model: Cpu,
  },
  {
    id: 'gpu',
    name: 'Graphics Card (GPU)',
    description: 'Renders images and videos. Rich in precious metals but also contains hazardous lead and mercury.',
    impact: 'Heavy metals can leach into the environment, persisting for decades.',
    recycling: 'Contains gold-plated contacts and copper heat sinks that are highly valuable when recovered.',
    position: [-0.6, 0.5, 1.4] as [number, number, number],
    scale: [1.4, 1.4, 1.4] as [number, number, number],
    rotation: [0, -Math.PI / 2, 0] as [number, number, number],
    model: Gpu,
  },
  {
    id: 'ram1',
    name: 'Memory (RAM)',
    description: 'Temporary data storage. Contains various metals that can be recovered.',
    impact: 'Less toxic than other components, but still contributes to landfill volume.',
    recycling: 'Gold and other metals can be extracted from the contact fingers.',
    position: [0.8, 0.1, -0.2] as [number, number, number],
    scale: [0.2, 0.2, 0.2] as [number, number, number],
    rotation: [0, -Math.PI / 4, 0] as [number, number, number],
    model: Ram,
  },
  {
    id: 'ram2',
    name: 'Memory (RAM)',
    description: 'Temporary data storage. Contains various metals that can be recovered.',
    impact: 'Less toxic than other components, but still contributes to landfill volume.',
    recycling: 'Gold and other metals can be extracted from the contact fingers.',
    position: [0.8, 0.1, -0.6] as [number, number, number],
    scale: [0.2, 0.2, 0.2] as [number, number, number],
    rotation: [0, -Math.PI / 4, 0] as [number, number, number],
    model: Ram,
  }
]

interface ComponentProps {
  id: string;
  name: string;
  position: [number, number, number];
  scale: [number, number, number];
  rotation?: [number, number, number];
  onSelect: (id: string) => void;
  selected: boolean;
  model: (props: JSX.IntrinsicElements['group']) => JSX.Element;
}

function Component({ id, name, position, scale, rotation, onSelect, selected, model: Model }: ComponentProps) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
          const targetEmissive = hovered || selected ? (selected ? '#818cf8' : '#67e8f9') : '#000000'
          child.material.emissive.lerp(new THREE.Color(targetEmissive), 0.1)
          const targetIntensity = hovered || selected ? (selected ? 1.5 : 1) : 0
          child.material.emissiveIntensity = THREE.MathUtils.lerp(child.material.emissiveIntensity, targetIntensity, 0.1)
        }
      })
    }
  })

  return (
    <group
      ref={groupRef}
      position={position}
      scale={scale}
      rotation={rotation}
      onClick={() => onSelect(id)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Model />
    </group>
  )
}

function Motherboard() {
  return (
    <mesh position={[0, -0.05, 0]} receiveShadow>
      <boxGeometry args={[3, 0.1, 3]} />
      <meshStandardMaterial color="#334155" metalness={0.2} roughness={0.8} />
      </mesh>
  )
}

function Scene({ onComponentSelect, selectedComponent }: { onComponentSelect: (id: string | null) => void, selectedComponent: string | null }) {
  return (
    <>
      <ambientLight intensity={1} />
      <hemisphereLight intensity={0.5} groundColor="black" />
      <directionalLight 
        position={[8, 10, 5]} 
        intensity={2.5} 
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        color="#c1b2ff" 
      />
      <pointLight position={[-5, 5, -5]} intensity={0.2} color="#00ffff" />
      <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
        <group>
          <Motherboard />
          {components.map(comp => (
            <Component 
              key={comp.id}
              {...comp}
              onSelect={onComponentSelect}
              selected={selectedComponent === comp.id}
            />
          ))}
        </group>
      </Float>
    </>
  )
}

function ComponentLabels({ selectedComponent }: { selectedComponent: string | null }) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {components.map((comp, index) => {
        const isSelected = selectedComponent === comp.id
        const isVisible = isSelected
        
        if (!isVisible) return null
        
  return (
          <motion.div
            key={comp.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bg-gradient-to-r from-indigo-500/90 to-purple-500/90 backdrop-blur-sm border border-indigo-300/50 rounded-lg px-3 py-2 text-white text-sm font-medium shadow-lg"
            style={{
              left: `${50 + (comp.position[0] * 15)}%`,
              top: `${50 - (comp.position[1] * 15)}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            {comp.name}
          </motion.div>
        )
      })}
    </div>
  )
}

function InfoPanel({ componentId, onClose }: { componentId: string | null, onClose: () => void }) {
  const component = components.find(c => c.id === componentId)
  if (!component) return null

  return (
      <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="absolute top-0 right-0 h-full w-full max-w-md p-8 bg-slate-900/80 backdrop-blur-xl border-l-2 border-slate-700 z-20"
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          {component.name}
        </h2>
        <button
          onClick={onClose}
          className="p-2 rounded-full text-slate-400 hover:bg-slate-700/50 hover:text-white transition-colors"
        >
          <FaTimes size={20} />
        </button>
      </div>
      <div className="space-y-6 text-lg">
        <div>
          <h3 className="text-xl font-semibold text-indigo-300 mb-3">Description</h3>
          <p className="text-slate-400 leading-relaxed">{component.description}</p>
          </div>
        <div>
          <h3 className="text-xl font-semibold text-indigo-300 mb-3">Environmental Impact</h3>
          <p className="text-slate-400 leading-relaxed">{component.impact}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-indigo-300 mb-3">Recycling</h3>
          <p className="text-slate-400 leading-relaxed">{component.recycling}</p>
          </div>
        </div>
      </motion.div>
  )
}

export default function ARView() {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showInstructions, setShowInstructions] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  const toggleFullscreen = () => {
    if (!containerRef.current) return
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`)
      })
    } else {
      document.exitFullscreen()
    }
  }

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', onFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234f46e5' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
      </div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-indigo-400 rounded-full opacity-30"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ y: [0, -150, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 5 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 3 }}
          />
        ))}
      </div>
      <div className="text-center py-20 bg-slate-900/70 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }} className="inline-block mb-6">
              <div className="text-6xl mb-4">💻</div>
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              AR E-Waste Explorer
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed mb-8">
              Explore electronic waste components in immersive 3D. Click on highlighted areas to learn about
              recycling processes, environmental impact, and proper disposal methods.
            </p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="flex justify-center items-center space-x-8 mb-8">
              <div className="flex items-center space-x-3 text-slate-300"><FaHandPointer className="text-xl text-indigo-400" /><span className="text-sm font-medium">Interactive</span></div>
              <div className="flex items-center space-x-3 text-slate-300"><FaEye className="text-xl text-purple-400" /><span className="text-sm font-medium">3D View</span></div>
              <div className="flex items-center space-x-3 text-slate-300"><FaVrCardboard className="text-xl text-cyan-400" /><span className="text-sm font-medium">Immersive</span></div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="py-12">
          <AnimatePresence>
              {showInstructions && (
              <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
              >
                  <div className="bg-slate-900/50 backdrop-blur-lg border border-slate-700 rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-slate-200">How to Use</h3>
                      <button onClick={() => setShowInstructions(false)} className="text-slate-400 hover:text-white transition-colors">×</button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-400">
                      <div className="flex items-center space-x-3"><div className="w-2.5 h-2.5 bg-indigo-400 rounded-full shrink-0"></div><span>Click components to explore</span></div>
                      <div className="flex items-center space-x-3"><div className="w-2.5 h-2.5 bg-purple-400 rounded-full shrink-0"></div><span>Drag to rotate the view</span></div>
                      <div className="flex items-center space-x-3"><div className="w-2.5 h-2.5 bg-cyan-400 rounded-full shrink-0"></div><span>Scroll to zoom in/out</span></div>
                      </div>
                  </div>
              </motion.div>
              )}
          </AnimatePresence>
      </div>

      <div
        ref={containerRef}
        className="relative py-12"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-slate-900/50 backdrop-blur-lg 
                         border border-slate-700 rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/10">
            
            <div className="flex justify-between items-center p-4 border-b border-slate-700">
              <h3 className="text-lg font-semibold text-slate-200">Interactive 3D Model</h3>
              <button onClick={toggleFullscreen} className="flex items-center space-x-2 px-4 py-2 bg-transparent border border-slate-600 rounded-lg text-slate-300 hover:text-white transition-all duration-300 hover:bg-slate-700/50 hover:border-slate-500">
                {isFullscreen ? <FaCompress className="text-sm" /> : <FaExpand className="text-sm" />}
                <span className="text-sm font-medium">{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
            </button>
            </div>

            <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'h-[700px]'}`}>
              <Suspense fallback={<Loading />}>
                <Canvas
                  shadows
                  camera={{ position: [0, 2.5, 4], fov: 45 }}
                  frameloop="always"
                >
                  <Scene onComponentSelect={setSelectedComponent} selectedComponent={selectedComponent} />
                  <OrbitControls
                    enablePan={false}
                    enableZoom={true}
                    minDistance={3}
                    maxDistance={8}
                    target={[0, 0.5, 0]}
                  />
                </Canvas>
              </Suspense>
              
              <ComponentLabels selectedComponent={selectedComponent} />
              
              <AnimatePresence>
                {selectedComponent && (
                  <InfoPanel componentId={selectedComponent} onClose={() => setSelectedComponent(null)} />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 