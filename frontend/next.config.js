/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
async rewrites() {
  return [
    {
      source: '/api/:path*',
      destination: 'http://127.0.0.1:5000/api/:path*', // Proxy API calls
    },
  ];
},
};

module.exports = nextConfig;
