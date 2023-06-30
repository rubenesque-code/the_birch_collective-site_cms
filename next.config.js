/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "localhost",
      "images.unsplash.com",
      "127.0.0.1",
    ],
  },
};

module.exports = nextConfig;
