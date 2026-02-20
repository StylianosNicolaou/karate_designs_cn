"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import {
  CameraIcon,
  PhotoIcon,
  PaintBrushIcon,
  ClockIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useCart } from "../components/CartProvider";
import { getServiceById } from "../lib/services";
import LiquidGlassButton from "../components/LiquidGlassButton";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LogoCloudMarquee from "../components/LogoCloudMarquee";

const POSTER_SERVICE_ID = "poster-ads";

// Carousel posters from public/images
const CAROUSEL_POSTERS = [
  { src: "/images/poster1.jpg", alt: "Example athlete poster 1" },
  { src: "/images/poster8.jpg", alt: "Example athlete poster 2" },
  { src: "/images/poster15.jpg", alt: "Example athlete poster 3" },
];

export default function PosterLandingPage() {
  const router = useRouter();
  const { addItem, clearCart } = useCart();
  const service = getServiceById(POSTER_SERVICE_ID);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const handleGetPoster = () => {
    if (!service) return;
    clearCart();
    addItem(service, 1);
    router.push("/checkout");
  };

  if (!service) return null;

  const nextSlide = () =>
    setCarouselIndex((i) => (i + 1) % CAROUSEL_POSTERS.length);
  const prevSlide = () =>
    setCarouselIndex(
      (i) => (i - 1 + CAROUSEL_POSTERS.length) % CAROUSEL_POSTERS.length,
    );

  return (
    <>
      <Head>
        <title>Custom Athlete Posters — €40 | Karate Designs CN</title>
        <meta
          name="description"
          content="Turn your best moment into art. Custom athlete posters designed for champions. Official Designer - European Karate Championships 2026. €40."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://karatedesigns.vercel.app/poster" />
        <meta
          property="og:title"
          content="Custom Athlete Posters — €40 | Karate Designs CN"
        />
        <meta
          property="og:description"
          content="Custom Athlete Posters Designed for Champions. €40."
        />
        <meta
          property="og:url"
          content="https://karatedesigns.vercel.app/poster"
        />
      </Head>

      <div className="min-h-screen bg-charcoal text-white flex flex-col">
        <Navbar />

        <main className="flex-1">
          {/* 1. Hero Section — full width and height of the screen */}
          <section className="relative w-full h-screen min-h-screen flex flex-col">
            {/* Full-width background image */}
            <div className="absolute inset-0 w-full">
              <Image
                src="/images/poster1.jpg"
                alt="Karate athlete poster"
                fill
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: "center 15%" }}
                priority
              />
              {/* Gradient overlay for text readability */}
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(14,14,18,0.5) 0%, rgba(14,14,18,0.75) 50%, rgba(14,14,18,0.92) 100%)",
                }}
              />
            </div>
            {/* Text and CTA overlaid on image */}
            <div className="relative z-20 flex flex-1 flex-col items-center justify-center text-center px-6 py-20">
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 drop-shadow-lg"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Turn Your Best Moment Into Art.
              </motion.h1>
              <motion.p
                className="text-white text-lg sm:text-xl md:text-2xl mb-2 drop-shadow-md"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                Custom Athlete Posters Designed for Champions
              </motion.p>
              <motion.p
                className="text-white/90 text-sm sm:text-base mb-8 drop-shadow-md"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
              >
                Official Designer - European Karate Championships 2026
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.5 }}
              >
                <LiquidGlassButton
                  onClick={handleGetPoster}
                  size="lg"
                  className="!px-10 !py-4 text-lg min-w-[280px]"
                >
                  GET YOUR POSTER - €40
                </LiquidGlassButton>
              </motion.div>
              <motion.p
                className="mt-6 text-white/90 text-sm flex items-center justify-center gap-2 drop-shadow-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <span className="text-primary" aria-hidden>
                  ✓
                </span>
                Trusted by 500+ athletes worldwide
              </motion.p>
            </div>
          </section>

          {/* 2. Trust & Social Proof — Logo Cloud Marquee */}
          <LogoCloudMarquee title="Trusted by International Athletes & Dojos Worldwide" />

          {/* 3. From Training Photo to Professional Artwork (Before & After) */}
          <section className="px-6 py-12 sm:py-16 border-t border-white/10">
            <motion.h2
              className="text-center text-xl sm:text-2xl font-semibold text-white mb-10"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              From Training Photo to Professional Artwork
            </motion.h2>
            <motion.div
              className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 items-center"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-white/10">
                <Image
                  src="/images/poster1.jpg"
                  alt="Before - training photo"
                  fill
                  sizes="(max-width: 640px) 100vw, 400px"
                  className="object-cover"
                />
                <span className="absolute bottom-3 left-3 text-white text-sm font-medium bg-black/60 px-2 py-1 rounded">
                  Before
                </span>
              </div>
              <div className="flex justify-center text-white/60" aria-hidden>
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 rotate-90 sm:rotate-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-white/10">
                <Image
                  src="/images/poster5.jpg"
                  alt="After - professional poster"
                  fill
                  sizes="(max-width: 640px) 100vw, 400px"
                  className="object-cover"
                />
                <span className="absolute bottom-3 left-3 text-white text-sm font-medium bg-black/60 px-2 py-1 rounded">
                  After
                </span>
              </div>
            </motion.div>
          </section>

          {/* 4. What You Get */}
          <section className="px-6 py-12 sm:py-16 border-t border-white/10">
            <motion.h2
              className="text-center text-xl sm:text-2xl font-semibold text-white mb-10"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              What You Get
            </motion.h2>
            <motion.div
              className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {[
                {
                  icon: CameraIcon,
                  text: "Cinematic Athlete Poster",
                },
                {
                  icon: PhotoIcon,
                  text: "Instagram & Print Ready",
                },
                {
                  icon: PaintBrushIcon,
                  text: "Personalized Design",
                },
                {
                  icon: ClockIcon,
                  text: "48-72 Hour Delivery",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center gap-3"
                >
                  <item.icon className="w-10 h-10 text-primary" aria-hidden />
                  <p className="text-white flex items-center gap-2">
                    <span className="text-primary">✓</span> {item.text}
                  </p>
                </div>
              ))}
            </motion.div>
          </section>

          {/* 5. How It Works (Carousel) */}
          <section className="px-6 py-12 sm:py-16 border-t border-white/10">
            <motion.h2
              className="text-center text-xl sm:text-2xl font-semibold text-white mb-10"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              How It Works
            </motion.h2>
            <motion.div
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative flex items-center gap-4">
                <button
                  type="button"
                  onClick={prevSlide}
                  className="absolute left-0 z-10 -translate-x-2 sm:-translate-x-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition text-white"
                  aria-label="Previous example"
                >
                  <ChevronLeftIcon className="w-6 h-6" />
                </button>
                <div className="flex-1 relative aspect-square max-w-sm mx-auto rounded-xl overflow-hidden border border-white/10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={carouselIndex}
                      className="absolute inset-0"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={CAROUSEL_POSTERS[carouselIndex].src}
                        alt={CAROUSEL_POSTERS[carouselIndex].alt}
                        fill
                        sizes="(max-width: 640px) 100vw, 448px"
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
                <button
                  type="button"
                  onClick={nextSlide}
                  className="absolute right-0 z-10 translate-x-2 sm:translate-x-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition text-white"
                  aria-label="Next example"
                >
                  <ChevronRightIcon className="w-6 h-6" />
                </button>
              </div>
              <div className="flex justify-center gap-2 mt-6">
                {CAROUSEL_POSTERS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCarouselIndex(i)}
                    className={`w-2 h-2 rounded-full transition ${
                      i === carouselIndex ? "bg-primary w-6" : "bg-white/40"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </section>

          {/* 6. Why Choose Karate Designs by CN */}
          <section className="px-6 py-12 sm:py-16 border-t border-white/10">
            <motion.h2
              className="text-center text-xl sm:text-2xl font-semibold text-white mb-10"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Why Choose Karate Designs by CN
            </motion.h2>
            <motion.div
              className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="space-y-4">
                <p className="text-white flex items-center gap-2">
                  <span className="text-primary">✓</span> Official EKF 2026
                  Designer
                </p>
                <p className="text-white flex items-center gap-2">
                  <span className="text-primary">✓</span> 500+ Athletes
                  Worldwide
                </p>
                <p className="text-white flex items-center gap-2">
                  <span className="text-primary">✓</span> Specialists in Karate
                  & Combat Sports
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-white font-semibold text-lg mb-4">
                  Professional Athlete Poster
                </h3>
                <p className="text-primary font-bold text-3xl mb-4">€40</p>
                <ul className="space-y-2 mb-6">
                  <li className="text-white/90 flex items-center gap-2">
                    <span className="text-primary">✓</span> Custom Design
                  </li>
                  <li className="text-white/90 flex items-center gap-2">
                    <span className="text-primary">✓</span> Unlimited Revisions
                  </li>
                  <li className="text-white/90 flex items-center gap-2">
                    <span className="text-primary">✓</span> High Resolution
                  </li>
                </ul>
                <LiquidGlassButton
                  onClick={handleGetPoster}
                  className="w-full !justify-center !py-4"
                  size="lg"
                >
                  ORDER NOW
                </LiquidGlassButton>
              </div>
            </motion.div>
          </section>

          {/* 7. Footer / Final CTA */}
          <section className="px-6 py-16 sm:py-20 border-t border-white/10 text-center">
            <motion.h2
              className="text-xl sm:text-2xl font-semibold text-white mb-8"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Your Hard Work Deserves to Be Seen.
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <LiquidGlassButton
                onClick={handleGetPoster}
                size="lg"
                className="!px-10 !py-4 text-lg"
              >
                GET YOUR POSTER TODAY!
              </LiquidGlassButton>
            </motion.div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
