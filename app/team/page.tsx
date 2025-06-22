'use client'

import { motion } from 'framer-motion'
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa'
import PageContainer from '@/components/PageContainer'

const teamMembers = [
  {
    name: 'Team Member 1',
    role: 'Project Lead',
    bio: 'The visionary behind the project, driving the team towards a sustainable future.',
    image: '/images/team/placeholder.png',
    social: {
      twitter: '#',
      linkedin: '#',
      github: '#',
    },
  },
  {
    name: 'Team Member 2',
    role: 'Lead 3D Artist',
    bio: 'Bringing digital components to life with incredible detail and artistry.',
    image: '/images/team/placeholder.png',
    social: {
      twitter: '#',
      linkedin: '#',
      github: '#',
    },
  },
  {
    name: 'Team Member 3',
    role: 'React Magician',
    bio: 'Crafting seamless user experiences with cutting-edge front-end technologies.',
    image: '/images/team/placeholder.png',
    social: {
      twitter: '#',
      linkedin: '#',
      github: '#',
    },
  },
  {
    name: 'Team Member 4',
    role: 'Backend Architect',
    bio: 'Building the robust and scalable infrastructure that powers our digital world.',
    image: '/images/team/placeholder.png',
    social: {
      twitter: '#',
      linkedin: '#',
      github: '#',
    },
  },
  {
    name: 'Your Name',
    role: 'AR Specialist',
    bio: 'Blending the digital and physical worlds to create immersive, interactive experiences.',
    image: '/images/team/placeholder.png',
    social: {
      twitter: '#',
      linkedin: '#',
      github: '#',
    },
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.15,
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  }),
}

const TeamPage = () => {
  return (
    <PageContainer>
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Our Team
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Meet the innovators and creators dedicated to raising awareness about e-waste through technology and design.
            </p>
          </div>
          <ul
            role="list"
            className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
          >
            {teamMembers.map((person, i) => (
              <motion.li
                key={person.name}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-8 shadow-2xl shadow-indigo-500/10 border border-indigo-500/20"
              >
                <img className="aspect-[1/1] w-full rounded-2xl object-cover" src={person.image} alt="" />
                <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-white">{person.name}</h3>
                <p className="text-base leading-7 text-indigo-400">{person.role}</p>
                <p className="mt-4 text-sm leading-6 text-gray-400">{person.bio}</p>
                <ul role="list" className="mt-6 flex gap-x-6">
                  <li>
                    <a href={person.social.twitter} className="text-gray-400 hover:text-indigo-400 transition-colors">
                      <span className="sr-only">Twitter</span>
                      <FaTwitter className="h-6 w-6" />
                    </a>
                  </li>
                  <li>
                    <a href={person.social.linkedin} className="text-gray-400 hover:text-indigo-400 transition-colors">
                      <span className="sr-only">LinkedIn</span>
                      <FaLinkedin className="h-6 w-6" />
                    </a>
                  </li>
                  <li>
                    <a href={person.social.github} className="text-gray-400 hover:text-indigo-400 transition-colors">
                      <span className="sr-only">GitHub</span>
                      <FaGithub className="h-6 w-6" />
                    </a>
                  </li>
                </ul>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </PageContainer>
  )
}

export default TeamPage 