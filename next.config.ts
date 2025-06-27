/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/storage/qrcodes/**',
      },
      // You can add more patterns if needed
    ],
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'farm-back-end-main-lmyfff.laravel.cloud',
    //     // port: '8000',
    //     pathname: '/storage/qrcodes/**',
    //   },
    //   // You can add more patterns if needed
    // ],
  },
};

const withNextIntl = require('next-intl/plugin')();

module.exports = withNextIntl(nextConfig);