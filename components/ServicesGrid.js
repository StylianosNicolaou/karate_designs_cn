import { motion, AnimatePresence } from "framer-motion";
import {
  FaTshirt,
  FaInstagram,
  FaFlag,
  FaPaintBrush,
  FaCertificate,
  FaBoxOpen,
  FaChevronDown,
  FaChevronUp,
  FaCarSide,
} from "react-icons/fa";
import { useState, useRef } from "react";

const categories = [
  {
    icon: <FaPaintBrush className="text-primary text-xl" />,
    title: "Poster Design",
    items: [
      {
        title: "Tournament Poster",
        desc: "Bold posters tailored for major tournaments.",
        price: "€90",
      },
      {
        title: "Team Poster",
        desc: "Showcase your team with dynamic poster layouts.",
        price: "€70",
      },
      {
        title: "Seminar Poster",
        desc: "Professional posters for seminars and workshops.",
        price: "€80",
      },
      {
        title: "Athlete Highlight Poster",
        desc: "Spotlight athletes with striking visual flair.",
        price: "€70",
      },
      {
        title: "Training Camp Poster",
        desc: "Promote camps with clear, branded visuals.",
        price: "€80",
      },
      {
        title: "Custom Poster Design",
        desc: "Fully customized poster for any purpose.",
        price: "€1",
      },
    ],
  },
  {
    icon: <FaFlag className="text-primary text-xl" />,
    title: "Banner Design",
    items: [
      {
        title: "Event Banner",
        desc: "Large-format banners for any setting.",
        price: "€130",
      },
      {
        title: "Dojo Banner",
        desc: "Represent your dojo with pride and clarity.",
        price: "€120",
      },
      {
        title: "Competition Banner",
        desc: "Eye-catching banners for competitive events.",
        price: "€120",
      },
      {
        title: "Roll-Up Banner",
        desc: "Portable banners ideal for quick setup.",
        price: "€110",
      },
      {
        title: "Social Media Banner (FB/Twitter/YouTube)",
        desc: "Banners optimized for social media platforms.",
        price: "€60",
      },
    ],
  },
  {
    icon: <FaInstagram className="text-primary text-xl" />,
    title: "Social Media Graphics",
    items: [
      {
        title: "Instagram Post Pack (5 posts)",
        desc: "Set of 5 styled Instagram posts.",
        price: "€70",
      },
      {
        title: "Instagram Story Pack (5 stories)",
        desc: "Set of 5 Instagram story templates.",
        price: "€60",
      },
      {
        title: "Facebook/Instagram Ad Design",
        desc: "Optimized ad designs for social media.",
        price: "€40",
      },
      {
        title: "Athlete/Dojo Social Pack (10 posts + 5 stories)",
        desc: "Complete social media package for athletes and dojos.",
        price: "€120",
      },
    ],
  },
  {
    icon: <FaPaintBrush className="text-primary text-xl" />,
    title: "Logo Design",
    items: [
      {
        title: "Karate Dojo Logo",
        desc: "Unique dojo branding that commands respect.",
        price: "€140",
      },
      {
        title: "Tournament Logo",
        desc: "Icons that symbolize competition and excellence.",
        price: "€140",
      },
      {
        title: "Personal Brand Logo",
        desc: "Logos that capture your personal ethos.",
        price: "€120",
      },
      {
        title: "Mascot Logo for Teams",
        desc: "Fun and fierce mascot designs for teams.",
        price: "€160",
      },
      {
        title: "Minimal/Modern Logo (general use)",
        desc: "Clean, modern logos for general use.",
        price: "€110",
      },
    ],
  },
  {
    icon: <FaTshirt className="text-primary text-xl" />,
    title: "Merch & Apparel Design",
    items: [
      {
        title: "T-Shirt Design",
        desc: "Stylish graphics for martial arts t-shirts.",
        price: "€60",
      },
      {
        title: "Hoodie Design",
        desc: "Comfy and bold designs for hoodies.",
        price: "€70",
      },
      {
        title: "Gi Patch / Dojo Patch",
        desc: "Patches for uniforms and dojo branding.",
        price: "€50",
      },
      {
        title: "Merchandise Pack (T-shirt + Hoodie + Patch)",
        desc: "Complete merchandise design package.",
        price: "€150",
      },
    ],
  },
  {
    icon: <FaCertificate className="text-primary text-xl" />,
    title: "Event & Dojo Materials",
    items: [
      {
        title: "Certificate Design (Belt / Participation / Achievement)",
        desc: "Professional certificates for achievements.",
        price: "€50",
      },
      {
        title: "Medal/Ribbon Design",
        desc: "Designs for competition medals and ribbons.",
        price: "€60",
      },
      {
        title: "Ticket/Pass Design",
        desc: "Event tickets and passes.",
        price: "€40",
      },
      {
        title: "Business Card Design",
        desc: "Professional business cards.",
        price: "€40",
      },
      {
        title: "Flyer/Leaflet (single side)",
        desc: "Single-sided promotional flyers.",
        price: "€50",
      },
      {
        title: "Flyer/Leaflet (double side)",
        desc: "Double-sided promotional flyers.",
        price: "€70",
      },
    ],
  },
  {
    icon: <FaCarSide className="text-primary text-xl" />,
    title: "Digital & Video Graphics",
    items: [
      {
        title: "Motion Poster / Animated Social Ad",
        desc: "Animated posters and social media ads.",
        price: "€90",
      },
      {
        title: "Video Intro/Outro",
        desc: "Professional video intro and outro graphics.",
        price: "€120",
      },
      {
        title: "Tournament Promo Video (short edit)",
        desc: "Short promotional videos for tournaments.",
        price: "€150",
      },
    ],
  },
  {
    icon: <FaBoxOpen className="text-primary text-xl" />,
    title: "Package Deals",
    items: [
      {
        title: "Event Branding Package",
        desc: "Complete branding package for events.",
        price: "€220",
      },
      {
        title: "Dojo Starter Pack",
        desc: "Complete starter package for new dojos.",
        price: "€300",
      },
      {
        title: "Athlete Highlight Pack",
        desc: "Package for athlete self-branding.",
        price: "€150",
      },
      {
        title: "Tournament Promo Pack",
        desc: "Complete tournament promotion package.",
        price: "€350",
      },
      {
        title: "Social Media Growth Pack",
        desc: "Comprehensive social media package.",
        price: "€200",
      },
      {
        title: "Complete Dojo Identity Pack",
        desc: "Full dojo identity and branding package.",
        price: "€500",
      },
    ],
  },
];

export default function ServicesGrid() {
  const [openIndex, setOpenIndex] = useState(null);
  const refs = useRef([]);

  const toggle = (index) => {
    const alreadyOpen = openIndex === index;
    setOpenIndex(alreadyOpen ? null : index);

    if (!alreadyOpen) {
      // Delay scroll to allow expansion
      setTimeout(() => {
        requestAnimationFrame(() => {
          refs.current[index]?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        });
      }, 500); // Matches the animation duration
    }
  };

  return (
    <section
      id="packages"
      className="py-24 px-4 sm:px-6 max-w-7xl mx-auto text-center"
    >
      <motion.h2
        className="text-xl sm:text-xl md:text-3xl font-semibold mb-12 text-white"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Our Services
      </motion.h2>

      <div className="space-y-6">
        {categories.map((cat, idx) => (
          <motion.div
            key={idx}
            ref={(el) => (refs.current[idx] = el)}
            className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl text-left overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            viewport={{ once: true }}
          >
            {/* Header */}
            <button
              onClick={() => toggle(idx)}
              className="w-full flex justify-between items-center px-6 py-4 text-white font-medium text-lg sm:text-m hover:bg-white/10 transition"
            >
              <div className="flex items-center gap-3">
                {cat.icon}
                {cat.title}
              </div>
              {openIndex === idx ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {/* Content */}
            <AnimatePresence initial={false}>
              {openIndex === idx && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="px-6 pb-6"
                >
                  <div className="grid sm:grid-cols-2 gap-4 mt-4">
                    {cat.items.map((item, i) => (
                      <motion.div
                        key={i}
                        className="bg-white/5 rounded-lg border border-white/10 p-4 transition hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <h4 className="text-white text-xl font-semibold mb-2 leading-snug">
                          {item.title}
                        </h4>
                        <p className="text-gray-300 text-base mb-3">
                          {item.desc}
                        </p>
                        <p className="text-primary font-bold text-lg">
                          {item.price}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
