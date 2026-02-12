import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  devIndicators: false,

  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '**'
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '**'
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/v1/images/**'
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '3001',
        pathname: '/v1/images/**'
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9000',
        pathname: '/**'
      },
      {
        protocol: 'http',
        hostname: 'minio',
        port: '9000',
        pathname: '/**'
      }
    ]
  }
};

export default nextConfig;
