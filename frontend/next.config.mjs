/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.akamai.steamstatic.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cdn.akamai.steamstatic.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "imgur.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;