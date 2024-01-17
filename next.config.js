/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   // typedRoutes: true,
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

module.exports = nextConfig;
