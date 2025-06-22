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
      staggerChildren: 0.3,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
}

const ContactPage = () => {
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
      <div className="py-16">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center"
        >
          <motion.h1
            variants={item}
            className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-4 max-w-2xl mx-auto text-xl text-gray-400"
          >
            We'd love to hear from you. Whether you have a question about our project, want to collaborate, or just want to say hi, our door is always open.
          </motion.p>
        </motion.div>
      </div>
    </PageContainer>
  )
}

export default ContactPage 