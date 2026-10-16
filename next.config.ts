import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Avoid picking up a stray lockfile in a parent directory during traces
  outputFileTracingRoot: path.join(__dirname),
  async redirects() {
    return [
      {
        source: "/:city(hyderabad|bhubaneswar)/visit",
        destination: "/:city/contact",
        permanent: true,
      },
      {
        source: "/:city(hyderabad|bhubaneswar)/services",
        destination: "/:city/gallery",
        permanent: true,
      },
      {
        source: "/:city(hyderabad|bhubaneswar)/process",
        destination: "/:city/about",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "waytowebs.in",
        pathname: "/vivid/wp-content/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
