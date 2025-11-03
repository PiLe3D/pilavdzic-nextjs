/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pilavdzic.org',
      },
    ],
  },
}

module.exports = nextConfig
