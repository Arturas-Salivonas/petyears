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
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['framer-motion', '@vercel/analytics', '@next/third-parties'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  compress: true,
  // Reduce bundle size
  modularizeImports: {
    'framer-motion': {
      transform: 'framer-motion/{{member}}',
    },
  },
  // Additional optimizations
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Better code splitting
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Vendor chunk
          vendor: {
            name: 'vendors',
            chunks: 'all',
            test: /node_modules/,
            priority: 20,
          },
          // Framework chunk (React, Next.js)
          framework: {
            name: 'framework',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler|next)[\\/]/,
            priority: 30,
            enforce: true,
          },
          // Framer Motion separate chunk
          motion: {
            name: 'framer-motion',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](framer-motion)[\\/]/,
            priority: 25,
            enforce: true,
          },
          // Commons chunk
          commons: {
            name: 'commons',
            minChunks: 2,
            priority: 10,
          },
        },
      };

      // Minimize bundle size
      config.optimization.minimize = true;
    }
    return config;
  },
  // Add headers for better caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      // Cache static assets for 1 year
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache images for 1 year with stale-while-revalidate
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, stale-while-revalidate=86400',
          },
        ],
      },
      // Cache other static files
      {
        source: '/:path*.{jpg,jpeg,png,gif,webp,svg,ico}',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
