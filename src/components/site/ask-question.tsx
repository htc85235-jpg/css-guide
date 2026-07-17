"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle, Mail, CheckCircle2, Loader2 } from "lucide-react";
import SectionHeading from "./section-heading";

// FormSubmit.co — no signup needed. First submission triggers a one-time
// activation email to htc85235@gmail.com. After activation, every submission
// is delivered to that inbox with the visitor's name, email, and question.
const FORM_ACTION = "https://formsubmit.co/htc85235@gmail.com";
const FORM_ID = "ask-question-form";

export default function AskQuestion() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);

    // FormSubmit.co returns a redirect (200/302); ajax mode returns JSON.
    // Use ajax endpoint so we can show in-page success without navigation.
    try {
      const res = await fetch(FORM_ACTION, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
        // After 6 seconds, allow user to ask another question
        setTimeout(() => setStatus("idle"), 6000);
      } else {
        // Even on non-2xx, FormSubmit may have queued the message — check body
        const text = await res.text().catch(() => "");
        if (text.includes("success") || text.includes("Thanks")) {
          setStatus("success");
          form.reset();
          setTimeout(() => setStatus("idle"), 6000);
        } else {
          setStatus("error");
          setTimeout(() => setStatus("idle"), 6000);
        }
      }
    } catch (err) {
      // Network/CORS error — the message may still have been delivered.
      setStatus("error");
      setTimeout(() => setStatus("idle"), 6000);
    }
  }

  return (
    <section id="ask-question" className="section-pad bg-emerald-dark relative overflow-hidden">
      {/* Decorations */}
      <div className="absolute inset-0 pattern-grid opacity-10" />
      <div className="absolute -top-40 -left-40 w-[28rem] h-[28rem] bg-emerald/40 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute -bottom-40 -right-40 w-[28rem] h-[28rem] bg-gold/15 rounded-full blur-3xl animate-float" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Still Confused?"
          title={
            <>
              Ask a <span className="text-gradient-gold">Question</span>
            </>
          }
          subtitle="Have a doubt about CSS groups, optional subjects, eligibility, or exam strategy? Drop it below — your question lands directly in our inbox and we'll reply personally."
          dark
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-12 relative rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 p-6 sm:p-10 shadow-2xl"
        >
          {/* Floating icon */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 rounded-2xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-xl ring-4 ring-emerald-dark">
            <MessageCircle className="w-7 h-7 text-emerald-dark" />
          </div>

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-10 text-center"
            >
              <div className="mx-auto w-16 h-16 rounded-full bg-emerald/20 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-9 h-9 text-gold" />
              </div>
              <h3 className="font-playfair font-bold text-2xl text-cream">
                Question sent!
              </h3>
              <p className="mt-2 text-cream/70 max-w-md mx-auto">
                Thank you for reaching out. We&apos;ve received your question and
                will reply to your email shortly. Keep pushing forward — your
                CSS journey matters to us.
              </p>
            </motion.div>
          ) : (
            <form
              id={FORM_ID}
              onSubmit={handleSubmit}
              action={FORM_ACTION}
              method="POST"
              className="mt-6 space-y-5"
            >
              {/* FormSubmit.co config — hidden fields */}
              <input type="hidden" name="_subject" value="New CSS Guide Question" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_action" value="submit" />
              {/* Redirect-less JSON response */}
              <input type="hidden" name="_ajax" value="true" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="ask-name"
                    className="block text-sm font-medium text-cream/80 mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    id="ask-name"
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Ahmad Khan"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-cream placeholder:text-cream/40 focus:outline-none focus:ring-2 focus:ring-gold/60 focus:border-gold/40 transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="ask-email"
                    className="block text-sm font-medium text-cream/80 mb-2"
                  >
                    Your Email
                  </label>
                  <input
                    id="ask-email"
                    type="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-cream placeholder:text-cream/40 focus:outline-none focus:ring-2 focus:ring-gold/60 focus:border-gold/40 transition-all"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="ask-message"
                  className="block text-sm font-medium text-cream/80 mb-2"
                >
                  Your Question
                </label>
                <textarea
                  id="ask-message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Type your question about CSS exam, groups, subjects, preparation strategy, or anything else..."
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 text-cream placeholder:text-cream/40 focus:outline-none focus:ring-2 focus:ring-gold/60 focus:border-gold/40 transition-all resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <p className="flex items-center gap-2 text-xs text-cream/55">
                  <Mail className="w-3.5 h-3.5" />
                  Replies sent directly to our team
                </p>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gold text-emerald-dark font-bold shadow-xl hover:bg-gold-light hover:-translate-y-0.5 transition-all shine relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 w-full sm:w-auto"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Question
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>

              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2"
                >
                  Something went wrong. Please try again in a moment.
                </motion.p>
              )}
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
