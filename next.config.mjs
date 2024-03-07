/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'assets.vercel.com',
            port: '',
         },
      ],
   },
   experimental: {
      serverComponentsExternalPackages: ['@napi-rs/canvas'],
   },
}

export default nextConfig
