"use client";

import { GraduationCap, Mail, Phone, MapPin, Globe, Heart } from "lucide-react";

const QUICK_LINKS = [
  { label: "About CSS", href: "#about" },
  { label: "Exam Structure", href: "#exam-structure" },
  { label: "Compulsory Subjects", href: "#compulsory" },
  { label: "Optional Subjects", href: "#optional" },
  { label: "Exam Schedule", href: "#schedule" },
];

const PREP_LINKS = [
  { label: "Toppers&apos; Stories", href: "#toppers" },
  { label: "Preparation Tips", href: "#resources" },
  { label: "Recommended Books", href: "#resources" },
  { label: "Daily Routine", href: "#resources" },
  { label: "FAQs", href: "#faq" },
];

const EXTERNAL_LINKS = [
  { label: "FPSC Official Website", href: "https://www.fpsc.gov.pk" },
  { label: "CSS Forum Pakistan", href: "https://www.cssforum.com.pk" },
  { label: "Dawn Newspaper", href: "https://www.dawn.com" },
  { label: "HEC Pakistan", href: "https://www.hec.gov.pk" },
];

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-emerald-dark to-ink text-cream overflow-hidden mt-auto">
      <div className="absolute inset-0 pattern-grid opacity-10" />
      <div className="absolute -top-32 left-1/4 w-72 h-72 bg-gold/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4 space-y-5">
            <a href="#home" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-light to-emerald-dark flex items-center justify-center shadow-lg ring-1 ring-gold/30">
                <GraduationCap className="w-6 h-6 text-gold-light" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-playfair font-extrabold text-2xl tracking-tight">
                  CSS <span className="text-gradient-gold">GUIDE</span>
                </span>
                <span className="text-[10px] tracking-[0.22em] text-cream/60 font-medium">
                  PAKISTAN&apos;S CSS HUB
                </span>
              </div>
            </a>
            <p className="text-sm text-cream/70 leading-relaxed max-w-sm">
              A free, complete, and continuously updated resource hub for every
              Pakistani dreaming of becoming a civil servant. Built by aspirants,
              for aspirants.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Mail, label: "Email" },
                { icon: Phone, label: "Phone" },
                { icon: Globe, label: "Website" },
              ].map((s, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-lg bg-cream/8 border border-cream/15 flex items-center justify-center hover:bg-gold hover:text-emerald-dark hover:border-gold transition-all"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <h4 className="font-playfair font-bold text-gold-light text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-cream/70 hover:text-gold-light transition-colors"
                    dangerouslySetInnerHTML={{ __html: l.label }}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Prep links */}
          <div className="lg:col-span-2">
            <h4 className="font-playfair font-bold text-gold-light text-sm uppercase tracking-wider mb-4">
              Preparation
            </h4>
            <ul className="space-y-2.5">
              {PREP_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-cream/70 hover:text-gold-light transition-colors"
                    dangerouslySetInnerHTML={{ __html: l.label }}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* External links */}
          <div className="lg:col-span-2">
            <h4 className="font-playfair font-bold text-gold-light text-sm uppercase tracking-wider mb-4">
              External Resources
            </h4>
            <ul className="space-y-2.5">
              {EXTERNAL_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-cream/70 hover:text-gold-light transition-colors inline-flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold/60" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h4 className="font-playfair font-bold text-gold-light text-sm uppercase tracking-wider mb-4">
              Reach Us
            </h4>
            <ul className="space-y-3 text-sm text-cream/70">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>Islamabad, Pakistan</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>hello@cssguide.pk</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>+92 51 000 0000</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 pt-8 border-t border-cream/10">
          <p className="text-xs text-cream/55 leading-relaxed text-center max-w-3xl mx-auto">
            <strong className="text-cream/75">Disclaimer:</strong> CSS GUIDE is an
            independent educational resource and is not affiliated with the
            Federal Public Service Commission (FPSC) or any government body. Always
            cross-check official information at{" "}
            <a
              href="https://www.fpsc.gov.pk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-light underline hover:text-gold"
            >
              fpsc.gov.pk
            </a>
            . Trademarks and exam names belong to their respective owners.
          </p>
        </div>

        {/* Bottom */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/55">
          <p>© {new Date().getFullYear()} CSS GUIDE. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Made with <Heart className="w-3 h-3 text-gold fill-gold" /> for Pakistani CSS aspirants
          </p>
        </div>
      </div>
    </footer>
  );
}
