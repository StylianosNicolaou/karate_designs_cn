"use client";

import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";

// SVG logos from public/logos (1.svg through 23.svg)
const LOGO_IDS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23,
];
const DEFAULT_LOGO_SRCS = LOGO_IDS.map((id) => `/logos/${id}.svg`);

export default function LogoCloudMarquee({
  logoSrcs = DEFAULT_LOGO_SRCS,
  title,
}) {
  // Duplicate so the marquee loops smoothly
  const duplicated = [...logoSrcs, ...logoSrcs, ...logoSrcs];

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
          className="text-center text-xl sm:text-2xl font-semibold text-white mb-10"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {title}
        </motion.h2>
      )}

      {/* Top row — scrolls right */}
      <div className="relative mb-6" style={maskStyle}>
        <Marquee speed={40} pauseOnHover gradient={false}>
          {duplicated.map((src, i) => (
            <div
              key={`top-${i}`}
              className="flex-shrink-0 mr-6 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16"
            >
              <img
                src={src}
                alt=""
                className="w-full h-full object-contain opacity-90 hover:opacity-100 "
              />
            </div>
          ))}
        </Marquee>
      </div>

      {/* Bottom row — scrolls left, slightly slower */}
      <div className="relative" style={maskStyle}>
        <Marquee speed={28} direction="left" pauseOnHover gradient={false}>
          {duplicated.map((src, i) => (
            <div
              key={`bottom-${i}`}
              className="flex-shrink-0 mr-6 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16"
            >
              <img
                src={src}
                alt=""
                className="w-full h-full object-contain opacity-90 hover:opacity-100 "
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
