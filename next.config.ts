import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/:path*", // Cattura tutti i percorsi (/*)
        destination: "/pages/:path*", // Mappa internamente su /pages/*
      },
    ];
  },
  images: {
    localPatterns: [
      {
        pathname: "/public",
        search: "",
      },
    ],
  },
};

export default nextConfig;
