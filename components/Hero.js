"use client";
import { motion } from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef(null);
  
  const [text] = useTypewriter({
    words: [
      "@karate_designs.cn",
      "Designing with Discipline.",
      "Creating with Purpose.",
      "Crafting with Precision.",
      "blah blah with Intention.",
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
      {/* 🔥 Kling MP4 Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ objectPosition: 'center' }}
      >
        <source src="/videos/hero-animation3.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 🔥 Gradient overlay */}
  <div
    className="absolute inset-0 z-10 pointer-events-none"
    style={{
      background: 'linear-gradient(to bottom, rgba(29,29,29,0) 85%, #1d1d1d 98%)'
    }}
  />
      <motion.h1
        className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 text-white leading-tight z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {text}
        <Cursor cursorStyle="|" cursorColor="#e63946" />
      </motion.h1>

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
        className="inline-block mt-4 px-6 py-3 bg-primary text-white text-base font-medium rounded-md shadow-md hover:shadow-lg hover:-translate-y-1 transition transform z-10"
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
