/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Add remote hosts here as needed, e.g. Supabase Storage domain.
    remotePatterns: [],
  },
};

export default nextConfig;
