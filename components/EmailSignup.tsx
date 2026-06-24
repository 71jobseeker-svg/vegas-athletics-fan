"use client";

import { FormEvent, useState } from "react";

export default function EmailSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  }

  return (
    <section className="relative overflow-hidden rounded-2xl border border-athletics-green/30 bg-gradient-to-br from-athletics-green/20 to-athletics-darker p-8 sm:p-12">
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-athletics-gold/10 blur-2xl" />
      <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-athletics-green/20 blur-2xl" />

      <div className="relative mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          Never Miss a Beat
        </h2>
        <p className="mt-3 text-zinc-300">
          Sign up for updates on the Las Vegas Athletics — game schedules, roster
          moves, and the latest fan news delivered to your inbox.
        </p>

        {submitted ? (
          <div className="mt-8 rounded-xl border border-athletics-gold/30 bg-athletics-gold/10 px-6 py-4">
            <p className="font-medium text-athletics-gold">
              Thanks for signing up! We&apos;ll keep you in the loop.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="w-full rounded-xl border border-white/10 bg-athletics-dark px-5 py-3.5 text-white placeholder:text-zinc-500 focus:border-athletics-gold focus:outline-none focus:ring-2 focus:ring-athletics-gold/30 sm:max-w-sm"
            />
            <button
              type="submit"
              className="rounded-xl bg-athletics-gold px-8 py-3.5 font-semibold text-athletics-dark transition-all hover:bg-athletics-gold/90 hover:shadow-lg hover:shadow-athletics-gold/20"
            >
              Subscribe
            </button>
          </form>
        )}

        <p className="mt-4 text-xs text-zinc-500">
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
