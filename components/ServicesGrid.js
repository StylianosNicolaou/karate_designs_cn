import { motion, AnimatePresence } from "framer-motion";
import {
  FaTshirt,
  FaInstagram,
  FaTrophy,
  FaVideo,
  FaPaintBrush,
  FaBoxOpen,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { useState, useRef } from "react";

const categories = [
  {
    icon: <FaTshirt className="text-primary text-xl" />,
    title: "Apparel & Merchandise Designs",
    items: [
      {
        title: "T-shirt Design",
        desc: "Custom t-shirt graphics tailored for teams, events, or fanwear — crafted to stand out in both print and digital mockups.",
        price: "€20 – €40",
      },
      {
        title: "Hoodie Design",
        desc: "Front and back hoodie design with bold typography, mascot art, or personal branding — ideal for clubs and creators.",
        price: "€25 – €50",
      },
      {
        title: "Sportswear Mockup",
        desc: "Professional mockups of jerseys or gear for presentation, manufacturing, or online previews — fully tailored to your sport.",
        price: "€15 – €30",
      },
      {
        title: "Cap or Hat Logo",
        desc: "Minimal embroidered-style logos optimized for hats and caps — clean, sharp, and ready for print or stitching.",
        price: "€15 – €25",
      },
      {
        title: "Patch/Emblem Design",
        desc: "Detailed patch or emblem designs for teams, uniforms, or official gear — perfect for iron-on or embroidered production.",
        price: "€20 – €40",
      },
    ],
  },
  {
    icon: <FaInstagram className="text-primary text-xl" />,
    title: "Social Media Content",
    items: [
      {
        title: "Match Day Poster",
        desc: "Dynamic posters featuring team lineups, match details, or countdowns — formatted for Instagram and other platforms.",
        price: "€10 – €25",
      },
      {
        title: "Score Update Graphics",
        desc: "Editable templates to share real-time match results and final scores with consistent branding and bold design.",
        price: "€10 – €20",
      },
      {
        title: "Athlete Highlight Post",
        desc: "Showcase individual athletes with bold visuals, motion blur, or stat overlays — great for social recognition and hype.",
        price: "€15 – €30",
      },
      {
        title: "Event Promo Post",
        desc: "Custom teaser or promotional posts designed to build anticipation and boost event visibility across social media.",
        price: "€20 – €40",
      },
      {
        title: "Instagram Story Pack",
        desc: "A bundle of 3–5 branded stories including polls, CTAs, promos, or interactive content to elevate your Instagram presence.",
        price: "€20 – €35",
      },
    ],
  },
  {
    icon: <FaTrophy className="text-primary text-xl" />,
    title: "Tournament & Event Design",
    items: [
      {
        title: "Poster/Flyer",
        desc: "High-impact digital or print-ready flyers designed for tournaments, meetups, and large-scale event promotion.",
        price: "€20 – €50",
      },
      {
        title: "Schedule Graphic",
        desc: "Clean and easy-to-read event schedules with times, dates, and match layouts — great for both digital and print.",
        price: "€15 – €30",
      },
      {
        title: "Medal/Certificate Design",
        desc: "Elegant and celebratory medal certificates or digital awards designed for events, tournaments, or competitions.",
        price: "€15 – €25",
      },
      {
        title: "Digital Ticket or Pass",
        desc: "Sleek VIP, athlete, or general admission passes with QR support — ideal for digital distribution or mobile scanning.",
        price: "€10 – €20",
      },
      {
        title: "Event Branding Pack",
        desc: "A complete visual suite: poster, promo content, social posts, and digital passes — bundled for consistent branding.",
        price: "€50 – €80",
      },
    ],
  },
  {
    icon: <FaVideo className="text-primary text-xl" />,
    title: "Video & Animation",
    items: [
      {
        title: "Animated Athlete Intro",
        desc: "Short animated clips introducing players with names, stats, and visuals — perfect for reels or match announcements.",
        price: "€30 – €60",
      },
      {
        title: "Event Teaser Video",
        desc: "15–30 second teaser combining music, typography, and animation to build hype around your upcoming event.",
        price: "€40 – €80",
      },
      {
        title: "Instagram Reels Template",
        desc: "Fully editable reels layout with effects, transitions, and placeholder media — optimized for promo and announcements.",
        price: "€20 – €35",
      },
    ],
  },
  {
    icon: <FaPaintBrush className="text-primary text-xl" />,
    title: "Logo & Branding",
    items: [
      {
        title: "Team Logo",
        desc: "Sport-style logo design customized for clubs, squads, or martial arts teams — scalable for both web and apparel.",
        price: "€30 – €70",
      },
      {
        title: "Personal Brand Logo",
        desc: "Logo tailored to personal brands, athletes, or creators — minimal, memorable, and made to elevate your identity.",
        price: "€25 – €50",
      },
      {
        title: "Mascot Design",
        desc: "Custom mascot illustration with personality — perfect for youth teams, brands, or event promotions.",
        price: "€50 – €100",
      },
      {
        title: "Brand Kit",
        desc: "Complete identity kit including logo, color palette, and font system — ready for consistent branding use across media.",
        price: "€70 – €120",
      },
    ],
  },
  {
    icon: <FaBoxOpen className="text-primary text-xl" />,
    title: "Bundles & Packages",
    items: [
      {
        title: "Starter Social Pack",
        desc: "Bundle includes 3 social posts, 1 story, and logo resizing for clean, consistent social branding across channels.",
        price: "€40 – €60",
      },
      {
        title: "Tournament Pack",
        desc: "Designed for event organizers: poster, match schedule, certificate, and 3 branded posts — all in one pack.",
        price: "€70 – €100",
      },
      {
        title: "Athlete Pack",
        desc: "All-in-one bundle: logo design, highlight post, and custom hoodie or t-shirt design for self-promotion.",
        price: "€60 – €90",
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
