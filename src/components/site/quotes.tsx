"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const QUOTES = [
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    img: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=800&q=80",
    role: "Statesman",
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    role: "Former First Lady",
  },
  {
    text: "I have not failed. I&apos;ve just found 10,000 ways that won&apos;t work.",
    author: "Thomas Edison",
    img: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80",
    role: "Inventor",
  },
  {
    text: "Criminals do not die by the hands of the law. They die by the hands of educated, disciplined and dedicated young people.",
    author: "Quaid-e-Azam M.A. Jinnah",
    img: "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=800&q=80",
    role: "Founder of Pakistan",
  },
  {
    text: "Khudi ko kar buland itna ke har taqdeer se pehle, Khuda bande se khud pooche bata teri raza kya hai.",
    author: "Allama Iqbal",
    img: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80",
    role: "Poet of the East",
  },
  {
    text: "Nations are born in the hearts of poets; they prosper and die in the hands of politicians.",
    author: "Allama Iqbal",
    img: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=800&q=80",
    role: "Poet of the East",
  },
];

export default function Quotes() {
  return (
    <section className="section-pad relative bg-gradient-to-br from-emerald-dark via-ink to-emerald-dark overflow-hidden">
      <div className="absolute inset-0 pattern-grid opacity-10" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-light/15 rounded-full blur-3xl animate-float" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-[0.18em] uppercase bg-gold/15 text-gold-light border border-gold/30"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            Daily Fuel
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-4 font-playfair font-extrabold text-3xl sm:text-4xl lg:text-5xl text-cream leading-tight"
          >
            Motivation for the <span className="text-gradient-gold">Long Journey</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-4 text-cream/70 max-w-2xl mx-auto leading-relaxed"
          >
            CSS preparation is a marathon, not a sprint. Bookmark this page and revisit these words whenever the road feels long.
          </motion.p>
        </div>

        {/* Quote cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {QUOTES.map((q, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              className="group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all"
            >
              {/* Image */}
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={q.img}
                  alt={q.author}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-dark/95 via-emerald-dark/55 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <Quote className="w-8 h-8 text-gold/60 mb-3" />
                <p
                  className="text-sm sm:text-base text-cream leading-relaxed font-playfair italic"
                  dangerouslySetInnerHTML={{ __html: `&ldquo;${q.text}&rdquo;` }}
                />
                <div className="mt-4 pt-4 border-t border-gold/20">
                  <div className="font-bold text-gold-light text-sm">{q.author}</div>
                  <div className="text-xs text-cream/60">{q.role}</div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Marquee motivation strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 overflow-hidden rounded-2xl bg-cream/5 border border-gold/20 py-5"
        >
          <div className="flex animate-marquee whitespace-nowrap">
            {[...Array(2)].map((_, idx) => (
              <div key={idx} className="flex items-center gap-12 px-6 text-cream/80 font-playfair text-lg sm:text-xl">
                <span>★ Discipline beats motivation</span>
                <span className="text-gold">•</span>
                <span>★ Consistency compounds</span>
                <span className="text-gold">•</span>
                <span>★ Read daily, write daily, revise weekly</span>
                <span className="text-gold">•</span>
                <span>★ Your only competition is yesterday&apos;s you</span>
                <span className="text-gold">•</span>
                <span>★ Knowledge is the only wealth nobody can take</span>
                <span className="text-gold">•</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
