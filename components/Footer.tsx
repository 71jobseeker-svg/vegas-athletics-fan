import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-athletics-darker">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-athletics-green font-bold text-athletics-gold">
                LV
              </div>
              <div>
                <p className="font-bold text-white">Las Vegas Athletics</p>
                <p className="text-sm text-athletics-gold">Fan Central</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-zinc-400">
              Your home for Las Vegas Athletics news, schedules, roster updates,
              and fan community — built by fans, for fans.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-athletics-gold">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/today"
                  className="text-zinc-400 transition-colors hover:text-white"
                >
                  Today&apos;s Game Hub
                </Link>
              </li>
              <li>
                <Link
                  href="/odds"
                  className="text-zinc-400 transition-colors hover:text-white"
                >
                  Live Odds
                </Link>
              </li>
              <li>
                <Link
                  href="/schedule"
                  className="text-zinc-400 transition-colors hover:text-white"
                >
                  Schedule
                </Link>
              </li>
              <li>
                <Link
                  href="/roster"
                  className="text-zinc-400 transition-colors hover:text-white"
                >
                  Roster
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="text-zinc-400 transition-colors hover:text-white"
                >
                  News
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-zinc-400 transition-colors hover:text-white"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-athletics-gold">
              Stay Connected
            </h3>
            <p className="text-sm text-zinc-400">
              Follow the journey as the Athletics bring Major League Baseball to
              Las Vegas. More updates coming soon.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-8 text-center">
          <p className="text-sm font-medium text-zinc-300">
            Unofficial Fan Site — Not affiliated with MLB or the Oakland/Las Vegas
            Athletics
          </p>
          <p className="mt-2 text-xs text-zinc-500">
            &copy; {new Date().getFullYear()} vegasathleticsmlb.com. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
