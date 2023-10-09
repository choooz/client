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
      "img.danawa.com",
      "sulsulsul.com",
      "shop-phinf.pstatic.net",
      "www.sulseam.com",
      "mblogthumb-phinf.pstatic.net",
      "sogoodk.com",
      "modo-phinf.pstatic.net",
      "cdn-pro-web-251-115.cdn-nhncommerce.com",
      "lh3.googleusercontent.com",
    ],
  },
};

module.exports = nextConfig;
