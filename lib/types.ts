import type { calendar_v3 } from "googleapis";
import { LeagueId } from "./leagues";

export type League =
  "adults" | "women" | "youngs" | "young_women" | "no_league";

export interface ApiEvent {
  id: string;
  title: string;
  league: LeagueId;
  date: string;
  hall: string;
  homeTeam: string;
  awayTeam: string;
}

export interface LocationMyTT {
  zip: string;
  city: string;
  street: string;
  country: string;
  label: string;
}

interface MyTTResponseItem {
  date: string;
  live: boolean;
  state: string;
  pdf_url: string;
  end_date: string;
  location: LocationMyTT;
  league_id: string;
  team_away: string;
  team_home: string;
  league_name: string;
  league_short_name: string;
  formattedDay: string;
  formattedTime: string;
}

export interface MyTTResponse {
  [date: string]: MyTTResponseItem[];
}

type GCalResponseItem = calendar_v3.Schema$Event & {
  leagueId: LeagueId;
  calendarId: string;
};

export interface GCalResponse {
  events: GCalResponseItem[];
}
