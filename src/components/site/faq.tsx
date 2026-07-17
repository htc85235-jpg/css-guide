"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionHeading from "./section-heading";
import { HelpCircle } from "lucide-react";

const FAQS = [
  {
    q: "What is the CSS exam and who conducts it?",
    a: "The CSS (Central Superior Services) exam is Pakistan&apos;s premier competitive examination, conducted annually by the Federal Public Service Commission (FPSC). It recruits officers for 12 occupational groups of the federal government including PAS, PSP, FSP, Customs, and PAAS. Successful candidates undergo Common Training Programme (CTP) at CSA Lahore followed by Specialised Training Programme (STP) in their respective groups.",
  },
  {
    q: "How many attempts am I allowed for CSS?",
    a: "A regular candidate can attempt the CSS exam a maximum of 3 times. However, candidates from scheduled castes, Buddhist community, and persons with disabilities are allowed extra attempts per FPSC rules. Government servants with 2+ years of service may also receive age relaxation of up to 2 years.",
  },
  {
    q: "What is the age limit for CSS aspirants?",
    a: "The standard age limit is 21 to 30 years as on 31st December of the examination year. Upper age relaxation of 2 years is available for candidates from GB/FATA, Azad Kashmir, scheduled castes, Buddhist community, and persons with disability. Government servants with at least 2 years of continuous service also get 2-year relaxation.",
  },
  {
    q: "What is the minimum education required for CSS?",
    a: "A Bachelor&apos;s degree (equivalent to 14 years of education) from an HEC-recognized university with at least 2nd division (45% marks). Final-year students can also apply provisionally, but they must produce their degree before the viva voce stage.",
  },
  {
    q: "How should I choose my optional subjects?",
    a: "Choose based on four pillars: (1) your academic background — pick subjects aligned with your degree; (2) interest — you&apos;ll study them for 8+ months; (3) scoring trend of the last 5 years; (4) syllabus length — short and scoring subjects like Journalism, Sociology, and Gender Studies are popular. Avoid hearsay — verify trends from past results published on FPSC.",
  },
  {
    q: "Is coaching necessary to crack CSS?",
    a: "No, coaching is not mandatory. Many toppers have cleared CSS through self-study using quality books, YouTube lectures, and online communities like CSS Forum. However, coaching helps with structure, peer learning, and answer-writing feedback. Free resources like JWT magazines, Dawn editorials, and public Telegram study circles can substitute for paid academies.",
  },
  {
    q: "How important is the English Essay paper?",
    a: "It is the single most decisive paper in CSS. Every year, 70–80% of candidates fail the English Essay paper because it has a strict 40% minimum qualifying threshold. Even if you score 90% in every other paper, failing the essay means you&apos;re out of the race. Practice one full-length essay every week for at least 6 months before the exam.",
  },
  {
    q: "What is the difference between CSS and PMS?",
    a: "CSS is conducted by the federal FPSC for federal occupational groups (PAS, PSP, FSP, etc.). PMS (Provincial Management Service) is conducted by each province&apos;s Public Service Commission for provincial administrative posts. The syllabus and exam structure are similar but the career path, salary, and jurisdiction differ. Many aspirants appear in both.",
  },
  {
    q: "How many months of preparation are needed?",
    a: "For a serious aspirant starting from scratch, 8–12 months of disciplined preparation (8–10 hours daily) is the standard. Candidates with a strong academic background in their optional subjects can do it in 6 months. The key is consistent daily output, not total months of casual reading.",
  },
  {
    q: "Can female candidates appear in CSS?",
    a: "Absolutely. Female candidates are encouraged and have a 10% reserved quota in federal jobs. Several toppers in recent years have been women, including Ayesha Sana (1st position CSS 2023). The FPSC ensures separate examination centres and female-friendly viva voce panels. Marriage, motherhood, or family background are not barriers.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="section-pad relative bg-white overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald/5 rounded-full blur-3xl" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Everything You Want to Ask"
          title={
            <>
              Frequently Asked <span className="text-gradient-emerald">Questions</span>
            </>
          }
          subtitle="Cleared doubts are cleared obstacles. Here are the questions every CSS aspirant eventually asks — answered honestly, with no sugar-coating."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10"
        >
          <Accordion
            type="single"
            collapsible
            defaultValue="faq-0"
            className="space-y-3"
          >
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-emerald/10 rounded-2xl px-5 sm:px-6 bg-cream/30 hover:bg-cream/50 transition-colors overflow-hidden data-[state=open]:border-emerald/30 data-[state=open]:shadow-md"
              >
                <AccordionTrigger className="text-left hover:no-underline py-5 group">
                  <div className="flex items-start gap-3 w-full">
                    <div className="w-7 h-7 rounded-lg bg-emerald/10 group-data-[state=open]:bg-emerald flex items-center justify-center shrink-0 transition-colors">
                      <HelpCircle className="w-4 h-4 text-emerald group-data-[state=open]:text-gold-light transition-colors" />
                    </div>
                    <span className="font-playfair font-semibold text-sm sm:text-base text-emerald-dark leading-snug">
                      {faq.q}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-5 pl-10 pr-1">
                  <p
                    className="text-sm text-ink/70 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: faq.a }}
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
