import { useEffect, useState } from "react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return visible ? (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-5 right-5 bg-primary p-3 rounded-full shadow-lg hover:scale-110 transition"
    >
      <ChevronUpIcon className="w-5 h-5 text-white" />
    </button>
  ) : null;
}
