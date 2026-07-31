import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Make sure the OG image fonts ship with the serverless bundle
  outputFileTracingIncludes: {
    "/opengraph-image": ["./assets/**"],
    "/twitter-image": ["./assets/**"],
  },
  // Files in /public get no caching headers by default. These carry a version
  // suffix, so bump the suffix when the content changes and repeat visitors can
  // skip the download entirely.
  async headers() {
    return [
      {
        source: "/:file(curtain-video-v2.mp4|newone-v2.mp3|curtain-closed-v2.jpg|curtain-open-v2.jpg|place-new-one-v2.jpg)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
