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
  FaMapSigns,
  FaBullhorn,
  FaCubes,
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
        price: "€100",
      },
      {
        title: "Seminar Poster",
        desc: "Professional posters for seminars and workshops.",
        price: "€90",
      },
      {
        title: "Team Poster",
        desc: "Showcase your team with dynamic poster layouts.",
        price: "€80",
      },
      {
        title: "Athlete Highlight Poster",
        desc: "Spotlight athletes with striking visual flair.",
        price: "€80",
      },
      {
        title: "Training Camp Poster",
        desc: "Promote camps with clear, branded visuals.",
        price: "€90",
      },
      {
        title: "Charity Event Poster",
        desc: "Posters for awareness and engagement.",
        price: "€80",
      },
      {
        title: "Fundraising Event Poster",
        desc: "Drive donations with compelling poster designs.",
        price: "€80",
      },
    ],
  },
  {
    icon: <FaFlag className="text-primary text-xl" />,
    title: "Banner Design",
    items: [
      {
        title: "Event Banner (Indoor & Outdoor)",
        desc: "Large-format banners for any setting.",
        price: "€150",
      },
      {
        title: "Dojo Banner",
        desc: "Represent your dojo with pride and clarity.",
        price: "€130",
      },
      {
        title: "Competition Banner",
        desc: "Eye-catching banners for competitive events.",
        price: "€140",
      },
      {
        title: "Roll-Up Banner",
        desc: "Portable banners ideal for quick setup.",
        price: "€120",
      },
      {
        title: "Welcome Banner for Tournaments",
        desc: "First impressions that greet participants.",
        price: "€130",
      },
      {
        title: "Podium Backdrop Banner",
        desc: "Highlight champions with photo-ready banners.",
        price: "€160",
      },
      {
        title: "Large Format Banner (e.g., 4x3m)",
        desc: "Maximum visibility for large-scale promotion.",
        price: "€200",
      },
    ],
  },
  {
    icon: <FaInstagram className="text-primary text-xl" />,
    title: "Social Media Graphics",
    items: [
      {
        title: "Instagram Post Design",
        desc: "Styled visuals for strong Instagram presence.",
        price: "€40",
      },
      {
        title: "Facebook Cover & Event Banner",
        desc: "Branded covers for Facebook pages and events.",
        price: "€50",
      },
      {
        title: "Instagram Story Templates (Set of 3)",
        desc: "Stylized stories to boost engagement.",
        price: "€60",
      },
      {
        title: "Highlight Icons (Set of 5)",
        desc: "Custom icons for organized profile highlights.",
        price: "€30",
      },
      {
        title: "YouTube Thumbnail",
        desc: "Click-worthy thumbnails for video content.",
        price: "€30",
      },
      {
        title: "Animated Social Media Post",
        desc: "Motion graphics to increase reach and impact.",
        price: "€50",
      },
      {
        title: "Countdown Timers for Events",
        desc: "Hype up events with countdown graphics.",
        price: "€25",
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
        price: "€150",
      },
      {
        title: "Tournament Logo",
        desc: "Icons that symbolize competition and excellence.",
        price: "€150",
      },
      {
        title: "Event Branding Logo",
        desc: "Cohesive visuals for event identity.",
        price: "€140",
      },
      {
        title: "Personal Brand Logo for Athletes",
        desc: "Logos that capture your personal ethos.",
        price: "€130",
      },
      {
        title: "Mascot Logo for Teams",
        desc: "Fun and fierce mascot designs for teams.",
        price: "€180",
      },
      {
        title: "Patch Logo for Gi (Uniform)",
        desc: "Clean logos ready for embroidery or printing.",
        price: "€100",
      },
    ],
  },
  {
    icon: <FaTshirt className="text-primary text-xl" />,
    title: "Merchandise Design",
    items: [
      {
        title: "T-Shirt Design",
        desc: "Stylish graphics for martial arts t-shirts.",
        price: "€60",
      },
      {
        title: "Hoodie Design",
        desc: "Comfy and bold designs for hoodies.",
        price: "€60",
      },
      {
        title: "Cap Design",
        desc: "Minimal, logo-based hat designs.",
        price: "€50",
      },
      {
        title: "Tote Bag Design",
        desc: "Functional designs for branded tote bags.",
        price: "€40",
      },
      {
        title: "Custom Patch Design for Gi",
        desc: "Patches built for clarity and durability.",
        price: "€50",
      },
      {
        title: "Water Bottle Sticker Design",
        desc: "Eye-catching stickers for hydration gear.",
        price: "€30",
      },
      {
        title: "Karate Gym Bag Design",
        desc: "Sleek designs for dojo or team gym bags.",
        price: "€50",
      },
    ],
  },
  {
    icon: <FaCertificate className="text-primary text-xl" />,
    title: "Certificates & Awards",
    items: [
      {
        title: "Belt Rank Certificate",
        desc: "Elegant certificates for rank achievements.",
        price: "€30",
      },
      {
        title: "Participation Certificate",
        desc: "Clean, respectful recognition certificates.",
        price: "€25",
      },
      {
        title: "Achievement Certificate",
        desc: "Celebrate milestones and awards.",
        price: "€25",
      },
      {
        title: "Custom Medal Design",
        desc: "Unique medals that symbolize victory.",
        price: "€40",
      },
      {
        title: "Trophy Engraving Design",
        desc: "Engraving-ready trophy visuals.",
        price: "€40",
      },
    ],
  },
  {
    icon: <FaCarSide className="text-primary text-xl" />,
    title: "Car & Vehicle Branding",
    items: [
      {
        title: "Custom Karate LED Projector Light Design",
        desc: "Standout projector light visuals.",
        price: "€50",
      },
      {
        title: "Car Decals (Karate Logos, Athlete Names)",
        desc: "Mobile branding with personality.",
        price: "€40",
      },
      {
        title: "Window Stickers for Dojo Branding",
        desc: "Promote your dojo on the move.",
        price: "€30",
      },
      {
        title: "Wrap Designs for Dojo Vehicles",
        desc: "Full vehicle wraps with martial flair.",
        price: "€150",
      },
    ],
  },
  {
    icon: <FaMapSigns className="text-primary text-xl" />,
    title: "Signage Design",
    items: [
      {
        title: "Dojo Entrance Sign",
        desc: "Make a bold first impression.",
        price: "€100",
      },
      {
        title: "Wayfinding Signs for Events",
        desc: "Guide participants with clarity.",
        price: "€70",
      },
      {
        title: "Gym Wall Graphics",
        desc: "Decorative and motivational visuals.",
        price: "€120",
      },
      {
        title: "Safety & Instructional Signs",
        desc: "Clear, functional signage.",
        price: "€70",
      },
    ],
  },
  {
    icon: <FaBullhorn className="text-primary text-xl" />,
    title: "Promotional Materials",
    items: [
      {
        title: "Event Flyer",
        desc: "Essential flyers for quick info sharing.",
        price: "€50",
      },
      {
        title: "Brochure for Karate Programs",
        desc: "Detailed overview of your offerings.",
        price: "€70",
      },
      {
        title: "Business Cards (Front & Back)",
        desc: "Compact branding you can hand out.",
        price: "€40",
      },
      {
        title: "Membership Cards",
        desc: "Custom cards for students or members.",
        price: "€30",
      },
      {
        title: "Custom Invitations",
        desc: "Designed for special karate events.",
        price: "€40",
      },
    ],
  },
  {
    icon: <FaCubes className="text-primary text-xl" />,
    title: "3D Printing Designs",
    items: [
      {
        title: "Karate Trophy Design",
        desc: "3D models for champion awards.",
        price: "€70",
      },
      {
        title: "Custom Medal Holder",
        desc: "Display holders with sleek designs.",
        price: "€60",
      },
      {
        title: "Keychain with Karate Logos",
        desc: "Compact 3D logo souvenirs.",
        price: "€25",
      },
      {
        title: "Desktop Models (Karate Poses)",
        desc: "Figurines for inspiration or display.",
        price: "€80",
      },
    ],
  },
  {
    icon: <FaBoxOpen className="text-primary text-xl" />,
    title: "Additional Packages",
    items: [
      {
        title: "Event Branding Package",
        desc: "Poster, Banner, and Social Media Graphics bundled together.",
        price: "€250",
      },
      {
        title: "Dojo Starter Pack",
        desc: "Logo, Banner, Certificates, and Business Cards to launch your dojo.",
        price: "€350",
      },
      {
        title: "Athlete Highlight Pack",
        desc: "Poster, Instagram graphics, and T-shirt design for self-branding.",
        price: "€180",
      },
      {
        title: "Tournament Promo Pack",
        desc: "Full promotion kit: posters, banners, socials, and medal design.",
        price: "€400",
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
