/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        hostname: "coin-images.coingecko.com",
      }
    ],
  },
};

module.exports = nextConfig;
