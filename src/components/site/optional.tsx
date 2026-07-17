"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./section-heading";
import { Layers, ChevronRight } from "lucide-react";

interface Subject {
  name: string;
  marks: number;
  scoring: "High" | "Medium" | "Low";
  syllabusLength: "Short" | "Medium" | "Long";
}

interface Group {
  id: string;
  title: string;
  desc: string;
  subjects: Subject[];
}

const GROUPS: Group[] = [
  {
    id: "A",
    title: "Group A — Humanities & Social Sciences",
    desc: "Most popular group. Wide subject choice, plenty of past papers, and abundant study material.",
    subjects: [
      { name: "Political Science", marks: 200, scoring: "High", syllabusLength: "Long" },
      { name: "Anthropology", marks: 200, scoring: "High", syllabusLength: "Medium" },
      { name: "International Relations", marks: 200, scoring: "Medium", syllabusLength: "Long" },
      { name: "Law", marks: 200, scoring: "Medium", syllabusLength: "Long" },
      { name: "Philosophy", marks: 200, scoring: "Medium", syllabusLength: "Medium" },
      { name: "Psychology", marks: 200, scoring: "High", syllabusLength: "Medium" },
      { name: "Geography", marks: 200, scoring: "Medium", syllabusLength: "Medium" },
      { name: "Sociology", marks: 200, scoring: "Medium", syllabusLength: "Short" },
      { name: "Journalism & Mass Communication", marks: 100, scoring: "High", syllabusLength: "Short" },
      { name: "International Law", marks: 100, scoring: "Medium", syllabusLength: "Medium" },
      { name: "Governance & Public Policies", marks: 100, scoring: "High", syllabusLength: "Short" },
      { name: "Public Administration", marks: 100, scoring: "Medium", syllabusLength: "Short" },
      { name: "History of Pakistan & India", marks: 100, scoring: "Medium", syllabusLength: "Long" },
      { name: "History of USA", marks: 100, scoring: "High", syllabusLength: "Medium" },
      { name: "History of Pakistan", marks: 100, scoring: "Medium", syllabusLength: "Medium" },
      { name: "Indo-Pak History", marks: 100, scoring: "Low", syllabusLength: "Long" },
      { name: "British History", marks: 100, scoring: "Medium", syllabusLength: "Medium" },
      { name: "European History", marks: 100, scoring: "Low", syllabusLength: "Long" },
      { name: "Islamic History & Culture", marks: 100, scoring: "Medium", syllabusLength: "Long" },
      { name: "History of Modern World", marks: 100, scoring: "Medium", syllabusLength: "Medium" },
      { name: "Punjabi", marks: 100, scoring: "High", syllabusLength: "Short" },
      { name: "Sindhi", marks: 100, scoring: "High", syllabusLength: "Short" },
      { name: "Pashto", marks: 100, scoring: "High", syllabusLength: "Short" },
      { name: "Balochi", marks: 100, scoring: "High", syllabusLength: "Short" },
      { name: "Persian", marks: 100, scoring: "Medium", syllabusLength: "Medium" },
      { name: "Arabic", marks: 100, scoring: "High", syllabusLength: "Medium" },
      { name: "Urdu Literature", marks: 100, scoring: "Medium", syllabusLength: "Medium" },
      { name: "English Literature", marks: 100, scoring: "Low", syllabusLength: "Long" },
    ],
  },
  {
    id: "B",
    title: "Group B — Statistics & Mathematics",
    desc: "For candidates with strong quantitative background. Highly scoring if you have a math foundation.",
    subjects: [
      { name: "Statistics", marks: 100, scoring: "High", syllabusLength: "Medium" },
      { name: "Mathematics", marks: 200, scoring: "High", syllabusLength: "Long" },
    ],
  },
  {
    id: "C",
    title: "Group C — Computer Science & Economics",
    desc: "Technical subjects for STEM and economics graduates. Scoring with structured syllabi.",
    subjects: [
      { name: "Computer Science", marks: 100, scoring: "High", syllabusLength: "Medium" },
      { name: "Economics", marks: 200, scoring: "Medium", syllabusLength: "Long" },
      { name: "Agriculture & Forestry", marks: 100, scoring: "High", syllabusLength: "Medium" },
      { name: "Botany", marks: 100, scoring: "Medium", syllabusLength: "Long" },
      { name: "Zoology", marks: 100, scoring: "Medium", syllabusLength: "Long" },
      { name: "Chemistry", marks: 200, scoring: "Medium", syllabusLength: "Long" },
      { name: "Physics", marks: 200, scoring: "High", syllabusLength: "Long" },
      { name: "Geology", marks: 100, scoring: "High", syllabusLength: "Medium" },
      { name: "Environmental Science", marks: 100, scoring: "High", syllabusLength: "Medium" },
      { name: "Accountancy & Auditing", marks: 200, scoring: "High", syllabusLength: "Medium" },
      { name: "Business Administration", marks: 100, scoring: "High", syllabusLength: "Medium" },
      { name: "Mercantile Law", marks: 100, scoring: "Medium", syllabusLength: "Medium" },
      { name: "Criminology", marks: 100, scoring: "High", syllabusLength: "Short" },
      { name: "Gender Studies", marks: 100, scoring: "High", syllabusLength: "Short" },
      { name: "Pharmacy", marks: 100, scoring: "Medium", syllabusLength: "Long" },
      { name: "Veterinary Science", marks: 100, scoring: "High", syllabusLength: "Medium" },
    ],
  },
];

const SCORING_COLORS = {
  High: "bg-emerald/15 text-emerald border-emerald/30",
  Medium: "bg-gold/15 text-gold-dark border-gold/30",
  Low: "bg-red-100 text-red-700 border-red-200",
};

export default function Optional() {
  const [active, setActive] = useState(0);

  return (
    <section id="optional" className="section-pad relative bg-white overflow-hidden">
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-gold/8 rounded-full blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="600 Marks • Your Choice"
          title={
            <>
              Optional <span className="text-gradient-emerald">Subjects</span>
            </>
          }
          subtitle="Pick subjects worth 600 marks from FPSC's approved groups. Subject selection often decides your final rank — choose based on background, interest, scoring trend, and syllabus length, not on hearsay."
        />

        {/* Rule banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 rounded-2xl bg-gradient-to-r from-emerald-dark to-emerald p-6 sm:p-8 text-cream relative overflow-hidden"
        >
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-gold/15 rounded-full blur-2xl" />
          <div className="relative grid sm:grid-cols-3 gap-4">
            {[
              { v: "600", l: "Total Marks", sub: "Across 600 marks of optional" },
              { v: "≥ 100", l: "Per Subject Min", sub: "Smallest paper is 100 marks" },
              { v: "≤ 200", l: "Per Subject Max", sub: "Largest paper is 200 marks" },
            ].map((x) => (
              <div key={x.l} className="text-center sm:text-left">
                <div className="font-playfair text-3xl sm:text-4xl font-black text-gold-light leading-none">
                  {x.v}
                </div>
                <div className="text-sm font-semibold text-cream mt-1">{x.l}</div>
                <div className="text-xs text-cream/70 mt-0.5">{x.sub}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {GROUPS.map((g, i) => (
            <button
              key={g.id}
              onClick={() => setActive(i)}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 border ${
                active === i
                  ? "bg-gradient-to-r from-emerald to-emerald-dark text-white border-transparent shadow-lg shadow-emerald/30"
                  : "bg-white text-emerald-dark border-emerald/20 hover:border-emerald/40"
              }`}
            >
              <Layers className="w-4 h-4" />
              Group {g.id}
            </button>
          ))}
        </div>

        {/* Group panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="mt-8"
          >
            <div className="rounded-3xl bg-cream/40 border border-emerald/10 p-6 sm:p-8">
              <h3 className="font-playfair font-bold text-xl sm:text-2xl text-emerald-dark mb-1">
                {GROUPS[active].title}
              </h3>
              <p className="text-sm text-ink/65 mb-6">{GROUPS[active].desc}</p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {GROUPS[active].subjects.map((s, i) => (
                  <motion.div
                    key={s.name + i}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.4) }}
                    className="group bg-white rounded-xl p-4 border border-emerald/10 hover:border-emerald/30 hover:shadow-md transition-all cursor-default"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-semibold text-sm text-emerald-dark leading-snug">
                        {s.name}
                      </h4>
                      <span className="text-xs font-bold text-gold-dark shrink-0">
                        {s.marks}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-md border font-semibold ${SCORING_COLORS[s.scoring]}`}
                      >
                        {s.scoring}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-emerald/8 text-emerald font-semibold">
                        {s.syllabusLength}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Subject selection tips */}
            <div className="mt-6 grid sm:grid-cols-3 gap-4">
              {[
                {
                  t: "Match Your Background",
                  d: "Pick subjects aligned with your academic degree. A 14-year foundation beats learning from scratch.",
                },
                {
                  t: "Check Past Paper Trends",
                  d: "Review last 5 years of past papers to gauge question patterns, scoring trends, and difficulty level.",
                },
                {
                  t: "Avoid Overlapping Syllabi",
                  d: "Choose complementary subjects. IR + Current Affairs + US History share themes and reduce effort.",
                },
              ].map((tip, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-4 border border-emerald/10 flex items-start gap-3"
                >
                  <ChevronRight className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm text-emerald-dark mb-1">{tip.t}</h4>
                    <p className="text-xs text-ink/65 leading-relaxed">{tip.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
