import { ATHLETICS_TEAM_ID, CACHE, getCurrentSeason, TIMEZONE } from "./constants";
import { addDays, formatDate, formatTime, toDateKey } from "./format";

type MlbGameTeam = {
  team: { id: number; name: string };
  score?: number;
  isWinner?: boolean;
};

type MlbGame = {
  gamePk: number;
  gameDate: string;
  officialDate?: string;
  teams: {
    away: MlbGameTeam;
    home: MlbGameTeam;
  };
  status: {
    abstractGameState: string;
    detailedState: string;
    statusCode: string;
  };
  probablePitchers?: {
    away?: { fullName: string };
    home?: { fullName: string };
  };
  linescore?: {
    currentInning?: number;
    inningState?: string;
  };
};

type MlbScheduleResponse = {
  dates: { games: MlbGame[] }[];
};

export type GameStatus = "Scheduled" | "Live" | "Final" | "Postponed" | "Other";

export type ScheduleGame = {
  gamePk: number;
  gameDate: string;
  dateLabel: string;
  timeLabel: string;
  opponent: string;
  isHome: boolean;
  homeAway: "Home" | "Away";
  status: GameStatus;
  statusDetail: string;
  athleticsScore: number | null;
  opponentScore: number | null;
  scoreLabel: string | null;
  probablePitchers: {
    athletics: string | null;
    opponent: string | null;
  };
  gameUrl: string;
};

export type ScheduleData = {
  upcoming: ScheduleGame[];
  recent: ScheduleGame[];
  todaysGame: ScheduleGame | null;
  fetchedAt: string;
};

function mapGameStatus(game: MlbGame): { status: GameStatus; detail: string } {
  const state = game.status.abstractGameState;
  const detail = game.status.detailedState;

  if (state === "Final") return { status: "Final", detail };
  if (state === "Live") {
    const inning = game.linescore?.currentInning;
    const inningState = game.linescore?.inningState;
    const liveDetail =
      inning && inningState ? `${inningState} ${inning}` : detail;
    return { status: "Live", detail: liveDetail };
  }
  if (detail.toLowerCase().includes("postponed"))
    return { status: "Postponed", detail };
  if (state === "Preview") return { status: "Scheduled", detail };
  return { status: "Other", detail };
}

function parseGame(game: MlbGame): ScheduleGame {
  const isHome = game.teams.home.team.id === ATHLETICS_TEAM_ID;
  const athleticsTeam = isHome ? game.teams.home : game.teams.away;
  const opponentTeam = isHome ? game.teams.away : game.teams.home;
  const { status, detail } = mapGameStatus(game);

  const athleticsScore =
    athleticsTeam.score !== undefined ? athleticsTeam.score : null;
  const opponentScore =
    opponentTeam.score !== undefined ? opponentTeam.score : null;

  const scoreLabel =
    status === "Final" || status === "Live"
      ? `${athleticsScore ?? 0} – ${opponentScore ?? 0}`
      : null;

  const awayPitcher = game.probablePitchers?.away?.fullName ?? null;
  const homePitcher = game.probablePitchers?.home?.fullName ?? null;

  return {
    gamePk: game.gamePk,
    gameDate: game.gameDate,
    dateLabel: formatDate(game.gameDate),
    timeLabel: formatTime(game.gameDate),
    opponent: opponentTeam.team.name,
    isHome,
    homeAway: isHome ? "Home" : "Away",
    status,
    statusDetail: detail,
    athleticsScore,
    opponentScore,
    scoreLabel,
    probablePitchers: {
      athletics: isHome ? homePitcher : awayPitcher,
      opponent: isHome ? awayPitcher : homePitcher,
    },
    gameUrl: `https://www.mlb.com/gameday/${game.gamePk}`,
  };
}

function collectGames(response: MlbScheduleResponse): MlbGame[] {
  return response.dates.flatMap((d) => d.games ?? []);
}

export async function fetchAthleticsSchedule(): Promise<ScheduleData> {
  const fetchedAt = new Date().toISOString();
  const season = getCurrentSeason();
  const today = new Date();
  const startDate = toDateKey(addDays(today, -14), TIMEZONE);
  const endDate = toDateKey(addDays(today, 30), TIMEZONE);

  const url = new URL("https://statsapi.mlb.com/api/v1/schedule");
  url.searchParams.set("sportId", "1");
  url.searchParams.set("teamId", String(ATHLETICS_TEAM_ID));
  url.searchParams.set("season", String(season));
  url.searchParams.set("startDate", startDate);
  url.searchParams.set("endDate", endDate);
  url.searchParams.set("hydrate", "team,linescore,probablePitcher");

  console.log(`[schedule] Fetching Athletics schedule (${startDate} to ${endDate})`);

  const response = await fetch(url.toString(), {
    next: { revalidate: CACHE.SCHEDULE },
  });

  if (!response.ok) {
    console.error(`[schedule] API failed: ${response.status}`);
    throw new Error(`Schedule API returned ${response.status}`);
  }

  const data: MlbScheduleResponse = await response.json();
  const games = collectGames(data).map(parseGame);
  const todayKey = toDateKey(today, TIMEZONE);

  const todaysGame =
    games.find(
      (g) =>
        toDateKey(new Date(g.gameDate), TIMEZONE) === todayKey &&
        g.status !== "Final",
    ) ??
    games.find((g) => toDateKey(new Date(g.gameDate), TIMEZONE) === todayKey) ??
    null;

  const recent = games
    .filter((g) => g.status === "Final")
    .sort((a, b) => new Date(b.gameDate).getTime() - new Date(a.gameDate).getTime())
    .slice(0, 10);

  const upcoming = games
    .filter((g) => g.status !== "Final")
    .sort((a, b) => new Date(a.gameDate).getTime() - new Date(b.gameDate).getTime())
    .slice(0, 10);

  console.log(
    `[schedule] Loaded ${games.length} games (${upcoming.length} upcoming, ${recent.length} recent)`,
  );

  return { upcoming, recent, todaysGame, fetchedAt };
}
