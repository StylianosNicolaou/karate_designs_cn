export default async function handler(req, res) {
  const baseUrl = "https://karatedesignscn.com";

  // Define your pages with comprehensive SEO metadata
  const pages = [
    {
      url: "/",
      lastmod: new Date().toISOString(),
      changefreq: "weekly",
      priority: "1.0",
      // Enhanced metadata for karate searches
      title:
        "Karate Designs & Martial Arts Posters - Professional Karate Artwork",
      description:
        "Professional karate designs, martial arts posters, and custom karate artwork. Specializing in karate logo design, tournament posters, and martial arts branding.",
      keywords:
        "karate designs, karate posters, martial arts posters, karate artwork, tournament posters, martial arts design, dojo branding, karate logo, martial arts artwork, custom karate designs, karate tournament artwork, martial arts branding, karate dojo design, martial arts logo design, karate competition posters, martial arts studio branding, karate school design, martial arts marketing materials, karate event posters, martial arts visual identity",
    },
    {
      url: "/order",
      lastmod: new Date().toISOString(),
      changefreq: "monthly",
      priority: "0.9",
      title: "Order Custom Karate Designs & Martial Arts Posters",
      description:
        "Order custom karate designs, martial arts posters, and tournament artwork. Professional karate logo design and martial arts branding services.",
      keywords:
        "order karate designs, custom karate posters, martial arts artwork, karate logo design, buy karate designs, martial arts poster design, karate tournament artwork, martial arts branding services, custom dojo design, karate competition posters, martial arts marketing materials, karate school branding, martial arts studio design, karate event artwork, martial arts visual identity, karate dojo logo, martial arts competition design, karate tournament branding, martial arts promotional materials, karate school posters",
    },
    {
      url: "/checkout",
      lastmod: new Date().toISOString(),
      changefreq: "monthly",
      priority: "0.6",
      title: "Checkout - Karate Designs & Martial Arts Posters",
      description:
        "Secure checkout for karate designs, martial arts posters, and custom karate artwork orders.",
      keywords:
        "karate designs checkout, martial arts posters payment, karate artwork order, buy karate designs online, martial arts poster purchase, karate logo design payment, dojo branding checkout, martial arts artwork order, karate tournament poster payment, martial arts studio design purchase, karate school branding checkout, martial arts competition artwork order, karate event poster payment, martial arts marketing materials purchase, karate dojo design checkout",
    },
    {
      url: "/order-success",
      lastmod: new Date().toISOString(),
      changefreq: "monthly",
      priority: "0.4",
      title: "Order Confirmation - Karate Designs",
      description:
        "Order confirmation for karate designs, martial arts posters, and custom karate artwork.",
      keywords:
        "karate designs order confirmation, martial arts posters confirmation, karate artwork order success, dojo design confirmation, martial arts branding order success, karate tournament poster confirmation, martial arts studio design order, karate school branding confirmation, martial arts competition artwork success, karate event poster order confirmation, martial arts marketing materials success, karate dojo design confirmation, martial arts logo design order success, karate competition poster confirmation, martial arts visual identity order",
    },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${pages
    .map((page) => {
      return `
    <url>
      <loc>${baseUrl}${page.url}</loc>
      <lastmod>${page.lastmod}</lastmod>
      <changefreq>${page.changefreq}</changefreq>
      <priority>${page.priority}</priority>
      <image:image>
        <image:loc>${baseUrl}/logo.png</image:loc>
        <image:title>${page.title}</image:title>
        <image:caption>${page.description}</image:caption>
      </image:image>
    </url>
  `;
    })
    .join("")}
</urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=3600");
  res.write(sitemap);
  res.end();
}
