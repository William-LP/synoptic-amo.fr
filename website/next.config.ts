import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  basePath,
  assetPrefix: basePath,
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      // local Strapi dev server
      { protocol: "http", hostname: "localhost", port: "1337", pathname: "/uploads/**" },
      // production Strapi (any HTTPS host)
      { protocol: "https", hostname: "**", pathname: "/uploads/**" },
    ],
  },
};

export default nextConfig;
