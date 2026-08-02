/**
 * Stylised paper-cup SVG used on product cards so the range always shows an
 * actual cup (not just a text size). `body` tints the paper, `band` the print.
 */
export default function CupGlyph({
  body = "#FFFFFF",
  band = "#39FF14",
  className = "",
}: {
  body?: string;
  band?: string;
  className?: string;
}) {
  const shape =
    "M18 26 L102 26 L88 132 Q87 140 79 140 L41 140 Q33 140 32 132 Z";
  return (
    <svg
      viewBox="0 0 120 152"
      className={className}
      role="img"
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <clipPath id="era-cupclip">
          <path d={shape} />
        </clipPath>
      </defs>
      {/* body */}
      <path
        d={shape}
        fill={body}
        stroke="rgba(15,18,17,0.14)"
        strokeWidth="1.5"
      />
      {/* printed band, clipped to the body */}
      <rect
        x="8"
        y="58"
        width="104"
        height="30"
        fill={band}
        clipPath="url(#era-cupclip)"
      />
      {/* rim */}
      <ellipse
        cx="60"
        cy="26"
        rx="42"
        ry="10"
        fill={body}
        stroke="rgba(15,18,17,0.16)"
        strokeWidth="1.5"
      />
      <ellipse cx="60" cy="26" rx="34" ry="7.5" fill="rgba(15,18,17,0.16)" />
    </svg>
  );
}
