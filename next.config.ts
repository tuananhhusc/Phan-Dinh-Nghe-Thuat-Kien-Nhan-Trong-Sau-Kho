import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV === "development",
});

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/Phan-Dinh-Nghe-Thuat-Kien-Nhan-Trong-Sau-Kho" : "",
  images: {
    unoptimized: true,
  },
};

export default withSerwist(nextConfig);
