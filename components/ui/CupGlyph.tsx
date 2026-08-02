/**
 * Stylised paper-cup SVG used across the range so a cup always shows an actual
 * cup (not just a size). `body` tints the paper, `band` the printed wrap; with
 * `brand` it carries the ERA PACK wordmark + leaf so the cup reads as branded.
 */
export default function CupGlyph({
  body = "#FFFFFF",
  band = "#39FF14",
  brand = true,
  className = "",
}: {
  body?: string;
  band?: string;
  brand?: boolean;
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
      {brand && (
        <g clipPath="url(#era-cupclip)">
          <text
            x="58"
            y="77"
            textAnchor="middle"
            fontSize="11"
            fontWeight="800"
            letterSpacing="0.2"
            fill="#0F1211"
            fontFamily="var(--font-display), sans-serif"
          >
            ERA PACK
          </text>
          <path
            d="M92 66 q6 -4 10 0 q-4 6 -10 0 z"
            fill="#0F1211"
            opacity="0.85"
          />
        </g>
      )}
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
