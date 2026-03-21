import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'argo-adventures-backend.local',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'argo-adventures-backend.local', // Keep this for your local dev
        pathname: '/wp-content/uploads/**',
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;