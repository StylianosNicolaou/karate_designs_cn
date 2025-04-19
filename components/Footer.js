import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      className="bg-transparent border-t border-white/10 mt-20 pt-12 pb-6 text-center text-gray-400"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Branding */}
        <div className="text-sm tracking-wide font-medium">
          &copy; {year}{" "}
          <a
            href="mailto:stylianosnicolaou@gmail.com"
            className="text-primary hover:text-primary/80 transition"
          >
            Stylianos Nicolaou
          </a>. All rights reserved.
        </div>

        {/* Socials */}
        <div className="flex gap-4 text-lg">
          <a
            href="https://www.facebook.com/profile.php?id=100090942139320&locale=da_DK"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition"
          >
            <FaFacebook />
          </a>
          <a
            href="https://www.instagram.com/karate_designs.cn/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition"
          >
            <FaInstagram />
          </a>

          <a
            href="https://x.com/karate_designs"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition"
          >
            <FaTwitter />
          </a>
        </div>
      </div>
    </motion.footer>
  );
}
