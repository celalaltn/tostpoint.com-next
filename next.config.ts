import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config: any) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    config.resolve.alias.fs = false;
    config.resolve.alias.path = false;
    
    // Ignore pdfjs-dist canvas dependency
    config.externals = config.externals || [];
    config.externals.push({
      canvas: 'canvas',
    });
    
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/html/:path*',
        destination: '/html/:path*',
      },
    ];
  },
};

export default nextConfig;
