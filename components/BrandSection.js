import { motion } from "framer-motion";
// import ParticlesBackground from "./ParticlesBackground";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.3,
    },
  },
};

const wordAnimation = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const manifesto =
  `At Karate Designs CN, we believe that precision is the path to perfection. Our team combines aesthetic discipline with modern design principles to create impactful digital experiences. Whether you're a brand looking to stand out or a creator who values the details, we design with intention and execute with clarity.`.split(
    " "
  );

export default function BrandSection() {
  return (
    <section
      id="brand"
      className="relative px-6 py-24 sm:py-28 max-w-4xl mx-auto text-center"
    >
      {/* Background Kanji
      <div className="absolute inset-0 z-0 flex justify-center items-center opacity-5 pointer-events-none">
      <p className="text-[180px] sm:text-[260px] md:text-[360px] font-bold text-white tracking-widest select-none leading-none">
      武道
      </p>
      </div> */}

      {/* Vertical Accent Line */}
      <motion.div
        className="absolute left-0 top-18 h-56 w-1 bg-primary hidden md:block rounded-full opacity-70 z-10"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 0.9 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        style={{ transformOrigin: "top" }}
      />

      {/* <div className="absolute inset-0 z-0">
        <ParticlesBackground />
      </div> */}
      {/* Heading */}
      <motion.h2
        className="text-xl sm:text-xl md:text-3xl font-semibold mb-6 relative z-10 text-white"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        About Karate Designs CN
      </motion.h2>

      {/* Manifesto */}
      <motion.div
        className="text-base sm:text-m leading-8 text-gray-300 flex flex-wrap justify-center gap-x-1 z-10 relative"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {manifesto.map((word, i) => (
          <motion.span
            key={i}
            variants={wordAnimation}
            className={`
              ${
                [
                  "Karate",
                  "Designs",
                  "CN,",
                  "discipline",
                  "intention",
                ].includes(word)
                  ? "text-primary font-semibold"
                  : ""
              }
              ${
                ["precision", "perfection.", "clarity."].includes(word)
                  ? "text-gold font-semibold"
                  : ""
              }
            `}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}
