import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.redseam.redberryinternship.ge",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
