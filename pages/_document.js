import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap"
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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="bg-charcoal text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
