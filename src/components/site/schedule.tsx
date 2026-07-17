"use client";

import { motion } from "framer-motion";
import SectionHeading from "./section-heading";
import { CalendarDays, FileText, ClipboardCheck, Award, UserCheck, ScrollText } from "lucide-react";

const TIMELINE = [
  {
    month: "September–October",
    icon: FileText,
    title: "Online Application",
    desc: "FPSC opens the online application portal. Submit forms via fpsc.gov.pk with required documents, fees, and subject selections. Late submissions are not entertained.",
    color: "from-emerald to-emerald-dark",
  },
  {
    month: "Mid–Late October",
    icon: ScrollText,
    title: "Admission Certificates",
    desc: "FPSC issues Roll Number slips with examination centre, paper schedule, and candidate details. Check the FPSC website to download.",
    color: "from-emerald-dark to-ink",
  },
  {
    month: "Mid-February",
    icon: CalendarDays,
    title: "Written Exam Begins",
    desc: "Written exam starts mid-February and runs for ~2 weeks. Two papers daily — morning (9 AM–12 PM) and afternoon (2 PM–5 PM) at 21 centres nationwide.",
    color: "from-gold to-gold-dark",
  },
  {
    month: "March–April",
    icon: ClipboardCheck,
    title: "Result Declaration",
    desc: "FPSC evaluates answer sheets for ~3–4 months. Written result is typically declared in March–April of the following year, posted on FPSC website.",
    color: "from-emerald to-emerald-dark",
  },
  {
    month: "May–June",
    icon: UserCheck,
    title: "Psychological Assessment",
    desc: "Qualified candidates receive calls for psychological assessment at designated centres. Personality tests, group discussions, command tasks, and individual interviews.",
    color: "from-gold-dark to-emerald",
  },
  {
    month: "June–July",
    icon: Award,
    title: "Viva Voce & Final Result",
    desc: "Final viva voce interview at FPSC regional offices. Final merit list (Written + Viva) declared in June–July. Recommended candidates join CSA Lahore for training.",
    color: "from-emerald-dark to-gold",
  },
];

export default function Schedule() {
  return (
    <section id="schedule" className="section-pad relative bg-cream/40 overflow-hidden">
      <div className="absolute inset-0 pattern-dots opacity-40" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="One-Year Cycle"
          title={
            <>
              Exam Schedule &amp; <span className="text-gradient-emerald">Timeline</span>
            </>
          }
          subtitle="From online application to final merit list — the entire CSS cycle spans around 9 months. Mark your calendar carefully; missing a single FPSC deadline can cost you an entire attempt."
        />

        <div className="mt-14 relative">
          {/* Vertical line */}
          <div className="absolute left-5 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald via-gold to-emerald-dark sm:-translate-x-1/2" />

          <div className="space-y-8 sm:space-y-12">
            {TIMELINE.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5 }}
                  className={`relative flex items-center gap-6 ${
                    isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-5 sm:left-1/2 sm:-translate-x-1/2 z-10">
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.color} ring-4 ring-cream shadow-lg flex items-center justify-center`}
                    >
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className={`pl-16 sm:pl-0 sm:w-[calc(50%-2.5rem)] ${
                      isLeft ? "sm:text-right" : "sm:text-left"
                    }`}
                  >
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="tilt-card bg-white rounded-2xl p-5 sm:p-6 border border-emerald/10 shadow-md hover:shadow-xl"
                    >
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${item.color} mb-2`}
                      >
                        {item.month}
                      </span>
                      <h3 className="font-playfair font-bold text-lg sm:text-xl text-emerald-dark mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-ink/70 leading-relaxed">{item.desc}</p>
                    </motion.div>
                  </div>

                  {/* Spacer */}
                  <div className="hidden sm:block sm:w-[calc(50%-2.5rem)]" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 rounded-3xl bg-gradient-to-r from-emerald-dark via-emerald to-emerald-dark p-6 sm:p-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between gap-6"
        >
          <div>
            <h3 className="font-playfair font-bold text-xl sm:text-2xl text-cream mb-1">
              Never miss a deadline
            </h3>
            <p className="text-cream/80 text-sm">
              Official FPSC notifications are published at fpsc.gov.pk. Bookmark the site and check weekly during application season.
            </p>
          </div>
          <a
            href="https://www.fpsc.gov.pk"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-emerald-dark font-bold shadow-lg hover:bg-gold-light hover:-translate-y-0.5 transition-all"
          >
            Visit FPSC Official
            <CalendarDays className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
