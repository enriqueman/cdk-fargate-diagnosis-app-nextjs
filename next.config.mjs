/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    trailingSlash: false,
    images: {
      unoptimized: true,
    },
    async rewrites() {
      return [
        {
          source: '/:path*',
          destination: '/:path*',
        },
        // {
        //   source: '/:path*',
        //   destination: '/',
        // },
      ];
    },
  };
  
  export default nextConfig;
  