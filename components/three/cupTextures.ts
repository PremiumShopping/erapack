import * as THREE from "three";

/**
 * Procedural wrap texture for the paper cup — a kraft/paper base with a clay
 * band carrying the repeated wordmark. Generated on a 2D canvas so there's no
 * external asset. (M6's configurator will swap in a live user texture.)
 */
export function makeCupWrapTexture(): THREE.CanvasTexture {
  const w = 1600;
  const h = 640;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;

  // paper base
  ctx.fillStyle = "#F4EEE1";
  ctx.fillRect(0, 0, w, h);

  // faint kraft speckle for tactility
  ctx.globalAlpha = 0.05;
  for (let i = 0; i < 1400; i++) {
    ctx.fillStyle = i % 2 ? "#9C7B4E" : "#2B2320";
    const x = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;
    const y = Math.abs(Math.sin(i * 78.233) * 12543.113) % 1;
    ctx.fillRect(x * w, y * h, 2, 2);
  }
  ctx.globalAlpha = 1;

  // top + bottom hairlines
  ctx.fillStyle = "rgba(43,35,32,0.18)";
  ctx.fillRect(0, h * 0.2, w, 3);
  ctx.fillRect(0, h * 0.8 - 3, w, 3);

  // clay band
  const bandY = h * 0.34;
  const bandH = h * 0.32;
  ctx.fillStyle = "#D24B27";
  ctx.fillRect(0, bandY, w, bandH);

  // repeated wordmark in the band
  ctx.fillStyle = "#F6F1E7";
  ctx.font = "700 62px Georgia, 'Times New Roman', serif";
  ctx.textBaseline = "middle";
  const label = "ERA PACK";
  const dot = "  ·  ";
  const unit = label + dot + "YOUR BRAND" + dot;
  const unitW = ctx.measureText(unit).width;
  let x = 0;
  const midY = bandY + bandH / 2;
  while (x < w + unitW) {
    ctx.fillText(unit, x, midY);
    x += unitW;
  }

  // small caption below band
  ctx.fillStyle = "rgba(43,35,32,0.55)";
  ctx.font = "600 26px Georgia, serif";
  ctx.fillText("FULL-COLOUR · UK FACTORY-DIRECT", 40, h * 0.88);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  tex.wrapS = THREE.RepeatWrapping;
  tex.needsUpdate = true;
  return tex;
}

/** Soft radial-alpha sprite for steam wisps. */
export function makeSoftCircleTexture(): THREE.CanvasTexture {
  const s = 128;
  const c = document.createElement("canvas");
  c.width = s;
  c.height = s;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, "rgba(255,255,255,0.85)");
  g.addColorStop(0.5, "rgba(255,255,255,0.25)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}
