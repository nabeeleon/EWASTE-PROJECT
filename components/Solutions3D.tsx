'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'

const solutions = [
  {
    id: 1,
    title: "Smart Collection Systems",
    icon: "🤖",
    description: "AI-powered e-waste collection points that automatically sort and categorize electronic waste for optimal recycling.",
    features: ["Real-time sorting", "Smart notifications", "Data analytics"],
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    title: "Advanced Processing",
    icon: "⚡",
    description: "Cutting-edge recycling technology that recovers 99.9% of precious metals while minimizing environmental impact.",
    features: ["High efficiency", "Zero waste", "Green technology"],
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 3,
    title: "Community Impact",
    icon: "🌍",
    description: "Empowering communities through education, job creation, and accessible e-waste recycling programs.",
    features: ["Local jobs", "Education programs", "Accessible drop-offs"],
    color: "from-green-500 to-emerald-500"
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
}

const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

export default function Solutions3D() {
  const [activeCard, setActiveCard] = useState<number | null>(null)

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300c6ff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="py-20 bg-slate-900/70 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Innovative Solutions
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Discover cutting-edge approaches to e-waste management that combine technology, 
              sustainability, and community impact for a cleaner future.
            </p>
          </motion.div>
        </div>

        {/* Solutions Grid */}
        <div className="py-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.id}
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <div 
                  className="relative h-full bg-slate-800/60 backdrop-blur-lg 
                             border border-slate-700 rounded-3xl p-8 overflow-hidden
                             hover:border-slate-500 transition-all duration-300"
                  onMouseEnter={() => setActiveCard(solution.id)}
                  onMouseLeave={() => setActiveCard(null)}
                >
                  {/* Animated Background Gradient */}
                  <div className={`absolute -inset-2 bg-gradient-to-br ${solution.color} opacity-0 blur-xl
                                  group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  {/* Icon */}
                  <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    className="text-6xl mb-6 text-center"
                  >
                    {solution.icon}
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-4 text-slate-200 transition-colors">
                    {solution.title}
                  </h3>
                  
                  <p className="text-slate-400 mb-6 leading-relaxed">
                    {solution.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2">
                    {solution.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * idx }}
                        className="flex items-center text-sm text-slate-400"
                      >
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 shrink-0" />
                        {feature}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-center pb-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-transparent text-slate-200 font-bold rounded-xl
                         shadow-lg transition-all duration-300
                         border border-slate-600 hover:bg-slate-800/60 hover:border-slate-500"
            >
              Explore More Solutions
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 