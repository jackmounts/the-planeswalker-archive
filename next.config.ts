import type { NextConfig } from "next";

const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

const nextConfig: NextConfig = withPWA({
  images: {
    localPatterns: [
      {
        pathname: "/public",
        search: "",
      },
    ],
  },
});

export default nextConfig;
