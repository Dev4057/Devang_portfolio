/** @type {import('next').NextConfig} */
const nextConfig = {
  // On Windows + OneDrive, the default `.next/` build cache gets corrupted
  // (EINVAL readlink, missing chunks). Point to a local folder outside OneDrive.
  // Override per-env via NEXT_DIST_DIR (Vercel/CI keep the default).
  distDir: process.env.NEXT_DIST_DIR || ".next",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
