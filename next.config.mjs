/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "utfs.io",
                port: "",
            },
        ]
    }
};

export default nextConfig;
