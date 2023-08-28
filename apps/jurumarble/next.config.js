/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  transpilePackages: ["@monorepo/ui, @monorepo/hooks"],
};

module.exports = nextConfig;
