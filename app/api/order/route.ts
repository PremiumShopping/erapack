import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * MOCK order endpoint for localhost. Validates the payload and returns a
 * confirmation id. No payment is taken.
 *
 * ── SEAM: real payment goes here ──────────────────────────────────────────
 * To go live, create a Stripe PaymentIntent (test mode) with STRIPE_SECRET_KEY
 * from .env.local, return its client_secret, and confirm on the client with
 * Stripe.js. Persist the order server-side instead of localStorage. See README.
 */
const schema = z.object({
  items: z.array(z.unknown()).min(1),
  customer: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    address: z.string().min(1),
    city: z.string().min(1),
    postcode: z.string().min(1),
  }),
  subtotal: z.number(),
  shipping: z.number(),
  total: z.number(),
});

function orderId() {
  const s = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 6; i++) {
    out += s[Math.floor(Math.random() * s.length)];
  }
  return `EP-${out}`;
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid order details.", issues: parsed.error.issues },
      { status: 400 },
    );
  }
  // Simulate a little processing latency.
  await new Promise((r) => setTimeout(r, 600));
  return NextResponse.json({
    orderId: orderId(),
    status: "confirmed",
    receivedAt: Date.now(),
  });
}
