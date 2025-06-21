'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPlay, FaInfoCircle } from 'react-icons/fa'

const videos = [
  {
    id: 1,
    title: 'The Journey of E-Waste',
    description: 'Follow the path of electronic waste from disposal to recycling.',
    thumbnail: '/videos/journey-thumb.jpg',
    duration: '4:30',
    category: 'Educational'
  },
  {
    id: 2,
    title: 'Inside Our Recycling Facility',
    description: 'Take a tour of our state-of-the-art recycling facility.',
    thumbnail: '/videos/facility-thumb.jpg',
    duration: '5:45',
    category: 'Behind the Scenes'
  },
  {
    id: 3,
    title: 'Impact on Communities',
    description: 'See how e-waste recycling benefits local communities.',
    thumbnail: '/videos/community-thumb.jpg',
    duration: '3:15',
    category: 'Social Impact'
  },
  {
    id: 4,
    title: 'Innovation in Action',
    description: 'Discover our latest recycling technologies and processes.',
    thumbnail: '/videos/innovation-thumb.jpg',
    duration: '6:20',
    category: 'Technology'
  }
]

export default function VideoHub() {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null)
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null)

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            Learn More
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore our educational videos to understand the importance of
            proper e-waste recycling and our innovative solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              onHoverStart={() => setHoveredVideo(video.id)}
              onHoverEnd={() => setHoveredVideo(null)}
              onClick={() => setSelectedVideo(video.id)}
              className="relative cursor-pointer group"
            >
              <div className="relative aspect-video rounded-xl overflow-hidden">
                {/* Placeholder for video thumbnail */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-surface-dark" />
                
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <div className="w-16 h-16 rounded-full bg-primary-500/80 backdrop-blur-sm flex items-center justify-center">
                    <FaPlay className="w-6 h-6 text-white ml-1" />
                  </div>
                </motion.div>

                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-surface-dark to-transparent">
                  <span className="inline-block px-2 py-1 rounded-full bg-primary-500/20 text-primary-400 text-sm mb-2">
                    {video.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">{video.title}</h3>
                  <p className="text-gray-300 text-sm">{video.description}</p>
                </div>

                <div className="absolute top-4 right-4 flex items-center space-x-2">
                  <span className="px-2 py-1 rounded-full bg-surface-dark/80 backdrop-blur-sm text-white text-sm">
                    {video.duration}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video Modal */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
              onClick={() => setSelectedVideo(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-4xl aspect-video bg-surface-dark rounded-xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <FaInfoCircle className="w-12 h-12 text-gray-500" />
                  <p className="text-gray-500 mt-4">Video player placeholder</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
} 