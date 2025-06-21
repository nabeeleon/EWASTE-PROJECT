'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageContainer from '@/components/PageContainer'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

const initialFormData: FormData = {
  name: '',
  email: '',
  subject: '',
  message: ''
}

const contactInfo = [
  {
    title: 'Email',
    value: 'info@ewaste-recycling.com',
    icon: '📧'
  },
  {
    title: 'Phone',
    value: '+1 (555) 123-4567',
    icon: '📞'
  },
  {
    title: 'Address',
    value: '123 Recycling Way, Green City, EC0 123',
    icon: '📍'
  }
]

const socialLinks = [
  {
    name: 'Twitter',
    url: '#',
    icon: '𝕏'
  },
  {
    name: 'LinkedIn',
    url: '#',
    icon: '💼'
  },
  {
    name: 'Instagram',
    url: '#',
    icon: '📸'
  }
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSubmitStatus('success')
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }

    // Reset form after success
    if (submitStatus === 'success') {
      setTimeout(() => {
        setFormData(initialFormData)
        setSubmitStatus('idle')
      }, 3000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <PageContainer>
      <div className="container mx-auto px-4 py-16">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto"
        >
          <motion.h1 
            variants={item}
            className="text-4xl md:text-5xl font-bold text-gradient mb-8"
          >
            Get in Touch
          </motion.h1>

          <motion.p 
            variants={item}
            className="text-xl text-gray-300 mb-12"
          >
            We're here to help you make a difference in electronic waste recycling.
            Reach out to us through any of these channels:
          </motion.p>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-6"
            >
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  variants={item}
                  className="bg-surface-dark/80 backdrop-blur-md p-6 rounded-xl border border-primary-500/20"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{info.icon}</span>
                    <div>
                      <h3 className="text-gradient font-bold mb-1">{info.title}</h3>
                      <p className="text-gray-300">{info.value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-6"
            >
              <motion.div
                variants={item}
                className="bg-surface-dark/80 backdrop-blur-md p-6 rounded-xl border border-primary-500/20"
              >
                <h3 className="text-gradient font-bold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      className="text-2xl hover:text-primary-400 transition-colors"
                      title={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </motion.div>

              <motion.div
                variants={item}
                className="bg-surface-dark/80 backdrop-blur-md p-6 rounded-xl border border-primary-500/20"
              >
                <h3 className="text-gradient font-bold mb-4">Business Hours</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>Monday - Friday: 9:00 AM - 6:00 PM</li>
                  <li>Saturday: 10:00 AM - 4:00 PM</li>
                  <li>Sunday: Closed</li>
                </ul>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            variants={item}
            className="text-center text-gray-400"
          >
            <p>© 2024 E-Waste Recycling. All rights reserved.</p>
            <p className="mt-2">Making electronic recycling accessible and sustainable for everyone.</p>
          </motion.div>
        </motion.div>
      </div>
    </PageContainer>
  )
} 