import Head from "next/head";

export default function StructuredData({ type = "website" }) {
  const baseUrl = "https://karatedesignscn.com";

  const getStructuredData = () => {
    switch (type) {
      case "organization":
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Karate Designs CN",
          url: baseUrl,
          logo: `${baseUrl}/logo.png`,
          description:
            "Professional karate designs, martial arts posters, and custom karate artwork. Specializing in karate logo design, tournament posters, and martial arts branding with a minimalist, precise aesthetic.",
          sameAs: [
            "https://www.facebook.com/profile.php?id=100090942139320&locale=da_DK",
            "https://www.instagram.com/karate_designs.cn/",
            "https://x.com/karate_designs",
          ],
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer service",
            email: "stylianosnicolaou@gmail.com",
          },
          address: {
            "@type": "PostalAddress",
            addressCountry: "CN",
          },
          keywords:
            "karate designs, karate posters, martial arts design, karate logo, tournament posters, martial arts branding",
        };

      case "service":
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Karate Designs & Martial Arts Posters",
          provider: {
            "@type": "Organization",
            name: "Karate Designs CN",
          },
          description:
            "Professional karate designs, custom martial arts posters, tournament artwork, and karate logo creation. Specializing in minimalist, precise karate-themed design services.",
          serviceType: "Karate Design Services",
          areaServed: "Worldwide",
          keywords:
            "karate designs, karate posters, martial arts posters, karate artwork, tournament posters",
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Karate Design Packages",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Karate Logo Design",
                  description:
                    "Professional karate logo design with martial arts aesthetic and multiple concepts",
                  keywords: "karate logo, martial arts logo, dojo logo",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Karate Tournament Posters",
                  description:
                    "Custom karate tournament posters and martial arts event artwork",
                  keywords:
                    "karate posters, tournament posters, martial arts posters",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Martial Arts Branding",
                  description:
                    "Complete martial arts branding package including karate designs and social media kit",
                  keywords:
                    "martial arts branding, karate branding, dojo branding",
                },
              },
            ],
          },
        };

      case "website":
      default:
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Karate Designs CN",
          url: baseUrl,
          description:
            "Professional karate designs, martial arts posters, and custom karate artwork. Design with Discipline. Create with Purpose. Premium karate-themed design services with a minimalist, precise aesthetic.",
          keywords:
            "karate designs, karate posters, martial arts design, karate artwork, tournament posters, karate logo design",
          publisher: {
            "@type": "Organization",
            name: "Karate Designs CN",
            logo: {
              "@type": "ImageObject",
              url: `${baseUrl}/logo.png`,
            },
          },
          potentialAction: {
            "@type": "SearchAction",
            target: `${baseUrl}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
          mainEntity: {
            "@type": "CreativeWork",
            name: "Karate Designs Portfolio",
            description: "Professional karate designs and martial arts posters",
            keywords: "karate designs, karate posters, martial arts artwork",
          },
        };
    }
  };

  const structuredData = getStructuredData();

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </Head>
  );
}
