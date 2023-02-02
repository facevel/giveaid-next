/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/ngo/dashboard/requests',
        destination: '/ngo/dashboard/requests/manage',
        permanent: true,
      },
      {
        source: '/ngo/dashboard/donations',
        destination: '/ngo/dashboard/donations/track',
        permanent: true,
      },
      {
        source: '/ngo/dashboard/settings',
        destination: '/ngo/dashboard/settings/general',
        permanent: true,
      },
    ]
  },
  reactStrictMode: true,
}

module.exports = nextConfig
