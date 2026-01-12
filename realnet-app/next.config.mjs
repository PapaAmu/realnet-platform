// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Recommended for Docker
  devIndicators: {
    buildActivity: false,
    appIsrStatus: false,
  },
  experimental: {
    esmExternals: true,
  },
}

export default nextConfig;