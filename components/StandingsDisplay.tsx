import LastUpdated from "@/components/ui/LastUpdated";
import type { StandingsData } from "@/lib/standings";

export default function StandingsDisplay({ data }: { data: StandingsData }) {
  return (
    <div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-white">{data.division}</h2>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-athletics-green text-xs uppercase tracking-wider text-white">
              <th className="px-4 py-3 font-semibold">Team</th>
              <th className="px-4 py-3 font-semibold">W</th>
              <th className="px-4 py-3 font-semibold">L</th>
              <th className="px-4 py-3 font-semibold">PCT</th>
              <th className="px-4 py-3 font-semibold">GB</th>
              <th className="px-4 py-3 font-semibold">Streak</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {data.teams.map((team) => (
              <tr
                key={team.teamId}
                className={`transition-colors ${
                  team.isAthletics
                    ? "bg-athletics-green/20 hover:bg-athletics-green/30"
                    : "bg-athletics-dark hover:bg-athletics-green/5"
                }`}
              >
                <td
                  className={`px-4 py-3 font-medium ${
                    team.isAthletics ? "text-athletics-gold" : "text-white"
                  }`}
                >
                  {team.team}
                  {team.isAthletics && (
                    <span className="ml-2 text-xs text-athletics-gold/70">
                      (A&apos;s)
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-zinc-300">{team.wins}</td>
                <td className="px-4 py-3 text-zinc-300">{team.losses}</td>
                <td className="px-4 py-3 text-zinc-300">{team.pct}</td>
                <td className="px-4 py-3 text-zinc-300">{team.gamesBack}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded px-2 py-0.5 text-xs font-medium ${
                      team.streak.startsWith("W")
                        ? "bg-green-500/20 text-green-300"
                        : "bg-red-500/20 text-red-300"
                    }`}
                  >
                    {team.streak}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <LastUpdated timestamp={data.fetchedAt} />
      </div>
    </div>
  );
}
