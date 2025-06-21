import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, Center } from '@react-three/drei';
import { FaRecycle, FaLightbulb, FaHandsHelping, FaLeaf, FaRobot, FaUsers } from 'react-icons/fa';
import { ReactNode } from 'react';

interface Solution {
  id: string;
  title: string;
  icon: ReactNode;
  description: string;
  color: string;
  details: string[];
}

interface SolutionBoxProps {
  solution: Solution;
  isActive: boolean;
  onClick: () => void;
}

const solutions: Solution[] = [
  {
    id: 'smart-recycling',
    title: 'Smart Recycling',
    icon: <FaRecycle className="text-4xl" />,
    description: 'AI-powered sorting and processing systems that maximize recycling efficiency.',
    color: 'from-cyan-500 to-blue-500',
    details: [
      'Real-time material identification',
      'Automated sorting systems',
      'Quality control monitoring',
      'Efficiency analytics'
    ]
  },
  {
    id: 'green-tech',
    title: 'Green Technology',
    icon: <FaLeaf className="text-4xl" />,
    description: 'Innovative eco-friendly solutions for sustainable e-waste management.',
    color: 'from-green-500 to-emerald-500',
    details: [
      'Biodegradable components',
      'Energy-efficient processing',
      'Zero-waste initiatives',
      'Carbon footprint reduction'
    ]
  },
  {
    id: 'ai-solutions',
    title: 'AI Integration',
    icon: <FaRobot className="text-4xl" />,
    description: 'Advanced AI systems for predictive maintenance and optimization.',
    color: 'from-purple-500 to-pink-500',
    details: [
      'Predictive analytics',
      'Machine learning optimization',
      'Automated quality control',
      'Smart resource allocation'
    ]
  },
  {
    id: 'community',
    title: 'Community Impact',
    icon: <FaUsers className="text-4xl" />,
    description: 'Building sustainable communities through education and engagement.',
    color: 'from-orange-500 to-red-500',
    details: [
      'Educational programs',
      'Community workshops',
      'Local partnerships',
      'Impact tracking'
    ]
  }
];

const SolutionBox = ({ solution, isActive, onClick }: SolutionBoxProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={`relative cursor-pointer perspective-1000 ${isActive ? 'z-50' : 'z-0'}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div
        className={`glass p-8 rounded-2xl bg-gradient-to-br ${solution.color} h-[400px] w-[300px]`}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
      >
        <div className="absolute inset-0 bg-black/20 rounded-2xl backdrop-blur-sm" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="mb-6 text-white"
          >
            {solution.icon}
          </motion.div>
          <h3 className="text-2xl font-bold text-white mb-4">{solution.title}</h3>
          <p className="text-white/80 mb-6">{solution.description}</p>
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ul className="space-y-2 text-left">
              {solution.details.map((detail: string, index: number) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center text-white/90"
                >
                  <span className="w-2 h-2 bg-white rounded-full mr-2" />
                  {detail}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const FloatingCube = ({ position, color }: { position: [number, number, number]; color: string }) => {
  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={0.5}
      position={position}
    >
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  );
};

const EnhancedSolutions = () => {
  const [activeSolution, setActiveSolution] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-blue-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-6">
            Our Solutions
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover our innovative approaches to sustainable e-waste management
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {solutions.map((solution) => (
            <SolutionBox
              key={solution.id}
              solution={solution}
              isActive={activeSolution === solution.id}
              onClick={() => setActiveSolution(solution.id)}
            />
          ))}
        </div>

        {/* 3D Background Elements */}
        <div className="fixed inset-0 pointer-events-none">
          <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            {solutions.map((solution, index) => (
              <FloatingCube
                key={solution.id}
                position={[
                  (index - 1.5) * 3,
                  Math.sin(Date.now() * 0.001 + index) * 0.5,
                  -5
                ]}
                color={solution.color.split(' ')[1].replace('to-', '')}
              />
            ))}
          </Canvas>
        </div>
      </div>
    </div>
  );
};

export default EnhancedSolutions; 