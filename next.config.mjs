import { url } from 'inspector';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images : {
    dangerouslyAllowSVG: true,
    domains: ['api.dicebear.com']
  }
};

export default nextConfig;
