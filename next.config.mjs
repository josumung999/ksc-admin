/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "https://easylife-api.vercel.app/api/v1/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "easylife-files.s3.eu-central-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
