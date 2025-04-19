"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

const galleryImages = Array.from({ length: 28 }, (_, i) => ({
  src: `/images/poster${i + 1}.jpg`,
  title: `Poster ${i + 1}`,
  category: "Creative",
}));

export default function Gallery() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.5", "end start"], // previously "start end"
  });

  const yTransforms = [
    useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]),
    useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]),
    useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]),
    useTransform(scrollYProgress, [0, 1], ["0%", "-24%"]),
  ];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 1024);
      }
    };

    checkMobile(); // run on mount
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const columns = [
    {
      style: isMobile ? { y: yTransforms[0] } : { y: yTransforms[0] },
      images: galleryImages.slice(0, 6), // 0–5
    },
    {
      style: isMobile ? { y: yTransforms[2] } : { y: yTransforms[1] },
      images: galleryImages.slice(6, 12), // 6–12
    },
    {
      style: isMobile ? { y: yTransforms[0] } : { y: yTransforms[2] },
      images: galleryImages.slice(12, 18), // 13–18
    },
    {
      style: isMobile ? { y: yTransforms[2] } : { y: yTransforms[3] },
      images: galleryImages.slice(18, 24), // 19–25
    },
  ];

  const [selected, setSelected] = useState(null);
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <section id="gallery" className="pt-24 pb-8 px-4 sm:px-8 w-full">
      <motion.h2
        className="text-xl sm:text-3xl font-semibold text-center mb-16 text-white"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Our Work
      </motion.h2>

      <div ref={containerRef}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {columns.map((col, idx) => (
            <motion.div
              key={idx}
              style={col.style}
              className="flex flex-col gap-4 sm:gap-6 flex-1"
            >
              {col.images.map((img, i) => (
                <motion.div
                  key={i}
                  className="relative group overflow-hidden rounded-xl cursor-pointer"
                  whileInView={isMobile ? "visible" : false}
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  onClick={() => setSelected(img.src)}
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-auto object-cover aspect-[4/5] min-h-[320px] sm:min-h-[380px] group-hover:scale-105 transition duration-500 rounded-xl"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-black/70 text-white p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Instagram CTA */}
      <motion.div
        className="text-center pt-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <a
          href="https://www.instagram.com/karate_designs.cn/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-primary text-white px-6 py-3 rounded-md font-semibold tracking-wide transition shadow-lg hover:shadow-red-500/30"
        >
          See More on Instagram →
        </a>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex justify-center items-center p-4"
            onClick={() => setSelected(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              src={selected}
              alt="Full View"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="max-h-[80vh] max-w-full rounded-lg shadow-xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
