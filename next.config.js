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
  async redirects() {
    return [
      {
        source: '/html',
        destination: '/html/index.html',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig