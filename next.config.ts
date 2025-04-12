import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    extends: [
        //...
        'plugin:@next/next/recommended',
    ],
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
