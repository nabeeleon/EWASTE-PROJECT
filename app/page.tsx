'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import PageContainer from '@/components/PageContainer'
import Loading from '@/components/Loading'

import EnhancedHero from '@/components/EnhancedHero'
import ARView from '@/components/ARView'
import Quiz from '@/components/Quiz'
import Resources from '@/components/Resources'
import Contact from '@/app/contact/page'

const LazySolutions3D = dynamic(() => import('@/components/Solutions3D'), {
  ssr: false,
  loading: () => <Loading />,
})

const LazyARView = dynamic(() => import('@/components/ARView'), {
  ssr: false,
  loading: () => <Loading />,
})

const sections = [
  { id: 'hero', component: EnhancedHero, title: 'Home' },
  { id: 'solutions', component: LazySolutions3D, title: 'Solutions' },
  { id: 'ar', component: LazyARView, title: 'AR View' },
  { id: 'quiz', component: Quiz, title: 'Quiz' },
  { id: 'resources', component: Resources, title: 'Resources' },
  { id: 'contact', component: Contact, title: 'Contact' },
]

export default function Home() {
  return (
    <PageContainer>
      {sections.map((section) => {
        if (section.id === 'resources' || section.id === 'quiz' || section.id === 'ar' || section.id === 'solutions') {
          return (
            <section key={section.id} id={section.id} className="relative">
              <Suspense fallback={<Loading />}>
                <section.component />
              </Suspense>
            </section>
          )
        }

        return (
          <motion.section
            key={section.id}
            id={section.id}
            className="min-h-screen scroll-mt-20 relative flex items-center justify-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <Suspense fallback={<Loading />}>
              <section.component />
            </Suspense>
          </motion.section>
        )
      })}
    </PageContainer>
  )
}