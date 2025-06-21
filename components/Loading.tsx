'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const Loading = () => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    // Ensure window is defined before accessing its properties
    if (typeof window !== 'undefined') {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="relative">
        {/* Outer ring */}
        <motion.div
          className="w-32 h-32 border-4 border-cyan-500 rounded-full"
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Inner ring */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-4 border-blue-500 rounded-full"
          animate={{
            rotate: -360,
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Center dot */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Loading text */}
        <motion.div
          className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-cyan-500 font-bold text-xl"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Loading...
        </motion.div>
      </div>
      
      {/* Background particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-500 rounded-full"
          initial={{
            x: Math.random() * width,
            y: Math.random() * height,
            scale: 0,
          }}
          animate={{
            x: Math.random() * width,
            y: Math.random() * height,
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 2 + 1,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
}

export default Loading 