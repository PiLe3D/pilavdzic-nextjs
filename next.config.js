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
      // Redirect /html to /html/index.html
      {
        source: '/html',
        destination: '/html/index.html',
        permanent: true,
      },
      
      // Subdomain: html.pilavdzic.org → pilavdzic.org/html
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: 'html.pilavdzic.org',
          },
        ],
        destination: 'https://pilavdzic.org/html/index.html',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'html.pilavdzic.org',
          },
        ],
        destination: 'https://pilavdzic.org/html/:path*',
        permanent: true,
      },
      
      // DODAJ NOVE SUBDOMEN-E OVDJE:
      // {
      //   source: '/',
      //   has: [{ type: 'host', value: 'novi.pilavdzic.org' }],
      //   destination: 'https://pilavdzic.org/novi-folder',
      //   permanent: true,
      // },
    ];
  },
}

module.exports = nextConfig