import PageHeader from "@/components/PageHeader";
import OddsDisplay from "@/components/OddsDisplay";
import DataError from "@/components/ui/DataError";
import { createPageMetadata } from "@/lib/metadata";
import { fetchAthleticsOdds } from "@/lib/odds";

export const metadata = createPageMetadata({
  title: "Las Vegas Athletics Odds — Vegas A's Betting Lines",
  description:
    "Live Las Vegas Athletics betting odds for today's game. Vegas A's moneyline, run line, and over/under totals from top US sportsbooks, updated every 5 minutes.",
  path: "/odds",
});

export const revalidate = 300;

export default async function OddsPage() {
  let data;
  let error: string | null = null;

  try {
    data = await fetchAthleticsOdds();
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load odds";
    console.error("[odds/page] Error:", error);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader
        title="Live Odds"
        subtitle="Today's Athletics betting lines — moneyline, run line, and over/under from major sportsbooks."
      />

      {error ? (
        <DataError
          title="Unable to load odds"
          message={error}
        />
      ) : data ? (
        <OddsDisplay data={data} showAllGames />
      ) : null}
    </div>
  );
}
