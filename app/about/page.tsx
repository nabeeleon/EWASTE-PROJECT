'use client'

import { motion } from 'framer-motion'

const teamMembers = [
  {
    name: 'Sarah Chen',
    role: 'Founder & CEO',
    bio: 'Environmental scientist with 15 years of experience in e-waste management.',
    image: '/images/team/sarah.jpg'
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Head of Technology',
    bio: 'Expert in sustainable technology and circular economy solutions.',
    image: '/images/team/marcus.jpg'
  },
  {
    name: 'Aisha Patel',
    role: 'Sustainability Director',
    bio: 'Specialist in environmental impact assessment and green initiatives.',
    image: '/images/team/aisha.jpg'
  }
]

const milestones = [
  {
    year: '2020',
    title: 'Foundation',
    description: 'E-Waste Reborn was established with a mission to revolutionize electronic waste management.'
  },
  {
    year: '2021',
    title: 'First Recycling Center',
    description: 'Opened our first state-of-the-art recycling facility in California.'
  },
  {
    year: '2022',
    title: 'Global Expansion',
    description: 'Expanded operations to Europe and Asia, partnering with local organizations.'
  },
  {
    year: '2023',
    title: 'Innovation Award',
    description: 'Received the Global Sustainability Innovation Award for our recycling technologies.'
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/20 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent"
          >
            Our Mission
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-cyan-100 max-w-3xl mx-auto leading-relaxed"
          >
            At E-Waste Reborn, we're committed to transforming the way we handle electronic waste.
            Our mission is to create a sustainable future where technology and environmental
            responsibility go hand in hand.
          </motion.p>
        </div>
      </section>

      {/* Team Section */}
      <section className="min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent"
          >
            Meet Our Team
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-cyan-900/10 rounded-2xl p-8 border border-cyan-500/20 backdrop-blur-lg
                         hover:shadow-[0_0_30px_rgba(0,255,255,0.2)] transition-all duration-300"
              >
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full opacity-20 animate-pulse" />
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full border-2 border-cyan-500/30"
                  />
                </div>
                <h3 className="text-2xl font-bold text-cyan-300 text-center mb-2">{member.name}</h3>
                <p className="text-cyan-100 text-center mb-4">{member.role}</p>
                <p className="text-gray-400 text-center">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent"
          >
            Our Journey
          </motion.h2>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-cyan-500/20" />
            {/* Timeline Items */}
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-cyan-500 rounded-full" />
                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}> 
                    <div className="bg-cyan-900/10 rounded-2xl p-6 border border-cyan-500/20 backdrop-blur-lg">
                      <div className="text-xl font-bold text-cyan-300 mb-2">{milestone.year}</div>
                      <h3 className="text-2xl font-bold text-white mb-2">{milestone.title}</h3>
                      <p className="text-gray-400">{milestone.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-cyan-900/10 rounded-2xl p-8 text-center border border-cyan-500/20 backdrop-blur-lg"
            >
              <div className="text-4xl font-bold text-cyan-300 mb-2">50K+</div>
              <div className="text-cyan-100">Devices Recycled</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-cyan-900/10 rounded-2xl p-8 text-center border border-cyan-500/20 backdrop-blur-lg"
            >
              <div className="text-4xl font-bold text-cyan-300 mb-2">20+</div>
              <div className="text-cyan-100">Global Partners</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-cyan-900/10 rounded-2xl p-8 text-center border border-cyan-500/20 backdrop-blur-lg"
            >
              <div className="text-4xl font-bold text-cyan-300 mb-2">95%</div>
              <div className="text-cyan-100">Recovery Rate</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-cyan-900/10 rounded-2xl p-8 text-center border border-cyan-500/20 backdrop-blur-lg"
            >
              <div className="text-4xl font-bold text-cyan-300 mb-2">80+</div>
              <div className="text-cyan-100">Workshops Held</div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
} 