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
};

module.exports = withTM(nextConfig);
