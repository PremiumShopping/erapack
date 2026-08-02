"use client";

import { useState } from "react";
import Link from "next/link";
import { LogOut, User } from "lucide-react";
import { useAuth } from "@/store/auth";
import { useHydrated } from "@/lib/useMediaQuery";

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export default function LoginPage() {
  const hydrated = useHydrated();
  const user = useAuth((s) => s.user);
  const signIn = useAuth((s) => s.signIn);
  const signOut = useAuth((s) => s.signOut);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!EMAIL.test(email)) return setError("Enter a valid email.");
    if (password.length < 6) return setError("Password must be 6+ characters.");
    signIn(email); // mock — no real auth
  }

  if (!hydrated) return <main className="min-h-[60vh]" />;

  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col justify-center px-6 py-16">
      {user ? (
        <div className="border-ink/12 bg-paper-2 rounded-3xl border p-8 text-center">
          <span className="bg-green mx-auto grid h-14 w-14 place-items-center rounded-full">
            <User size={26} className="text-ink" />
          </span>
          <h1 className="display text-ink mt-5 text-2xl font-extrabold">
            Signed in
          </h1>
          <p className="text-ink-soft mt-1">{user.email}</p>
          <div className="mt-6 space-y-2 text-sm">
            <Link
              href="/design"
              className="border-ink/12 text-ink hover:border-ink/40 block rounded-xl border py-3 font-semibold"
            >
              My designs
            </Link>
            <Link
              href="/shop"
              className="border-ink/12 text-ink hover:border-ink/40 block rounded-xl border py-3 font-semibold"
            >
              Reorder
            </Link>
          </div>
          <button
            onClick={signOut}
            className="text-ink-soft hover:text-ink mt-6 inline-flex items-center gap-2 text-sm font-semibold"
          >
            <LogOut size={15} /> Sign out
          </button>
        </div>
      ) : (
        <>
          <p className="eyebrow">Account</p>
          <h1 className="display text-ink mt-4 text-4xl font-extrabold">
            Sign in.
          </h1>
          <p className="text-ink-soft mt-2 text-sm">
            Demo login — no real account is created.
          </p>
          <form onSubmit={submit} className="mt-8 space-y-4" noValidate>
            <label className="block">
              <span className="text-ink mb-1.5 block text-sm font-semibold">
                Email
              </span>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-ink/15 bg-paper text-ink focus:border-green w-full rounded-xl border px-4 py-3 focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="text-ink mb-1.5 block text-sm font-semibold">
                Password
              </span>
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-ink/15 bg-paper text-ink focus:border-green w-full rounded-xl border px-4 py-3 focus:outline-none"
              />
            </label>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              className="bg-green text-ink w-full rounded-full px-6 py-4 text-base font-bold transition-transform duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Sign in
            </button>
          </form>
        </>
      )}
    </main>
  );
}
