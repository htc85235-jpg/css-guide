"use client";

import { motion } from "framer-motion";
import SectionHeading from "./section-heading";
import {
  BookMarked,
  Clock,
  Target,
  PenLine,
  Newspaper,
  Calendar,
  Smartphone,
  Brain,
  Coffee,
  Moon,
  CheckCircle2,
} from "lucide-react";

const TIPS = [
  {
    icon: Calendar,
    title: "Build a 6-Month Plan",
    desc: "Divide prep into 4 phases: Foundation (3 months) → Practice (2 months) → Revision (1 month) → Mock tests (last 3 weeks). Always work backward from the exam date.",
  },
  {
    icon: Clock,
    title: "8–10 Hours Daily",
    desc: "Quality beats quantity. Three focused 90-minute deep-work blocks beat 10 distracted hours. Use Pomodoro: 50 min study + 10 min break.",
  },
  {
    icon: PenLine,
    title: "Write Daily",
    desc: "CSS is a writing exam, not a reading exam. Write at least 500 words daily — essays, answers, notes. Hand-writing builds stamina for 3-hour papers.",
  },
  {
    icon: Newspaper,
    title: "Read Dawn Daily",
    desc: "Dawn newspaper is non-negotiable. Read editorial, op-ed, international, and business pages. Make notes of facts, quotes, and arguments.",
  },
  {
    icon: Brain,
    title: "Make Notes, Not Highlights",
    desc: "Highlighting creates the illusion of learning. Convert highlights into your own handwritten notes — that&apos;s where real retention happens.",
  },
  {
    icon: Target,
    title: "Solve Past 10 Years",
    desc: "Past papers are your best guide. Solve at least 10 years of past papers for every subject — patterns repeat more often than you think.",
  },
];

const RESOURCES = [
  {
    type: "Books",
    icon: BookMarked,
    items: [
      "Pakistan Affairs — Ikram Rabbani",
      "Trek to Pakistan — Ahmad Saeed",
      "Current Affairs — Contemporary Affairs by Imtiaz Shahid",
      "English Essay — Essays by Prof. Manzoor Mirza",
      "Islamiat — Hafiz Karim Dad Kakakhel",
      "Political Science — Mazhar ul Haq",
      "Constitution of Pakistan — Hamid Khan",
    ],
  },
  {
    type: "Websites & Portals",
    icon: Smartphone,
    items: [
      "fpsc.gov.pk — official notifications",
      "cssforum.com.pk — peer community",
      "dawn.com — daily news & editorial",
      "theweeks.com.pk — weekly current affairs",
      "studybites.com.pk — subject notes",
      "youtube.com/@CSSPrep — lectures & mocks",
    ],
  },
  {
    type: "Newspapers & Magazines",
    icon: Newspaper,
    items: [
      "Dawn (English) — daily",
      "The News International — daily",
      "The Economist — weekly",
      "Foreign Affairs — bimonthly",
      "The Diplomat — online",
      "Jang / Express (Urdu) — for Urdu prep",
      "Global Dialogue — IPC magazine",
    ],
  },
];

const DAILY_ROUTINE = [
  { time: "5:00 AM", task: "Wake up, Fajr prayer, light exercise", icon: Moon },
  { time: "6:00 AM", task: "Optional subject deep study (2 hours)", icon: Brain },
  { time: "8:00 AM", task: "Breakfast + Dawn newspaper reading", icon: Coffee },
  { time: "9:30 AM", task: "Compulsory subject — English/Pak Affairs", icon: BookMarked },
  { time: "1:00 PM", task: "Lunch + power nap (20 min)", icon: Coffee },
  { time: "2:30 PM", task: "Second optional subject study (2 hours)", icon: Brain },
  { time: "5:00 PM", task: "Walk / tea + revise morning notes", icon: Smartphone },
  { time: "6:00 PM", task: "Essay / precis / answer writing practice", icon: PenLine },
  { time: "8:30 PM", task: "Current affairs + magazine reading", icon: Newspaper },
  { time: "10:00 PM", task: "Plan next day, sleep by 10:30 PM", icon: Target },
];

export default function Resources() {
  return (
    <section id="resources" className="section-pad relative bg-cream/40 overflow-hidden">
      <div className="absolute inset-0 pattern-grid opacity-40" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Strategy & Materials"
          title={
            <>
              Preparation <span className="text-gradient-emerald">Playbook</span>
            </>
          }
          subtitle="Hard work without direction is wasted effort. Here are the time-tested strategies, book lists, and a sample daily routine that have produced toppers year after year."
        />

        {/* Tips grid */}
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TIPS.map((t, i) => (
            <motion.div
              key={`tip-${i}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="tilt-card bg-white rounded-2xl p-6 border border-emerald/10 shadow-md hover:shadow-xl hover:border-emerald/30"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald to-emerald-dark flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform">
                <t.icon className="w-6 h-6 text-gold-light" />
              </div>
              <h3 className="font-playfair font-bold text-lg text-emerald-dark mb-2">
                {t.title}
              </h3>
              <p
                className="text-sm text-ink/70 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t.desc }}
              />
            </motion.div>
          ))}
        </div>

        {/* Resources + Daily routine */}
        <div className="mt-12 grid lg:grid-cols-12 gap-6">
          {/* Resources column */}
          <div className="lg:col-span-7 space-y-5">
            {RESOURCES.map((r, i) => (
              <motion.div
                key={`res-${r.type}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-emerald/10 shadow-md"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald/10 flex items-center justify-center">
                    <r.icon className="w-5 h-5 text-emerald" />
                  </div>
                  <h3 className="font-playfair font-bold text-lg text-emerald-dark">
                    {r.type}
                  </h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {r.items.map((item, idx) => (
                    <div
                      key={`item-${i}-${idx}`}
                      className="flex items-start gap-2 text-sm text-ink/75"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Daily routine */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-emerald-dark to-ink p-6 sm:p-7 text-cream relative overflow-hidden"
          >
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-gold/15 rounded-full blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-5">
                <Clock className="w-6 h-6 text-gold-light" />
                <h3 className="font-playfair font-bold text-xl text-cream">
                  Sample Daily Routine
                </h3>
              </div>
              <p className="text-xs text-cream/70 mb-5">
                A topper&apos;s 16-hour day — adjust to your energy peaks but keep the structure.
              </p>
              <div className="space-y-3 max-h-[28rem] overflow-y-auto pr-2">
                {DAILY_ROUTINE.map((d, i) => (
                  <div
                    key={`routine-${i}`}
                    className="flex items-start gap-3 p-3 rounded-lg glass-dark hover:bg-gold/10 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-md bg-gold/15 flex items-center justify-center shrink-0">
                      <d.icon className="w-4 h-4 text-gold-light" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-gold-light">{d.time}</div>
                      <div className="text-xs text-cream/85 mt-0.5">{d.task}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
