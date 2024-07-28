/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        return config;
    },
    experimental: {
        forceSwcTransforms: true
    }
};

module.exports = nextConfig;
