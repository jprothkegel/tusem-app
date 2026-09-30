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

interface GCalDate {
  dateTime: string;
  timeZone: string;
}

export interface GCalReponseItem {
  location: string;
  summary: string;
  description: string;
  leagueId: string;
  start: GCalDate;
  end: GCalDate;
}

export interface GCalReponse {
  events: GCalReponseItem[];
}
