import PageHeader from "@/components/PageHeader";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Roster",
  description:
    "Las Vegas Athletics roster — meet the players of the Vegas A's MLB team. View pitchers, position players, and coaching staff.",
  path: "/roster",
});

type Player = {
  number: number;
  name: string;
  position: string;
  bats: string;
  throws: string;
};

const pitchers: Player[] = [
  { number: 55, name: "Mason Miller", position: "P", bats: "R", throws: "R" },
  { number: 26, name: "JP Sears", position: "P", bats: "L", throws: "L" },
  { number: 33, name: "Luis Severino", position: "P", bats: "R", throws: "R" },
  { number: 47, name: "Jacob Lopez", position: "P", bats: "L", throws: "L" },
  { number: 61, name: "Ross Stripling", position: "P", bats: "R", throws: "R" },
];

const positionPlayers: Player[] = [
  { number: 13, name: "Brent Rooker", position: "DH/OF", bats: "R", throws: "R" },
  { number: 4, name: "Shea Langeliers", position: "C", bats: "R", throws: "R" },
  { number: 2, name: "Zack Gelof", position: "2B", bats: "R", throws: "R" },
  { number: 10, name: "Lawrence Butler", position: "OF", bats: "L", throws: "R" },
  { number: 22, name: "JJ Bleday", position: "OF", bats: "L", throws: "L" },
  { number: 8, name: "Nick Kurtz", position: "1B", bats: "L", throws: "R" },
  { number: 21, name: "Gio Urshela", position: "3B", bats: "R", throws: "R" },
  { number: 7, name: "Jacob Wilson", position: "SS", bats: "R", throws: "R" },
];

function PlayerTable({ players, title }: { players: Player[]; title: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10">
      <div className="bg-athletics-green px-6 py-4">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
      </div>
      <div className="divide-y divide-white/10">
        {players.map((player) => (
          <div
            key={player.number}
            className="flex items-center gap-4 bg-athletics-dark px-6 py-4 transition-colors hover:bg-athletics-green/5"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-athletics-green/20 text-lg font-bold text-athletics-gold">
              {player.number}
            </div>
            <div className="flex-1">
              <p className="font-medium text-white">{player.name}</p>
              <p className="text-sm text-zinc-400">{player.position}</p>
            </div>
            <div className="hidden text-sm text-zinc-500 sm:block">
              B/T: {player.bats}/{player.throws}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function RosterPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader
        title="Roster"
        subtitle="Meet the Las Vegas Athletics players. Roster reflects the current Athletics organization as the team prepares for its Las Vegas debut."
      />

      <div className="mb-8 rounded-xl border border-athletics-gold/20 bg-athletics-gold/5 p-4">
        <p className="text-sm text-athletics-gold">
          <strong>Note:</strong> Roster listings are for illustrative purposes and
          will be updated as official Las Vegas Athletics MLB rosters are
          announced.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <PlayerTable players={pitchers} title="Pitchers" />
        <PlayerTable players={positionPlayers} title="Position Players" />
      </div>
    </div>
  );
}
