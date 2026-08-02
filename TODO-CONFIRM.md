# TODO — confirm before launch

Everything below is a placeholder, an assumption, or a divergence found on the
live erapack.uk that needs a human decision. Grouped by area.

## Pricing & catalogue

1. **Price basis is unknown.** 4oz £85.79 · 6oz £142.55 · 8oz £82.00 · 12oz
   £69.99 were captured from the live site, but whether these are **per case /
   per 1000 / per unit** is not stated anywhere, and the ordering (6oz dearest,
   12oz cheapest) implies they are *not* on the same basis. Confirm units +
   quantity breaks. (`lib/products.ts`)
2. **Size range mismatch.** The shop lists 4/6/8/12oz; the FAQ's templates
   answer lists **4/8/12/16oz** (no 6oz, adds 16oz). Reconcile the real range.
3. **Capacities** (120/175/240/340 ml) are reasonable defaults, not sourced.
4. **Shipping numbers** beyond "free over £100" (confirmed) are invented:
   flat £5.99 under threshold, express £9.99. Confirm real rates.

## Content divergences on the live site

5. **Sustainability wording differs:** homepage says "renewable energy"; the
   About page says "50% renewable energy **by 2030**". Using the About version;
   confirm the correct public claim. (`app/about/page.tsx`)
6. **Two contact phone numbers:** contact page `020 3051 3982` vs privacy policy
   `+44 7367 629026`; WhatsApp `07477 348200`. Using the contact-page number.
7. **Opening hours** are not published anywhere — omitted.
8. **MOQ wording:** homepage says "no MOQ", About says "low MOQ". Using "no
   minimum order" throughout.
9. **No named testimonials / star breakdown** exist on the live site — only
   "Trusted by 700+ customers" + a Google 5-star badge. No quotes were
   fabricated. Add real reviews if available.

## Commerce / backend (all mocked on localhost)

10. **Payment** — `app/api/order` is a mock; wire Stripe (test mode) via the
    marked seam and `.env.local` keys.
11. **Auth** — stub localStorage session; replace with a real provider.
12. **Newsletter + contact form** — client-side success only; connect to an
    ESP/CRM at their `TODO` markers.
13. **Orders / saved designs** — localStorage only; move to a real backend.

## Legal

14. **Privacy Policy, Shipping & Refunds, Terms of Sale** are branded
    placeholders — drop in the client's real legal copy.

## SEO / infra

15. **Real domain** — `app/sitemap.ts`, `app/robots.ts`, and `metadataBase` in
    `app/layout.tsx` all use `http://localhost:3000`. Swap for production.
16. **Open Graph image** — none set yet; add a branded OG image.

## Assets

17. **Hero espresso video + start frame use a terracotta band** (generated
    before the green re-skin). Regenerate with the green brand, or replace all
    AI hero media with real product photography.
18. **Google "G" mark** usage for the reviews badge — confirm it's permitted.
