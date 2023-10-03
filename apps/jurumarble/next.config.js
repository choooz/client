/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  transpilePackages: ["@monorepo/ui, @monorepo/hooks"],
  images: {
    domains: [
      "shopping-phinf.pstatic.net",
      "elasticbeanstalk-ap-northeast-2-319210348301.s3.ap-northeast-2.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
