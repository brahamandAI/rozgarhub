/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizeCss: true,
    optimizeFonts: true,
  },
  webpack: (config) => {
    return config;
  },
}

module.exports = nextConfig 