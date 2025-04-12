import { motion } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef(null);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 py-24"
    >
      {/* Hero Headline */}
      <motion.h1
        className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-4 text-white leading-tight"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Karate Designs
      </motion.h1>

      {/* Tagline */}
      <motion.p
        className="text-lg sm:text-xl md:text-2xl mb-8 text-white/90 max-w-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Design with Discipline. <br />
        Create with Purpose.
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
    </section>
  );
}
