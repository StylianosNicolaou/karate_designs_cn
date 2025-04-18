// import { motion, AnimatePresence } from "framer-motion";
// import Masonry from "react-masonry-css";
// import { useState, useEffect } from "react";

// const galleryImages = [
//   "/images/poster1.jpg",
//   "/images/poster2.jpg",
//   "/images/poster3.jpg",
//   "/images/poster4.jpg",
//   "/images/poster5.jpg",
//   "/images/poster6.jpg",
// ];

// const container = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.1,
//       delayChildren: 0.3,
//     },
//   },
// };

// const item = {
//   hidden: { opacity: 0, scale: 0.95, y: 20 },
//   visible: { opacity: 1, scale: 1, y: 0 },
// };

// export default function Gallery() {
//   const [selected, setSelected] = useState(null);

//   useEffect(() => {
//     const handleKey = (e) => {
//       if (e.key === "Escape") setSelected(null);
//     };
//     window.addEventListener("keydown", handleKey);
//     return () => window.removeEventListener("keydown", handleKey);
//   }, []);

//   const breakpointColumnsObj = {
//     default: 3,
//     1024: 3,
//     768: 2,
//     0: 1, // Ensure full width on smallest screens
//   };

//   return (
//     <section id="gallery" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
//       <motion.h2
//         className="text-3xl sm:text-4xl font-semibold text-center mb-12 text-white"
//         initial={{ opacity: 0, y: 30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         viewport={{ once: true }}
//       >
//         Our Work
//       </motion.h2>

//       <motion.div
//         className="w-full"
//         variants={container}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         layout
//       >
//         <Masonry
//           breakpointCols={breakpointColumnsObj}
//           className="flex w-auto gap-4 sm:gap-6"
//           columnClassName="masonry-column"
//         >
//           {galleryImages.map((src, i) => (
//             <motion.div
//               key={i}
//               className="mb-4 sm:mb-6 overflow-hidden rounded-xl shadow-md transform hover:scale-105 hover:grayscale-0 grayscale transition duration-300 cursor-pointer hover:shadow-red-500/30"
//               variants={item}
//               layout
//               onClick={() => setSelected(src)}
//             >
//               <img
//                 src={src}
//                 alt={`gallery-${i}`}
//                 className="w-full h-auto object-cover rounded"
//                 loading="lazy"
//               />
//             </motion.div>
//           ))}
//         </Masonry>
//         <div className="text-center mt-12">
//           <motion.a
//             href="https://www.instagram.com/karate_designs.cn/"
//             target="_blank"
//             rel="noopener noreferrer"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="inline-block bg-primary text-white px-6 py-3 rounded-md font-semibold tracking-wide transition shadow-lg hover:shadow-red-500/30"
//           >
//             See More on Instagram →
//           </motion.a>
//         </div>
//       </motion.div>

//       {/* Lightbox Modal */}
//       <AnimatePresence>
//         {selected && (
//           <motion.div
//             className="fixed inset-0 z-50 bg-black/90 flex justify-center items-center p-4"
//             onClick={() => setSelected(null)}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.img
//               src={selected}
//               alt="Full View"
//               initial={{ scale: 0.8, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.8, opacity: 0 }}
//               transition={{ duration: 0.8, ease: "easeInOut" }}
//               className="max-h-[80vh] max-w-full rounded-lg shadow-xl"
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// }

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
                  <div className="absolute bottom-0 left-0 w-full bg-black/70 text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-lg font-semibold">{img.title}</h3>
                    <p className="text-sm text-gray-300">{img.category}</p>
                  </div>
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
