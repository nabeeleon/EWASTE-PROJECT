import dynamic from 'next/dynamic'

const ARView = dynamic(() => import('@/components/ARView'), {
  ssr: false,
  loading: () => (
    <div className="h-screen flex items-center justify-center bg-surface-dark/80 backdrop-blur-md">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h3 className="text-gradient text-xl font-bold">Loading 3D Scene...</h3>
      </div>
    </div>
  )
})

export default function ARPage() {
  return (
    <main className="min-h-screen relative">
      <div className="h-screen">
        <ARView />
      </div>
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-surface-dark/80 backdrop-blur-md p-6 rounded-xl border border-primary-500/20 max-w-md w-full mx-4 z-10">
        <h3 className="text-gradient text-xl font-bold mb-4">Interactive Guide</h3>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-center space-x-2">
            <span className="text-primary-400">🖱️</span>
            <span>Click and drag to rotate view</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="text-primary-400">🔍</span>
            <span>Scroll to zoom in/out</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="text-primary-400">👆</span>
            <span>Click objects to interact</span>
          </li>
        </ul>
      </div>
    </main>
  )
} 