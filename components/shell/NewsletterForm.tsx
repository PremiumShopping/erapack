"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/**
 * Newsletter capture. Mocked for localhost — validates client-side and shows a
 * success state. Seam marked below for a real ESP endpoint.
 */
export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!EMAIL.test(email)) {
      setError("That email doesn't look right.");
      return;
    }
    setError(null);
    setDone(true);
    // TODO: POST to newsletter provider (mocked on localhost).
  }

  if (done) {
    return (
      <p className="text-paper flex items-center gap-2 text-lg">
        <span className="bg-clay grid h-6 w-6 place-items-center rounded-full">
          <Check size={14} className="text-paper" />
        </span>
        You&apos;re on the list — welcome to the good cups.
      </p>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="max-w-md">
      <div className="border-paper/30 focus-within:border-clay flex items-center gap-2 border-b pb-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@brand.co.uk"
          aria-label="Email address"
          aria-invalid={Boolean(error)}
          className="text-paper placeholder:text-paper/40 w-full bg-transparent py-2 text-lg focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className="bg-green text-ink hover:bg-green-soft grid h-10 w-10 shrink-0 place-items-center rounded-full transition-transform duration-200 ease-out active:scale-[0.95]"
        >
          <ArrowRight size={18} />
        </button>
      </div>
      {error ? (
        <p className="text-clay-glow mt-2 text-sm">{error}</p>
      ) : (
        <p className="text-paper/50 mt-2 text-sm">
          Occasional notes on new sizes, lead times and design ideas. No spam.
        </p>
      )}
    </form>
  );
}
