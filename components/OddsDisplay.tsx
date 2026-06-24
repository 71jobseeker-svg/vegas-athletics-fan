import LastUpdated from "@/components/ui/LastUpdated";
import type { AthleticsOddsData } from "@/lib/odds";
import { formatTime } from "@/lib/format";

function StatusBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-athletics-green/20 px-2.5 py-0.5 text-xs font-medium text-athletics-gold">
      {children}
    </span>
  );
}

function NoGameToday() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-athletics-dark px-6 py-16 text-center">
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-athletics-green text-3xl font-bold text-athletics-gold shadow-lg shadow-athletics-green/20">
        A&apos;s
      </div>
      <p className="text-lg font-medium text-white">
        No Athletics game scheduled today.
      </p>
      <p className="mt-2 max-w-sm text-sm text-zinc-400">
        Check back on game day for live moneyline, run line, and total odds from
        top sportsbooks.
      </p>
    </div>
  );
}

function OddsTable({ game }: { game: AthleticsOddsData["todaysGame"] }) {
  if (!game) return null;

  const athleticsLabel = game.isHome ? game.homeTeam : game.awayTeam;
  const opponentLabel = game.opponent;

  return (
    <div className="overflow-hidden rounded-xl border border-white/10">
      <div className="border-b border-white/10 bg-athletics-green px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-semibold text-white">
              {game.isHome ? "vs" : "@"} {game.opponent}
            </h3>
            <p className="text-sm text-athletics-gold">
              First pitch {formatTime(game.commenceTime)}
            </p>
          </div>
          <StatusBadge>{game.isHome ? "Home" : "Away"}</StatusBadge>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-athletics-dark/80 text-xs uppercase tracking-wider text-zinc-400">
              <th className="px-4 py-3 font-semibold">Sportsbook</th>
              <th className="px-4 py-3 font-semibold">Updated</th>
              <th className="px-4 py-3 font-semibold">Moneyline</th>
              <th className="px-4 py-3 font-semibold">Run Line</th>
              <th className="px-4 py-3 font-semibold">Total O/U</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {game.bookmakers.map((book) => (
              <tr
                key={book.bookmaker}
                className="bg-athletics-dark transition-colors hover:bg-athletics-green/5"
              >
                <td className="px-4 py-3 font-medium text-white">
                  {book.bookmaker}
                </td>
                <td className="px-4 py-3 text-xs text-zinc-500">
                  {formatTime(book.lastUpdate)}
                </td>
                <td className="px-4 py-3 text-zinc-300">
                  <div>{athleticsLabel.split(" ").pop()}: {game.isHome ? book.homeMoneyline : book.awayMoneyline}</div>
                  <div className="text-zinc-500">
                    {opponentLabel.split(" ").pop()}: {game.isHome ? book.awayMoneyline : book.homeMoneyline}
                  </div>
                </td>
                <td className="px-4 py-3 text-zinc-300">
                  <div>A&apos;s: {game.isHome ? book.homeSpread : book.awaySpread}</div>
                  <div className="text-zinc-500">
                    Opp: {game.isHome ? book.awaySpread : book.homeSpread}
                  </div>
                </td>
                <td className="px-4 py-3 text-zinc-300">
                  <div>{book.over}</div>
                  <div className="text-zinc-500">{book.under}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function OddsDisplay({
  data,
  showAllGames = false,
}: {
  data: AthleticsOddsData;
  showAllGames?: boolean;
}) {
  const displayGame = data.todaysGame;

  return (
    <div>
      {!displayGame && !showAllGames ? (
        <NoGameToday />
      ) : (
        <>
          {displayGame && <OddsTable game={displayGame} />}
          {showAllGames &&
            data.games
              .filter((g) => g.id !== displayGame?.id)
              .map((game) => (
                <div key={game.id} className="mt-6">
                  <OddsTable game={game} />
                </div>
              ))}
        </>
      )}
      <div className="mt-4">
        <LastUpdated timestamp={data.fetchedAt} />
      </div>
    </div>
  );
}
