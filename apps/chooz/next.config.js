// eslint-disable-next-line @typescript-eslint/no-var-requires
const withTM = require("next-transpile-modules")(["@monorepo/ui", "@monorepo/hooks"]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  compiler: {
    styledComponents: true,
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
      // @todo 목 데이터에 해당 호스트 네임을 사용하는 이미지가 있어 임시로 추가해둠
      // s3로 부터 데이터 받게될시 제거)
      {
        protocol: "https",
        hostname: "mblogthumb-phinf.pstatic.net",
      },
    ],
  },
  experimental: {
    appDir: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.css$/,
      use: ["style-loader", "css-loader"],
    }),
      config.module.rules.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ["@svgr/webpack"],
      });

    return config;
  },
};

module.exports = withTM(nextConfig);
