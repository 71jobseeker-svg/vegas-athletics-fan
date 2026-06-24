import { TIMEZONE } from "./constants";

export function formatAmericanOdds(price: number): string {
  return price > 0 ? `+${price}` : `${price}`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: TIMEZONE,
  });
}

export function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: TIMEZONE,
    timeZoneName: "short",
  });
}

export function formatFetchedAt(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: TIMEZONE,
    timeZoneName: "short",
  });
}

export function isTodayInTimezone(iso: string, timeZone = TIMEZONE): boolean {
  const dateKey = (d: Date) =>
    d.toLocaleDateString("en-CA", { timeZone });
  return dateKey(new Date(iso)) === dateKey(new Date());
}

export function toDateKey(date: Date, timeZone = TIMEZONE): string {
  return date.toLocaleDateString("en-CA", { timeZone });
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
