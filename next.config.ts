import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/fitness' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/fitness' : '',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
