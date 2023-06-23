/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "localhost",
      "images.unsplash.com",
    ],
  },
};

module.exports = nextConfig;
