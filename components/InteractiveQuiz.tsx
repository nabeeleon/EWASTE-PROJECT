'use client'

import { useState, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, useGLTF, MeshDistortMaterial } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'

interface AvatarPart {
  name: string
  model: string
}

interface AvatarParts {
  head: AvatarPart[]
  body: AvatarPart[]
  accessory: AvatarPart[]
}

interface SelectedParts {
  head: number
  body: number
  accessory: number
}

interface AvatarModelProps {
  selectedParts: SelectedParts
}

const quizQuestions = [
  {
    question: "How many million tons of e-waste are generated annually?",
    options: ["20-30", "40-50", "50-60", "60-70"],
    correct: 2,
    fact: "Over 50 million tons of e-waste are generated each year, equivalent to throwing away 1000 laptops every second."
  },
  {
    question: "What percentage of e-waste is properly recycled?",
    options: ["5-10%", "10-20%", "20-30%", "30-40%"],
    correct: 1,
    fact: "Only 17.4% of e-waste is properly recycled, the rest ends up in landfills or informal dumps."
  },
  {
    question: "Which toxic element is commonly found in old electronics?",
    options: ["Lead", "Mercury", "Cadmium", "All of above"],
    correct: 3,
    fact: "Electronics contain multiple toxic elements that can contaminate soil and water if not properly disposed."
  },
  {
    question: "How many phones are discarded annually?",
    options: ["50M", "100M", "150M", "200M"],
    correct: 2,
    fact: "Around 150 million phones are discarded each year, containing valuable materials that could be recycled."
  }
]

const avatarParts: AvatarParts = {
  head: [
    { name: "Eco Warrior", model: "/models/head1.glb" },
    { name: "Tech Recycler", model: "/models/head2.glb" },
    { name: "Green Guardian", model: "/models/head3.glb" }
  ],
  body: [
    { name: "Solar Powered", model: "/models/body1.glb" },
    { name: "Circuit Pattern", model: "/models/body2.glb" },
    { name: "Recycled Metal", model: "/models/body3.glb" }
  ],
  accessory: [
    { name: "E-waste Scanner", model: "/models/acc1.glb" },
    { name: "Recycling Drone", model: "/models/acc2.glb" },
    { name: "Green Energy Core", model: "/models/acc3.glb" }
  ]
}

function AvatarModel({ selectedParts }: AvatarModelProps) {
  const headRef = useRef<THREE.Mesh>(null)
  const bodyRef = useRef<THREE.Mesh>(null)
  const accessoryRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 0.5) * 0.2
    }
    if (accessoryRef.current) {
      accessoryRef.current.rotation.z = Math.cos(t * 0.3) * 0.1
      accessoryRef.current.position.y = Math.sin(t * 2) * 0.1
    }
  })

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={headRef} position={[0, 1, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <MeshDistortMaterial
          color="#00ff88"
          speed={5}
          distort={0.3}
          radius={1}
        />
      </mesh>
      <mesh ref={bodyRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.5, 1.5, 32]} />
        <MeshDistortMaterial
          color="#00ccff"
          speed={2}
          distort={0.2}
          radius={1}
        />
      </mesh>
      <mesh ref={accessoryRef} position={[0, 0.5, 0.5]}>
        <torusGeometry args={[0.2, 0.05, 16, 32]} />
        <MeshDistortMaterial
          color="#ff00ff"
          speed={3}
          distort={0.5}
          radius={1}
        />
      </mesh>
    </group>
  )
}

interface Particle {
  position: THREE.Vector3
  velocity: THREE.Vector3
  size: number
}

function ParticleRing() {
  const points = useRef<THREE.Points>(null)
  const particles = useRef<Particle[]>([])

  useEffect(() => {
    for (let i = 0; i < 100; i++) {
      const angle = (i / 100) * Math.PI * 2
      const radius = 2
      particles.current.push({
        position: new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          0
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01
        ),
        size: Math.random() * 0.1 + 0.05
      })
    }
  }, [])

  useFrame(() => {
    if (points.current) {
      const positions = points.current.geometry.attributes.position.array as Float32Array
      particles.current.forEach((particle, i) => {
        particle.position.add(particle.velocity)
        positions[i * 3] = particle.position.x
        positions[i * 3 + 1] = particle.position.y
        positions[i * 3 + 2] = particle.position.z

        // Keep particles in a ring shape
        const dist = Math.sqrt(
          particle.position.x * particle.position.x +
          particle.position.y * particle.position.y
        )
        if (dist > 2.2 || dist < 1.8) {
          particle.velocity.multiplyScalar(-1)
        }
      })
      points.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={100}
          array={new Float32Array(300)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#00ffff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

export default function InteractiveQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedParts, setSelectedParts] = useState<SelectedParts>({
    head: 0,
    body: 0,
    accessory: 0
  })
  const [showAvatar, setShowAvatar] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const handleAnswer = (optionIndex: number) => {
    if (optionIndex === quizQuestions[currentQuestion].correct) {
      setScore(score + 1)
    }
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
      setQuizCompleted(true)
    }
  }

  const handlePartChange = (part: keyof SelectedParts, index: number) => {
    setSelectedParts({ ...selectedParts, [part]: index })
  }

  return (
    <div className="h-screen w-full relative bg-black overflow-hidden">
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={2} color="#00ffff" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#ff00ff" />
          <ParticleRing />
          {(showAvatar || quizCompleted) && <AvatarModel selectedParts={selectedParts} />}
        </Canvas>
      </div>

      {!quizCompleted && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl w-full p-8">
            <AnimatePresence mode="wait">
              {!showResult ? (
                <motion.div
                  key="question"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-black bg-opacity-80 p-8 rounded-2xl border border-cyan-500
                           shadow-[0_0_50px_rgba(0,255,255,0.3)]"
                >
                  <h2 className="text-3xl font-bold text-cyan-300 mb-6">
                    Question {currentQuestion + 1} of {quizQuestions.length}
                  </h2>
                  <p className="text-2xl text-white mb-8">
                    {quizQuestions[currentQuestion].question}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {quizQuestions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        className="px-6 py-4 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white
                                 text-xl font-bold transition-all duration-300
                                 hover:shadow-[0_0_30px_rgba(0,255,255,0.8)]"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-black bg-opacity-80 p-8 rounded-2xl border border-cyan-500
                           shadow-[0_0_50px_rgba(0,255,255,0.3)]"
                >
                  <h2 className="text-4xl font-bold text-cyan-300 mb-6">
                    Quiz Complete!
                  </h2>
                  <p className="text-2xl text-white mb-8">
                    You scored {score} out of {quizQuestions.length}!
                  </p>
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-cyan-300 mb-4">
                      Create Your Avatar
                    </h3>
                    {Object.entries(avatarParts).map(([part, options]) => (
                      <div key={part} className="mb-4">
                        <h4 className="text-xl text-white mb-2 capitalize">{part}</h4>
                        <div className="flex gap-4">
                          {options.map((option: AvatarPart, index: number) => (
                            <button
                              key={index}
                              onClick={() => handlePartChange(part as keyof SelectedParts, index)}
                              className={`px-4 py-2 rounded-lg text-white transition-all duration-300
                                       ${selectedParts[part as keyof SelectedParts] === index
                                         ? 'bg-cyan-600 shadow-[0_0_20px_rgba(0,255,255,0.5)]'
                                         : 'bg-gray-700 hover:bg-gray-600'}`}
                            >
                              {option.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        setShowAvatar(true)
                        setQuizCompleted(true)
                      }}
                      className="mt-6 px-8 py-4 bg-cyan-600 hover:bg-cyan-500 rounded-lg
                               text-white text-xl font-bold transition-all duration-300
                               hover:shadow-[0_0_30px_rgba(0,255,255,0.8)]"
                    >
                      Generate Avatar
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  )
} 