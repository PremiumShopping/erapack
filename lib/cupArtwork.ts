import type { CupConfig } from "@/store/configurator";

/** Wrap-texture canvas size (U = around the cup, V = bottom→top). */
export const ART_W = 1024;
export const ART_H = 512;

/**
 * Draw the full cup wrap from a config onto a 2D context. The image space maps
 * to the cup body's UVs: x wraps around the circumference, y is vertical
 * (0 = bottom of the drawing = top of the cup, since V is flipped on the cone).
 * `logo` is a pre-loaded HTMLImageElement (or null).
 */
export function drawCupArtwork(
  ctx: CanvasRenderingContext2D,
  config: CupConfig,
  logo: HTMLImageElement | null,
) {
  const w = ART_W;
  const h = ART_H;

  // base fill
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = config.baseColor;
  ctx.fillRect(0, 0, w, h);

  // faint paper speckle for tactility
  ctx.save();
  ctx.globalAlpha = 0.04;
  for (let i = 0; i < 900; i++) {
    ctx.fillStyle = i % 2 ? "#000000" : "#ffffff";
    const x = (Math.sin(i * 12.9898) * 43758.5453) % 1;
    const y = (Math.sin(i * 78.233) * 12543.113) % 1;
    ctx.fillRect(Math.abs(x) * w, Math.abs(y) * h, 2, 2);
  }
  ctx.restore();

  // repeating pattern, then free-placed shapes (layers under the brand marks)
  drawPattern(ctx, config, w, h);
  drawShapes(ctx, config, w, h);

  // logo — a single placement, or tiled across the whole wrap
  if (logo && logo.width > 0) {
    const aspect = logo.height / logo.width;
    const rot = (config.logoRotation * Math.PI) / 180;
    const drawAt = (cx: number, cy: number, boxW: number) => {
      const boxH = boxW * aspect;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      ctx.drawImage(logo, -boxW / 2, -boxH / 2, boxW, boxH);
      ctx.restore();
    };
    if (config.logoTile) {
      const cols = Math.max(1, Math.round(config.logoTileCols));
      const rows = Math.max(1, Math.round(config.logoTileRows));
      const cellW = w / cols;
      const cellH = h / rows;
      const boxW = cellW * 0.72 * config.logoScale;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          drawAt((c + 0.5) * cellW, (r + 0.5) * cellH, boxW);
        }
      }
    } else {
      drawAt(
        config.logoX * w,
        (1 - config.logoY) * h,
        w * 0.3 * config.logoScale,
      );
    }
  }

  // text lines — full x / y / rotation / size control
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (const line of config.textLines) {
    if (!line.text) continue;
    const fs = h * 0.11 * line.size;
    ctx.save();
    ctx.translate(line.x * w, (1 - line.y) * h);
    ctx.rotate((line.rotation * Math.PI) / 180);
    ctx.font = `800 ${fs}px Assistant, ui-sans-serif, sans-serif`;
    ctx.fillStyle = line.color;
    ctx.fillText(line.text, 0, 0);
    ctx.restore();
  }
}

/** Draw the repeating background pattern over the base colour. */
function drawPattern(
  ctx: CanvasRenderingContext2D,
  config: CupConfig,
  w: number,
  h: number,
) {
  const kind = config.pattern;
  if (!kind || kind === "none") return;
  const period = Math.max(14, 64 * config.patternScale);
  ctx.save();
  ctx.fillStyle = config.patternColor;
  ctx.strokeStyle = config.patternColor;

  if (kind === "stripes") {
    for (let x = 0; x < w; x += period * 2) ctx.fillRect(x, 0, period, h);
  } else if (kind === "diagonal") {
    ctx.translate(w / 2, h / 2);
    ctx.rotate((config.patternAngle * Math.PI) / 180);
    for (let x = -w * 1.5; x < w * 1.5; x += period * 2) {
      ctx.fillRect(x, -h * 1.5, period, h * 3);
    }
  } else if (kind === "dots") {
    const gap = period * 1.5;
    const r = period * 0.28;
    for (let y = gap * 0.5; y < h + gap; y += gap) {
      for (let x = gap * 0.5; x < w + gap; x += gap) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  } else if (kind === "grid") {
    ctx.lineWidth = Math.max(1.5, period * 0.08);
    for (let x = 0; x <= w; x += period) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y <= h; y += period) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
  } else if (kind === "chevron") {
    ctx.lineWidth = Math.max(3, period * 0.2);
    ctx.lineJoin = "round";
    for (let y = 0; y < h + period; y += period) {
      ctx.beginPath();
      for (let x = -period; x < w + period; x += period) {
        ctx.moveTo(x, y);
        ctx.lineTo(x + period / 2, y + period / 2);
        ctx.lineTo(x + period, y);
      }
      ctx.stroke();
    }
  }
  ctx.restore();
}

/** Draw the free-placed shape layers. */
function drawShapes(
  ctx: CanvasRenderingContext2D,
  config: CupConfig,
  w: number,
  h: number,
) {
  for (const s of config.shapes) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, Math.min(1, s.opacity));
    ctx.fillStyle = s.color;
    ctx.strokeStyle = s.color;
    ctx.translate(s.x * w, (1 - s.y) * h);
    ctx.rotate((s.rotation * Math.PI) / 180);
    const bw = s.w * w;
    const bh = s.h * h;
    if (s.kind === "rect") {
      ctx.fillRect(-bw / 2, -bh / 2, bw, bh);
    } else if (s.kind === "circle") {
      ctx.beginPath();
      ctx.ellipse(0, 0, bw / 2, bh / 2, 0, 0, Math.PI * 2);
      ctx.fill();
    } else if (s.kind === "line") {
      ctx.lineWidth = Math.max(2, bh);
      ctx.beginPath();
      ctx.moveTo(-bw / 2, 0);
      ctx.lineTo(bw / 2, 0);
      ctx.stroke();
    } else if (s.kind === "triangle") {
      ctx.beginPath();
      ctx.moveTo(0, -bh / 2);
      ctx.lineTo(bw / 2, bh / 2);
      ctx.lineTo(-bw / 2, bh / 2);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }
}

/** Per-size cup proportions (truncated cone). */
export const CUP_DIMS: Record<
  CupConfig["size"],
  { H: number; rTop: number; rBot: number }
> = {
  "4oz": { H: 1.02, rTop: 0.5, rBot: 0.36 },
  "6oz": { H: 1.18, rTop: 0.53, rBot: 0.375 },
  "8oz": { H: 1.32, rTop: 0.55, rBot: 0.39 },
  "12oz": { H: 1.55, rTop: 0.58, rBot: 0.405 },
};
