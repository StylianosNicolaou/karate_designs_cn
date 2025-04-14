import { motion } from "framer-motion";
import { useRef } from "react";

const wordVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05 },
  }),
};

function AnimatedWord({ text, className }) {
  return (
    <span className={`inline-block ${className}`}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          custom={i}
          initial="hidden"
          animate="visible"
          variants={wordVariant}
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}
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
        @karate_designs.cn
      </motion.h1>

      {/* Tagline */}
      <motion.p
        className="text-lg sm:text-xl md:text-2xl mb-8 text-white/90 max-w-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <br />
        Design with <AnimatedWord text="Discipline" className="text-gold" />
        .
        <br />
        Create with <AnimatedWord text="Purpose" className="text-primary" />.
      </motion.p>
    </section>
  );
}
