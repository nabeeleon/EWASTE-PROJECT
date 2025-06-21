import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

const EnhancedHero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-screen h-screen min-h-screen min-w-full overflow-hidden bg-gradient-to-b from-black to-blue-900 flex items-center justify-center z-0"
      style={{ inset: 0 }}
    >
      {/* Animated background */}
      <div className="absolute inset-0 w-full h-full">
        <Canvas frameloop="demand">
          <Stars radius={100} depth={50} count={1200} factor={4} saturation={0} fade speed={1} />
        </Canvas>
      </div>

      {/* Main content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex flex-col items-center justify-center text-center w-full h-full"
      >
        <motion.h1
          className="text-5xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-lg w-full"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Give E-Waste a Second Life
        </motion.h1>

        <motion.p
          className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto mt-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Join the movement to recycle electronics, reduce pollution, and build a cleaner, smarter future for everyone.
        </motion.p>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-10"
        >
          <button className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-cyan-500/50">
            Start Recycling
          </button>
        </motion.div>

        {/* Floating scroll indicator */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 bg-white rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent via-blue-900/20 to-black pointer-events-none" />
    </div>
  );
};

export default EnhancedHero; 