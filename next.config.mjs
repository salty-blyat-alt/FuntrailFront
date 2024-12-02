/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["placehold.co", 'www.svgrepo.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      { protocol: "https", hostname: "placehol.co" },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "www.google.com",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig; 