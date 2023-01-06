// eslint-disable-next-line @typescript-eslint/no-var-requires
const withTM = require("next-transpile-modules")(["@chooz/ui"]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    ignoreDuringBuilds: true,
    ignoreBuildErrors: true,
  },
  // images: {
  //   domains: ["https://i.ibb.co/"],
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      {
        protocol: "https",
        hostname: "picksel-bucket.s3.ap-northeast-2.amazonaws.com",
      },
    ],
  },
};

module.exports = withTM(nextConfig);
