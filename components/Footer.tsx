'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const footerLinks = {
  'About': [
    { label: 'Our Mission', href: '/about#mission' },
    { label: 'Impact', href: '/about#impact' },
    { label: 'Team', href: '/about#team' }
  ],
  'Solutions': [
    { label: 'Recycling Methods', href: '/solutions#methods' },
    { label: 'Interactive Guide', href: '/solutions' },
    { label: 'Success Stories', href: '/solutions#stories' }
  ],
  'Get Involved': [
    { label: 'Recycling Centers', href: '/contact#centers' },
    { label: 'Volunteer', href: '/contact#volunteer' },
    { label: 'Donate', href: '/contact#donate' }
  ],
  'Resources': [
    { label: 'Blog', href: '/blog' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' }
  ]
}

const socialLinks = [
  { label: 'Twitter', href: 'https://twitter.com', icon: '𝕏' },
  { label: 'GitHub', href: 'https://github.com', icon: '🐙' },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: '💼' },
  { label: 'Instagram', href: 'https://instagram.com', icon: '📸' }
]

export default function Footer() {
  return (
    <footer className="bg-black border-t border-cyan-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-cyan-300 font-bold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-cyan-300 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-cyan-900/30">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent mb-4 md:mb-0"
          >
            E-Waste Reborn
          </motion.div>

          <div className="flex space-x-6">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="text-2xl text-gray-400 hover:text-cyan-300 transition-colors"
                title={link.label}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} E-Waste Reborn. All rights reserved.</p>
          <p className="mt-2">
            Made with 💙 for a sustainable future. Powered by{' '}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-500 hover:text-cyan-400"
            >
              Next.js
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
} 