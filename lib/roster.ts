import { ATHLETICS_TEAM_ID, CACHE } from "./constants";

/** Re-export for backward compatibility. */
export { ATHLETICS_TEAM_ID };
export const ROSTER_REVALIDATE_SECONDS = CACHE.ROSTER;

const ROSTER_API_URL = `https://statsapi.mlb.com/api/v1/teams/${ATHLETICS_TEAM_ID}/roster?rosterType=active&hydrate=person(batSide,pitchHand)`;

export type RosterPlayer = {
  id: number;
  name: string;
  number: string;
  position: string;
  bats: string;
  throws: string;
  status: string;
};

export type RosterData = {
  pitchers: RosterPlayer[];
  positionPlayers: RosterPlayer[];
  fetchedAt: string;
  teamName: string;
};

type MlbRosterEntry = {
  person: {
    id: number;
    fullName: string;
    batSide?: { code: string };
    pitchHand?: { code: string };
  };
  jerseyNumber: string;
  position: {
    abbreviation: string;
    type: string;
  };
  status: {
    code: string;
    description: string;
  };
};

type MlbRosterResponse = {
  roster: MlbRosterEntry[];
  teamId: number;
};

function parseRosterEntry(entry: MlbRosterEntry): RosterPlayer {
  return {
    id: entry.person.id,
    name: entry.person.fullName,
    number: entry.jerseyNumber || "—",
    position: entry.position.abbreviation,
    bats: entry.person.batSide?.code ?? "—",
    throws: entry.person.pitchHand?.code ?? "—",
    status: entry.status.description,
  };
}

export async function fetchAthleticsRoster(): Promise<RosterData> {
  const fetchedAt = new Date().toISOString();

  try {
    console.log(
      `[roster] Fetching Athletics roster from MLB Stats API (teamId=${ATHLETICS_TEAM_ID})`,
    );

    const response = await fetch(ROSTER_API_URL, {
      next: { revalidate: ROSTER_REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      console.error(
        `[roster] MLB API request failed: ${response.status} ${response.statusText}`,
        body.slice(0, 500),
      );
      throw new Error(
        `MLB Stats API returned ${response.status}: ${response.statusText}`,
      );
    }

    const data: MlbRosterResponse = await response.json();

    if (!Array.isArray(data.roster)) {
      console.error("[roster] Unexpected API response shape — missing roster array", data);
      throw new Error("Invalid roster response from MLB Stats API");
    }

    if (data.teamId !== ATHLETICS_TEAM_ID) {
      console.error(
        `[roster] Team ID mismatch: expected ${ATHLETICS_TEAM_ID}, got ${data.teamId}`,
      );
      throw new Error("Roster team ID does not match Athletics");
    }

    const players = data.roster.map(parseRosterEntry);

    const pitchers = players
      .filter((p) => {
        const entry = data.roster.find((r) => r.person.id === p.id);
        return entry?.position.type === "Pitcher";
      })
      .sort((a, b) => a.name.localeCompare(b.name));

    const positionPlayers = players
      .filter((p) => {
        const entry = data.roster.find((r) => r.person.id === p.id);
        return entry?.position.type !== "Pitcher";
      })
      .sort((a, b) => a.name.localeCompare(b.name));

    console.log(
      `[roster] Successfully loaded ${players.length} players (${pitchers.length} pitchers, ${positionPlayers.length} position players)`,
    );

    return {
      pitchers,
      positionPlayers,
      fetchedAt,
      teamName: "Athletics",
    };
  } catch (error) {
    console.error("[roster] Failed to fetch Athletics roster:", error);
    throw error;
  }
}
