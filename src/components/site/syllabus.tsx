"use client";

import { motion } from "framer-motion";
import { ExternalLink, FileText, BookOpen, Library, Layers } from "lucide-react";

export default function Syllabus() {
  return (
    <section
      id="syllabus"
      className="section-pad relative bg-white overflow-hidden"
    >
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-emerald/8 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -left-32 w-96 h-96 bg-gold/8 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-[0.18em] uppercase bg-emerald/10 text-emerald border border-emerald/20"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald" />
            Official Subject-wise Syllabus
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-4 font-playfair font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-[1.1] text-emerald-dark"
          >
            Download the Complete{" "}
            <span className="text-gradient-emerald">CSS Syllabus</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-5 text-base sm:text-lg text-ink/65 leading-relaxed"
          >
            The CSS exam has detailed, paper-by-paper syllabi for every compulsory
            and optional subject — published officially by FPSC. We&apos;ve
            partnered with{" "}
            <span className="font-semibold text-emerald">CSS Point</span> to give
            you the most updated, downloadable syllabus for every single paper.
          </motion.p>
        </div>

        {/* CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-12 relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-dark via-emerald to-emerald-dark p-8 sm:p-12 lg:p-16"
        >
          {/* Decorations */}
          <div className="absolute inset-0 pattern-grid opacity-15" />
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-gold/20 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-emerald-light/25 rounded-full blur-3xl animate-float" />

          <div className="relative grid lg:grid-cols-12 gap-8 items-center">
            {/* Left content */}
            <div className="lg:col-span-7 text-cream">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/15 text-gold-light border border-gold/30 text-xs font-semibold tracking-wider uppercase mb-4">
                <FileText className="w-3.5 h-3.5" />
                FPSC Approved • Updated Yearly
              </div>
              <h3 className="font-playfair font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight">
                Get the official syllabus for every CSS paper —{" "}
                <span className="text-gradient-gold">in one click.</span>
              </h3>
              <p className="mt-4 text-cream/80 text-sm sm:text-base leading-relaxed max-w-xl">
                CSS Point hosts the complete, downloadable PDF syllabus for all
                6 compulsory papers and 50+ optional subjects — with topic-wise
                breakdowns, recommended books, and past paper analysis for each.
              </p>

              {/* Feature list */}
              <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-sm text-cream/85">
                {[
                  { icon: BookOpen, t: "All 6 Compulsory Papers" },
                  { icon: Library, t: "50+ Optional Subjects" },
                  { icon: Layers, t: "Topic-wise Breakdown" },
                  { icon: FileText, t: "Downloadable PDFs" },
                ].map((f) => (
                  <li key={f.t} className="flex items-center gap-2.5">
                    <f.icon className="w-4 h-4 text-gold-light shrink-0" />
                    <span>{f.t}</span>
                  </li>
                ))}
              </ul>

              {/* CTA button */}
              <a
                href="https://www.csspoint.com.pk/css-syllabus"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gold text-emerald-dark font-bold shadow-xl hover:bg-gold-light hover:-translate-y-0.5 transition-all shine relative overflow-hidden"
              >
                View Subject-wise Syllabus
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Right visual: 3D stacked syllabus books */}
            <div className="lg:col-span-5 relative h-64 sm:h-72 hidden lg:block">
              <div className="absolute inset-0 [transform-style:preserve-3d] [perspective:1200px]">
                {/* Book stack */}
                <div className="book-3d absolute inset-0 flex items-center justify-center">
                  <div className="relative w-48 h-64">
                    {/* Book 1 - bottom */}
                    <div
                      className="absolute inset-0 rounded-lg shadow-2xl"
                      style={{
                        background: "linear-gradient(135deg, #c9a227 0%, #8a6f12 100%)",
                        transform: "translateZ(-20px) translateY(20px)",
                      }}
                    >
                      <div className="p-4 text-emerald-dark">
                        <FileText className="w-6 h-6 mb-2" />
                        <div className="text-[10px] font-bold uppercase tracking-wider">Optional</div>
                        <div className="text-sm font-playfair font-bold mt-1">Subjects</div>
                        <div className="mt-2 text-[10px] opacity-70">200 marks</div>
                      </div>
                    </div>
                    {/* Book 2 - middle */}
                    <div
                      className="absolute inset-0 rounded-lg shadow-2xl"
                      style={{
                        background: "linear-gradient(135deg, #1aa05a 0%, #073822 100%)",
                        transform: "translateZ(0px) translateY(10px)",
                      }}
                    >
                      <div className="p-4 text-cream">
                        <BookOpen className="w-6 h-6 mb-2 text-gold-light" />
                        <div className="text-[10px] font-bold uppercase tracking-wider text-gold-light">Compulsory</div>
                        <div className="text-sm font-playfair font-bold mt-1">English Essay</div>
                        <div className="mt-2 text-[10px] opacity-70">100 marks</div>
                      </div>
                    </div>
                    {/* Book 3 - top */}
                    <div
                      className="absolute inset-0 rounded-lg shadow-2xl"
                      style={{
                        background: "linear-gradient(135deg, #fbf8ef 0%, #f1d27a 100%)",
                        transform: "translateZ(20px) translateY(0px)",
                      }}
                    >
                      <div className="p-4 text-emerald-dark">
                        <Library className="w-6 h-6 mb-2" />
                        <div className="text-[10px] font-bold uppercase tracking-wider">FPSC</div>
                        <div className="text-sm font-playfair font-bold mt-1">CSS Syllabus</div>
                        <div className="mt-2 text-[10px] opacity-70">2026 Edition</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-6 text-center text-xs text-ink/55 max-w-2xl mx-auto"
        >
          You will be redirected to CSS Point — Pakistan&apos;s trusted free
          resource for CSS syllabus, past papers, and study material. Always
          cross-check with the official FPSC website for the latest updates.
        </motion.p>
      </div>
    </section>
  );
}
