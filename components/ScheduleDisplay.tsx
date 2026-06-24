import Link from "next/link";
import LastUpdated from "@/components/ui/LastUpdated";
import type { ScheduleData, ScheduleGame } from "@/lib/schedule";

function StatusPill({ status }: { status: ScheduleGame["status"] }) {
  const styles: Record<ScheduleGame["status"], string> = {
    Scheduled: "bg-blue-500/20 text-blue-300",
    Live: "bg-red-500/20 text-red-300 animate-pulse",
    Final: "bg-zinc-500/20 text-zinc-300",
    Postponed: "bg-yellow-500/20 text-yellow-300",
    Other: "bg-white/10 text-zinc-400",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status]}`}
    >
      {status === "Live" ? "● Live" : status}
    </span>
  );
}

function ScheduleRow({ game }: { game: ScheduleGame }) {
  return (
  <tr className="bg-athletics-dark transition-colors hover:bg-athletics-green/5">
    <td className="px-4 py-3 text-white">{game.dateLabel}</td>
    <td className="px-4 py-3">
      <Link
        href={game.gameUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-white hover:text-athletics-gold"
      >
        {game.isHome ? "vs" : "@"} {game.opponent}
      </Link>
    </td>
    <td className="px-4 py-3 text-zinc-400">{game.homeAway}</td>
    <td className="px-4 py-3 text-zinc-400">{game.timeLabel}</td>
    <td className="px-4 py-3 text-zinc-300">
      {game.scoreLabel ?? "—"}
    </td>
    <td className="px-4 py-3">
      <StatusPill status={game.status} />
    </td>
  </tr>
  );
}

function ScheduleCard({ game }: { game: ScheduleGame }) {
  return (
    <div className="rounded-xl border border-white/10 bg-athletics-dark p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-athletics-gold">{game.dateLabel}</p>
          <Link
            href={game.gameUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block font-medium text-white hover:text-athletics-gold"
          >
            {game.isHome ? "vs" : "@"} {game.opponent}
          </Link>
        </div>
        <StatusPill status={game.status} />
      </div>
      <div className="mt-3 flex flex-wrap gap-2 text-xs text-zinc-400">
        <span>{game.homeAway}</span>
        <span>·</span>
        <span>{game.timeLabel}</span>
        {game.scoreLabel && (
          <>
            <span>·</span>
            <span className="text-white">{game.scoreLabel}</span>
          </>
        )}
      </div>
    </div>
  );
}

export default function ScheduleDisplay({
  data,
  games,
  title = "Upcoming Games",
}: {
  data: ScheduleData;
  games?: ScheduleGame[];
  title?: string;
}) {
  const displayGames = games ?? data.upcoming;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <span className="text-sm text-zinc-500">
          {displayGames.length} games
        </span>
      </div>

      {displayGames.length === 0 ? (
        <p className="rounded-xl border border-white/10 bg-athletics-dark p-8 text-center text-zinc-400">
          No upcoming games found.
        </p>
      ) : (
        <>
          <div className="hidden overflow-x-auto rounded-xl border border-white/10 md:block">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-athletics-green text-xs uppercase tracking-wider text-white">
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Opponent</th>
                  <th className="px-4 py-3 font-semibold">H/A</th>
                  <th className="px-4 py-3 font-semibold">Time</th>
                  <th className="px-4 py-3 font-semibold">Score</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {displayGames.map((game) => (
                  <ScheduleRow key={game.gamePk} game={game} />
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 md:hidden">
            {displayGames.map((game) => (
              <ScheduleCard key={game.gamePk} game={game} />
            ))}
          </div>
        </>
      )}

      <div className="mt-4">
        <LastUpdated timestamp={data.fetchedAt} />
      </div>
    </div>
  );
}
