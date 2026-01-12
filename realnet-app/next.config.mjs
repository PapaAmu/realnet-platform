// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Recommended for Docker
  experimental: {
    esmExternals: true,
  },
}

export default nextConfig;