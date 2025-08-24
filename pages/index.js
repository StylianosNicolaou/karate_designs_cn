import SEOHead from "../components/SEOHead";
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
      <SEOHead
        title="Karate Designs & Martial Arts Posters"
        description="Professional karate designs, martial arts posters, and custom karate artwork. Specializing in karate logo design, tournament posters, and martial arts branding. View our gallery of karate designs and discover our custom design packages."
        keywords="karate designs, karate posters, martial arts posters, karate artwork, tournament posters, karate logo design, martial arts design, dojo branding, karate tournament artwork, custom karate designs"
        structuredDataType="website"
      />

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
