'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, usePathname } from 'next/navigation'
import { smoothScroll } from '@/utils/smoothScroll'

const navItems = [
  { name: 'Home', href: '#hero' },
  { name: 'Solutions', href: '#solutions' },
  { name: 'AR Experience', href: '#ar' },
  { name: 'Quiz', href: '#quiz' },
  { name: 'Resources', href: '#resources' },
  { name: 'Team', href: '/team' },
  { name: 'Contact', href: '#contact' }
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      if (pathname === '/') {
        const sections = document.querySelectorAll('section[id]')
        const scrollPosition = window.scrollY + window.innerHeight / 3
        
        let currentSection = 'hero'
        Array.from(sections).forEach((section) => {
          const htmlSection = section as HTMLElement
          if (scrollPosition >= htmlSection.offsetTop) {
            currentSection = htmlSection.id
          }
        })
        setActiveSection(currentSection)
      } else {
        setActiveSection('')
      }
    }
    
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  const handleNavigation = (href: string) => {
    setIsOpen(false)
    if (href.startsWith('/')) {
      router.push(href)
    } else {
      if (pathname === '/') {
        smoothScroll(href)
      } else {
        router.push(`/${href}`)
      }
    }
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-950/80 backdrop-blur-md shadow-lg shadow-indigo-500/10' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => handleNavigation('#hero')}
            className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
          >
            E-Waste
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const isActive = (pathname === item.href) || (pathname === '/' && activeSection === item.href.substring(1))
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out
                    ${ isActive
                      ? 'bg-indigo-500/20 text-indigo-300 shadow-inner'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  {item.name}
                </button>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-indigo-400 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden mt-4 overflow-hidden"
            >
              <div className="flex flex-col space-y-2 pt-2 pb-4">
                {navItems.map((item) => {
                   const isActive = (pathname === item.href) || (pathname === '/' && activeSection === item.href.substring(1))
                   return (
                    <button
                      key={item.name}
                      onClick={() => handleNavigation(item.href)}
                      className={`block px-4 py-3 rounded-md text-base font-medium text-left transition-all duration-200 ease-in-out
                      ${ isActive
                        ? 'bg-indigo-500/20 text-indigo-300'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {item.name}
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
} 