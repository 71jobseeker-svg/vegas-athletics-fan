import {
  AL_WEST_DIVISION_ID,
  ATHLETICS_TEAM_ID,
  CACHE,
  getCurrentSeason,
} from "./constants";

type MlbTeamRecord = {
  team: { id: number; name: string; abbreviation: string };
  leagueRecord: { wins: number; losses: number; pct: string };
  gamesBack: string;
  divisionRank: string;
  streak: { streakCode: string };
};

type MlbStandingsResponse = {
  records: {
    division: { id: number; name: string };
    teamRecords: MlbTeamRecord[];
  }[];
};

export type StandingsTeam = {
  teamId: number;
  team: string;
  abbreviation: string;
  wins: number;
  losses: number;
  pct: string;
  gamesBack: string;
  streak: string;
  isAthletics: boolean;
};

export type StandingsData = {
  division: string;
  teams: StandingsTeam[];
  fetchedAt: string;
};

export async function fetchAlWestStandings(): Promise<StandingsData> {
  const fetchedAt = new Date().toISOString();
  const season = getCurrentSeason();

  const url = new URL("https://statsapi.mlb.com/api/v1/standings");
  url.searchParams.set("leagueId", "103");
  url.searchParams.set("season", String(season));
  url.searchParams.set("standingsTypes", "regularSeason");
  url.searchParams.set("hydrate", "team");

  console.log(`[standings] Fetching AL West standings for ${season}`);

  const response = await fetch(url.toString(), {
    next: { revalidate: CACHE.STANDINGS },
  });

  if (!response.ok) {
    console.error(`[standings] API failed: ${response.status}`);
    throw new Error(`Standings API returned ${response.status}`);
  }

  const data: MlbStandingsResponse = await response.json();
  const alWest = data.records.find((r) => r.division.id === AL_WEST_DIVISION_ID);

  if (!alWest) {
    console.error("[standings] AL West division not found in response");
    throw new Error("AL West standings not found");
  }

  const teams = [...alWest.teamRecords]
    .sort((a, b) => parseInt(a.divisionRank, 10) - parseInt(b.divisionRank, 10))
    .map((record) => ({
      teamId: record.team.id,
      team: record.team.name,
      abbreviation: record.team.abbreviation,
      wins: record.leagueRecord.wins,
      losses: record.leagueRecord.losses,
      pct: record.leagueRecord.pct,
      gamesBack: record.gamesBack === "-" ? "—" : record.gamesBack,
      streak: record.streak.streakCode,
      isAthletics: record.team.id === ATHLETICS_TEAM_ID,
    }));

  console.log(`[standings] Loaded ${teams.length} AL West teams`);

  return {
    division: alWest.division.name,
    teams,
    fetchedAt,
  };
}
