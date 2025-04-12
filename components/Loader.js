import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoader(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          className="fixed inset-0 z-50 bg-charcoal flex flex-col items-center justify-center gap-4"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo */}
          <motion.img
            src="/logo.svg"
            alt="Karate Designs CN Logo"
            className="w-[500px] h-[500px] sm:w-[600px] sm:h-[600px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          />

          {/* Tagline */}
          <motion.p
            className="text-primary text-lg sm:text-xl font-medium text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.6, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 1.2, delay: 0.6 }}
          >
            Design with Discipline. Create with Purpose.
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
