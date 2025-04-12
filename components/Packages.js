import { motion } from "framer-motion";

const packages = [
  {
    title: "Starter",
    price: "€499",
    features: ["Basic brand kit", "1 Landing Page", "1 Revision"],
    featured: false,
  },
  {
    title: "Pro",
    price: "€999",
    features: [
      "Full brand identity",
      "Multi-page website",
      "3 Revisions",
      "Responsive design",
    ],
    featured: true,
  },
  {
    title: "Elite",
    price: "€1499",
    features: [
      "All Pro features",
      "Advanced animations",
      "CMS or Blog integration",
      "Priority support",
    ],
    featured: false,
  },
];

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const cardAnimation = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function Packages() {
  return (
    <section id="packages" className="py-20 px-6 max-w-7xl mx-auto text-center">
      <motion.h2
        className="text-3xl md:text-4xl font-semibold mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Packages
      </motion.h2>

      <motion.div
        className="grid gap-8 grid-cols-1 md:grid-cols-3"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {packages.map((pkg, i) => (
          <motion.div
            key={i}
            className={`relative p-8 rounded-xl shadow-xl border border-white/10 bg-white/5 backdrop-blur-md transition duration-300 hover:shadow-red-500/30  ${
              pkg.featured ? "ring-2 ring-gold/70" : ""
            }`}
            variants={cardAnimation}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
          >
            {pkg.featured && (
              <span className="absolute top-4 right-4 text-xs bg-gold text-black px-3 py-1 rounded-full font-semibold">
                Most Popular
              </span>
            )}

            <h3 className="text-2xl font-semibold mb-4">{pkg.title}</h3>
            <p className="text-3xl font-bold text-primary mb-6">{pkg.price}</p>

            <ul className="text-left mb-8 space-y-2 text-gray-300">
              {pkg.features.map((feat, j) => (
                <li key={j} className="flex items-center gap-2">
                  <span className="text-primary">✓</span> {feat}
                </li>
              ))}
            </ul>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="inline-block bg-primary text-white px-5 py-2 rounded-md font-medium tracking-wide shadow hover:shadow-lg transition"
            >
              Get Started
            </motion.a>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
