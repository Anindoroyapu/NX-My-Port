/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
  fontFamily: {
    permanentMarker: ["Permanent Marker", "cursive"],
    rammetto: ["Rammetto One", "cursive"],
  },
    plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default nextConfig;
