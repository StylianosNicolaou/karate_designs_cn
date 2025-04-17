// import { motion } from "framer-motion";
// import { useRef } from "react";

// const wordVariant = {
//   hidden: { opacity: 0, y: 10 },
//   visible: (i) => ({
//     opacity: 1,
//     y: 0,
//     transition: { delay: i * 0.05 },
//   }),
// };

// function AnimatedWord({ text, className }) {
//   return (
//     <span className={`inline-block ${className}`}>
//       {text.split("").map((char, i) => (
//         <motion.span
//           key={i}
//           custom={i}
//           initial="hidden"
//           animate="visible"
//           variants={wordVariant}
//           className="inline-block"
//         >
//           {char}
//         </motion.span>
//       ))}
//     </span>
//   );
// }
// export default function Hero() {
//   const ref = useRef(null);

//   return (
//     <section
//       ref={ref}
//       className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 py-24"
//     >
//       {/* Hero Headline */}
//       <motion.h1
//         className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-4 text-white leading-tight"
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//       >
//         @karate_designs.cn
//       </motion.h1>

//       {/* Tagline */}
//       <motion.p
//         className="text-lg sm:text-xl md:text-2xl mb-8 text-white/90 max-w-xl"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.3, duration: 0.8 }}
//       >
//         <br />
//         Design with <AnimatedWord text="Discipline" className="text-gold" />
//         .
//         <br />
//         Create with <AnimatedWord text="Purpose" className="text-primary" />.
//       </motion.p>
//     </section>
//   );
// }

import { motion } from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { useRef } from "react";

function AnimatedWord({ text, className }) {
  return (
    <span className={`inline-block font-heading ${className}`}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          custom={i}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: (i) => ({
              opacity: 1,
              y: 0,
              transition: { delay: i * 0.05 },
            }),
          }}
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

  const [text] = useTypewriter({
    words: [
      "@karate_designs.cn",
      "Designing with Discipline.",
      "Creating with Purpose.",
      "Crafting with Precision.",
      "Innovating with Intention.",
    ],
    loop: 0,
    delaySpeed: 2000,
  });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 py-24"
    >
      {/* Typing Headline */}
      <motion.h1
        className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-4 text-white leading-tight"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {text}
        <Cursor cursorStyle="|" cursorColor="#e63946" />
      </motion.h1>

      {/* Tagline */}
      <motion.p
        className="text-lg sm:text-xl md:text-2xl mb-8 text-white/90 max-w-xl leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Design with{" "}
        <AnimatedWord text="Discipline" className="text-gold font-semibold" />.
        <br />
        Create with{" "}
        <AnimatedWord text="Purpose" className="text-primary font-semibold" />.
      </motion.p>

      {/* CTA Button */}
      <motion.a
        href="#gallery"
        className="inline-block mt-4 px-6 py-3 bg-primary text-white text-base font-medium rounded-md shadow-md hover:shadow-lg hover:-translate-y-1 transition transform"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        Explore Our Work
      </motion.a>

      {/* Subtext */}
      <motion.p
        className="text-sm sm:text-base text-gray-400 mt-6 italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
      >
        “Where martial discipline meets design precision.”
      </motion.p>
    </section>
  );
}
