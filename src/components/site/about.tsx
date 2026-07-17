"use client";

import { motion } from "framer-motion";
import SectionHeading from "./section-heading";
import { Building2, CalendarDays, FileText, GraduationCap, Award, Globe2 } from "lucide-react";

const ELIGIBILITY = [
  {
    icon: GraduationCap,
    title: "Education",
    desc: "Bachelor&apos;s degree (14 years of education) from an HEC-recognized university with at least 2nd division.",
  },
  {
    icon: CalendarDays,
    title: "Age Limit",
    desc: "Minimum 21 years and maximum 30 years on 31st December of the exam year (relaxation applies for some categories).",
  },
  {
    icon: Globe2,
    title: "Nationality",
    desc: "Pakistani citizen (male/female). Azad Kashmir nationals and state subjects of GB/FATA also eligible per rules.",
  },
  {
    icon: FileText,
    title: "Attempts",
    desc: "Maximum 3 attempts for regular candidates. Documented proof of all claims required at application stage.",
  },
];

const CSS_GROUPS = [
  "Pakistan Administrative Service (PAS)",
  "Foreign Service of Pakistan (FSP)",
  "Police Service of Pakistan (PSP)",
  "Customs Group",
  "Pakistan Audit & Accounts Service (PAAS)",
  "Office Management Group (OMG)",
  "Commerce & Trade Group (CTG)",
  "Inland Revenue Service (IRS)",
  "Information Group (IG)",
  "Railways (Commercial & Transport) Group",
  "Postal Group (PG)",
  "Military Lands & Cantonments (MLC)",
];

export default function About() {
  return (
    <section id="about" className="section-pad relative overflow-hidden bg-cream/40">
      <div className="absolute inset-0 pattern-dots opacity-50" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What is CSS?"
          title={
            <>
              The Civil Superior Services Examination,{" "}
              <span className="text-gradient-emerald">explained</span>
            </>
          }
          subtitle="Conducted annually by the Federal Public Service Commission (FPSC), the CSS exam is Pakistan's most prestigious competitive exam — the gateway to 12 occupational groups that administer, defend, and represent the nation."
        />

        {/* FPSC spotlight */}
        <div className="mt-14 grid lg:grid-cols-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 relative rounded-3xl overflow-hidden shadow-2xl shadow-emerald-dark/20 group"
          >
            <img
              src="https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=1200&q=80"
              alt="Pakistan government building"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-dark/90 via-emerald-dark/60 to-transparent" />
            <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-end">
              <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-gold/20 text-gold-light border border-gold/30 text-xs font-semibold tracking-wider mb-3">
                <Building2 className="w-3.5 h-3.5" />
                CONDUCTED BY FPSC
              </div>
              <h3 className="font-playfair font-bold text-2xl sm:text-3xl text-cream leading-tight">
                Federal Public Service Commission
              </h3>
              <p className="mt-3 text-cream/80 max-w-md leading-relaxed text-sm sm:text-base">
                FPSC is the federal agency mandated under Article 242 of the
                Constitution to recruit civil servants for the Government of
                Pakistan. It conducts the CSS exam every February across 21
                examination centres nationwide.
              </p>
            </div>
          </motion.div>

          {/* Key facts card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 grid grid-cols-2 gap-4"
          >
            {[
              { v: "12", l: "Occupational Groups", s: "from-emerald to-emerald-dark" },
              { v: "1200", l: "Total Marks (Written)", s: "from-gold to-gold-dark" },
              { v: "300", l: "Marks Viva Voce", s: "from-emerald-dark to-ink" },
              { v: "Feb", l: "Annual Exam Month", s: "from-gold-dark to-emerald" },
            ].map((s, i) => (
              <div
                key={i}
                className={`relative rounded-2xl p-5 sm:p-6 bg-gradient-to-br ${s.s} text-white shadow-xl overflow-hidden`}
              >
                <div className="absolute -right-4 -top-4 w-16 h-16 rounded-full bg-white/10 blur-xl" />
                <div className="font-playfair text-3xl sm:text-4xl font-extrabold leading-none">
                  {s.v}
                </div>
                <div className="mt-2 text-xs sm:text-sm font-medium text-cream/85">
                  {s.l}
                </div>
              </div>
            ))}
            <div className="col-span-2 rounded-2xl p-5 sm:p-6 bg-white border border-emerald/15 shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-gold" />
                <span className="text-xs uppercase tracking-wider font-bold text-emerald">
                  Did you know?
                </span>
              </div>
              <p className="text-sm text-ink/75 leading-relaxed">
                The CSS exam was first held in 1926 during British rule as the
                &ldquo;Indian Civil Service Exam&rdquo;. Today, the pass rate
                hovers around <span className="font-bold text-emerald-dark">2%</span> —
                making it one of the toughest competitive exams in the world.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Eligibility grid */}
        <div className="mt-16">
          <h3 className="font-playfair font-bold text-2xl sm:text-3xl text-emerald-dark text-center mb-8">
            Eligibility Criteria
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ELIGIBILITY.map((e, i) => (
              <motion.div
                key={e.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="tilt-card group bg-white rounded-2xl p-6 border border-emerald/10 shadow-md hover:shadow-xl hover:border-emerald/30"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald to-emerald-dark flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform">
                  <e.icon className="w-6 h-6 text-gold-light" />
                </div>
                <h4 className="font-playfair font-bold text-lg text-emerald-dark mb-2">
                  {e.title}
                </h4>
                <p
                  className="text-sm text-ink/65 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: e.desc }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* CSS Groups */}
        <div className="mt-16 rounded-3xl bg-gradient-to-br from-emerald-dark to-emerald p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute inset-0 pattern-dots opacity-20" />
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-gold/20 rounded-full blur-3xl" />
          <div className="relative">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/15 text-gold-light border border-gold/30 text-xs font-semibold tracking-wider uppercase mb-3">
                  12 Occupational Groups
                </span>
                <h3 className="font-playfair font-bold text-2xl sm:text-3xl text-cream">
                  Choose Your Service
                </h3>
                <p className="mt-2 text-cream/70 max-w-xl text-sm sm:text-base">
                  Top scorers get first preference — your merit rank decides which
                  group you join. Each group has its own mandate, career path, and
                  service conditions.
                </p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {CSS_GROUPS.map((g, i) => (
                <motion.div
                  key={g}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="flex items-center gap-3 p-3.5 rounded-xl glass-dark hover:bg-gold/10 transition-colors group cursor-default"
                >
                  <span className="w-7 h-7 rounded-lg bg-gold/20 text-gold-light font-playfair font-bold text-sm flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-emerald-dark transition-all">
                    {i + 1}
                  </span>
                  <span className="text-xs sm:text-sm text-cream/90 font-medium">{g}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
