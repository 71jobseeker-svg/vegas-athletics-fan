import { NextResponse } from "next/server";
import { fetchAthleticsOdds } from "@/lib/odds";

export const revalidate = 300;

export async function GET() {
  try {
    const data = await fetchAthleticsOdds();
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[api/odds] Failed:", message);
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
