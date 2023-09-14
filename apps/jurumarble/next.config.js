/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  transpilePackages: ["@monorepo/ui, @monorepo/hooks"],
  images: {
    domains: ["shopping-phinf.pstatic.net"],
  },
};

module.exports = nextConfig;
