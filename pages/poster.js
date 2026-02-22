"use client";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import {
  CameraIcon,
  PhotoIcon,
  PaintBrushIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { useCart } from "../components/CartProvider";
import { getServiceById } from "../lib/services";
import LiquidGlassButton from "../components/LiquidGlassButton";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LogoCloudMarquee from "../components/LogoCloudMarquee";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";

const POSTER_SERVICE_ID = "poster-ads";

// How it works step images (public/how-it-works/1.png … 4.png)
const HOW_IT_WORKS_IMAGES = [1, 2, 3, 4].map((n) => ({
  src: `/how-it-works/${n}.png`,
  alt: `How it works step ${n}`,
}));
/** How long each image is shown (milliseconds) */
const HOW_IT_WORKS_DURATION_MS = 1000;

export default function PosterLandingPage() {
  const router = useRouter();
  const { addItem, clearCart } = useCart();
  const service = getServiceById(POSTER_SERVICE_ID);
  const [howItWorksIndex, setHowItWorksIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setHowItWorksIndex((i) => (i + 1) % HOW_IT_WORKS_IMAGES.length);
    }, HOW_IT_WORKS_DURATION_MS);
    return () => clearInterval(id);
  }, []);

  const handleGetPoster = () => {
    if (!service) return;
    clearCart();
    addItem(service, 1);
    router.push("/checkout");
  };

  if (!service) return null;

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
                src="/images/poster-bg.png"
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
                className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-tight mb-4 drop-shadow-lg"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Turn Your Best Moments Into Art.
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
                Official Designer for International Karate Events and Elite
                Athletes
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
                Trusted by 600+ Athletes & Dojos Worldwide
              </motion.p>
            </div>
          </section>

          {/* 2. Trust & Social Proof — Logo Cloud Marquee */}
          <LogoCloudMarquee title="Official Design Partner" />

          {/* 3. From Training Photo to Professional Artwork (Before & After) */}
          <section className="px-6 py-12 sm:py-16 border-t border-white/10">
            <motion.h1
              className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-10"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              From Training Photo to Professional Artwork
            </motion.h1>
            <motion.div
              className="poster-before-after-slider max-w-lg mx-auto rounded-xl overflow-hidden border border-white/10"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <ReactBeforeSliderComponent
                firstImage={{
                  imageUrl: "/images/after.png",
                }}
                secondImage={{
                  imageUrl: "/images/before.png",
                }}
                delimiterIconStyles={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='24' viewBox='0 0 32 24' fill='none' stroke='%23000' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M10 18L4 12l6-6'/%3E%3Cpath d='M22 18l6-6-6-6'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "18px 14px",
                  backgroundColor: "#fff",
                }}
              />
            </motion.div>
          </section>

          {/* 4. What You Get */}
          <section className="px-6 py-12 sm:py-16 border-t border-white/10">
            <motion.h2
              className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-10"
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
                  text: "Social Media & Print Ready",
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
                  <p className="text-white text-base sm:text-lg font-normal flex items-center justify-center gap-2 text-center">
                    <span className="text-primary shrink-0">✓</span> {item.text}
                  </p>
                </div>
              ))}
            </motion.div>
          </section>

          {/* 5. How It Works — single placeholder cycling through images 1→2→3→4 */}
          <section className="px-6 py-12 sm:py-16 border-t border-white/10">
            <motion.h2
              className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-10"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              How It Works
            </motion.h2>
            <motion.div
              className="max-w-lg mx-auto"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative rounded-xl overflow-hidden border border-white/10 bg-charcoal">
                <span
                  className="absolute top-2 left-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white text-charcoal text-xs font-bold shadow"
                  aria-hidden
                >
                  {howItWorksIndex + 1}
                </span>
                <div className="relative w-full aspect-[3/4]">
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={howItWorksIndex}
                      className="absolute inset-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={HOW_IT_WORKS_IMAGES[howItWorksIndex].src}
                        alt={HOW_IT_WORKS_IMAGES[howItWorksIndex].alt}
                        className="h-full w-full object-contain"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </section>

          {/* 6. Why Choose Karate Designs by CN */}
          <section className="px-6 py-12 sm:py-16 border-t border-white/10">
            <motion.h2
              className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-10"
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
                  <span className="text-primary">✓</span> Official Designer for
                  International Karate Events and Elite Athletes
                </p>
                <p className="text-white flex items-center gap-2">
                  <span className="text-primary">✓</span> 600+ Athletes
                  Worldwide
                </p>
                <p className="text-white flex items-center gap-2">
                  <span className="text-primary">✓</span> Specialist in Karate &
                  Combat Sports
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-white font-semibold text-xl sm:text-2xl mb-4">
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
        </main>

        <Footer />
      </div>
    </>
  );
}
