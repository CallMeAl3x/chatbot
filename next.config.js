/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    AUTH_SECRET: process.env.AUTH_SECRET,
    DATABASE_URL: process.env.DATABASE_URL
  },
  eslint: {
    ignoreDuringBuilds: true // Disable eslint during build for test
  }
};

module.exports = nextConfig;
