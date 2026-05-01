import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.ssvmtransformingindia.com",
        pathname: "/assets/images/**",
      },
    ],
  },
};

export default nextConfig;