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
