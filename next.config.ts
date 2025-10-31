import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true, // Required for static export
  },
  // Enable experimental features for better static export
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Enable compression and minification
  compress: true,
};

export default nextConfig;
