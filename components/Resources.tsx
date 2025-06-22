'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa'

interface ResourcesProps {
  debug?: boolean
}

const resources = {
  links: [
    {
      title: "EPA - Electronics Donation and Recycling",
      url: "https://www.epa.gov/recycle/electronics-donation-and-recycling",
      description: "Official EPA guide on how to properly recycle and donate electronics, including information about e-waste regulations and recycling programs."
    },
    {
      title: "E-Stewards - Responsible Electronics Recycling",
      url: "https://www.e-stewards.org/",
      description: "Global leader in responsible electronics recycling, offering certification and standards for e-waste management."
    },
    {
      title: "Basel Action Network",
      url: "https://www.ban.org/",
      description: "Non-profit organization dedicated to combating the export of toxic waste to developing countries."
    },
    {
      title: "World Health Organization - E-waste",
      url: "https://www.who.int/news-room/fact-sheets/detail/electronic-waste-(e-waste)",
      description: "WHO's comprehensive information about e-waste health impacts and management guidelines."
    }
  ],
  videos: [
    {
      title: "The Story of Electronics",
      embedId: "sW_7i6T_H78",
      description: "An eye-opening look at the lifecycle of electronics and the impact of e-waste on our environment."
    },
    {
      title: "How 6 Million Pounds Of Electronic Waste Gets Recycled A Month",
      embedId: "S2lmPIWxHW0",
      description: "A behind-the-scenes look at one of the largest e-waste recycling facilities in the world."
    },
    {
      title: "The Dark Side of Electronic Waste Recycling",
      embedId: "dd_ZttK3PuM",
      description: "An investigative report on the global e-waste crisis and its environmental impact."
    }
  ],
  images: [
    {
      src: "/images/e-waste-1.png",
      alt: "E-waste Collection Center",
      description: "A large pile of discarded circuit boards and electronic components, representing the growing problem of e-waste."
    },
    {
      src: "/images/e-waste-2.png",
      alt: "Circuit Board Recycling",
      description: "A close-up of tangled wires and cables, highlighting the complexity of recycling electronic waste."
    },
    {
      src: "/images/e-waste-3.png",
      alt: "E-waste Impact",
      description: "Disassembled electronic devices and circuit boards, ready to be processed for recycling."
    },
    {
      src: "/images/e-waste-4.png",
      alt: "Recycling Process",
      description: "A worker in a recycling facility sorting through piles of electronic waste."
    },
    {
      src: "/images/e-waste-5.png",
      alt: "Sustainable Technology",
      description: "A heap of old, broken electronics and computer parts, showing the environmental impact of improper disposal."
    },
    {
      src: "/images/e-waste-6.png",
      alt: "Community Recycling",
      description: "A collection of used batteries and small electronics, emphasizing the need for proper recycling methods."
    }
  ]
}

export default function Resources({ debug = false }: ResourcesProps) {
  console.log('Resources component rendering')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isMuted, setIsMuted] = useState(true)

  const toggleSound = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play().catch(console.error)
      } else {
        audioRef.current.pause()
      }
      setIsMuted(!isMuted)
    }
  }

  useEffect(() => {
    const audioElement = audioRef.current
    if (audioElement) {
      audioElement.loop = true
    }
    return () => {
      if (audioElement) {
        audioElement.pause()
      }
    }
  }, [])

  if (debug) {
    console.log('Resources component in debug mode')
  }

  return (
    <div className="w-full py-20 relative">
      <div className="px-4">
        <h2 className="text-4xl md:text-6xl font-bold mb-16 tech-heading text-center flex items-center justify-center gap-4">
          <span>♻️</span> E-Waste Resources <span>🌍</span>
        </h2>

        {/* Sound effect button */}
        <div className="flex justify-center mb-12">
          <button
            className="tech-button flex items-center gap-3 text-lg px-8 py-4"
            onClick={toggleSound}
            aria-label="Toggle sound effect"
          >
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            <span>{isMuted ? 'Turn Sound On' : 'Mute Sound'}</span>
          </button>
          <audio ref={audioRef} src="/sounds/recycling.mp3" preload="auto" />
        </div>

        {/* Poster Section */}
        <div className="max-w-5xl mx-auto">
          <div className="tech-card p-8 mb-16">
            <h3 className="text-2xl font-bold mb-4 tech-heading flex items-center gap-2">🖼️ E-Waste Awareness Poster</h3>
            <div 
              className="relative w-full h-[400px] md:h-[600px] rounded-lg overflow-hidden cursor-pointer group"
              onClick={() => setSelectedImage('/images/e-waste-poster.png')}
            >
              <img
                src="/images/e-waste-poster.png"
                alt="E-Waste Awareness Poster"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => console.error('Poster image failed to load:', e)}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <span className="text-white text-2xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">Click to expand</span>
              </div>
            </div>
            <p className="mt-4 text-gray-300">
              <b>Description:</b> This poster illustrates the lifecycle of electronic devices, from production to disposal, highlighting the importance of proper e-waste recycling. It includes key statistics, environmental impact, and practical steps for responsible e-waste management.
            </p>
          </div>
        </div>

        {/* Links Section */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="tech-card p-8 mb-16">
            <h3 className="text-2xl font-bold mb-6 tech-heading flex items-center gap-2">🔗 Useful Links</h3>
            <div className="grid gap-6">
              {resources.links.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-6 tech-card hover:scale-105 transition-transform"
                  whileHover={{ scale: 1.02 }}
                >
                  <h4 className="text-xl font-semibold mb-2">{link.title}</h4>
                  <p className="text-gray-300">{link.description}</p>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Videos Section */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="tech-card p-8 mb-16">
            <h3 className="text-2xl font-bold mb-6 tech-heading flex items-center gap-2">🎥 Educational Videos</h3>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {resources.videos.map((video, index) => (
                <div key={index} className="tech-card p-4">
                  <h4 className="text-xl font-semibold mb-4">{video.title}</h4>
                  <div className="relative pb-[56.25%] h-0">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full rounded-lg"
                      src={`https://www.youtube.com/embed/${video.embedId}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <p className="mt-4 text-gray-300">{video.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Image Gallery Section */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="tech-card p-8">
            <h3 className="text-2xl font-bold mb-6 tech-heading flex items-center gap-2">📸 Image Gallery</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {resources.images.map((image, index) => (
                <motion.div
                  key={index}
                  className="tech-card overflow-hidden cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedImage(image.src)}
                >
                  <div className="relative h-64">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      onError={(e) => console.error(`Image ${index + 1} failed to load:`, e)}
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold mb-2">{image.alt}</h4>
                    <p className="text-gray-300">{image.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl w-full">
              <img
                src={selectedImage}
                alt="Enlarged view"
                className="w-full h-auto rounded-lg"
              />
              <button
                className="absolute top-4 right-4 text-white text-2xl"
                onClick={() => setSelectedImage(null)}
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 