import Link from "next/link";
import OddsDisplay from "@/components/OddsDisplay";
import ScheduleDisplay from "@/components/ScheduleDisplay";
import StandingsDisplay from "@/components/StandingsDisplay";
import LastUpdated from "@/components/ui/LastUpdated";
import type { GameHubData } from "@/lib/game-hub";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-white/10 bg-athletics-dark/50 p-6">
      <h2 className="mb-4 text-xl font-semibold text-white">{title}</h2>
      {children}
    </section>
  );
}

function FormBadge({ result }: { result: "W" | "L" }) {
  return (
    <span
      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
        result === "W"
          ? "bg-green-500/20 text-green-300"
          : "bg-red-500/20 text-red-300"
      }`}
    >
      {result}
    </span>
  );
}

export default function GameHubDisplay({ data }: { data: GameHubData }) {
  const { schedule, odds, standings, injuries, todaysGame } = data;

  const recentForm = schedule.recent.slice(0, 10).map((game) => {
    const aScore = game.athleticsScore ?? 0;
    const oScore = game.opponentScore ?? 0;
    return aScore > oScore ? ("W" as const) : ("L" as const);
  });

  const bestOdds = odds.todaysGame?.bookmakers[0];

  return (
    <div className="space-y-8">
      {/* Hero / Today's Game */}
      {todaysGame ? (
        <div className="relative overflow-hidden rounded-2xl border border-athletics-green/30 bg-gradient-to-br from-athletics-green/20 to-athletics-darker p-8">
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-athletics-gold/10 blur-3xl" />
          <div className="relative">
            <p className="text-sm font-medium text-athletics-gold">
              Today&apos;s Game
            </p>
            <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
              {todaysGame.isHome ? "vs" : "@"} {todaysGame.opponent}
            </h2>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-zinc-300">
              <span>First pitch: {todaysGame.timeLabel}</span>
              <span>·</span>
              <span>{todaysGame.homeAway}</span>
              {todaysGame.status === "Live" && (
                <>
                  <span>·</span>
                  <span className="font-medium text-red-400">
                    ● Live — {todaysGame.scoreLabel}
                  </span>
                </>
              )}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-white/10 bg-athletics-dark/80 p-4">
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  Athletics SP
                </p>
                <p className="mt-1 font-medium text-white">
                  {todaysGame.probablePitchers.athletics ?? "TBD"}
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-athletics-dark/80 p-4">
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  Opponent SP
                </p>
                <p className="mt-1 font-medium text-white">
                  {todaysGame.probablePitchers.opponent ?? "TBD"}
                </p>
              </div>
              {bestOdds && (
                <>
                  <div className="rounded-xl border border-white/10 bg-athletics-dark/80 p-4">
                    <p className="text-xs uppercase tracking-wider text-zinc-500">
                      Moneyline ({bestOdds.bookmaker})
                    </p>
                    <p className="mt-1 font-medium text-athletics-gold">
                      A&apos;s:{" "}
                      {todaysGame.isHome
                        ? bestOdds.homeMoneyline
                        : bestOdds.awayMoneyline}
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-athletics-dark/80 p-4">
                    <p className="text-xs uppercase tracking-wider text-zinc-500">
                      Total ({bestOdds.bookmaker})
                    </p>
                    <p className="mt-1 font-medium text-athletics-gold">
                      {bestOdds.over}
                    </p>
                  </div>
                </>
              )}
            </div>

            <Link
              href={todaysGame.gameUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block text-sm font-medium text-athletics-gold hover:text-white"
            >
              View on MLB.com Gameday &rarr;
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-athletics-dark px-6 py-16 text-center">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-athletics-green text-3xl font-bold text-athletics-gold">
            A&apos;s
          </div>
          <p className="text-xl font-medium text-white">
            No Athletics game scheduled today.
          </p>
          <p className="mt-2 text-sm text-zinc-400">
            Check the schedule below for the next matchup.
          </p>
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-2">
        <Section title="Live Odds">
          <OddsDisplay data={odds} />
        </Section>

        <Section title="Recent Form (Last 10)">
          {recentForm.length > 0 ? (
            <>
              <div className="flex flex-wrap gap-2">
                {recentForm.map((result, i) => (
                  <FormBadge key={i} result={result} />
                ))}
              </div>
              <div className="mt-4 space-y-2">
                {schedule.recent.slice(0, 10).map((game) => (
                  <div
                    key={game.gamePk}
                    className="flex items-center justify-between rounded-lg bg-athletics-dark px-3 py-2 text-sm"
                  >
                    <span className="text-zinc-400">{game.dateLabel}</span>
                    <span className="text-white">
                      {game.isHome ? "vs" : "@"} {game.opponent.split(" ").pop()}
                    </span>
                    <span className="font-medium text-zinc-300">
                      {game.scoreLabel}
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-zinc-400">No recent games available.</p>
          )}
          <div className="mt-4">
            <LastUpdated timestamp={schedule.fetchedAt} />
          </div>
        </Section>
      </div>

      <Section title="AL West Standings">
        <StandingsDisplay data={standings} />
      </Section>

      <Section title="Injury Report">
        {injuries.injuries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-zinc-400">
                  <th className="pb-3 font-semibold">Player</th>
                  <th className="pb-3 font-semibold">Pos</th>
                  <th className="pb-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {injuries.injuries.map((player) => (
                  <tr key={player.id}>
                    <td className="py-3 font-medium text-white">
                      {player.name}
                    </td>
                    <td className="py-3 text-zinc-400">{player.position}</td>
                    <td className="py-3">
                      <span className="rounded-full bg-red-500/20 px-2.5 py-0.5 text-xs font-medium text-red-300">
                        {player.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-zinc-400">No players currently on the injury list.</p>
        )}
        <div className="mt-4">
          <LastUpdated timestamp={injuries.fetchedAt} />
        </div>
      </Section>

      <Section title="Next 10 Games">
        <ScheduleDisplay data={schedule} />
      </Section>

      <div className="text-center">
        <LastUpdated
          timestamp={data.fetchedAt}
          label="Page last refreshed"
        />
      </div>
    </div>
  );
}
