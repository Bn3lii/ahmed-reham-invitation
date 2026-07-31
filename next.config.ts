import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Make sure the OG image fonts ship with the serverless bundle
  outputFileTracingIncludes: {
    "/opengraph-image": ["./assets/**"],
    "/twitter-image": ["./assets/**"],
  },
};

export default nextConfig;
