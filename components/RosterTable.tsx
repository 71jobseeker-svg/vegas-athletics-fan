import type { RosterPlayer } from "@/lib/roster";

function PlayerTable({ players, title }: { players: RosterPlayer[]; title: string }) {
  if (players.length === 0) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-white/10">
      <div className="bg-athletics-green px-6 py-4">
        <h2 className="text-lg font-semibold text-white">
          {title}{" "}
          <span className="text-sm font-normal text-athletics-gold/80">
            ({players.length})
          </span>
        </h2>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-athletics-dark/80 text-xs uppercase tracking-wider text-zinc-400">
              <th className="px-4 py-3 font-semibold">#</th>
              <th className="px-4 py-3 font-semibold">Player</th>
              <th className="px-4 py-3 font-semibold">Pos</th>
              <th className="px-4 py-3 font-semibold">Bats</th>
              <th className="px-4 py-3 font-semibold">Throws</th>
              <th className="px-4 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {players.map((player) => (
              <tr
                key={player.id}
                className="bg-athletics-dark transition-colors hover:bg-athletics-green/5"
              >
                <td className="px-4 py-3 font-bold text-athletics-gold">
                  {player.number}
                </td>
                <td className="px-4 py-3 font-medium text-white">{player.name}</td>
                <td className="px-4 py-3 text-zinc-400">{player.position}</td>
                <td className="px-4 py-3 text-zinc-400">{player.bats}</td>
                <td className="px-4 py-3 text-zinc-400">{player.throws}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-athletics-green/20 px-2.5 py-0.5 text-xs font-medium text-athletics-gold">
                    {player.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="divide-y divide-white/10 md:hidden">
        {players.map((player) => (
          <div
            key={player.id}
            className="flex items-start gap-4 bg-athletics-dark px-4 py-4"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-athletics-green/20 text-base font-bold text-athletics-gold">
              {player.number}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-white">{player.name}</p>
              <p className="mt-0.5 text-sm text-zinc-400">{player.position}</p>
              <div className="mt-2 flex flex-wrap gap-2 text-xs">
                <span className="rounded bg-white/5 px-2 py-0.5 text-zinc-400">
                  Bats: {player.bats}
                </span>
                <span className="rounded bg-white/5 px-2 py-0.5 text-zinc-400">
                  Throws: {player.throws}
                </span>
                <span className="rounded-full bg-athletics-green/20 px-2 py-0.5 text-athletics-gold">
                  {player.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

type RosterTablesProps = {
  pitchers: RosterPlayer[];
  positionPlayers: RosterPlayer[];
};

export default function RosterTables({
  pitchers,
  positionPlayers,
}: RosterTablesProps) {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <PlayerTable players={pitchers} title="Pitchers" />
      <PlayerTable players={positionPlayers} title="Position Players" />
    </div>
  );
}
