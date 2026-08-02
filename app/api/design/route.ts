import { NextResponse } from "next/server";
import { z } from "zod";
import { promises as fs } from "fs";
import path from "path";

/**
 * Receives a locked cup design and delivers it to Era Pack so it can go to the
 * factory. Sends an email (design spec + a print-ready PNG of the cup) when an
 * email provider is configured; otherwise saves the submission to disk in dev.
 *
 * ── To send real email ────────────────────────────────────────────────────
 * Add to .env.local:
 *   RESEND_API_KEY=re_...            (from https://resend.com — free tier works)
 *   ERAPACK_ORDERS_EMAIL=you@you.com (where designs should land)
 *   ERAPACK_FROM_EMAIL="Era Pack <onboarding@resend.dev>"  (a verified sender)
 * Without a key, submissions are written to ./design-submissions/ and logged.
 */
const schema = z.object({
  spec: z.record(z.string(), z.unknown()),
  summary: z.string().max(4000).optional(),
  snapshot: z.string().optional(), // data:image/png;base64,...
  contactEmail: z.string().email().optional(),
});

function designId() {
  const s = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 6; i++) out += s[Math.floor(Math.random() * s.length)];
  return `EP-D-${out}`;
}

function emailHtml(
  id: string,
  summary: string | undefined,
  contactEmail: string | undefined,
  spec: Record<string, unknown>,
) {
  const rows = Object.entries(spec)
    .filter(([k]) => k !== "logoDataUrl")
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#57605a">${k}</td><td style="padding:4px 0;font-weight:600">${
          typeof v === "object" ? JSON.stringify(v) : String(v)
        }</td></tr>`,
    )
    .join("");
  return `<div style="font-family:Assistant,Arial,sans-serif;color:#0f1211">
    <h2 style="margin:0 0 4px">New cup design ${id}</h2>
    <p style="color:#57605a;margin:0 0 16px">Ready to send to the factory. The print-ready cup render is attached.</p>
    ${summary ? `<p style="white-space:pre-wrap;margin:0 0 16px">${summary}</p>` : ""}
    ${contactEmail ? `<p style="margin:0 0 16px">Customer contact: <a href="mailto:${contactEmail}">${contactEmail}</a></p>` : ""}
    <table style="border-collapse:collapse;font-size:14px">${rows}</table>
  </div>`;
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid design payload.", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const id = designId();
  const { spec, summary, snapshot, contactEmail } = parsed.data;
  const to = process.env.ERAPACK_ORDERS_EMAIL || "orders@erapack.uk";
  const key = process.env.RESEND_API_KEY;
  const pngBase64 =
    snapshot && snapshot.startsWith("data:") ? snapshot.split(",")[1] : undefined;

  if (key) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.ERAPACK_FROM_EMAIL || "Era Pack <onboarding@resend.dev>",
          to: [to],
          ...(contactEmail ? { reply_to: contactEmail } : {}),
          subject: `New cup design ${id} — ready for the factory`,
          html: emailHtml(id, summary, contactEmail, spec),
          ...(pngBase64
            ? { attachments: [{ filename: `cup-${id}.png`, content: pngBase64 }] }
            : {}),
        }),
      });
      if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
      return NextResponse.json({ id, delivered: true, to });
    } catch (err) {
      console.error("[design] email failed, saving locally:", err);
    }
  }

  // Dev / no-key fallback: persist the submission so nothing is lost.
  try {
    const dir = path.join(process.cwd(), "design-submissions");
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(
      path.join(dir, `${id}.json`),
      JSON.stringify({ id, spec, summary, contactEmail, receivedAt: Date.now() }, null, 2),
    );
    if (pngBase64) {
      await fs.writeFile(path.join(dir, `${id}.png`), Buffer.from(pngBase64, "base64"));
    }
    console.log(`[design] saved submission ${id} to design-submissions/`);
    return NextResponse.json({ id, delivered: false, savedTo: `design-submissions/${id}.*` });
  } catch (err) {
    console.error("[design] save failed:", err);
    return NextResponse.json({ id, delivered: false, saved: false }, { status: 200 });
  }
}
