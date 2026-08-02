"use client";

import { useState } from "react";
import { Mail, Phone, MessageCircle, MapPin, Check } from "lucide-react";
import { CONTACT } from "@/lib/faq";

const HELP_OPTIONS = [
  "I'd like to enquire about your products",
  "I'd like to check the status of my order",
  "I need help with my artwork",
  "I need help with billing or payment",
  "Something else",
];

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export default function ContactPage() {
  const [form, setForm] = useState({
    first: "",
    last: "",
    email: "",
    company: "",
    phone: "",
    help: "",
    details: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (
      !form.first ||
      !form.last ||
      !form.email ||
      !form.help ||
      !form.details
    ) {
      setError("Please complete the required fields.");
      return;
    }
    if (!EMAIL.test(form.email)) {
      setError("That email doesn't look right.");
      return;
    }
    // TODO: wire to a real inbox / CRM (mocked on localhost).
    setSent(true);
  }

  const set =
    (k: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setForm((s) => ({ ...s, [k]: e.target.value }));

  return (
    <main className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-14 px-6 py-16 md:px-12 lg:grid-cols-[1.2fr_0.8fr]">
      {/* form */}
      <div>
        <p className="eyebrow">Contact</p>
        <h1 className="display text-huge text-ink mt-4 font-extrabold">
          Get in touch with the team.
        </h1>
        <p className="text-ink-soft mt-5 max-w-xl text-lg">
          Whether you&apos;ve got questions or would like a sounding board for
          an idea, we&apos;re here to help. Fill in the form, call us, or drop
          us an email — we&apos;ll get straight on the case for you.
        </p>

        {sent ? (
          <div className="border-green bg-green/10 mt-10 flex items-center gap-4 rounded-3xl border p-6">
            <span className="bg-green grid h-12 w-12 place-items-center rounded-full">
              <Check size={22} className="text-ink" strokeWidth={3} />
            </span>
            <p className="text-ink font-semibold">
              Thanks — we&apos;ve got your message and will be in touch shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-10 space-y-4" noValidate>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                label="First name"
                required
                value={form.first}
                onChange={set("first")}
              />
              <Input
                label="Last name"
                required
                value={form.last}
                onChange={set("last")}
              />
              <Input
                label="Email"
                required
                type="email"
                value={form.email}
                onChange={set("email")}
              />
              <Input
                label="Company name"
                value={form.company}
                onChange={set("company")}
              />
              <Input
                label="Phone number"
                value={form.phone}
                onChange={set("phone")}
              />
              <label className="block">
                <span className="text-ink mb-1.5 block text-sm font-semibold">
                  How can we help you <span className="text-green-deep">*</span>
                </span>
                <select
                  value={form.help}
                  onChange={set("help")}
                  className="border-ink/15 bg-paper text-ink focus:border-green w-full rounded-xl border px-4 py-3 focus:outline-none"
                >
                  <option value="">Select an option</option>
                  {HELP_OPTIONS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <label className="block">
              <span className="text-ink mb-1.5 block text-sm font-semibold">
                Tell us more <span className="text-green-deep">*</span>
              </span>
              <textarea
                value={form.details}
                onChange={set("details")}
                rows={5}
                className="border-ink/15 bg-paper text-ink focus:border-green w-full rounded-xl border px-4 py-3 focus:outline-none"
              />
            </label>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              className="bg-green text-ink rounded-full px-8 py-4 text-base font-bold transition-transform duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Send message
            </button>
          </form>
        )}
      </div>

      {/* details */}
      <aside className="border-ink/12 bg-paper-2 h-fit space-y-4 rounded-3xl border p-7 lg:sticky lg:top-28">
        <h2 className="display text-ink text-xl font-extrabold">
          Reach us directly
        </h2>
        <ContactRow
          icon={Mail}
          label="Email"
          value={CONTACT.email}
          href={`mailto:${CONTACT.email}`}
        />
        <ContactRow
          icon={Phone}
          label="Call us"
          value={CONTACT.phone}
          href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
        />
        <ContactRow
          icon={MessageCircle}
          label="WhatsApp"
          value={CONTACT.whatsapp}
        />
        <ContactRow icon={MapPin} label="Find us" value={CONTACT.address} />
        <p className="text-ink-soft/70 pt-2 text-xs">
          TODO-CONFIRM: opening hours are not published on the live site.
        </p>
      </aside>
    </main>
  );
}

function Input({
  label,
  required,
  ...props
}: {
  label: string;
  required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-ink mb-1.5 block text-sm font-semibold">
        {label} {required && <span className="text-green-deep">*</span>}
      </span>
      <input
        {...props}
        className="border-ink/15 bg-paper text-ink focus:border-green w-full rounded-xl border px-4 py-3 focus:outline-none"
      />
    </label>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-start gap-3">
      <span className="bg-green/15 text-green-deep mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full">
        <Icon size={16} />
      </span>
      <div>
        <p className="text-ink-soft text-xs font-semibold tracking-wide uppercase">
          {label}
        </p>
        <p className="text-ink font-semibold">{value}</p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block transition-opacity hover:opacity-70">
      {inner}
    </a>
  ) : (
    inner
  );
}
