/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 px-6 py-4 flex justify-between items-center transition duration-300 ${
        scrolled
          ? "bg-charcoal/80 backdrop-blur-lg shadow-md"
          : "bg-transparent"
      }`}
    >
      <a href="/" className="flex items-center gap-3">
        <img
          src="/logo.svg"
          alt="Karate Designs CN Logo"
          className={`transition-all duration-300 ease-in-out invert brightness-0 ${
            scrolled
              ? "w-[36px] h-[36px] sm:w-[44px] sm:h-[44px]"
              : "w-[72px] h-[72px] sm:w-[88px] sm:h-[88px]"
          }`}
        />
        <span
          className={`text-white text-sm transition-all duration-300 ease-in-out ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        >
          {" "}
          @karate_designs.cn
        </span>
      </a>
      <div className="space-x-4 hidden md:block">
        <a href="#gallery" className="hover:text-primary transition">
          Gallery
        </a>
        <a href="#packages" className="hover:text-primary transition">
          Packages
        </a>
        <a href="#contact" className="hover:text-primary transition">
          Contact
        </a>
      </div>
    </nav>
  );
}
