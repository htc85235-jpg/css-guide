"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, GraduationCap } from "lucide-react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Exam Structure", href: "#exam-structure" },
  { label: "Compulsory", href: "#compulsory" },
  { label: "Optional", href: "#optional" },
  { label: "Schedule", href: "#schedule" },
  { label: "Toppers", href: "#toppers" },
  { label: "Resources", href: "#resources" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass shadow-[0_8px_30px_rgba(7,56,34,0.10)] border-b border-emerald/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gold/40 blur-md rounded-lg group-hover:bg-gold/60 transition-all" />
              <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-emerald to-emerald-dark flex items-center justify-center shadow-lg">
                <GraduationCap className="w-5 h-5 text-gold-light" strokeWidth={2.5} />
              </div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-playfair font-extrabold text-xl tracking-tight text-emerald-dark">
                CSS <span className="text-gradient-gold">GUIDE</span>
              </span>
              <span className="text-[10px] tracking-[0.22em] text-emerald/70 font-medium">
                PAKISTAN • CSS HUB
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-3.5 py-2 text-sm font-medium text-ink/80 hover:text-emerald rounded-md transition-colors relative group"
              >
                {l.label}
                <span className="absolute inset-x-3.5 -bottom-0.5 h-0.5 bg-gradient-to-r from-emerald to-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </a>
            ))}
            <a
              href="#cta"
              className="ml-3 px-5 py-2.5 rounded-lg bg-gradient-to-r from-emerald to-emerald-dark text-white text-sm font-semibold shadow-lg shadow-emerald/20 hover:shadow-emerald/40 hover:-translate-y-0.5 transition-all shine relative overflow-hidden"
            >
              Start Preparing
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-md text-emerald-dark"
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden glass border-t border-emerald/10"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-2.5 text-sm font-medium text-ink/80 hover:text-emerald hover:bg-emerald/5 rounded-md transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#cta"
                onClick={() => setOpen(false)}
                className="mt-2 px-4 py-3 rounded-lg bg-gradient-to-r from-emerald to-emerald-dark text-white text-sm font-semibold text-center"
              >
                Start Preparing
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
