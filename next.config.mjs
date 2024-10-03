/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn2.thecatapi.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "28.media.tumblr.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "26.media.tumblr.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "25.media.tumblr.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "24.media.tumblr.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn1.theimageapi.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "27.media.tumblr.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "29.media.tumblr.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "30.media.tumblr.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "31.media.tumblr.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "32.media.tumblr.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
