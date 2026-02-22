import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Fonts – Bebas Neue headings, Barlow for body/captions (DIN-style) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />

        {/* Meta */}
        <meta
          name="description"
          content="Karate Designs CN — Design with Discipline. Create with Purpose."
        />
        <meta property="og:title" content="Karate Designs CN" />
        <meta
          property="og:description"
          content="A bold design studio that blends aesthetics and discipline."
        />
        <meta property="og:image" content="/images/preview.jpg" />
        <meta property="og:url" content="https://karatedesigns.vercel.app" />
        <meta name="twitter:card" content="summary_large_image" />

        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="bg-charcoal text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
