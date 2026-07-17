"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./section-heading";
import { BookText, BookOpen, Moon, Scale, FlaskConical, ChevronDown } from "lucide-react";

const SUBJECTS = [
  {
    code: "01",
    icon: PenIcon,
    title: "English Essay",
    marks: 100,
    duration: "3 hours",
    syllabus:
      "Candidates write an original essay of 2500–3000 words on one of 10–12 given topics. Tests coherence, argumentation, vocabulary, and grammatical accuracy across themes like governance, economy, society, technology, and global affairs.",
    tips: "Practice writing weekly. Build topic-wise fact banks. Master 5–6 essay archetypes (problem-solution, argumentative, narrative, expository).",
  },
  {
    code: "02",
    icon: BookText,
    title: "English (Precis & Composition)",
    marks: 100,
    duration: "3 hours",
    syllabus:
      "Precis writing (1/3 of a 600–800 word passage), comprehension, expansion of an idea, sentence correction, punctuation, direct-indirect speech, and translation from Urdu to English.",
    tips: "Master precis technique — read 3 times, draft a skeleton, then refine. Practice 1 precis + 1 comprehension weekly.",
  },
  {
    code: "03",
    icon: FlaskConical,
    title: "General Science & Ability",
    marks: 100,
    duration: "3 hours",
    syllabus:
      "Part I (60 marks): Physical sciences, biological sciences, environment, food science, IT. Part II (40 marks): Quantitative reasoning, analytical reasoning, mental abilities, sets & probability, ratios, percentages.",
    tips: "Don't ignore Part II — it's scoring. Master ratios, percentages, probability, syllogisms. Practice daily mental math.",
  },
  {
    code: "04",
    icon: BookOpen,
    title: "Current Affairs",
    marks: 100,
    duration: "3 hours",
    syllabus:
      "Domestic, regional, and global developments of the last 18–24 months. Pakistan's foreign policy, economy, CPEC, OIC, UN, SCO, climate, Afghan & India relations, global conflicts.",
    tips: "Read Dawn, The Diplomat, Economist, Foreign Affairs. Maintain monthly current affairs notebook from June onward.",
  },
  {
    code: "05",
    icon: Scale,
    title: "Pakistan Affairs",
    marks: 100,
    duration: "3 hours",
    syllabus:
      "Ideology of Pakistan, Pakistan movement (1857–1947), initial years (1947–58), Ayub & Bhutto eras, Zia & Musharraf regimes, constitutional developments, foreign policy, economy, energy, social sector.",
    tips: "Build timeline charts. Connect historical events with current affairs. Use Ikram Rabbani + Trek to Pakistan.",
  },
  {
    code: "06",
    icon: Moon,
    title: "Islamic Studies / Ethics",
    marks: 100,
    duration: "3 hours",
    syllabus:
      "Islamic Studies (for Muslim candidates): Quran, Hadith, Seerah, Islamic history, beliefs, Ibadah, ethics, society. Ethics (for non-Muslims): comparative religious ethics and moral philosophy.",
    tips: "Memorize 30+ Quranic verses with translation. Hafiz Hashmi&apos;s book + Friday sermons build strong conceptual base.",
  },
];

function PenIcon(props: any) {
  return <BookText {...props} />;
}

export default function Compulsory() {
  const [open, setOpen] = useState(false);

  return (
    <section id="compulsory" className="section-pad relative bg-cream/40 overflow-hidden">
      <div className="absolute inset-0 pattern-grid opacity-40" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="6 Papers • 600 Marks"
          title={
            <>
              Compulsory <span className="text-gradient-emerald">Subjects</span>
            </>
          }
          subtitle="Every CSS aspirant must attempt all six compulsory papers. These cannot be changed or opted out of — and English Essay plus Islamiat require a minimum 40% score to qualify the exam at all."
        />

        {/* Expandable toggle */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="compulsory-subjects-list"
            className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald to-emerald-dark text-white font-bold shadow-xl shadow-emerald/25 hover:shadow-emerald/45 hover:-translate-y-0.5 transition-all shine relative overflow-hidden"
          >
            <span>{open ? "Hide Compulsory Subjects" : "View Compulsory Subjects"}</span>
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {/* Collapsible content */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id="compulsory-subjects-list"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {SUBJECTS.map((s, i) => (
                  <motion.article
                    key={s.code}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
                    className="tilt-card group relative bg-white rounded-2xl border border-emerald/10 shadow-md hover:shadow-xl hover:border-emerald/30 overflow-hidden"
                  >
                    {/* Top stripe */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald via-emerald-dark to-gold opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald/10 group-hover:bg-emerald group-hover:text-gold-light transition-all flex items-center justify-center text-emerald">
                          <s.icon className="w-6 h-6" strokeWidth={1.8} />
                        </div>
                        <span className="font-playfair text-3xl font-black text-emerald/10 group-hover:text-gold/30 transition-colors">
                          {s.code}
                        </span>
                      </div>

                      <h3 className="font-playfair font-bold text-lg text-emerald-dark leading-snug">
                        {s.title}
                      </h3>

                      <div className="flex items-center gap-2 mt-2 mb-4">
                        <span className="px-2 py-0.5 rounded-md bg-gold/15 text-gold-dark text-[11px] font-bold">
                          {s.marks} marks
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-emerald/10 text-emerald text-[11px] font-bold">
                          {s.duration}
                        </span>
                      </div>

                      <p className="text-xs text-ink/70 leading-relaxed mb-4">{s.syllabus}</p>

                      <div className="border-t border-emerald/10 pt-3">
                        <p className="text-[11px] uppercase tracking-wider font-bold text-gold-dark mb-1">
                          Pro Tip
                        </p>
                        <p
                          className="text-xs text-ink/70 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: s.tips }}
                        />
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!open && (
          <p className="mt-6 text-center text-sm text-ink/55 italic">
            Click the button above to reveal all six compulsory subject details.
          </p>
        )}
      </div>
    </section>
  );
}
