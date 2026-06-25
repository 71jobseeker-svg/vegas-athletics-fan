import PageHeader from "@/components/PageHeader";
import GameHubDisplay from "@/components/GameHubDisplay";
import DataError from "@/components/ui/DataError";
import { createPageMetadata } from "@/lib/metadata";
import { fetchGameHubData } from "@/lib/game-hub";

export const metadata = createPageMetadata({
  title: "Today's Las Vegas Athletics Game Hub",
  description:
    "Your daily Las Vegas Athletics game day hub. Vegas A's opponent, starting pitchers, live odds, recent form, AL West standings, and injury report — all in one place.",
  path: "/today",
});

export const revalidate = 300;

export default async function TodayPage() {
  let data;
  let error: string | null = null;

  try {
    data = await fetchGameHubData();
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load game hub";
    console.error("[today/page] Error:", error);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader
        title="Today's Game Hub"
        subtitle="Everything you need for today's Athletics game — odds, pitchers, form, standings, and injuries in one place."
      />

      {error ? (
        <DataError title="Unable to load game hub" message={error} />
      ) : data ? (
        <GameHubDisplay data={data} />
      ) : null}
    </div>
  );
}
