import Head from "next/head";
import StructuredData from "./StructuredData";

export default function SEOHead({
  title = "Karate Designs CN | Design with Discipline",
  description = "Karate Designs CN is a creative studio offering premium branding, website, and design services inspired by discipline and precision. View our gallery and discover our custom design packages.",
  keywords = "karate designs, karate posters, martial arts posters, karate artwork, tournament posters, martial arts design, dojo branding, karate logo, martial arts artwork, custom karate designs, karate tournament artwork, martial arts branding, karate dojo design, martial arts logo design, karate competition posters, martial arts studio branding, karate school design, martial arts marketing materials, karate event posters, martial arts visual identity, minimalist design, creative agency, brand identity, graphic design, logo design, social media kit, website design, visual identity, branding services, custom design, professional design, design studio, creative services, martial arts marketing, karate branding, dojo design, tournament artwork, competition posters, martial arts studio design, karate school branding, martial arts competition design, karate event artwork, martial arts promotional materials, karate dojo logo, martial arts visual branding, karate tournament branding, martial arts studio logo, karate school logo, martial arts competition artwork, karate event branding, martial arts marketing design, karate dojo branding, martial arts studio branding, karate school design, martial arts competition branding, karate event design, martial arts promotional design, karate dojo artwork, martial arts studio artwork, karate school artwork, martial arts competition artwork, karate event artwork, martial arts promotional artwork, karate dojo marketing, martial arts studio marketing, karate school marketing, martial arts competition marketing, karate event marketing, martial arts promotional marketing",
  image = "https://karatedesignscn.com/logo.png",
  url = "https://karatedesignscn.com",
  type = "website",
  structuredDataType = "website",
}) {
  const siteName = "Karate Designs CN";
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content="Karate Designs CN" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Additional SEO Meta Tags */}
        <meta name="theme-color" content="#1d1d1d" />
        <meta name="msapplication-TileColor" content="#1d1d1d" />
        <meta name="application-name" content={siteName} />
        <meta name="apple-mobile-web-app-title" content={siteName} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />

        {/* Canonical URL */}
        <link rel="canonical" href={url} />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon-64x64.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-64x64.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-64x64.png"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content={type} />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Karate Designs CN - Professional Karate Designs and Martial Arts Posters"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:site" content="@karate_designs" />
        <meta name="twitter:creator" content="@karate_designs" />
        <meta
          name="twitter:image:alt"
          content="Karate Designs CN - Professional Karate Designs and Martial Arts Posters"
        />

        {/* Additional Social Media Meta Tags */}
        <meta property="og:image:type" content="image/png" />
        <meta name="twitter:image:type" content="image/png" />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        {/* DNS Prefetch for performance */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />

        {/* Structured Data */}
        <StructuredData type={structuredDataType} />
      </Head>
    </>
  );
}
