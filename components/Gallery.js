import { motion, AnimatePresence } from "framer-motion";
import Masonry from "react-masonry-css";
import { useState } from "react";
import { useEffect } from "react";

const galleryImages = [
  "/images/poster1.jpg",
  "/images/poster2.jpg",
  "/images/poster3.jpg",
  "/images/poster4.jpg",
  "/images/poster5.jpg",
];

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

export default function Gallery() {
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const breakpointColumnsObj = {
    default: 3,
    1024: 3,
    768: 2,
    480: 1,
  };

  return (
    <section id="gallery" className="py-20 px-6 max-w-7xl mx-auto">
      <motion.h2
        className="text-3xl md:text-4xl font-semibold text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Our Work
      </motion.h2>

      <motion.div
        className="w-full"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        layout
      >
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto gap-6"
          columnClassName="masonry-column"
        >
          {galleryImages.map((src, i) => (
            <motion.div
              key={i}
              className="mb-6 overflow-hidden rounded-xl shadow-md transform hover:scale-105 hover:grayscale-0 grayscale transition duration-300 cursor-pointer hover:shadow-red-500/30"
              variants={item}
              layout
              onClick={() => setSelected(src)}
            >
              <img
                src={src}
                alt={`gallery-${i}`}
                className="w-full h-auto object-cover rounded"
                loading="lazy"
              />
            </motion.div>
          ))}
        </Masonry>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex justify-center items-center"
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
              className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
