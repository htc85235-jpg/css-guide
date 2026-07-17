"use client";

import { motion } from "framer-motion";
import SectionHeading from "./section-heading";
import { Quote, Trophy, MapPin } from "lucide-react";

const TOPPERS = [
  {
    name: "Ayesha Sana",
    rank: "1st Position",
    year: "CSS 2023",
    group: "Foreign Service of Pakistan (FSP)",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    quote:
      "I never aimed for rank one. I aimed for daily improvement — and one day, the rank followed. Wake up before Fajr, study till Maghrib, repeat. There is no shortcut, only discipline.",
    subjects: ["Political Science", "International Relations", "History of USA"],
  },
  {
    name: "Hamza Khan",
    rank: "5th Position",
    year: "CSS 2022",
    group: "Pakistan Administrative Service (PAS)",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    quote:
      "Sociology and Journalism were my safety nets — short, scoring, and overlap with current affairs. But the real game was English Essay. Practice one essay every Sunday for two years.",
    subjects: ["Sociology", "Journalism", "Anthropology"],
  },
  {
    name: "Fatima Noor",
    rank: "12th Position",
    year: "CSS 2023",
    group: "Police Service of Pakistan (PSP)",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
    quote:
      "Being a female aspirant from a small town, the journey was lonely. But I made notes on Google Docs, joined a Telegram study circle, and never let geography become destiny.",
    subjects: ["Psychology", "Gender Studies", "Criminology"],
  },
];

export default function Toppers() {
  return (
    <section id="toppers" className="section-pad relative bg-white overflow-hidden">
      <div className="absolute top-1/4 -left-32 w-72 h-72 bg-emerald/8 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-72 h-72 bg-gold/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="From Aspirants to Officers"
          title={
            <>
              Toppers&apos; <span className="text-gradient-emerald">Stories</span>
            </>
          }
          subtitle="Real journeys from real toppers. Different backgrounds, different strategies, one outcome — they refused to give up. Read, learn, and remember: their journey is proof that yours is possible too."
        />

        <div className="mt-14 grid lg:grid-cols-3 gap-6">
          {TOPPERS.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="tilt-card group relative bg-gradient-to-br from-white to-cream/60 rounded-3xl border border-emerald/10 shadow-lg hover:shadow-2xl overflow-hidden"
            >
              {/* Header with image */}
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-dark/80 via-transparent to-transparent" />
                <div className="absolute top-4 right-4">
                  <div className="px-3 py-1.5 rounded-full bg-gold text-emerald-dark text-xs font-bold flex items-center gap-1.5 shadow-lg">
                    <Trophy className="w-3.5 h-3.5" />
                    {t.rank}
                  </div>
                </div>
                <div className="absolute bottom-3 left-4 right-4 text-cream">
                  <h3 className="font-playfair font-bold text-xl leading-tight">{t.name}</h3>
                  <p className="text-xs text-cream/85 mt-0.5">{t.year}</p>
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-emerald" />
                  <span className="text-xs font-semibold text-emerald-dark">
                    Allocated: {t.group}
                  </span>
                </div>

                <div className="relative pl-6 mb-4">
                  <Quote className="absolute left-0 top-0 w-4 h-4 text-gold/60" />
                  <p className="text-sm text-ink/75 leading-relaxed italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="border-t border-emerald/10 pt-3">
                  <p className="text-[11px] uppercase tracking-wider font-bold text-gold-dark mb-2">
                    Optional Subjects
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {t.subjects.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-1 rounded-md bg-emerald/10 text-emerald text-[11px] font-semibold"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 rounded-3xl bg-gradient-to-r from-emerald-dark to-emerald p-8 sm:p-10 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 pattern-dots opacity-20" />
          <div className="relative">
            <Trophy className="w-10 h-10 text-gold-light mx-auto mb-4" />
            <h3 className="font-playfair font-bold text-2xl sm:text-3xl text-cream mb-3">
              Your name could be next.
            </h3>
            <p className="text-cream/80 max-w-xl mx-auto text-sm sm:text-base">
              Every topper was once an aspirant unsure whether they would make it.
              The only difference between them and those who didn&apos;t? They
              refused to quit.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
