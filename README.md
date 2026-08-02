# Era Pack — custom paper cups (flagship rebuild)

A redesigned, motion-rich e-commerce site for **Era Pack**, a UK manufacturer of
custom-branded disposable paper cups. Rebuilt from the live
[erapack.uk](https://erapack.uk) — same brand identity and features, elevated
craft, plus a real-time **3D "Design your cup" configurator**.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build && npm start   # production build
npm run lint                 # eslint
npm run format               # prettier
```

Node 20+ (developed on Node 24). Package manager: **npm**.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** — CSS-first `@theme` tokens in `app/globals.css`
- **Framer Motion** (UI/micro-interactions) + **GSAP + ScrollTrigger** (scroll
  scrubbing / pinning) + **Lenis** (smooth inertia scroll)
- **React Three Fiber** + **drei** + **postprocessing** — the 3D configurator
- **Zustand** (persisted) — configurator, cart, orders, auth, UI
- **react-dropzone**, **zod**, **lucide-react**

## Brand / design system

Inherited from the live site: **white** base, near-black ink, one **electric
green** accent (`#39FF14` fill / `#1FBF07` readable green text), fully-rounded
pill buttons, **Assistant** typeface. Tokens live in `app/globals.css` (`@theme`)
and mirror in `lib/design-tokens.ts` (motion tokens for GSAP/Framer/R3F). Green
is also aliased as `clay` so utilities re-skin cleanly.

## Structure

```
app/            routes (home, shop, design, cart, checkout, order/[id],
                about, faq, contact, login, legal stubs, api/order)
components/
  shell/        nav, footer, promo banner, newsletter, page placeholder
  sections/     home + shop sections (hero, why, stats, cups, video, CTA)
  three/        ConfiguratorCanvas (R3F)
  configurator/ Configurator + ControlsPanel
  cart/         CartDrawer
  fx/           GrainOverlay, CustomCursor, Marquee
  ui/           Magnetic, CountUp
store/          zustand: configurator, cart, orders, auth, ui
lib/            design-tokens, fonts, products, faq, cupArtwork, format, hooks
public/hero/    generated hero media (see ASSETS.md)
docs/           CONTENT-SPEC.md (sourced erapack.uk content)
```

## Signature features

- **Scroll-scrubbed video hero** — an AI-generated espresso-fill clip whose
  playback is mapped to scroll position (`ScrollVideoHero`), captions cross-fade
  per stage, reduced-motion shows a static poster.
- **⭐ 3D configurator** (`/design`) — size, cup colour, drag-drop logo (move/
  scale/rotate), text lines, presets, all composited live to a `CanvasTexture`
  wrapped on the cup; OrbitControls (rotate/zoom/pinch); lock → snapshot →
  add to cart. In-progress designs persist to `localStorage`.

## Skills installed (via `npx skills add emilkowalski/skill`)

Emil Kowalski's pack — `emil-design-eng`, `animation-vocabulary`,
`review-animations`, `improve-animations`, `find-animation-opportunities`,
`apple-design`, `prototype`, `pick-ui-library` (in `.agents/skills/`, symlinked
to `.claude/skills/`). Their motion standards (strong easing curves, <300ms UI,
`scale(0.97)` press feedback, spring mouse-tracking) are baked into the tokens
and components.

## Mocked vs. real (localhost)

| Area | State |
|---|---|
| Catalogue, sizes, copy, FAQ, contact details | Real, sourced from erapack.uk |
| **Pricing basis** (per case / 1000 / unit) | ⚠️ placeholder — see TODO-CONFIRM.md |
| Cart / configurator / orders / auth | Real logic, **localStorage** persistence |
| Checkout payment | **Mocked** — `app/api/order` returns a confirmation, no charge |
| Auth | **Stub** — mock session, no real credentials |
| Newsletter / contact form | **Mocked** — client-side success, no backend |
| Hero media | **AI-generated** (Higgsfield) — see ASSETS.md |

### Where Stripe / a real backend plug in

`app/api/order/route.ts` is the seam. Add `.env.local`:

```bash
# .env.local (placeholders — not committed)
STRIPE_SECRET_KEY=sk_test_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
```

Create a PaymentIntent there, return the `client_secret`, confirm with Stripe.js
on the client, and persist orders server-side instead of `localStorage`. Wire
the newsletter/contact forms to your ESP/CRM at their marked `TODO`s.

## Notes

- `npm audit` shows 3 high-severity advisories **inside Next.js itself**
  (transitive `postcss`/`sharp`); the only "fix" downgrades Next to 9.3.3, so
  they're left for an upstream Next patch. Not project code.
- See **ASSETS.md** (licences) and **TODO-CONFIRM.md** (everything to verify).
