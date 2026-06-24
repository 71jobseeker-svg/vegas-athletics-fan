import PageHeader from "@/components/PageHeader";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "About Las Vegas Athletics Fan Central — an unofficial fan site dedicated to Vegas Athletics MLB fans. Learn about our mission and connect with the community.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader
        title="About"
        subtitle="Learn about Las Vegas Athletics Fan Central and our mission to unite Vegas A's fans."
      />

      <div className="grid gap-12 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-xl border border-white/10 bg-athletics-dark p-8">
            <h2 className="text-xl font-semibold text-white">Our Mission</h2>
            <p className="mt-4 leading-relaxed text-zinc-400">
              Las Vegas Athletics Fan Central was created by passionate baseball
              fans who believe the Athletics&apos; move to Las Vegas is one of the
              most exciting developments in modern MLB history. Our goal is to
              build a vibrant community hub where Vegas A&apos;s fans can find
              schedules, roster information, news, and connect with fellow
              supporters.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-athletics-dark p-8">
            <h2 className="text-xl font-semibold text-white">What We Cover</h2>
            <ul className="mt-4 space-y-3 text-zinc-400">
              <li className="flex items-start gap-3">
                <span className="mt-1 text-athletics-gold">&#9679;</span>
                Game schedules and key season dates
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-athletics-gold">&#9679;</span>
                Roster updates and player profiles
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-athletics-gold">&#9679;</span>
                News and analysis on the Las Vegas Athletics
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-athletics-gold">&#9679;</span>
                Fan community resources and updates
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-athletics-green/30 bg-gradient-to-br from-athletics-green/10 to-athletics-dark p-8">
            <h2 className="text-xl font-semibold text-white">
              Why Las Vegas?
            </h2>
            <p className="mt-4 leading-relaxed text-zinc-400">
              Las Vegas is one of the fastest-growing sports markets in America.
              With world-class entertainment, a passionate fan base, and a
              proven track record of supporting professional teams, the city is
              the perfect home for Major League Baseball. The Las Vegas Athletics
              represent a new era for the franchise and an incredible opportunity
              for fans across Nevada and the Southwest.
            </p>
          </div>

          <div className="rounded-xl border border-athletics-gold/30 bg-athletics-gold/5 p-8">
            <h2 className="text-xl font-semibold text-athletics-gold">
              Important Disclaimer
            </h2>
            <p className="mt-4 leading-relaxed text-zinc-300">
              This is an unofficial fan site and is not affiliated with, endorsed
              by, or connected to Major League Baseball, the Oakland Athletics,
              the Las Vegas Athletics organization, or any of their partners.
              All team names, logos, and trademarks are property of their
              respective owners.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-athletics-dark p-8">
            <h2 className="text-xl font-semibold text-white">Contact</h2>
            <p className="mt-4 leading-relaxed text-zinc-400">
              Have feedback, suggestions, or want to contribute? We&apos;d love to
              hear from fellow Las Vegas Athletics fans. Reach out at{" "}
              <span className="text-athletics-gold">fans@vegasathleticsmlb.com</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
