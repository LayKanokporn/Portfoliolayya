import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project so Next ignores any stray
  // package-lock.json outside the project (e.g. in the home directory).
  outputFileTracingRoot: path.join(__dirname),
  images: {
    // `domains` is deprecated in Next 15 — use remotePatterns instead.
    remotePatterns: [
      { protocol: "https", hostname: "static.vecteezy.com" },
    ],
  },
};

export default nextConfig;
