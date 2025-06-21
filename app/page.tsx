'use client'

import React, { Suspense } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import EnhancedHero from '@/components/EnhancedHero'
import ARView from '@/components/ARView'
import Quiz from '@/components/Quiz'
import Resources from '@/components/Resources'
import Contact from '@/app/contact/page'
import Globe from '@/components/Globe'

// Optimized loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
  </div>
)

// Dynamically import heavy 3D components with SSR disabled
const Solutions3D = dynamic(() => import('@/components/Solutions3D'), {
  ssr: false,
  loading: () => <LoadingSpinner />,
})
const LazyGlobe = dynamic(() => import('@/components/Globe'), {
  ssr: false,
  loading: () => <LoadingSpinner />,
})
const LazyARView = dynamic(() => import('@/components/ARView'), {
  ssr: false,
  loading: () => <LoadingSpinner />,
})

const sections = [
  { id: 'hero', component: EnhancedHero, title: 'Home' },
  { id: 'solutions', component: Solutions3D, title: 'Solutions' },
  { id: 'ar', component: LazyARView, title: 'AR View' },
  { id: 'quiz', component: Quiz, title: 'Quiz' },
  { id: 'resources', component: Resources, title: 'Resources' },
  { id: 'contact', component: Contact, title: 'Contact' },
  { id: 'globe', component: LazyGlobe, title: 'Globe' }
]

export default function Home() {
  return (
    <main className="min-h-screen text-white tech-gradient">
      {sections.map((section, index) => {
        const SectionComponent = section.component;
        
        // The 'resources' section had issues with framer-motion, so we render it as a standard section
        if (section.id === 'resources') {
          return (
            <section key={section.id} id={section.id} className="min-h-screen scroll-mt-20 relative section-transition">
              <div>
                <Suspense fallback={<LoadingSpinner />}>
                  <SectionComponent />
                </Suspense>
              </div>
            </section>
          );
        }

        // Render all other sections with the motion effect
        return (
          <motion.section
            key={section.id}
            id={section.id}
            className="min-h-screen scroll-mt-20 relative section-transition"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2, margin: "-100px" }}
            transition={{ 
              duration: 0.6, 
              ease: 'easeOut',
            }}
          >
            <div>
              <Suspense fallback={<LoadingSpinner />}>
                <SectionComponent />
              </Suspense>
            </div>
          </motion.section>
        );
      })}
    </main>
  )
} 