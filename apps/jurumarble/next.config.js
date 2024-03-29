console.log('START');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  transpilePackages: ['@monorepo/ui, @monorepo/hooks'],
  images: {
    unoptimized: true,
    domains: [
      'shopping-phinf.pstatic.net',
      'elasticbeanstalk-ap-northeast-2-319210348301.s3.ap-northeast-2.amazonaws.com',
      'tong.visitkorea.or.kr',
      'img.danawa.com',
      'sulsulsul.com',
      'shop-phinf.pstatic.net',
      'modo-phinf.pstatic.net',
      'cdn-pro-web-251-115.cdn-nhncommerce.com',
      'lh3.googleusercontent.com',
      'cdn-std-web-220-13.cdn-nhncommerce.com',
      'cdn.imweb.me',
      'www.xn--2q1bq25atga3iu9cz95a.com',
      'www.seenews365.com',
      'www.seongpo.co.kr',
    ],
  },
};

module.exports = (_phase) => {
  const plugins = [withBundleAnalyzer];
  return plugins.reduce((acc, plugin) => plugin(acc), {
    ...nextConfig,
  });
};
