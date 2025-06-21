import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { AnimatePresence } from 'framer-motion'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'E-Waste Reborn',
  description: 'Discover innovative solutions for electronic waste recycling and contribute to a sustainable future.',
  keywords: 'e-waste, recycling, electronics, sustainability, environment',
  authors: [{ name: 'E-Waste Reborn Team' }],
  openGraph: {
    title: 'E-Waste Reborn',
    description: 'Discover innovative solutions for electronic waste recycling and contribute to a sustainable future.',
    type: 'website',
    locale: 'en_US',
    images: ['/images/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E-Waste Reborn',
    description: 'An interactive journey through the impact and future of electronic waste',
    images: ['/twitter-image.jpg']
  }
}

function AnimatedSkyBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      {/* Gradient sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1837] via-[#1a2960] to-[#0e1120] animate-gradient-move" />
      {/* SVG stars */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
        {Array.from({ length: 120 }).map((_, i) => (
          <circle
            key={i}
            cx={Math.random() * 100 + '%'}
            cy={Math.random() * 100 + '%'}
            r={Math.random() * 1.2 + 0.3}
            fill="#fff"
            opacity={Math.random() * 0.7 + 0.2}
          />
        ))}
      </svg>
      {/* Orbits */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 2 }}>
        <ellipse cx="50%" cy="60%" rx="38%" ry="12%" fill="none" stroke="#00bfff44" strokeWidth="2" />
        <ellipse cx="50%" cy="60%" rx="28%" ry="8%" fill="none" stroke="#00bfff33" strokeWidth="1.5" />
        <ellipse cx="50%" cy="60%" rx="18%" ry="4%" fill="none" stroke="#00bfff22" strokeWidth="1" />
        {/* Animated orbiting dot */}
        <circle id="orbit-dot" cx="50%" cy="48%" r="6" fill="#00bfff" opacity="0.7">
          <animateTransform attributeName="transform" type="rotate" from="0 50 60" to="360 50 60" dur="12s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} flex flex-col min-h-screen text-white antialiased`}>
        <AnimatedSkyBackground />
        <Navigation />
        <AnimatePresence mode="wait">
          <main className="flex-grow relative">
            {children}
          </main>
        </AnimatePresence>
        <footer className="w-full bg-surface-dark/80 backdrop-blur-md border-t border-primary-500/20 py-6 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-gradient text-lg font-bold mb-4">E-Waste Recycling</h4>
                <p className="text-gray-300">Making electronic recycling accessible and sustainable for everyone.</p>
              </div>
              <div>
                <h4 className="text-gradient text-lg font-bold mb-4">Contact</h4>
                <p className="text-gray-300">info@ewaste-recycling.com</p>
                <p className="text-gray-300">+1 (555) 123-4567</p>
              </div>
              <div>
                <h4 className="text-gradient text-lg font-bold mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-primary-400 hover:text-primary-300">Twitter</a>
                  <a href="#" className="text-primary-400 hover:text-primary-300">LinkedIn</a>
                  <a href="#" className="text-primary-400 hover:text-primary-300">Instagram</a>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-primary-500/20 text-center text-gray-400">
              <p>&copy; 2024 E-Waste Recycling. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}

// Add to globals.css:
// .animate-gradient-move {
//   background-size: 200% 200%;
//   animation: gradientMove 16s ease-in-out infinite;
// }
// @keyframes gradientMove {
//   0% { background-position: 0% 50%; }
//   50% { background-position: 100% 50%; }
//   100% { background-position: 0% 50%; }
// } 