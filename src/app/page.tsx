"use client";

import Navbar from "@/components/site/navbar";
import Hero from "@/components/site/hero";
import About from "@/components/site/about";
import Syllabus from "@/components/site/syllabus";
import ExamStructure from "@/components/site/exam-structure";
import Compulsory from "@/components/site/compulsory";
import Optional from "@/components/site/optional";
import Schedule from "@/components/site/schedule";
import Quotes from "@/components/site/quotes";
import Resources from "@/components/site/resources";
import FAQ from "@/components/site/faq";
import AskQuestion from "@/components/site/ask-question";
import CTA from "@/components/site/cta";
import Footer from "@/components/site/footer";
import OwnerPanel from "@/components/site/owner-panel";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Syllabus />
        <ExamStructure />
        <Compulsory />
        <Optional />
        <Schedule />
        <Quotes />
        <Resources />
        <FAQ />
        <AskQuestion />
        <CTA />
      </main>
      <Footer />
      <OwnerPanel />
    </div>
  );
}
