import PageHeader from "@/components/PageHeader";
import RosterTables from "@/components/RosterTable";
import { createPageMetadata } from "@/lib/metadata";
import { fetchAthleticsRoster } from "@/lib/roster";

export const metadata = createPageMetadata({
  title: "Las Vegas Athletics Roster — Vegas A's Players",
  description:
    "Current Las Vegas Athletics roster with live data from MLB Stats API. View Vegas A's pitchers, position players, jersey numbers, stats, and injury status updated daily.",
  path: "/roster",
});

/** Refresh roster data once per day. */
export const revalidate = 86_400;

function formatFetchedAt(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/Los_Angeles",
  });
}

export default async function RosterPage() {
  let roster;
  let error: string | null = null;

  try {
    roster = await fetchAthleticsRoster();
  } catch (err) {
    error =
      err instanceof Error ? err.message : "Unable to load roster data";
    console.error("[roster/page] Render failed:", error);
  }

  const totalPlayers = roster
    ? roster.pitchers.length + roster.positionPlayers.length
    : 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader
        title="Roster"
        subtitle="Current Athletics active roster, pulled live from MLB Stats API and refreshed daily."
      />

      {error ? (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-center">
          <p className="font-medium text-red-300">Unable to load roster</p>
          <p className="mt-2 text-sm text-red-400/80">{error}</p>
          <p className="mt-4 text-xs text-zinc-500">
            Check server logs for details. The roster will retry on the next page
            load.
          </p>
        </div>
      ) : roster ? (
        <>
          <div className="mb-8 flex flex-col gap-3 rounded-xl border border-athletics-green/30 bg-athletics-green/10 p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-zinc-300">
              <strong className="text-athletics-gold">{totalPlayers} players</strong>{" "}
              on the active {roster.teamName} roster
            </p>
            <p className="text-xs text-zinc-500">
              Last updated: {formatFetchedAt(roster.fetchedAt)} PT · Refreshes
              daily
            </p>
          </div>

          <RosterTables
            pitchers={roster.pitchers}
            positionPlayers={roster.positionPlayers}
          />
        </>
      ) : null}
    </div>
  );
}
