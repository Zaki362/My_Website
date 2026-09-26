import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  images: {
    unoptimized: true
  },
  async redirects() {
    return [{ source: "/projects/codex-widget-promo.html", destination: "/projects/codex-widget", permanent: true }];
  }
};

export default nextConfig;
