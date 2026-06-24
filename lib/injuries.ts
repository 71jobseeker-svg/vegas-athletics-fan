import { ATHLETICS_TEAM_ID, CACHE } from "./constants";

type RosterEntry = {
  person: { id: number; fullName: string };
  position: { abbreviation: string };
  status: { code: string; description: string };
};

type RosterResponse = {
  roster: RosterEntry[];
};

export type InjuryReportEntry = {
  id: number;
  name: string;
  position: string;
  status: string;
};

export type InjuryReportData = {
  injuries: InjuryReportEntry[];
  fetchedAt: string;
};

const INJURY_PATTERN = /injur|day-to-day/i;

export async function fetchAthleticsInjuries(): Promise<InjuryReportData> {
  const fetchedAt = new Date().toISOString();
  const url = `https://statsapi.mlb.com/api/v1/teams/${ATHLETICS_TEAM_ID}/roster?rosterType=40Man`;

  console.log("[injuries] Fetching Athletics 40-man roster for injury report");

  const response = await fetch(url, {
    next: { revalidate: CACHE.INJURIES },
  });

  if (!response.ok) {
    console.error(`[injuries] API failed: ${response.status}`);
    throw new Error(`Injury report API returned ${response.status}`);
  }

  const data: RosterResponse = await response.json();

  const injuries = (data.roster ?? [])
    .filter((entry) => INJURY_PATTERN.test(entry.status.description))
    .map((entry) => ({
      id: entry.person.id,
      name: entry.person.fullName,
      position: entry.position.abbreviation,
      status: entry.status.description,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  console.log(`[injuries] Found ${injuries.length} injured players`);

  return { injuries, fetchedAt };
}
