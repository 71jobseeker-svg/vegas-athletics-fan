import PageHeader from "@/components/PageHeader";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Schedule",
  description:
    "Las Vegas Athletics game schedule and key dates. Stay up to date on Vegas A's MLB games, spring training, and important season milestones.",
  path: "/schedule",
});

const upcomingGames = [
  {
    date: "Apr 3, 2027",
    opponent: "vs. Los Angeles Dodgers",
    time: "7:10 PM PT",
    venue: "Las Vegas Ballpark",
    type: "Home Opener",
  },
  {
    date: "Apr 5, 2027",
    opponent: "vs. San Francisco Giants",
    time: "6:40 PM PT",
    venue: "Las Vegas Ballpark",
    type: "Regular Season",
  },
  {
    date: "Apr 8, 2027",
    opponent: "@ Arizona Diamondbacks",
    time: "6:40 PM PT",
    venue: "Chase Field",
    type: "Regular Season",
  },
  {
    date: "Apr 11, 2027",
    opponent: "@ San Diego Padres",
    time: "6:40 PM PT",
    venue: "Petco Park",
    type: "Regular Season",
  },
  {
    date: "Apr 14, 2027",
    opponent: "vs. New York Yankees",
    time: "7:10 PM PT",
    venue: "Las Vegas Ballpark",
    type: "Regular Season",
  },
  {
    date: "Apr 17, 2027",
    opponent: "vs. Boston Red Sox",
    time: "7:10 PM PT",
    venue: "Las Vegas Ballpark",
    type: "Regular Season",
  },
];

export default function SchedulePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader
        title="Schedule"
        subtitle="Upcoming Las Vegas Athletics games and key dates. Schedule is subject to change — check back for official announcements."
      />

      <div className="mb-8 rounded-xl border border-athletics-gold/20 bg-athletics-gold/5 p-4">
        <p className="text-sm text-athletics-gold">
          <strong>Note:</strong> This is a placeholder schedule for demonstration
          purposes. Official Las Vegas Athletics MLB schedules will be published
          closer to the team&apos;s debut season.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10">
        <div className="hidden grid-cols-12 gap-4 bg-athletics-green px-6 py-4 text-sm font-semibold uppercase tracking-wider text-white sm:grid">
          <div className="col-span-2">Date</div>
          <div className="col-span-4">Matchup</div>
          <div className="col-span-2">Time</div>
          <div className="col-span-3">Venue</div>
          <div className="col-span-1">Type</div>
        </div>

        <div className="divide-y divide-white/10">
          {upcomingGames.map((game) => (
            <div
              key={`${game.date}-${game.opponent}`}
              className="grid grid-cols-1 gap-2 bg-athletics-dark px-6 py-5 transition-colors hover:bg-athletics-green/5 sm:grid-cols-12 sm:items-center sm:gap-4"
            >
              <div className="col-span-2">
                <span className="text-sm font-medium text-athletics-gold sm:hidden">
                  Date:{" "}
                </span>
                <span className="text-white">{game.date}</span>
              </div>
              <div className="col-span-4 font-medium text-white">
                {game.opponent}
              </div>
              <div className="col-span-2 text-zinc-400">
                <span className="sm:hidden">Time: </span>
                {game.time}
              </div>
              <div className="col-span-3 text-zinc-400">
                <span className="sm:hidden">Venue: </span>
                {game.venue}
              </div>
              <div className="col-span-1">
                <span className="inline-block rounded-full bg-athletics-green/20 px-2.5 py-0.5 text-xs font-medium text-athletics-gold">
                  {game.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
