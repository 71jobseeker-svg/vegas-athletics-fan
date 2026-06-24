import { NextResponse } from "next/server";
import {
  fetchAthleticsRoster,
  ROSTER_REVALIDATE_SECONDS,
} from "@/lib/roster";

export const revalidate = 86_400;

export async function GET() {
  try {
    const roster = await fetchAthleticsRoster();

    return NextResponse.json(roster, {
      headers: {
        "Cache-Control": `public, s-maxage=${ROSTER_REVALIDATE_SECONDS}, stale-while-revalidate=3600`,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown roster fetch error";

    console.error("[api/roster] Roster fetch failed:", message);

    return NextResponse.json(
      { error: "Failed to fetch Athletics roster", details: message },
      { status: 502 },
    );
  }
}
