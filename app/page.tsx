import Link from "next/link";
import EmailSignup from "@/components/EmailSignup";
import NewsCard from "@/components/NewsCard";
import OpeningDayCountdown from "@/components/OpeningDayCountdown";
import { articles } from "@/lib/articles";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Las Vegas Athletics Home — Vegas A's Fan Hub",
  description:
    "The home of Las Vegas Athletics fandom. Live Opening Day 2028 countdown, Vegas A's news, game hub, odds, schedule, and roster — your unofficial Las Vegas Athletics MLB destination.",
  path: "/",
});

const homepageNews = articles.slice(0, 3);

const quickLinks = [
  {
    title: "Today's Game Hub",
    description: "Opponent, pitchers, odds, form, standings, and injuries — all in one place.",
    href: "/today",
    icon: "🏟️",
  },
  {
    title: "Live Odds",
    description: "Moneyline, run line, and totals from top US sportsbooks.",
    href: "/odds",
    icon: "📊",
  },
  {
    title: "Schedule",
    description: "Upcoming games and key dates for the Las Vegas Athletics season.",
    href: "/schedule",
    icon: "📅",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-athletics-green/20 via-athletics-darker to-athletics-darker" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-athletics-green/30 via-transparent to-transparent" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-athletics-gold/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-athletics-gold/30 bg-athletics-gold/10 px-4 py-1.5 text-sm font-medium text-athletics-gold">
              <span className="h-2 w-2 animate-pulse rounded-full bg-athletics-gold" />
              Vegas Athletics MLB — Fan Central
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-athletics-green to-athletics-gold bg-clip-text text-transparent">
                Las Vegas Athletics
              </span>{" "}
              Fan Central
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-zinc-300 sm:text-xl">
              Your unofficial home for everything Las Vegas Athletics — schedules,
              rosters, news, and a growing community of passionate Vegas A&apos;s
              fans.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/today"
                className="w-full rounded-xl bg-athletics-green px-8 py-3.5 font-semibold text-white shadow-lg shadow-athletics-green/25 transition-all hover:bg-athletics-green/90 hover:shadow-athletics-green/40 sm:w-auto"
              >
                Today&apos;s Game Hub
              </Link>
              <Link
                href="/odds"
                className="w-full rounded-xl border border-white/20 px-8 py-3.5 font-semibold text-white transition-all hover:border-athletics-gold hover:text-athletics-gold sm:w-auto"
              >
                Live Odds
              </Link>
            </div>
          </div>
        </div>
      </section>

      <OpeningDayCountdown />

      {/* Quick Links */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-3">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group rounded-xl border border-white/10 bg-athletics-dark p-6 transition-all hover:border-athletics-green/40 hover:shadow-lg hover:shadow-athletics-green/10"
            >
              <span className="text-3xl">{link.icon}</span>
              <h2 className="mt-4 text-xl font-semibold text-white group-hover:text-athletics-gold">
                {link.title}
              </h2>
              <p className="mt-2 text-sm text-zinc-400">{link.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Email Signup */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <EmailSignup />
      </section>

      {/* News & Updates */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              News &amp; Updates
            </h2>
            <p className="mt-2 text-zinc-400">
              The latest from the Las Vegas Athletics world
            </p>
          </div>
          <Link
            href="/news"
            className="hidden text-sm font-medium text-athletics-gold transition-colors hover:text-white sm:block"
          >
            View all news &rarr;
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {homepageNews.map((article) => (
            <NewsCard key={article.slug} {...article} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/news"
            className="text-sm font-medium text-athletics-gold transition-colors hover:text-white"
          >
            View all news &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
