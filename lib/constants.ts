/** MLB Stats API team ID for the Athletics. */
export const ATHLETICS_TEAM_ID = 133;

/** AL West division ID in MLB Stats API. */
export const AL_WEST_DIVISION_ID = 200;

export const TIMEZONE = "America/Los_Angeles";

/** Cache durations in seconds. */
export const CACHE = {
  ODDS: 300,
  SCHEDULE: 900,
  STANDINGS: 86_400,
  INJURIES: 21_600,
  GAME_HUB: 300,
  ROSTER: 86_400,
} as const;

export function getCurrentSeason(): number {
  const now = new Date();
  const year = now.getFullYear();
  // MLB season spans two calendar years; Jan–Feb belong to previous season.
  if (now.getMonth() < 2) return year - 1;
  return year;
}
