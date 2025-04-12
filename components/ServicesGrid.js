import { motion } from "framer-motion";

const services = [
  {
    title: "Logo Design",
    description: "Create a memorable logo that defines your brand.",
    price: "$300",
  },
  {
    title: "Brand Identity Package",
    description:
      "Full branding, including logo, color palette, and typography.",
    price: "$1,200",
  },
  {
    title: "Website Design",
    description:
      "Custom, responsive website design for a powerful online presence.",
    price: "$2,000",
  },
  {
    title: "Business Card Design",
    description: "Sleek and professional business cards for networking.",
    price: "$150",
  },
  {
    title: "Social Media Kit",
    description: "Customized assets for your brand's social media channels.",
    price: "$400",
  },
  {
    title: "Poster Design",
    description: "Bold posters that capture attention and showcase your art.",
    price: "$250",
  },
  {
    title: "Apparel Design",
    description: "Creative designs for uniforms, tees, and merchandise.",
    price: "$500",
  },
  {
    title: "Brochure Design",
    description: "Informative and eye-catching brochures for marketing.",
    price: "$600",
  },
  {
    title: "Flyer Design",
    description: "Effective flyers for promotional events and announcements.",
    price: "$200",
  },
  {
    title: "Packaging Design",
    description: "Innovative packaging that enhances product appeal.",
    price: "$800",
  },
  {
    title: "Digital Illustration",
    description: "Custom illustrations tailored to your unique vision.",
    price: "$350",
  },
  {
    title: "Merchandise Design",
    description:
      "Unique designs for custom merchandise and promotional products.",
    price: "$700",
  },
];

const cardAnimation = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function ServicesGrid() {
  return (
    <section id="packages" className="py-24 px-6 max-w-7xl mx-auto text-center">
      <motion.h2
        className="text-3xl md:text-4xl font-semibold mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Our Services
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-md 
    transform transition duration-300 ease-in-out
    hover:-translate-y-2 hover:scale-105 hover:rotate-1 hover:shadow-primary/30"
            variants={cardAnimation}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-white mb-2">
              {service.title}
            </h3>
            <p className="text-gray-300 text-sm mb-4">{service.description}</p>
            <div className="text-primary font-bold text-lg">
              {service.price}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
