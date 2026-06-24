import { CACHE } from "./constants";
import { formatAmericanOdds, isTodayInTimezone } from "./format";

const ODDS_API_URL =
  "https://api.the-odds-api.com/v4/sports/baseball_mlb/odds";

type OddsOutcome = {
  name: string;
  price: number;
  point?: number;
};

type OddsMarket = {
  key: string;
  last_update: string;
  outcomes: OddsOutcome[];
};

type OddsBookmaker = {
  key: string;
  title: string;
  last_update: string;
  markets: OddsMarket[];
};

type OddsApiGame = {
  id: string;
  commence_time: string;
  home_team: string;
  away_team: string;
  bookmakers: OddsBookmaker[];
};

export type BookmakerOdds = {
  bookmaker: string;
  lastUpdate: string;
  awayMoneyline: string;
  homeMoneyline: string;
  awaySpread: string;
  homeSpread: string;
  over: string;
  under: string;
  totalLine: string;
};

export type AthleticsOddsGame = {
  id: string;
  commenceTime: string;
  homeTeam: string;
  awayTeam: string;
  opponent: string;
  isHome: boolean;
  bookmakers: BookmakerOdds[];
};

export type AthleticsOddsData = {
  games: AthleticsOddsGame[];
  todaysGame: AthleticsOddsGame | null;
  fetchedAt: string;
};

function isAthleticsTeam(name: string): boolean {
  return name.toLowerCase().includes("athletics");
}

function formatSpread(outcome: OddsOutcome): string {
  const point = outcome.point ?? 0;
  const sign = point > 0 ? "+" : "";
  return `${sign}${point} (${formatAmericanOdds(outcome.price)})`;
}

function parseBookmaker(bookmaker: OddsBookmaker, homeTeam: string): BookmakerOdds {
  const h2h = bookmaker.markets.find((m) => m.key === "h2h");
  const spreads = bookmaker.markets.find((m) => m.key === "spreads");
  const totals = bookmaker.markets.find((m) => m.key === "totals");

  const homeH2h = h2h?.outcomes.find((o) => o.name === homeTeam);
  const awayH2h = h2h?.outcomes.find((o) => o.name !== homeTeam);
  const homeSpread = spreads?.outcomes.find((o) => o.name === homeTeam);
  const awaySpread = spreads?.outcomes.find((o) => o.name !== homeTeam);
  const over = totals?.outcomes.find((o) => o.name === "Over");
  const under = totals?.outcomes.find((o) => o.name === "Under");

  return {
    bookmaker: bookmaker.title,
    lastUpdate: bookmaker.last_update,
    homeMoneyline: homeH2h ? formatAmericanOdds(homeH2h.price) : "—",
    awayMoneyline: awayH2h ? formatAmericanOdds(awayH2h.price) : "—",
    homeSpread: homeSpread ? formatSpread(homeSpread) : "—",
    awaySpread: awaySpread ? formatSpread(awaySpread) : "—",
    over: over ? `O${over.point} (${formatAmericanOdds(over.price)})` : "—",
    under: under ? `U${under.point} (${formatAmericanOdds(under.price)})` : "—",
    totalLine: over?.point?.toString() ?? "—",
  };
}

function parseGame(game: OddsApiGame): AthleticsOddsGame {
  const isHome = isAthleticsTeam(game.home_team);
  const opponent = isHome ? game.away_team : game.home_team;

  return {
    id: game.id,
    commenceTime: game.commence_time,
    homeTeam: game.home_team,
    awayTeam: game.away_team,
    opponent,
    isHome,
    bookmakers: game.bookmakers.map((b) => parseBookmaker(b, game.home_team)),
  };
}

export async function fetchAthleticsOdds(): Promise<AthleticsOddsData> {
  const fetchedAt = new Date().toISOString();
  const apiKey = process.env.ODDS_API_KEY;

  if (!apiKey) {
    console.error("[odds] ODDS_API_KEY is not configured");
    throw new Error("Odds API key is not configured");
  }

  const url = new URL(ODDS_API_URL);
  url.searchParams.set("regions", "us");
  url.searchParams.set("markets", "h2h,spreads,totals");
  url.searchParams.set("oddsFormat", "american");
  url.searchParams.set("apiKey", apiKey);

  console.log("[odds] Fetching Athletics odds from The Odds API");

  const response = await fetch(url.toString(), {
    next: { revalidate: CACHE.ODDS },
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    console.error(
      `[odds] API request failed: ${response.status} ${response.statusText}`,
      body.slice(0, 300),
    );
    throw new Error(`Odds API returned ${response.status}`);
  }

  const data: OddsApiGame[] = await response.json();

  const athleticsGames = data
    .filter(
      (g) =>
        isAthleticsTeam(g.home_team) || isAthleticsTeam(g.away_team),
    )
    .map(parseGame);

  const todaysGame =
    athleticsGames.find((g) => isTodayInTimezone(g.commenceTime)) ?? null;

  console.log(
    `[odds] Loaded ${athleticsGames.length} Athletics games (${todaysGame ? "today's game found" : "no game today"})`,
  );

  return { games: athleticsGames, todaysGame, fetchedAt };
}
