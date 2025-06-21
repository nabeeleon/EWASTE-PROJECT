'use client'

// Error boundary component for handling React errors gracefully
import { motion } from 'framer-motion'
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-red-900/20 p-8 rounded-2xl max-w-2xl mx-4 text-center border border-red-500/50 backdrop-blur-lg"
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-6xl mb-6"
        >
          ⚠️
        </motion.div>
        <h2 className="text-2xl font-bold text-red-300 mb-4">Something went wrong</h2>
        <p className="text-red-200/80 mb-6">{error.message}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetErrorBoundary}
          className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold
                   transition-colors duration-200 shadow-lg shadow-red-500/20"
        >
          Try again
        </motion.button>
      </motion.div>
    </div>
  )
}

export default function CustomErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Reset the state of your app here
        window.location.reload()
      }}
    >
      {children}
    </ReactErrorBoundary>
  )
} 