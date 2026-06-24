import { NextResponse } from "next/server";
import { fetchAlWestStandings } from "@/lib/standings";

export const revalidate = 86_400;

export async function GET() {
  try {
    const data = await fetchAlWestStandings();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[api/standings] Failed:", message);
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
