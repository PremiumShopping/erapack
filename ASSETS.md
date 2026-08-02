# Assets & licences

Every external asset used, with its licence and source. The project favours
original / procedural / generated assets — **no stock photography is used**.

## Fonts (self-hosted via `next/font/google`)

| Font | Use | Licence | Source |
|---|---|---|---|
| **Assistant** | Display + body (matches the live erapack.uk) | SIL Open Font License 1.1 | Google Fonts |
| **Space Mono** | Small technical / eyebrow labels | SIL Open Font License 1.1 | Google Fonts |

## Icons

| Library | Licence | Source |
|---|---|---|
| **lucide-react** | ISC | https://lucide.dev |

## Generated hero media (AI — Higgsfield)

Created specifically for this project. **AI-generated** — treat as placeholder
imagery; ownership/usage follows Higgsfield's terms of service. Swap for real
studio product photography for production if preferred.

| File | What | How |
|---|---|---|
| `public/hero/cup-empty.png` | Empty kraft cup w/ terracotta band (video start frame) | Higgsfield image (nano-banana), 16:9 |
| `public/hero/cups-montage.png` | Lineup of 5 branded cups on white (home hero) | Higgsfield image (nano-banana), 4:3 |
| `public/hero/espresso.mp4` | Scroll-scrubbed espresso-fill clip | Higgsfield image→video (Cinema Studio), 10s 1080p, silent |

> ⚠️ The espresso clip / start frame use a **terracotta** band (generated before
> the brand was re-skinned to green). See TODO-CONFIRM.md — regenerate with the
> green identity to fully match the brand.

## Procedural / original (generated in code — no external files)

- **Paper grain** — SVG `feTurbulence` (`components/fx/GrainOverlay.tsx`)
- **Cup wrap texture** — HTML canvas → `THREE.CanvasTexture`
  (`lib/cupArtwork.ts`), including the live user artwork in the configurator
- **3D cup** — procedural truncated-cone geometry (R3F)
- **Studio lighting** — drei `Lightformer`s (no external HDRI fetched)

## Trademarks

- The multi-colour **Google "G"** mark appears in the hero to denote Google
  Reviews (the live site uses the same). Nominative use — see TODO-CONFIRM.md to
  confirm it's permitted for the client's context.
