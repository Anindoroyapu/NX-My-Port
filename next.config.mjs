/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["raw.githubusercontent.com"],
  },
  fontFamily: {
    permanentMarker: ["Permanent Marker", "cursive"],
    rammetto: ["Rammetto One", "cursive"],
  },
};

export default nextConfig;
