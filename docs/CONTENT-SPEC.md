<!-- Auto-generated from erapack.uk research workflow (wf_79317c21-c0c). Verbatim client content; see TODO-CONFIRM section. -->

# Era Pack — Sourced Content & Craft Spec

> **Provenance note.** `erapack.uk` aggressively rate-limits WebFetch (persistent HTTP 429). The homepage, About, FAQ, Contact, Design, and Privacy pages were successfully captured via a real browser engine and `curl` (HTTP 200) and are treated as reliable. Individual `/products/*` pages never loaded — so per-unit pricing and pack basis remain unconfirmed. Every gap is enumerated in Section 6. Nothing below is presented as confirmed unless it was captured verbatim.

---

## 1. Homepage copy

**Hero**
- Headline (verbatim): **"Your brand, in every cup."**
- Subhead (verbatim): **"Custom Paper Cups — Direct From the Manufacturer No middlemen. Just high-quality cups, low minimum orders, and fast delivery."**
- Primary CTA button (verbatim): **"Shop Cups"**
- Feature badges under hero (verbatim): **"Low MOQ · Fast Delivery · Premium Quality"**

**Announcement / rotating banners**
- Rotating banner strip (verbatim, repeated): **"Fast lead times! ( 2-3 Days) · Low Minimum Order Quantity · Factory-Direct Prices! · Free Design Help!"**
- Announcement bar message 1 (verbatim): **"Free Shipping orders above £100"** *(non-standard grammar is as-published)*
- Announcement bar message 2 (verbatim): **"Orders Arrive in 2-3 working days!"**

**Trust / social proof**
- Verbatim: **"Trusted by 700+ customers"**
- No named testimonials or star rating were found anywhere on the site — only this aggregate claim.

**"Who are we" (verbatim)**
> "Era Pack is a UK manufacturer of custom branded paper cups. We specialise in fast turnaround times and low MOQs, giving everyone — from small independents to large chains — access to affordable, high-quality custom branded paper cups."

**"Why EraPack?" value props (homepage wording, verbatim)**
1. **No MOQ** — "We believe every business deserves access to quality cups, which is why we offer no minimum order quantity."
2. **Affordable** — "No middlemen, just factory-direct pricing. That's why we confidently offer price matching and a price guarantee."
3. **Fast delivery** — "Busy days or a last-minute event? We understand. At EraPack, we offer next-day delivery while keeping our prices as affordable as ever."
4. **Eco Friendly** — "At EraPack, sustainability is at the heart of everything we do. We use 100% recyclable materials and power our operations with renewable energy." *(NB: differs from the About page — see Section 3.)*

**Section headings present on homepage:** "Our Cups", "Who are we", "Why EraPack?"

**Shop/collection benefit badges (global, appear across product cards):** "Express delivery" · "Full colour" · "Made for delivery" · "Speedy lead times" — plus "No MOQ (minimum order quantity)", "Free Shipping orders above £100", "Orders Arrive in 2-3 working days!", "Free Design Help", "100% recyclable materials".

**Promo / shipping promo:** Free shipping over **£100** (appears only in the rotating announcement bar; not stated in any policy page).

**Newsletter signup (footer, verbatim)**
> "Industry tips, community updates + exclusives for you. [Email] [Subscribe] By signing up to receive emails from EraPack, you agree to our Privacy Policy. We treat your info responsibly."

**Site-wide meta tagline (from search index, on-page placement UNCONFIRMED):** "Packaging Redefined for Tomorrow."

---

## 2. Products

Prices below are **verbatim-captured** from the shop/collection listing and homepage tiles (two researchers agree). The **unit/quantity basis is NOT stated** on any page that loaded, and product pages could not be fetched — do not assume a shared basis. Price ordering (6oz dearest, 12oz cheapest) strongly implies the four prices are **not** on the same quantity basis.

| Size | Price | Unit / qty basis | Delivery | Customisation notes |
|------|-------|------------------|----------|---------------------|
| 4oz Paper Cups | £85.79 | **TODO-CONFIRM** — per case / per 1000 / per unit not stated | 2–3 working days | Full-colour custom branding; card badge "Express delivery" (global badge, not a real product desc). URL `/products/4oz` |
| 6oz Paper Cups | £142.55 | **TODO-CONFIRM** — not stated | 2–3 working days | Full-colour; card badge "Full colour". URL reported as `/products/8oz` — **inconsistent with the 6oz title**; real handle must be re-verified |
| 8oz Paper Cups | £82.00 | **TODO-CONFIRM** — not stated | 2–3 working days | Full-colour; card badge "Made for delivery". URL `/products/8oz-1` |
| 12oz Paper Cups | £69.99 | **TODO-CONFIRM** — not stated | 2–3 working days | Full-colour; card badge "Speedy lead times". URL `/products/12oz` |

**MOQ:** "No MOQ (No Minimum Order Quantity) model for many of our standard orders" (FAQ) — order as few or as many as needed. *(The About page instead says "low minimum order quantity" — flagged.)*

**Size range caveat:** Only 4oz / 6oz / 8oz / 12oz appear on the shop listing. The FAQ templates answer lists **"4oz, 8oz, 12oz, and 16oz"** (6oz omitted, 16oz added). The Design page only offers PDF templates for 4oz SW, 8oz SW/DW, 12oz SW/DW. Reconcile before build.

> **Fallback placeholders (only if a fresh fetch fails):** 4oz £85.79, 6oz £142.55, 8oz £82.00, 12oz £69.99, "full-colour customisation, 2–3 day delivery", MOQ 1 — **all TODO-CONFIRM**.

---

## 3. About / FAQ / Contact / Sustainability

### About (verbatim)
- Headline (verbatim, incl. original misspelling): **"EraPack — UK Manufacterer of Custom Paper Cups"**
- Intro: "EraPack is a leading UK-based paper cup manufacturer specialising in eco-friendly, high-quality branded paper cups. By manufacturing directly, we help brands streamline the process, reduce costs, and create packaging that leaves a lasting impression."
- Secondary headline: "Be Seen. Be Remembered. One Cup at a Time"
- Secondary subhead: "Helping businesses elevate their brands create lasting customer connections through custom packaging designed to make your business stand out."
- About value props (note divergences from homepage):
  1. **Low MOQ** — "We believe every business deserves access to quality cups, which is why we offer low minimum order quantity." *(homepage says "no minimum order quantity")*
  2. **Factory-Direct pricing** — "No middlemen, just factory-direct pricing. That's why we confidently offer price matching and a price guarantee."
  3. **Fast delivery** — "Busy days or a last-minute event? We understand. At EraPack, we offer next-day delivery while keeping our prices as affordable as ever."
  4. **Eco Friendly** — "At EraPack, sustainability is at the heart of everything we do. We use 100% recyclable materials and aim to power all operations with 50% renewable energy by 2030."

### FAQ (verbatim Q&A — 16 entries as live on `/pages/faq`)

**Q: How do minimum order quantities work?**
A: We operate on a No MOQ (No Minimum Order Quantity) model for many of our standard orders. This means you can order as few or as many cups as you need, making our service ideal for start-ups, pop-ups, cafés, events, and established businesses alike.

**Q: What file formats do you accept for artwork?**
A: We accept the following professional print-ready formats: PDF, AI (Adobe Illustrator), EPS, SVG, High-resolution PNG or JPEG. For best print results, we recommend submitting vector files (AI, EPS, or SVG) with all fonts outlined and colours in CMYK format. If you're unsure about your file, our design team can review it for you before printing.

**Q: Do you have templates for your products?**
A: Yes — we provide downloadable design templates for all cup sizes (4oz, 8oz, 12oz, and 16oz). You can access and download these templates directly from our Design page. These templates ensure your artwork fits perfectly on the cup and meets our print specifications. If you need help using the templates, our team is happy to assist.

**Q: When will my new cups arrive?**
A: Standard delivery is 2–3 working days from order confirmation and artwork approval. For urgent orders, next-day delivery is available — simply select this option at checkout or contact our team before placing your order. You will receive tracking information once your order has been dispatched.

**Q: Can I change my design after submitting my order?**
A: Yes — you can change your design before production begins. If you need to make an amendment, please contact us as soon as possible with your updated artwork or design instructions. Once your order has entered production, changes may no longer be possible, or additional costs may apply.

**Q: Do we have templates?**
A: Yes — all of our templates are available to download on our Design page.

**Q: What is the design process?**
A: It is extremely easy. You can either: use our AI design tool, approve your artwork, and place your order instantly, or upload your own design and leave the rest to us — we'll check it and prepare it for print.

**Q: Are there any extra costs for design help?**
A: No. All design support is simple and completely free.

**Q: Do you offer Buy Now, Pay Later / accounts?**
A: Yes — we offer accounts to frequent customers, subject to approval.

**Q: Where does manufacturing happen?**
A: We are the manufacturers — all of our cups are proudly made in the UK.

**Q: Are the cups recyclable?**
A: Yes. All of our cups are 100% recyclable.

**Q: If I grow in volume, will my price per cup decrease?**
A: Yes — larger orders benefit from lower prices per cup.

**Q: Can I mix different cup sizes in one order?**
A: Yes, you can combine different sizes in a single order.

**Q: Does next-day delivery have a minimum order?**
A: No — next-day delivery is available regardless of order size.

**Q: How can I repeat an order?**
A: It's simple — just go to the product you want and enter your approved design code at checkout. We securely store all approved designs. Alternatively, go to Past Orders in your account and reorder with one click.

**Q: How will I know when my order is ready?**
A: You will receive an email notification as soon as your order is dispatched. In most cases, orders ship the same day or the next working day after artwork approval and production. Your email will include tracking details.

*(Two entries — "Do you have templates for your products?" and "Do we have templates?" — genuinely both appear on the live page; kept verbatim.)*

### Contact details
- **Email:** Hello@erapack.uk
- **Phone (Contact page, "Call us"):** 020 3051 3982
- **WhatsApp (Contact page):** 07477 348200
- **Phone (Privacy Policy contact section — DIFFERENT number):** +44 7367 629026
- **Postal address (only found in Privacy Policy):** unit 7c Britannia Estate, LU3 1RJ, United Kingdom (Luton)
- **Opening hours:** none published anywhere.

**Contact page headline:** "Get in touch with the team"
**Contact intro (verbatim):** "Whether you've got questions or would like a sounding board for an idea, we're here to help. You can either fill in this form, call us on the number below, or drop us an email. We'll then get straight on the case for you!"
**Contact form fields (verbatim, * = required):** First name* · Last name* · Email* · Company name · Phone number · How can we help you* (Select an option) · Please share more details about your enquiry* · [Submit]
**"How can we help you" dropdown options:** I'd like to enquire about your products · I'd like to check the status of my order · I need help with my artwork · I need help with billing or payment · Something else

### Sustainability messaging (capture BOTH — they differ)
- **Homepage (present tense):** "We use 100% recyclable materials and power our operations with renewable energy."
- **About page (aspirational / future-dated):** "We use 100% recyclable materials and aim to power all operations with 50% renewable energy by 2030."
- **FAQ:** "All of our cups are 100% recyclable."

---

## 4. Footer, social, and policy thresholds

**Footer columns & links**
- **Products** → Shop All (`/collections/all`); Product Templates (`/pages/design`)
- **Learn** → About Us (`/pages/about-us`)
- **Help** → FAQ (`/pages/faq`); Contact Us (`/pages/contact`); Shipping & Refunds (`/pages/faq` — **points to FAQ, not a real policy page**); Privacy policy (`/policies/privacy-policy`)
- **Newsletter fine-print link:** Privacy Policy (`/policies/privacy-policy`)
- **Copyright:** "© 2026, Era Pack" (links to `/`)

**Social media:** **NONE.** The footer social list (`<ul class="list list-social">`) is present but empty. No Facebook / Instagram / LinkedIn / X / TikTok / YouTube links anywhere on the site. *(A Facebook "@era.parck" surfaced in web search but is unlinked and unverified — do not assume ownership.)*

**Header nav:** Shop Now (`/collections/shop-cups`) · 4oz (`/products/4oz`) · 6oz (**links to `/products/8oz`** — inconsistent) · 8oz (**links to `/products/8oz-1`**) · 12oz (`/products/12oz`) · Design · About us · FAQ · Contact.

**Design-page template PDFs (Shopify CDN):**
- 12oz single wall — `.../12oz_single.pdf`
- 12oz double wall — `.../12oz_double_wall.pdf`
- 8oz single wall — `.../8oz_single.pdf`
- 8oz double wall — `.../8oz_double.pdf`
- 4oz single wall — `.../4ox_single_wall.pdf` (note typo "4ox" in the source filename)
- No 16oz template and no 4oz double-wall template exist despite FAQ claims.

**Policy thresholds & shipping facts**
- **Free shipping threshold:** **over £100** (verbatim "Free Shipping orders above £100"). Appears only in the announcement bar — not in any policy page.
- Standard delivery: 2–3 working days from order confirmation and artwork approval. Next-day available with **no minimum order**. Tracking on dispatch.
- **No dedicated Shipping page** and **no Shipping/Refund policy page** exist (`/policies/shipping-policy` and `/policies/refund-policy` both 404). "Shipping & Refunds" resolves to the FAQ.
- **No explicit refund/returns policy text exists anywhere** — must be requested from client if the redesign needs one.
- **Privacy Policy:** standard Shopify-generated policy, "Last updated: July 11, 2026." Era Pack is the data controller; store powered by Shopify. Contact section lists +44 7367 629026, Hello@erapack.uk, unit 7c Britannia Estate, LU3 1RJ.
- **No company registration number or VAT number** displayed anywhere.

---

## 5. Craft & anti-generic playbook

*Distilled from the craft references. This guides the visual and interaction design of every section above.*

**Configurator architecture (the centrepiece)**
- **Split-stage layout:** a pinned/sticky 3D cup canvas holds ~60–65% (left/centre); controls in a right rail on desktop. On mobile the canvas pins to top (~52–58vh) and controls become a draggable bottom sheet with peek/half/full snap points. The live preview must never scroll away.
- **Size switch drives live 3D:** a segmented control (4/8/12/16oz) that morphs **one** mesh via animated height/scale lerp (react-spring/GSAP), keeping the wrap UV constant so placed artwork stays put. Surface oz + ml + mm height/diameter and a "fits standard 90mm lid" note.
- **Persistent price + lead-time HUD** that recomputes instantly on every change (quantity tier, material, print sides, finish) with a number-counter tween. Show price-per-unit, MOQ, and quantity-break thresholds ("add 250 to unlock £0.14/unit") so the configurator doubles as a live quote engine — kept in lockstep with the PDP price.
- **Dual artwork editor:** a flat 2D dieline/unwrap editor for precision (drag, pinch/scroll scale, rotate handle, numeric X/Y/rotation/scale) mirrored live to the 3D via CanvasTexture. The flat editor is where users place logos; the 3D is the truth check.
- **Substrate + finish swatches** (natural kraft, white PE, double-wall, bamboo, ripple) that swap PBR roughness/normal maps live, with a macro texture close-up on hover and a re-rendered artwork-on-material contrast preview.
- **Print-reality warnings, surfaced live:** DPI check (<150 DPI at final size), "artwork crosses the seam", "text inside bleed/safe-area", "low contrast on kraft" (simulate ink on brown, not white), CMYK-gamut notices. Hard errors block add-to-cart; soft warnings are dismissible.
- **Constrained orbit:** clamped polar angle (never upside-down), damped inertia, min/max zoom, auto-rotate that stops permanently on first interaction, plus "reset view" and preset camera buttons (front / three-quarter / rim / bottom).
- **Lock-and-snapshot:** a "Lock design" action freezes controls, runs a slow auto-orbit, and captures a 2× high-res render for cart thumbnail / share card / proof — AND emits a correct-bleed vector dieline PDF/SVG as the actual production file.
- **Serializable design state as single source of truth:** whole config as plain JSON (size, material, layers, positions) powering undo/redo, localStorage autosave, shareable encoded-URL designs, saved designs for reorder, and the print backend.
- **Proof-approval gate before checkout:** side-by-side flat dieline + 3D + a required checklist ("I approve spelling / colours / placement"). Biggest reducer of reprints and disputes.
- **Guided empty state:** open with a few tasteful starting templates (not a blank cup), a "surprise me" palette randomizer, inline coach marks; rotate/scale handles appear only on layer select, click-away deselects, arrow keys nudge (Shift = 10×).

**Anti-generic visual cues — DO**
- Editorial asymmetry: off-centre hero, product bleeding off the canvas edge, captions in the margin, headline baseline aligned to the product. Deliberately break the grid rather than fill three equal cards.
- Oversized characterful display type (clamp() up to ~10–14vw) pairing a distinctive serif/grotesque display face with a neutral text face; mixed weights, tight display tracking, oldstyle/tabular figures for specs.
- Tactile paper language true to kraft: real paper-grain overlays, deckle/fold edges, embossed/letterpress dividers, a kraft-brown + ink palette with one restrained accent, shadows that read like paper lifting off paper.
- A meaningful custom cursor that changes contextually ("drag to rotate" magnet over the 3D), one slow marquee of *real* facts (gsm, "made in the UK", cups printed), scroll-triggered counters for genuine stats.
- Broken/overlapping grid details: images overlapping text, numbered index lists (01 / 02 / 03), hairline rules, rotated captions, generous asymmetric whitespace, one oversized rhythm break per section over a strict 8pt system.
- Real macro photography of the actual paper and product in human hands; warm human microcopy in brand voice — never Lorem, never "Discover our products". Brand-styled focus rings and hover states.

**Anti-generic — AVOID (AI tells)**
- Violet/indigo gradients, glassmorphism cards on blurred colour blobs, the "hero + 3 equal feature cards + centred CTA" scaffold.
- Everything centred/symmetrical, uniform border-radius on everything, equal-width bento tiles for their own sake, default system-font stack, emoji as feature icons.
- Generic stock coffee photos, aurora/orb backgrounds, floating particles, over-glossy chrome/plastic 3D that contradicts a matte-paper brand.
- Motion-for-motion's-sake (identical 0.6s fade-up everywhere). Restraint plus one strong hero idea beats ten stacked effects.

**Motion — one hero set-piece, done well**
- Signature: a flat die-cut blank scrolls in, then **folds/wraps into the cup** as you scroll — pre-baked GLTF morph-target/skeletal fold scrubbed by GSAP ScrollTrigger, fully reversible, never autoplay.
- Alternatives/beats: print-head sweep revealing ink via a CanvasTexture mask; rim curl + base-disc assembly beats; kraft roll unspooling in a horizontally-pinned section; scroll-linked camera on a spline (front → seam → rim → bottom → hero) with spec callouts; final "your coffee, your cup" pour + steam payoff; headline masked by the cup silhouette.
- Discipline: exactly one scroll set-piece, GSAP ScrollTrigger with scrub + pin, everything reversible, **one persistent WebGL context**, every scrubbed moment gated behind `prefers-reduced-motion`.

**Accessibility (non-negotiable)**
- `prefers-reduced-motion`: swap scrubbed 3D for a static hero render, disable auto-rotate/marquee/parallax, show counters at final value; expose a visible in-page "reduce motion" toggle.
- Configurator fully operable without WebGL or a mouse: size radios, named colour swatches, numeric X/Y/rotation/scale inputs — JSON state is the source of truth, 3D is enhancement.
- Keyboard: full tab order, `focus-visible` rings, arrow-key nudge (Shift = larger step), Esc to deselect, Enter to commit; never trap focus in the canvas.
- Canvas is invisible to AT: add an `aria-live="polite"` status region announcing state changes ("Cup now 12oz, logo centred, natural kraft, price £…") plus an offscreen text summary of the current config.
- Mobile bottom sheet manages focus (move in on open, back to trigger on close), swipe + button expand/collapse, 44px targets, backdrop dismiss, safe-area insets; the half-snap must never cover the live preview.
- Don't rely on 3D colour alone — label every swatch name + hex; verify 4.5:1 contrast (browns fail easily — check them explicitly). Provide pause/stop for any autoplay motion (WCAG 2.2.2); give the lock render descriptive alt text; the proof PDF is the accessible record. Gate Lenis/GSAP behind the media query; test keyboard + VoiceOver on the configurator itself.

**Engineering pitfalls to avoid**
- **UV seam / cone geometry:** a cup is a truncated cone — use a cone-correct trapezoidal dieline and pre-warp the texture; put the seam at the back and enforce a seam-safe dead zone.
- **GPU memory:** explicitly dispose old texture/material/geometry on unmount and every artwork swap; reuse **one** canvas + **one** texture and mutate with `needsUpdate` — never recreate a CanvasTexture per frame.
- **CanvasTexture perf:** throttle/debounce `needsUpdate` (~30fps cap), low-res draw during drag, high-res bake on commit (consider OffscreenCanvas in a worker).
- **Colour management:** set renderer + texture `colorSpace` to sRGB correctly, handle premultiplied alpha for PNGs; warn that screen kraft ≠ print kraft and about CMYK gamut.
- **SSR/hydration (Next.js):** R3F Canvas must be client-only (`dynamic` `ssr:false`); guard `useLayoutEffect`; lazy-load the whole configurator so WebGL doesn't block LCP/TTI.
- **Mobile perf:** cap DPR (`dpr={[1,2]}`), on-demand rendering (`frameloop="demand"` + `invalidate()`), compress assets (KTX2/Basis, Draco/meshopt); test on a mid-range Android.
- **One WebGL context only** — never one `<Canvas>` per section (browsers cap ~8–16 contexts). Drive a single persistent canvas by scroll-progress/state.
- **ScrollTrigger + pinned 3D:** use scrub, `ScrollTrigger.refresh()` on resize; update a shared progress value rather than mounting/unmounting WebGL on scroll.
- **Lighting:** matte paper needs high roughness, subtle normal map, soft env/area lighting, contact shadows (avoid multi-MB HDRIs — bake a small env map, self-host Draco/KTX2 decoders). A bare MeshStandardMaterial under a point light looks like cheap plastic.
- **Touch:** OrbitControls captures touch and blocks page scroll — scope rotation to a deliberate mode/gesture and manage `touch-action`.
- **Loading:** `useGLTF.preload` behind a Suspense boundary with a branded skeleton; static-image fallback when WebGL is unavailable or context is lost.
- **Print handoff:** the pretty 3D render is **not** production-ready — output a correct-bleed vector/high-DPI dieline (PDF/SVG). Letting the rasterized CanvasTexture be the print file is the classic configurator mistake.

---

## 6. TODO-CONFIRM (verify before publishing)

1. **Per-unit price basis for every product** — none of the four prices (4oz £85.79, 6oz £142.55, 8oz £82.00, 12oz £69.99) states whether it is per case / per 1000 / per pack / per unit. Product pages 429'd and were never retrieved. Confirm the quantity each price covers.
2. **Price ordering anomaly** — 6oz (£142.55) is dearer than 8oz and 12oz (£69.99), implying different pack quantities per tile. Confirm whether these are different case sizes, starting prices, or an error.
3. **6oz product URL inconsistency** — the 6oz card/nav item links to `/products/8oz`, conflicting with the separate 8oz card at `/products/8oz-1`. Confirm the real 6oz handle (possible site mislink).
4. **Size range mismatch** — shop sells 4oz/6oz/8oz/12oz; FAQ templates answer says "4oz, 8oz, 12oz, **16oz**" (drops 6oz, adds 16oz). Confirm the true offered range and whether 16oz and 6oz exist.
5. **Template coverage gap** — Design page provides PDFs only for 4oz SW, 8oz SW/DW, 12oz SW/DW. No 16oz template, no 4oz double-wall. Confirm which templates should exist.
6. **MOQ contradiction** — homepage + FAQ say "No MOQ / no minimum order quantity"; About page says "low minimum order quantity." Confirm the correct policy and single wording.
7. **Sustainability claim contradiction** — homepage states renewable energy as present-tense fact ("power our operations with renewable energy"); About page says aspirational "aim to power all operations with 50% renewable energy by 2030." Confirm which is accurate (the present-tense homepage claim risks being an unsupportable green claim).
8. **Phone number discrepancy** — Contact page "Call us" = **020 3051 3982**; Contact WhatsApp = **07477 348200**; Privacy Policy = **+44 7367 629026**. Three different numbers. Confirm the correct primary/support number(s).
9. **Postal address** — only one address found (unit 7c Britannia Estate, LU3 1RJ, UK), and only in the Privacy Policy — not on Contact or footer. Confirm it is the correct public trading/returns address.
10. **Opening / business hours** — none published anywhere. Provide if wanted on the redesign Contact section.
11. **Refund / returns policy** — no explicit refund/returns text exists anywhere on the site; `/policies/refund-policy` and `/policies/shipping-policy` both 404; the footer "Shipping & Refunds" link just points to the FAQ. If the redesign needs these sections, the copy **does not yet exist** and must be supplied by the client.
12. **Free-shipping threshold** — "Free Shipping orders above £100" appears **only** in the announcement marquee, not in any policy. Confirm the threshold and publish it as a real policy. (Verbatim grammar is non-standard — confirm intended wording.)
13. **Testimonials / star rating** — only "Trusted by 700+ customers" was found; no named quotes or rating. Source real testimonials before building any testimonial section.
14. **Meta tagline placement** — "Packaging Redefined for Tomorrow." came from a search-engine snippet and was **not** seen in rendered homepage body. Confirm whether/where it appears on-page.
15. **CTA / button labels** — only "Shop Cups" (hero) is confirmed. Add-to-cart / choose-options / checkout button labels were never captured verbatim (product pages 429'd). Confirm.
16. **About-page headline typo** — "UK Manufacterer" is misspelled on the live site (also note homepage "Who are we" body). Confirm the corrected spelling to use.
17. **Homepage full content** — the dedicated homepage researcher failed entirely (persistent 429); homepage copy in this doc was reconstructed from the About/Footer researchers' browser captures. A clean homepage re-fetch is recommended to catch anything missed (promo banners, additional sections, exact badge order).
18. **Social media** — no social links on the site (empty footer social list). An unlinked, unverified Facebook "@era.parck" appeared in search. Confirm whether real social profiles exist and should be linked.
19. **Company / VAT registration number** — none displayed. Confirm whether legal registration details must appear in the footer (UK e-commerce requirement).
20. **Per-product descriptions** — the words on each product card ("Express delivery", "Full colour", "Made for delivery", "Speedy lead times") are the site's four global benefit badges mis-mapped one-per-card, **not** genuine product descriptions. Real product copy was never retrieved — source it from the product pages.
21. **4oz template filename typo** — source URL is `4ox_single_wall.pdf` ("ox"). Confirm/correct before relinking.