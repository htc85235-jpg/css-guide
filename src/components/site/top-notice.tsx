"use client";

import { Megaphone } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const NOTICE_TEXT =
  "Our website is under development. Feel free to visit and ask questions. Thanks!";

export default function TopNotice() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    // Root: position relative + overflow hidden + 100% width.
    // The track is absolute-positioned so it NEVER contributes to the parent's
    // intrinsic width — it cannot push the hero column wider than the viewport.
    <div
      role="region"
      aria-label="Site notice"
      className="relative w-full rounded-lg bg-gradient-to-r from-gold-light via-gold to-gold-light text-emerald-dark border border-gold/40 shadow-sm overflow-hidden"
    >
      <div className="flex items-center w-full">
        {/* Megaphone icon (hidden on mobile to save horizontal space) */}
        <div className="hidden sm:flex items-center px-3 shrink-0 bg-emerald/10 border-r border-emerald/15 self-stretch">
          <Megaphone className="w-4 h-4 text-emerald-dark animate-pulse" />
        </div>

        {/* Scrolling viewport.
            - flex-1 + min-w-0: takes remaining width, can shrink below content size
            - position: relative so the absolute track is anchored here
            - overflow-hidden: clips the track to the visible area
            - py-2: vertical breathing room */}
        <div className="relative overflow-hidden flex-1 min-w-0 py-2">
          {/* The track is ABSOLUTELY POSITIONED so its intrinsic width (two
              copies of the notice text) cannot push the parent column wider.
              width: max-content makes it as wide as its content.
              x: ["0%", "-50%"] moves it left by exactly one copy width for a
              seamless right-to-left loop. */}
          <motion.div
            className="absolute top-1/2 left-0 flex w-max whitespace-nowrap -translate-y-1/2"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[0, 1].map((k) => (
              <span
                key={k}
                className="flex items-center whitespace-nowrap text-xs sm:text-sm font-semibold tracking-wide"
                aria-label={k === 0 ? NOTICE_TEXT : undefined}
              >
                <span className="px-4 sm:px-6">{NOTICE_TEXT}</span>
                <span className="text-emerald-dark/40" aria-hidden="true">
                  ✦
                </span>
              </span>
            ))}
          </motion.div>

          {/* Invisible spacer to give the viewport a min height
              (since the track is now absolute and doesn't contribute height) */}
          <span className="block text-xs sm:text-sm font-semibold py-0.5 opacity-0 select-none pointer-events-none">
            {NOTICE_TEXT}
          </span>
        </div>
      </div>
    </div>
  );
}
