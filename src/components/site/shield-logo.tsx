/**
 * Shield Logo — custom SVG for CSS GUIDE.
 *
 * Design: emerald shield with gold border, gold crescent + star at center,
 * and a gold ribbon banner below. Symbolizes protection, duty, and Pakistan.
 *
 * Replaces the previous GraduationCap icon throughout the site (navbar,
 * footer, CTA badge, favicon).
 *
 * Usage: <ShieldLogo className="w-5 h-5" />
 * The shield itself uses currentColor for the gold border so it inherits
 * text color, but the fill colors are hardcoded brand colors for consistency.
 */

type ShieldLogoProps = {
  className?: string;
  /** Title for accessibility (rendered as <title> in the SVG). */
  title?: string;
};

export default function ShieldLogo({
  className = "w-5 h-5",
  title = "CSS GUIDE",
}: ShieldLogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      {/* Shield body */}
      <path
        d="M 50,8 L 86,18 L 86,52 Q 86,78 50,92 Q 14,78 14,52 L 14,18 Z"
        fill="#0e6b3d"
        stroke="#c9a227"
        strokeWidth="3"
      />
      {/* Inner shield trim */}
      <path
        d="M 50,14 L 80,22 L 80,52 Q 80,73 50,85 Q 20,73 20,52 L 20,22 Z"
        fill="none"
        stroke="#f1d27a"
        strokeWidth="1"
        opacity="0.6"
      />
      {/* Crescent moon + 5-point star (Pakistan flag symbol) */}
      <g transform="translate(50, 48)">
        <path
          d="M -13,0 a 13,13 0 1,0 13,-13 a 10,10 0 1,1 -13,13 z"
          fill="#f1d27a"
        />
        <path
          d="M 14,-4 l 2.3,4.7 5.2,0.8 -3.8,3.7 0.9,5.2 -4.7,-2.5 -4.7,2.5 0.9,-5.2 -3.8,-3.7 5.2,-0.8 z"
          fill="#f1d27a"
        />
      </g>
      {/* Ribbon banner */}
      <path d="M 28,68 L 72,68 L 72,76 L 50,82 L 28,76 Z" fill="#c9a227" />
      <path d="M 28,68 L 24,72 L 28,76 Z" fill="#8a6f12" />
      <path d="M 72,68 L 76,72 L 72,76 Z" fill="#8a6f12" />
    </svg>
  );
}
