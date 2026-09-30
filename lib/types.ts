import type { calendar_v3 } from "googleapis";

export interface ApiEvent {
  id: string;
  title: string;
  league: string;
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
  leagueId: string;
  calendarId: string;
};

export interface GCalResponse {
  events: GCalResponseItem[];
}
