import { NextResponse } from "next/server";
import { fetchAthleticsSchedule } from "@/lib/schedule";

export const revalidate = 900;

export async function GET() {
  try {
    const data = await fetchAthleticsSchedule();
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=900, stale-while-revalidate=300" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[api/schedule] Failed:", message);
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
