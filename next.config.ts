import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Propulse Landing Page Configuration */
  reactStrictMode: true,

  /* Image optimization */
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
        pathname: '/**',
      },
    ],
  },

  /* Production optimizations */
  poweredByHeader: false,
  compress: true,

  /* Environment variables available to browser */
  env: {
    SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://propulse-association.fr',
  },
};

export default nextConfig;
