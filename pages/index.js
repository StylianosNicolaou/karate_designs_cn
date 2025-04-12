import Head from "next/head";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import BrandSection from "../components/BrandSection";
import Gallery from "../components/Gallery";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";
import ServicesGrid from "../components/ServicesGrid";

export default function Home() {
  return (
    <>
      <Head>
        <title>Karate Designs CN | Design with Discipline</title>
        <link rel="icon" href="/logo.ico" />
        <meta
          name="description"
          content="Karate Designs CN is a creative studio offering premium branding, website, and design services inspired by discipline and precision."
        />
        <meta
          name="keywords"
          content="branding, website design, logo, social media kit, karate design, minimalist, creative agency"
        />
        <meta name="author" content="Karate Designs CN" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Karate Designs CN | Design with Discipline"
        />
        <meta
          property="og:description"
          content="Premium creative services with a minimalist, precise aesthetic. View our gallery and discover our custom design packages."
        />
        <meta
          property="og:image"
          content="https://yourdomain.com/og-preview.jpg"
        />
        <meta property="og:url" content="https://yourdomain.com" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Karate Designs CN | Design with Discipline"
        />
        <meta
          name="twitter:description"
          content="Creative branding and design services inspired by precision and discipline."
        />
        <meta
          name="twitter:image"
          content="https://yourdomain.com/og-preview.jpg"
        />
        <meta name="twitter:site" content="@yourusername" />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <main>
        <Hero />
        <BrandSection />
        <Gallery />
        <ServicesGrid />

        <Contact />
        <BackToTop />
      </main>
      <Footer />
    </>
  );
}
