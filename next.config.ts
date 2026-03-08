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
    ],
    unoptimized: true,
  },
};

export default nextConfig;