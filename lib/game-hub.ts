import { fetchAthleticsInjuries } from "./injuries";
import { fetchAthleticsOdds } from "./odds";
import { fetchAthleticsSchedule, type ScheduleGame } from "./schedule";
import { fetchAlWestStandings } from "./standings";
import { CACHE } from "./constants";

export type GameHubData = {
  schedule: Awaited<ReturnType<typeof fetchAthleticsSchedule>>;
  odds: Awaited<ReturnType<typeof fetchAthleticsOdds>>;
  standings: Awaited<ReturnType<typeof fetchAlWestStandings>>;
  injuries: Awaited<ReturnType<typeof fetchAthleticsInjuries>>;
  todaysGame: ScheduleGame | null;
  fetchedAt: string;
};

async function enrichPitchers(
  game: ScheduleGame | null,
): Promise<ScheduleGame | null> {
  if (!game) return null;
  if (game.probablePitchers.athletics && game.probablePitchers.opponent) {
    return game;
  }

  try {
    const response = await fetch(
      `https://statsapi.mlb.com/api/v1.1/game/${game.gamePk}/feed/live`,
      { next: { revalidate: CACHE.GAME_HUB } },
    );
    if (!response.ok) return game;

    const data = await response.json();
    const away = data?.gameData?.probablePitchers?.away?.fullName ?? null;
    const home = data?.gameData?.probablePitchers?.home?.fullName ?? null;

    return {
      ...game,
      probablePitchers: {
        athletics: game.isHome ? home : away,
        opponent: game.isHome ? away : home,
      },
    };
  } catch (error) {
    console.error("[game-hub] Failed to enrich probable pitchers:", error);
    return game;
  }
}

export async function fetchGameHubData(): Promise<GameHubData> {
  console.log("[game-hub] Fetching all live Athletics data");

  const [schedule, odds, standings, injuries] = await Promise.all([
    fetchAthleticsSchedule(),
    fetchAthleticsOdds(),
    fetchAlWestStandings(),
    fetchAthleticsInjuries(),
  ]);

  const todaysGame = await enrichPitchers(schedule.todaysGame);

  return {
    schedule,
    odds,
    standings,
    injuries,
    todaysGame,
    fetchedAt: new Date().toISOString(),
  };
}
