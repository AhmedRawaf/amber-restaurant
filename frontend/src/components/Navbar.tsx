import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToSection } from "@/lib/utils";

const navLinks = [
  { label: "قائمة الطعام", id: "menu" },
  { label: "من نحن",       id: "about" },
  { label: "آراء عملائنا", id: "reviews" },
  { label: "تواصل معنا",   id: "contact" },
];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = (id: string) => { scrollToSection(id); setMobileOpen(false); };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white border-b border-uber-border shadow-[0_1px_0_rgba(0,0,0,0.06)]" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <button
            onClick={() => nav("hero")}
            className="group hover:opacity-80 transition-opacity flex items-center"
          >
            <img src="/images/menu/amber-logo-transparent.png" alt="عنبر" className="h-16 w-auto object-contain" />
          </button>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => nav(link.id)}
                className="px-4 py-2 text-sm font-medium font-tajawal text-uber-gray5 hover:text-black rounded-full hover:bg-uber-gray1 transition-all duration-150"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <motion.button
              onClick={() => nav("reservation")}
              className="btn-primary text-sm py-2.5 px-5"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              احجز طاولتك
            </motion.button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-[5px]"
            aria-label="القائمة"
          >
            <motion.span className="w-5 h-0.5 bg-black block rounded-full"
              animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} />
            <motion.span className="w-5 h-0.5 bg-black block rounded-full"
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }} />
            <motion.span className="w-5 h-0.5 bg-black block rounded-full"
              animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-white border-t border-uber-border"
          >
            <div className="px-5 py-4 space-y-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.id}
                  onClick={() => nav(link.id)}
                  className="w-full text-right px-4 py-3 rounded-xl font-tajawal text-sm text-black hover:bg-uber-gray1 transition-colors font-medium"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  {link.label}
                </motion.button>
              ))}
              <div className="pt-2">
                <button onClick={() => nav("reservation")} className="btn-primary w-full">
                  احجز طاولتك
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
