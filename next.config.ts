import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    useTypeScriptCli: false,
  },
  async redirects() {
    return [
      { source: "/", destination: "/vi", permanent: false },
      { source: "/about", destination: "/vi/about", permanent: true },
      { source: "/projects", destination: "/vi/projects", permanent: true },
      { source: "/blog", destination: "/vi/blog", permanent: true },
      { source: "/photos", destination: "/vi/photos", permanent: true },
    ];
  },
};

export default nextConfig;
