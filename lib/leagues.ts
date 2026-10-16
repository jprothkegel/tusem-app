import {
  ADULTS_CALENDAR_ID,
  WOMEN_CALENDAR_ID,
  YOUTH_CALENDAR_ID,
  YOUTH_WOMEN_CALENDAR_ID,
} from "@/lib/constants.client";

export const LEAGUES = [
  { id: "adults", label: "Adults", calendarId: ADULTS_CALENDAR_ID },
  { id: "women", label: "Women", calendarId: WOMEN_CALENDAR_ID },
  { id: "youngs", label: "Youngs", calendarId: YOUTH_CALENDAR_ID },
  {
    id: "young_women",
    label: "Young Women",
    calendarId: YOUTH_WOMEN_CALENDAR_ID,
  },
] as const;

export type League = (typeof LEAGUES)[number];
export type LeagueId = League["id"];

export const LEAGUE_BY_ID = new Map<LeagueId, League>(
  LEAGUES.map((league) => [league.id, league]),
);
