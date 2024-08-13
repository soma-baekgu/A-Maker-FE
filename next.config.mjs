/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["a-maker-dev.s3.ap-northeast-2.amazonaws.com", "lh3.googleusercontent.com"],
    },
};

export default nextConfig;
