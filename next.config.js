/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "karatedesignscn.com",
        port: "",
        pathname: "/**",
      },
    ],
    formats: ["image/webp", "image/avif"],
  },

  // Enable compression
  compress: true,

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, max-age=0",
          },
        ],
      },
    ];
  },

  // Redirects for SEO - Comprehensive karate-related keywords
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/karate-designs",
        destination: "/",
        permanent: true,
      },
      {
        source: "/karate-posters",
        destination: "/",
        permanent: true,
      },
      {
        source: "/martial-arts-posters",
        destination: "/",
        permanent: true,
      },
      {
        source: "/karate-artwork",
        destination: "/",
        permanent: true,
      },
      {
        source: "/tournament-posters",
        destination: "/",
        permanent: true,
      },
      {
        source: "/dojo-branding",
        destination: "/",
        permanent: true,
      },
      {
        source: "/karate-logo",
        destination: "/",
        permanent: true,
      },
      {
        source: "/martial-arts-design",
        destination: "/",
        permanent: true,
      },
      {
        source: "/karate-tournament-artwork",
        destination: "/",
        permanent: true,
      },
      {
        source: "/martial-arts-branding",
        destination: "/",
        permanent: true,
      },
      {
        source: "/karate-competition-posters",
        destination: "/",
        permanent: true,
      },
      {
        source: "/martial-arts-studio-branding",
        destination: "/",
        permanent: true,
      },
      {
        source: "/karate-school-design",
        destination: "/",
        permanent: true,
      },
      {
        source: "/martial-arts-marketing-materials",
        destination: "/",
        permanent: true,
      },
      {
        source: "/karate-event-posters",
        destination: "/",
        permanent: true,
      },
      {
        source: "/martial-arts-visual-identity",
        destination: "/",
        permanent: true,
      },
    ];
  },

  // Rewrites for clean URLs (removed sitemap rewrite since we have direct file)
  async rewrites() {
    return [];
  },

  // Enable experimental features for better performance
  experimental: {
    scrollRestoration: true,
  },
};

module.exports = nextConfig;
