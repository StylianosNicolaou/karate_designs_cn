"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

const galleryImages = Array.from({ length: 26 }, (_, i) => ({
  src: `/images/poster${i + 1}.jpg`,
  title: `Poster ${i + 1}`,
  category: "Creative",
}));

export default function Gallery() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Alternating directions
  const translateY1 = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const translateY2 = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const translateY3 = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const translateY4 = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);

  const columns = [
    { style: { y: translateY1 }, images: galleryImages.slice(0, 6) },
    { style: { y: translateY2 }, images: galleryImages.slice(6, 13) },
    { style: { y: translateY3 }, images: galleryImages.slice(13, 19) },
    { style: { y: translateY4 }, images: galleryImages.slice(19, 26) },
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
    <section id="gallery" className="py-24 px-4 sm:px-6 max-w-[1600px] mx-auto">
      <motion.h2
        className="text-3xl sm:text-4xl font-semibold text-center mb-16 text-white"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Our Work
      </motion.h2>

      <div className="relative w-full">
        <div
          ref={containerRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 w-full items-start overflow-visible"
        >
          {columns.map((col, idx) => (
            <motion.div
              key={idx}
              style={{ ...col.style }}
              className="space-y-6"
            >
              {col.images.map((img, i) => (
                <div
                  key={i}
                  className="relative group overflow-hidden rounded-xl cursor-pointer"
                  onClick={() => setSelected(img.src)}
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-auto object-cover rounded-xl group-hover:scale-105 transition duration-500"
                  />
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
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
