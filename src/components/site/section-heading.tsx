"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  dark?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  dark = false,
}: SectionHeadingProps) {
  return (
    <div
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : "text-left"}`}
    >
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-[0.18em] uppercase ${
            dark
              ? "bg-gold/15 text-gold-light border border-gold/30"
              : "bg-emerald/10 text-emerald border border-emerald/20"
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${dark ? "bg-gold" : "bg-emerald"}`} />
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className={`mt-4 font-playfair font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-[1.1] ${
          dark ? "text-cream" : "text-emerald-dark"
        }`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className={`mt-5 text-base sm:text-lg leading-relaxed ${
            dark ? "text-cream/70" : "text-ink/65"
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
