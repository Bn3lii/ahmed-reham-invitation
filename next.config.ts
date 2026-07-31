import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Make sure the OG image fonts ship with the serverless bundle
  outputFileTracingIncludes: {
    "/opengraph-image": ["./assets/**"],
    "/twitter-image": ["./assets/**"],
  },
  // Files in /public get no caching headers by default. These are content-hashed
  // (or never change), so let repeat visitors skip the download entirely.
  async headers() {
    return [
      {
        source: "/:file(curtain-video-BAKLj3Y5.mp4|newone.mp3|curtain-closed-Bpkadld4.jpg|curtain-open-C9MqdT6G.jpg|place-new-one.jpg)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
