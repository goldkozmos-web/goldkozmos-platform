import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  async redirects() {
    return [
      {
        source: "/meditasyon-nefes-alani",
        destination: "/goldmind",
        permanent: true,
      },
      {
        source: "/icon",
        destination: "/icon.png",
        permanent: false,
      },
      {
        source: "/apple-icon",
        destination: "/apple-icon.png",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
