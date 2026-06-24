import PageHeader from "@/components/PageHeader";
import ScheduleDisplay from "@/components/ScheduleDisplay";
import StandingsDisplay from "@/components/StandingsDisplay";
import DataError from "@/components/ui/DataError";
import { createPageMetadata } from "@/lib/metadata";
import { fetchAthleticsSchedule } from "@/lib/schedule";
import { fetchAlWestStandings } from "@/lib/standings";

export const metadata = createPageMetadata({
  title: "Schedule",
  description:
    "Las Vegas Athletics game schedule and key dates. Stay up to date on Vegas A's MLB games, spring training, and important season milestones.",
  path: "/schedule",
});

export const revalidate = 900;

export default async function SchedulePage() {
  let schedule;
  let standings;
  let scheduleError: string | null = null;
  let standingsError: string | null = null;

  const [scheduleResult, standingsResult] = await Promise.allSettled([
    fetchAthleticsSchedule(),
    fetchAlWestStandings(),
  ]);

  if (scheduleResult.status === "fulfilled") {
    schedule = scheduleResult.value;
  } else {
    scheduleError =
      scheduleResult.reason instanceof Error
        ? scheduleResult.reason.message
        : "Failed to load schedule";
    console.error("[schedule/page] Error:", scheduleError);
  }

  if (standingsResult.status === "fulfilled") {
    standings = standingsResult.value;
  } else {
    standingsError =
      standingsResult.reason instanceof Error
        ? standingsResult.reason.message
        : "Failed to load standings";
    console.error("[schedule/page] Standings error:", standingsError);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader
        title="Schedule"
        subtitle="Live Athletics schedule from MLB Stats API — upcoming games, scores, and game status."
      />

      {scheduleError ? (
        <DataError title="Unable to load schedule" message={scheduleError} />
      ) : schedule ? (
        <ScheduleDisplay data={schedule} title="Next 10 Games" />
      ) : null}

      <div className="mt-12">
        {standingsError ? (
          <DataError
            title="Unable to load standings"
            message={standingsError}
          />
        ) : standings ? (
          <StandingsDisplay data={standings} />
        ) : null}
      </div>
    </div>
  );
}
