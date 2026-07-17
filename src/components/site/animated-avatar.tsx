"use client";

import { motion } from "framer-motion";

interface AnimatedAvatarProps {
  /** Seed for variant selection (e.g. topper name) */
  name: string;
  /** Background gradient theme */
  variant?: "emerald" | "gold" | "ink";
  /** Size in px */
  size?: number;
}

const THEMES = {
  emerald: {
    bg: "from-emerald-light via-emerald to-emerald-dark",
    accent: "#c9a227",
    accentSoft: "rgba(201, 162, 39, 0.6)",
    ink: "#0d1f17",
  },
  gold: {
    bg: "from-gold-light via-gold to-gold-dark",
    accent: "#073822",
    accentSoft: "rgba(7, 56, 34, 0.5)",
    ink: "#0d1f17",
  },
  ink: {
    bg: "from-emerald-dark via-ink to-emerald-dark",
    accent: "#c9a227",
    accentSoft: "rgba(201, 162, 39, 0.6)",
    ink: "#fbf8ef",
  },
};

/** Deterministic pick from a list based on name */
function pick<T>(name: string, list: T[]): T {
  const sum = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return list[sum % list.length];
}

export default function AnimatedAvatar({
  name,
  variant = "emerald",
  size = 220,
}: AnimatedAvatarProps) {
  const theme = THEMES[variant];
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  // Pick hair / accessory variants deterministically
  const hairColor = pick(name, ["#0d1f17", "#3d2817", "#5a3a1f", "#1a1a1a"]);
  const skinTone = pick(name, ["#f5d4b1", "#e8b890", "#d4a373", "#c08966", "#a87353"]);
  const hasGlasses = name.charCodeAt(0) % 3 === 0;
  const hasBook = name.charCodeAt(name.length - 1) % 2 === 0;

  return (
    <div
      className="relative"
      style={{ width: size, height: size }}
    >
      {/* Animated gradient backdrop */}
      <div
        className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${theme.bg} overflow-hidden`}
      >
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`particle-${name}-${i}`}
            className="absolute rounded-full"
            style={{
              width: 4 + (i % 3) * 2,
              height: 4 + (i % 3) * 2,
              background: theme.accent,
              left: `${15 + i * 13}%`,
              top: `${20 + (i % 4) * 18}%`,
              opacity: 0.5,
            }}
            animate={{
              y: [0, -12, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Big rotating ring */}
        <motion.div
          className="absolute"
          style={{
            width: size * 0.85,
            height: size * 0.85,
            top: "50%",
            left: "50%",
            x: "-50%",
            y: "-50%",
            borderRadius: "50%",
            border: `2px dashed ${theme.accentSoft}`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        />

        {/* SVG portrait */}
        <svg
          viewBox="0 0 200 200"
          className="absolute inset-0 w-full h-full"
          style={{ filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.2))" }}
        >
          {/* Graduation cap motion */}
          <motion.g
            animate={{ y: [0, -4, 0], rotate: [0, -2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ originX: "100px", originY: "55px" }}
          >
            {/* Cap top */}
            <polygon
              points="60,55 100,40 140,55 100,70"
              fill={theme.accent}
              stroke={theme.ink}
              strokeWidth="1"
            />
            {/* Cap base */}
            <rect x="85" y="58" width="30" height="10" fill={theme.ink} opacity="0.85" />
            {/* Tassel */}
            <line x1="135" y1="55" x2="135" y2="75" stroke={theme.accent} strokeWidth="1.5" />
            <circle cx="135" cy="77" r="2.5" fill={theme.accent} />
          </motion.g>

          {/* Head */}
          <motion.g
            animate={{ y: [0, 2, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Neck */}
            <rect x="92" y="120" width="16" height="18" fill={skinTone} rx="2" />
            {/* Shoulders / body */}
            <path
              d="M 50 200 Q 50 145 100 145 Q 150 145 150 200 Z"
              fill={theme.ink}
              opacity="0.92"
            />
            {/* Suit collar */}
            <path
              d="M 80 150 L 100 175 L 120 150 L 115 145 L 100 165 L 85 145 Z"
              fill={theme.accent}
              opacity="0.85"
            />
            {/* Face shape */}
            <ellipse cx="100" cy="100" rx="28" ry="32" fill={skinTone} />
            {/* Hair */}
            <path
              d={`M 72 95 Q 72 70 100 68 Q 128 70 128 95 Q 128 80 110 78 Q 100 75 90 78 Q 72 80 72 95 Z`}
              fill={hairColor}
            />
            {/* Eyebrows */}
            <rect x="84" y="92" width="10" height="2" rx="1" fill={hairColor} />
            <rect x="106" y="92" width="10" height="2" rx="1" fill={hairColor} />
            {/* Eyes - blinking */}
            <motion.g
              animate={{ scaleY: [1, 0.1, 1] }}
              transition={{ duration: 0.25, repeat: Infinity, repeatDelay: 3.5 }}
              style={{ originY: "100px" }}
            >
              <ellipse cx="89" cy="100" rx="2.5" ry="3" fill={theme.ink} />
              <ellipse cx="111" cy="100" rx="2.5" ry="3" fill={theme.ink} />
            </motion.g>
            {/* Glasses */}
            {hasGlasses && (
              <g stroke={theme.ink} strokeWidth="1.5" fill="none">
                <rect x="83" y="95" width="12" height="10" rx="2" />
                <rect x="105" y="95" width="12" height="10" rx="2" />
                <line x1="95" y1="100" x2="105" y2="100" />
              </g>
            )}
            {/* Smile */}
            <motion.path
              d="M 92 115 Q 100 122 108 115"
              stroke={theme.ink}
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              animate={{ d: ["M 92 115 Q 100 118 108 115", "M 92 115 Q 100 122 108 115", "M 92 115 Q 100 118 108 115"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.g>

          {/* Book in hand (optional) */}
          {hasBook && (
            <motion.g
              animate={{ rotate: [0, -3, 0], y: [0, -2, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{ originX: "40px", originY: "180px" }}
            >
              <rect x="25" y="170" width="30" height="22" rx="2" fill={theme.accent} />
              <line x1="40" y1="170" x2="40" y2="192" stroke={theme.ink} strokeWidth="0.8" opacity="0.5" />
              <line x1="30" y1="176" x2="38" y2="176" stroke={theme.ink} strokeWidth="0.6" opacity="0.4" />
              <line x1="30" y1="180" x2="38" y2="180" stroke={theme.ink} strokeWidth="0.6" opacity="0.4" />
              <line x1="42" y1="176" x2="50" y2="176" stroke={theme.ink} strokeWidth="0.6" opacity="0.4" />
              <line x1="42" y1="180" x2="50" y2="180" stroke={theme.ink} strokeWidth="0.6" opacity="0.4" />
            </motion.g>
          )}

          {/* Floating star sparkle */}
          <motion.g
            animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ originX: "165px", originY: "50px" }}
          >
            <polygon
              points="165,42 168,48 174,50 168,52 165,58 162,52 156,50 162,48"
              fill={theme.accent}
            />
          </motion.g>
          <motion.g
            animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
            style={{ originX: "40px", originY: "50px" }}
          >
            <polygon
              points="40,44 42,48 46,50 42,52 40,56 38,52 34,50 38,48"
              fill={theme.accent}
            />
          </motion.g>
        </svg>

        {/* Initials watermark */}
        <div
          className="absolute bottom-2 right-3 font-playfair font-black text-2xl opacity-30"
          style={{ color: theme.accent }}
        >
          {initials}
        </div>
      </div>
    </div>
  );
}
