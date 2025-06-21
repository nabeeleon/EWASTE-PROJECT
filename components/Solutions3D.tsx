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

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Innovative Solutions
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover cutting-edge approaches to e-waste management that combine technology, 
            sustainability, and community impact for a cleaner future.
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto"
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
                className="relative h-full bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl 
                           border border-gray-700/50 rounded-2xl p-8 overflow-hidden
                           hover:border-cyan-400/50 transition-all duration-300
                           shadow-2xl hover:shadow-cyan-500/20"
                onMouseEnter={() => setActiveCard(solution.id)}
                onMouseLeave={() => setActiveCard(null)}
              >
                {/* Animated Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${solution.color} opacity-0 
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
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors">
                  {solution.title}
                </h3>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
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
                      className="flex items-center text-sm text-gray-400"
                    >
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3" />
                      {feature}
                    </motion.div>
                  ))}
                </div>

                {/* Hover Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: activeCard === solution.id ? 1 : 0 
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl
                       shadow-lg hover:shadow-cyan-500/25 transition-all duration-300
                       border border-cyan-400/30 hover:border-cyan-400/60"
          >
            Explore More Solutions
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
} 