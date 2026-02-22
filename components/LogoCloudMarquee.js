"use client";

import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";

// SVG logos from public/logos (only files present in folder)
const LOGO_IDS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23,
];
const DEFAULT_LOGO_SRCS = LOGO_IDS.map((id) => `/logos/${id}.svg`);

export default function LogoCloudMarquee({
  logoSrcs = DEFAULT_LOGO_SRCS,
  title,
}) {
  const half = Math.ceil(logoSrcs.length / 2);
  const topRow = logoSrcs.slice(0, half);
  const bottomRow = logoSrcs.slice(half);
  // Duplicate each row so the marquee loops smoothly
  const topDuplicated = [...topRow, ...topRow, ...topRow];
  const bottomDuplicated = [...bottomRow, ...bottomRow, ...bottomRow];

  const maskStyle = {
    maskImage:
      "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
    WebkitMaskImage:
      "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
  };

  return (
    <section className="relative w-full overflow-hidden border-t border-white/10 px-6 py-12 sm:py-16">
      {title && (
        <motion.h2
          className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold text-white mb-10"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {title}
        </motion.h2>
      )}

      {/* Top row — first half of logos, scrolls right */}
      <div className="relative mb-6" style={maskStyle}>
        <Marquee
          speed={40}
          pauseOnHover={false}
          direction="right"
          gradient={false}
        >
          {topDuplicated.map((src, i) => (
            <div
              key={`top-${i}`}
              className="flex-shrink-0 mr-14 flex items-center justify-center w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48"
            >
              <img
                src={src}
                alt=""
                className="w-full h-full object-contain opacity-90 hover:opacity-100"
              />
            </div>
          ))}
        </Marquee>
      </div>

      {/* Bottom row — second half of logos, scrolls left */}
      <div className="relative" style={maskStyle}>
        <Marquee
          speed={28}
          direction="left"
          pauseOnHover={false}
          gradient={false}
        >
          {bottomDuplicated.map((src, i) => (
            <div
              key={`bottom-${i}`}
              className="flex-shrink-0 mr-14 flex items-center justify-center w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48"
            >
              <img
                src={src}
                alt=""
                className="w-full h-full object-contain opacity-90 hover:opacity-100"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
