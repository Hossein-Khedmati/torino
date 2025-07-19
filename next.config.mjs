/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizeCss: true, // فعال کردن بهینه‌سازی CSS
  },
    images: {
    domains: ['localhost'],
  },
};

export default nextConfig;
