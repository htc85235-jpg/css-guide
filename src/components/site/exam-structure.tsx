"use client";

import { motion } from "framer-motion";
import SectionHeading from "./section-heading";
import { PenLine, Brain, MessageSquare, CheckCircle2, Clock, FileCheck } from "lucide-react";

const STAGES = [
  {
    n: "01",
    icon: PenLine,
    title: "Written Examination",
    duration: "February • ~2 weeks",
    marks: "1200 Marks",
    color: "from-emerald to-emerald-dark",
    desc: "The first and most decisive stage. 12 papers split across 6 compulsory subjects and 6 optional papers (from groups you choose). Each paper is 100 marks, 3 hours duration. English Essay and Islamiat have minimum 40% qualifying threshold; all others need 33%.",
    points: [
      "6 Compulsory Papers (600 marks)",
      "6 Optional Papers (600 marks)",
      "Minimum 40% in Essay & Islamiat",
      "Minimum 33% in every other paper",
      "Aggregate 40% required to qualify",
    ],
  },
  {
    n: "02",
    icon: Brain,
    title: "Psychological Assessment",
    duration: "May–June • 2 days",
    marks: "Qualifying",
    color: "from-gold to-gold-dark",
    desc: "Conducted by a panel of psychologists at designated centres. Includes personality tests, group discussions, command tasks, intelligence tests, and in-depth interviews. Assesses leadership potential, decision-making, and mental resilience under pressure.",
    points: [
      "Written psychological tests",
      "Group discussions & command tasks",
      "Individual psychological interview",
      "Personality & leadership assessment",
      "No marks — only qualifying",
    ],
  },
  {
    n: "03",
    icon: MessageSquare,
    title: "Viva Voce (Interview)",
    duration: "June–July • 30 min",
    marks: "300 Marks",
    color: "from-emerald-dark to-ink",
    desc: "The final stage before the merit list. A panel headed by an FPSC member quizzes you on optional subjects, current affairs, Pakistan affairs, and your hobbies. Tests your confidence, presence of mind, communication skills, and overall personality.",
    points: [
      "300 marks added to written total",
      "Conducted at FPSC regional offices",
      "Tests communication & personality",
      "Optional subjects carry weightage",
      "Final merit = Written + Viva",
    ],
  },
];

export default function ExamStructure() {
  return (
    <section id="exam-structure" className="section-pad relative bg-white overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="3-Stage Selection"
          title={
            <>
              The CSS Exam <span className="text-gradient-emerald">Structure</span>
            </>
          }
          subtitle="A rigorous three-stage selection process designed to identify Pakistan's future administrators, diplomats, and police officers. Each stage filters candidates further — only the best reach the final merit list."
        />

        <div className="mt-14 grid lg:grid-cols-3 gap-6">
          {STAGES.map((stage, i) => (
            <motion.article
              key={stage.n}
              initial={{ opacity: 0, y: 40, rotateX: -8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="tilt-card group relative bg-white rounded-3xl border border-emerald/10 shadow-lg hover:shadow-2xl hover:shadow-emerald/20 overflow-hidden"
            >
              {/* Top accent bar */}
              <div className={`h-2 bg-gradient-to-r ${stage.color}`} />

              <div className="p-7">
                {/* Number + Icon */}
                <div className="flex items-start justify-between mb-5">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stage.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-transform`}
                  >
                    <stage.icon className="w-7 h-7 text-gold-light" strokeWidth={2} />
                  </div>
                  <span className="font-playfair text-5xl font-black text-emerald/10 group-hover:text-emerald/20 transition-colors leading-none">
                    {stage.n}
                  </span>
                </div>

                {/* Title + meta */}
                <h3 className="font-playfair font-bold text-xl sm:text-2xl text-emerald-dark mb-2">
                  {stage.title}
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald/8 text-emerald text-xs font-semibold">
                    <Clock className="w-3 h-3" />
                    {stage.duration}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gold/15 text-gold-dark text-xs font-semibold">
                    <FileCheck className="w-3 h-3" />
                    {stage.marks}
                  </span>
                </div>

                <p className="text-sm text-ink/70 leading-relaxed mb-5">{stage.desc}</p>

                {/* Key points */}
                <ul className="space-y-2">
                  {stage.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-ink/75">
                      <CheckCircle2 className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Stage flow indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 flex items-center justify-center gap-2 text-xs sm:text-sm text-ink/60 font-medium"
        >
          <span className="px-3 py-1.5 rounded-full bg-emerald/10 text-emerald">Written</span>
          <span className="text-gold">→</span>
          <span className="px-3 py-1.5 rounded-full bg-gold/15 text-gold-dark">Psychological</span>
          <span className="text-gold">→</span>
          <span className="px-3 py-1.5 rounded-full bg-emerald-dark/10 text-emerald-dark">Viva Voce</span>
          <span className="text-gold">→</span>
          <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald to-gold text-white font-semibold">
            Final Merit
          </span>
        </motion.div>
      </div>
    </section>
  );
}
