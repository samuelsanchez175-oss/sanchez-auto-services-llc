import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Static HTML in `out/` — open `out/index.html` locally (prefer `npm run preview:site` over double‑click). */
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
