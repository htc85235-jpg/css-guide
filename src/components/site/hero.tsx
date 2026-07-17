"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, BookOpen, Target, Users, Sparkles } from "lucide-react";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-[100svh] flex items-center overflow-hidden pt-24 pb-16"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream via-white to-emerald-light/10" />
      <div className="absolute inset-0 pattern-grid opacity-50" />
      <div className="absolute top-1/3 -left-32 w-[28rem] h-[28rem] bg-emerald/15 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute bottom-1/4 -right-32 w-[32rem] h-[32rem] bg-gold/15 rounded-full blur-3xl animate-float" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 lg:gap-8 items-center w-full">
        {/* Left content */}
        <motion.div
          style={{ y: yText, opacity }}
          className="lg:col-span-6 space-y-7 text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-md border border-emerald/15 text-sm font-medium text-emerald-dark"
          >
            <Sparkles className="w-4 h-4 text-gold" />
            Free CSS Exam Resource Hub
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-playfair font-black text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight text-emerald-dark"
          >
            Master the <span className="text-gradient-emerald">CSS Exam</span>,
            <br className="hidden sm:block" />
            Shape Pakistan&apos;s <span className="text-gradient-gold">Future</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="text-base sm:text-lg lg:text-xl text-ink/70 leading-relaxed max-w-xl mx-auto lg:mx-0"
          >
            From syllabus breakdowns and subject selection to exam schedules,
            toppers&apos; strategies, and daily motivation — everything a CSS
            aspirant needs, beautifully organized in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
          >
            <a
              href="#exam-structure"
              className="group px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald to-emerald-dark text-white font-semibold shadow-xl shadow-emerald/30 hover:shadow-emerald/50 hover:-translate-y-0.5 transition-all shine relative overflow-hidden flex items-center justify-center gap-2"
            >
              Explore Syllabus
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#toppers"
              className="px-6 py-3.5 rounded-xl bg-white text-emerald-dark font-semibold border border-emerald/20 hover:border-emerald/40 hover:bg-emerald/5 transition-all flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              Toppers&apos; Stories
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.46 }}
            className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 pt-4"
          >
            {[
              { icon: Target, label: "Subjects Covered", value: "50+" },
              { icon: Users, label: "Yearly Aspirants", value: "20K+" },
              { icon: BookOpen, label: "Free Resources", value: "200+" },
            ].map((s) => (
              <div key={s.label} className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-1.5 mb-1">
                  <s.icon className="w-4 h-4 text-gold" />
                  <span className="font-playfair text-2xl sm:text-3xl font-extrabold text-emerald-dark">
                    {s.value}
                  </span>
                </div>
                <p className="text-xs text-ink/55 font-medium">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right visual: 3D card collage */}
        <motion.div
          style={{ y: yImage }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-6 relative h-[440px] sm:h-[520px] lg:h-[580px]"
        >
          {/* Main hero image */}
          <div className="absolute inset-0 [transform-style:preserve-3d] [perspective:1200px]">
            <div className="absolute inset-0 tilt-card rounded-3xl overflow-hidden shadow-2xl shadow-emerald-dark/40 ring-1 ring-white/40">
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80"
                alt="CSS aspirants studying together"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-dark/80 via-emerald-dark/10 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-6 lg:p-8 text-cream">
                <p className="text-xs uppercase tracking-[0.25em] text-gold-light mb-2">
                  The CSS Journey
                </p>
                <h3 className="font-playfair font-bold text-xl lg:text-2xl leading-tight">
                  &ldquo;The pen that writes the destiny of a nation.&rdquo;
                </h3>
              </div>
            </div>
          </div>

          {/* Floating card 1 - Subject list */}
          <motion.div
            initial={{ opacity: 0, x: -30, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="absolute -top-6 -left-2 sm:-left-8 w-48 glass rounded-2xl p-4 shadow-xl animate-float-slow"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-emerald/15 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-emerald" />
              </div>
              <span className="text-xs font-bold text-emerald-dark">
                Compulsory <span className="text-gold-dark">· 6</span>
              </span>
            </div>
            <ul className="text-[11px] text-ink/70 space-y-1">
              <li>• English Essay</li>
              <li>• English (Precis &amp; Comp.)</li>
              <li>• General Science &amp; Ability</li>
              <li>• Current Affairs</li>
              <li>• Pakistan Affairs</li>
              <li>• Islamic Studies / Ethics</li>
            </ul>
          </motion.div>

          {/* Floating card 2 - Motivation */}
          <motion.div
            initial={{ opacity: 0, x: 30, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="absolute -bottom-4 -right-2 sm:-right-8 w-56 glass rounded-2xl p-4 shadow-xl animate-float"
          >
            <div className="flex items-start gap-2">
              <Target className="w-5 h-5 text-gold mt-0.5 shrink-0" />
              <p className="text-xs text-ink/80 leading-relaxed font-medium">
                &ldquo;Success is the sum of small efforts, repeated day in and day out.&rdquo;
              </p>
            </div>
            <div className="mt-2 text-[10px] uppercase tracking-wider text-emerald font-semibold">
              — Robert Collier
            </div>
          </motion.div>

          {/* Floating badge - Pass rate */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="absolute top-1/2 -right-3 sm:-right-10 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-gold to-gold-dark text-emerald-dark flex flex-col items-center justify-center shadow-2xl animate-glow rotate-12"
          >
            <span className="font-playfair font-black text-xl leading-none">2%</span>
            <span className="text-[9px] font-bold uppercase tracking-wide mt-0.5">Pass Rate</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-emerald/60"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-semibold">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="w-5 h-8 rounded-full border-2 border-emerald/30 flex items-start justify-center p-1"
        >
          <span className="w-1 h-1.5 rounded-full bg-emerald" />
        </motion.div>
      </motion.div>
    </section>
  );
}
