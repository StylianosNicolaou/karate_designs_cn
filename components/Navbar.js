/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    document.body.style.overflow = "hidden";
    const handleEscapeKey = (e) =>
      e.key === "Escape" && setMobileMenuOpen(false);
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => setMobileMenuOpen((v) => !v);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      {/* NAV BAR */}
      <nav
        className={`fixed w-full z-50 px-6 py-4 flex justify-between items-center transition duration-300 ${
          scrolled || mobileMenuOpen
            ? "bg-charcoal/80 backdrop-blur-lg shadow-md"
            : "bg-transparent"
        }`}
      >
        <a href="/" className="flex items-center gap-3">
          <img
            src="/logo.svg"
            alt="Karate Designs CN Logo"
            className={`transition-all duration-300 ease-in-out invert brightness-0 ${
              scrolled || mobileMenuOpen
                ? "w-[36px] h-[36px] sm:w-[44px] sm:h-[44px]"
                : "w-[72px] h-[72px] sm:w-[88px] sm:h-[88px]"
            }`}
          />
          <span
            className={`text-white text-sm transition-all duration-300 ease-in-out ${
              scrolled || mobileMenuOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            @karate_designs.cn
          </span>
        </a>

        <div className="items-center space-x-4 hidden md:flex">
          <a
            href="#gallery"
            className="text-white hover:text-primary transition"
          >
            Gallery
          </a>
          <a
            href="#packages"
            className="text-white hover:text-primary transition"
          >
            Packages
          </a>
          <a
            href="#contact"
            className="text-white hover:text-primary transition"
          >
            Contact
          </a>
          <a
            href="/order"
            className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-all hover:scale-105 shadow-lg hover:shadow-primary/30"
          >
            Order now
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-white p-2 rounded-md hover:bg-white/10 transition"
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {mobileMenuOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>
      </nav>

      {/* MOBILE OVERLAY + PANEL (outside nav) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
            />

            {/* Side Panel */}
            <motion.aside
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              className="fixed top-0 right-0 h-full w-80 max-w-sm z-[60] md:hidden border-l border-white/10
                         bg-[#1d1d1d]" /* solid brand bg; no blur, no slashed opacity */
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <img
                      src="/logo.svg"
                      alt="Karate Designs CN Logo"
                      className="w-8 h-8 invert brightness-0"
                    />
                    <span className="text-white text-sm font-medium">
                      @karate_designs.cn
                    </span>
                  </div>
                  <button
                    onClick={closeMobileMenu}
                    className="text-white p-2 rounded-md hover:bg-white/10 transition"
                    aria-label="Close mobile menu"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>

                {/* Links */}
                <div className="flex-1 px-6 py-8 space-y-6">
                  <a
                    href="#gallery"
                    onClick={closeMobileMenu}
                    className="block text-white text-lg font-medium hover:text-primary transition py-2"
                  >
                    Gallery
                  </a>
                  <a
                    href="#packages"
                    onClick={closeMobileMenu}
                    className="block text-white text-lg font-medium hover:text-primary transition py-2"
                  >
                    Packages
                  </a>
                  <a
                    href="#contact"
                    onClick={closeMobileMenu}
                    className="block text-white text-lg font-medium hover:text-primary transition py-2"
                  >
                    Contact
                  </a>
                  <a
                    href="/order"
                    onClick={closeMobileMenu}
                    className="block bg-primary text-white text-center px-6 py-4 rounded-md font-semibold text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/30 mt-8"
                  >
                    Order now
                  </a>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/10">
                  <p className="text-gray-300 text-sm text-center">
                    Design with Discipline
                  </p>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
