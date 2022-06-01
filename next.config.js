/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    CAREER_BEGINNING: new Date('2016-08-01'),
  },
  reactStrictMode: true,
  poweredByHeader: false,
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/home',
      },
    ]
  },
  webpack5: true,
  webpack: (config, {isServer}) => {
    config.module.rules.push(
      {
        test: /\.md$/,
        loader: 'frontmatter-markdown-loader',
        options: {mode: ['react-component']}
      }
    )
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        buffer: false,
        path: false,
        process: false,
      }
    }
    return config
  },
  images: {
    loader: 'custom',
    minimumCacheTTL: 60 * 60,
  },
  experimental: {
    images: {
      layoutRaw: true,
    },
  },
}

module.exports = nextConfig
