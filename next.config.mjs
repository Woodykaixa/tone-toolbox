import withOffline from "next-offline";

/** @type {import('next').NextConfig} */
const nextConfig = withOffline({});
nextConfig.generateStaticParams = nextConfig.exportPathMap;
nextConfig.exportPathMap = undefined;

export default nextConfig;
