"use client";
import { motion } from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { useRef, useEffect, useState } from "react";
import LiquidGlassButton from "./LiquidGlassButton";

const HERO_VIDEO_SRC = "/videos/hero-animation5.mp4";

export default function Hero() {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const [videoSrc, setVideoSrc] = useState(null);
  const [isInView, setIsInView] = useState(true);

  // Lazy-load video only when hero is in/near viewport; pause when off-screen
  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        const inView = entry.isIntersecting;
        setIsInView(inView);

        // Set src when first entering view (lazy load)
        if (inView && !videoSrc) setVideoSrc(HERO_VIDEO_SRC);
      },
      { rootMargin: "50% 0px", threshold: 0 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [videoSrc]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isInView]);

  const [text] = useTypewriter({
    words: [
      "@karate_designs.cn",
      "#1 Martial Arts Design Studio",
      "Trusted by 600+ Athletes & Dojos Worldwide",
      "Designs That Stand Out",
      "Helping Dojos Grow with Powerful Design",
    ],
    loop: 0,
    delaySpeed: 2000,
  });

  return (
    <motion.section
      ref={ref}
      className="aspect-[16/9] sm:aspect-auto relative w-full h-screen flex flex-col justify-center items-center text-center px-6 py-24 bg-no-repeat bg-center bg-contain"
      // style={{
      //   backgroundImage:
      //     "linear-gradient(to bottom, rgba(29,29,29,0) 40%, #1d1d1d 90%), url('/hero-bg.png')",

      //   backgroundSize: "cover",
      //   backgroundRepeat: "no-repeat",
      //   backgroundPositionX: "center",
      //   backgroundPositionY: bgY,
      // }}
    >
      {/* Hero background video: lazy-loaded, preload=metadata, pauses when off-screen */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        disablePictureInPicture
        disableRemotePlayback
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ objectPosition: "center" }}
        aria-hidden
        onCanPlay={() => videoRef.current?.play().catch(() => {})}
      >
        {videoSrc && <source src={videoSrc} type="video/mp4" />}
        Your browser does not support the video tag.
      </video>

      {/* 🔥 Gradient overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(14,14,18,0) 70%, #0E0E12 95%)",
        }}
      />
      <motion.h1
        className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 text-white leading-tight z-10 drop-shadow-2xl w-full flex justify-center"
        style={{
          textShadow: "2px 2px 4px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.5)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {text}
        <Cursor cursorStyle="|" cursorColor="#FF2E9A" />
      </motion.h1>

      {/* CTA fixed at bottom of hero — does not affect animated text position */}
      <motion.div
        className="absolute bottom-20 left-0 right-0 z-10 flex justify-center pb-8 sm:pb-10"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <LiquidGlassButton
          as="a"
          href="/order"
          size="lg"
          className="!px-10 !py-3 min-w-[280px] sm:min-w-[320px]"
        >
          Explore our services
        </LiquidGlassButton>
      </motion.div>

      {/* <motion.p
        className="text-sm sm:text-m py-2 text-gray-200 mt-6 italic z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
      >
        “Where martial discipline meets design precision.”
      </motion.p>
      <motion.a
        href="#gallery"
        className="inline-block mt-4 btn-liquid-glass"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        Explore Our Work
      </motion.a> */}
    </motion.section>
  );
}
