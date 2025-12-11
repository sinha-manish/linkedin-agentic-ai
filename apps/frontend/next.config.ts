import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    externalDir: true,
    optimizeCss: false, // IMPORTANT: disable LightningCSS so Tailwind works
  },
  transpilePackages: ["@pkg/types"],
};

export default nextConfig;
