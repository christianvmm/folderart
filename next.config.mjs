/** @type {import('next').NextConfig} */
const nextConfig = {
   experimental: {
      serverComponentsExternalPackages: ['@napi-rs/canvas'],
   },
}

export default nextConfig
