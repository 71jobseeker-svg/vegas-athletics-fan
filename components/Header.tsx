"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/today", label: "Today" },
  { href: "/odds", label: "Odds" },
  { href: "/schedule", label: "Schedule" },
  { href: "/roster", label: "Roster" },
  { href: "/news", label: "News" },
  { href: "/about", label: "About" },
  { href: "/giveaway", label: "Giveaway" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-athletics-dark/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-athletics-green font-bold text-athletics-gold shadow-lg shadow-athletics-green/20 transition-transform group-hover:scale-105">
            LV
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold tracking-wide text-white">
              Las Vegas Athletics
            </p>
            <p className="text-xs text-athletics-gold">Fan Central</p>
          </div>
        </Link>

        <nav className="-mr-2 flex items-center gap-1 overflow-x-auto sm:gap-2">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`shrink-0 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-athletics-green text-white"
                    : "text-zinc-300 hover:bg-white/5 hover:text-athletics-gold"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
