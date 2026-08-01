/**
 * Procedural paper grain — a fixed, full-viewport fractal-noise overlay.
 * No image asset; generated with SVG feTurbulence so it stays crisp and
 * weightless. mix-blend-multiply lets the kraft tone show through the paper.
 */
export default function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[70] mix-blend-multiply"
      style={{ opacity: "var(--grain-opacity)" }}
    >
      <svg className="h-full w-full">
        <filter id="era-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.82"
            numOctaves={2}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#era-grain)" />
      </svg>
    </div>
  );
}
