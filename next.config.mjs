/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "torino-backend-1.onrender.com",
        port: "",
        pathname: "/static/images/**",
      },
    ],
  },
};

export default nextConfig;
