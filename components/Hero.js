import { motion } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef(null);

  return (
    <section
      ref={ref}
      className="relative h-screen flex flex-col justify-center items-center text-center px-4"
    >
      {/* Hero Headline */}
      <motion.h1
        className="text-5xl md:text-7xl font-bold mb-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Karate Designs CN
      </motion.h1>

      {/* Tagline */}
      <motion.p
        className="text-xl md:text-2xl mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Design with Discipline. Create with Purpose.
      </motion.p>

      {/* Call-to-action button */}
      <motion.a
        href="#gallery"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-3 bg-primary text-white rounded-lg font-semibold tracking-wide shadow-lg hover:shadow-xl transition"
      >
        View Our Work
      </motion.a>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gray-300 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      ></motion.div>
    </section>
  );
}
