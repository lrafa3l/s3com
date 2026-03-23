/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  // BUG 9 FIX: Removed `cacheComponents: true` — not a valid Next.js config key
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  reactCompiler: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
