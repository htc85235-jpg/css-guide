"use client";

import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, BookOpen, Users } from "lucide-react";

export default function CTA() {
  return (
    <section id="cta" className="section-pad relative bg-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-dark via-emerald to-emerald-dark p-8 sm:p-14 lg:p-20"
        >
          {/* Decorations */}
          <div className="absolute inset-0 pattern-grid opacity-15" />
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-gold/20 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-emerald-light/30 rounded-full blur-3xl animate-float" />

          {/* Floating 3D books */}
          <div className="absolute right-6 sm:right-12 top-6 sm:top-12 hidden sm:block book-3d">
            <div className="w-24 h-32 rounded-md shadow-2xl" style={{
              background: "linear-gradient(135deg, #c9a227 0%, #8a6f12 100%)",
              transform: "translateZ(20px)",
            }}>
              <div className="p-3 text-emerald-dark">
                <BookOpen className="w-5 h-5 mb-2" />
                <div className="text-[9px] font-bold uppercase tracking-wider">CSS</div>
                <div className="text-[10px] font-playfair font-bold">Guide 2026</div>
              </div>
            </div>
          </div>

          <div className="relative max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/15 text-gold-light border border-gold/30 text-xs font-semibold tracking-[0.18em] uppercase"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              Your Journey Starts Today
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="mt-4 font-playfair font-black text-3xl sm:text-4xl lg:text-5xl text-cream leading-[1.1]"
            >
              Pakistan is waiting for{" "}
              <span className="text-gradient-gold">its next officer</span>.
              <br />
              Will it be you?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="mt-5 text-cream/80 text-base sm:text-lg leading-relaxed max-w-xl"
            >
              The next CSS exam is closer than you think. Whether you&apos;re in
              your final semester or a working professional, today is the day to
              commit. Open the books. Trust the process. Become the change.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <a
                href="#exam-structure"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gold text-emerald-dark font-bold shadow-xl hover:bg-gold-light hover:-translate-y-0.5 transition-all shine relative overflow-hidden"
              >
                Start with the Syllabus
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#toppers"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-cream/10 text-cream border border-cream/20 font-semibold hover:bg-cream/15 transition-all"
              >
                <Users className="w-4 h-4" />
                Read Toppers&apos; Stories
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.36 }}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-cream/60"
            >
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                Free forever
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                No sign-up required
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                Updated for CSS 2026
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
