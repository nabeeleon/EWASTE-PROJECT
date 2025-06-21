/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Ensure pages are properly routed
  async redirects() {
    return []
  },
  images: {
    domains: ['placehold.co', 'images.unsplash.com'],
  },
}

module.exports = nextConfig 