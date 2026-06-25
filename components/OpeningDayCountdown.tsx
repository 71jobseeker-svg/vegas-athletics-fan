"use client";

import { useEffect, useState } from "react";

/** April 1, 2028 at midnight Pacific (PDT, UTC-7). */
const OPENING_DAY_MS = Date.parse("2028-04-01T07:00:00.000Z");

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
};

function getTimeLeft(): TimeLeft {
  const diff = OPENING_DAY_MS - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false,
  };
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function CountdownUnit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-20 w-20 items-center justify-center rounded-xl border border-athletics-gold/30 bg-athletics-dark shadow-lg shadow-athletics-green/10 sm:h-24 sm:w-24">
        <div className="absolute inset-x-0 top-0 h-1 rounded-t-xl bg-gradient-to-r from-athletics-green to-athletics-gold" />
        <span className="text-3xl font-bold tabular-nums text-athletics-gold sm:text-4xl">
          {value}
        </span>
      </div>
      <span className="mt-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 sm:text-sm">
        {label}
      </span>
    </div>
  );
}

export default function OpeningDayCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft());
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="h-48 animate-pulse rounded-2xl bg-athletics-dark" />
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-2xl border border-athletics-green/40 bg-gradient-to-br from-athletics-green/25 via-athletics-dark to-athletics-darker p-8 sm:p-12">
        <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-athletics-gold/10 blur-3xl" />
        <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-athletics-green/20 blur-3xl" />

        <div className="relative text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-athletics-gold">
            Countdown to History
          </p>
          <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Days Until Vegas A&apos;s Opening Day 2028
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-zinc-400">
            April 1, 2028 · Las Vegas, Nevada
          </p>

          {timeLeft.expired ? (
            <p className="mt-10 text-2xl font-bold text-athletics-gold">
              Opening Day is here! Go A&apos;s!
            </p>
          ) : (
            <div className="mt-10 flex justify-center gap-4 sm:gap-8">
              <CountdownUnit value={String(timeLeft.days)} label="Days" />
              <CountdownUnit value={pad(timeLeft.hours)} label="Hours" />
              <CountdownUnit value={pad(timeLeft.minutes)} label="Minutes" />
              <CountdownUnit value={pad(timeLeft.seconds)} label="Seconds" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
