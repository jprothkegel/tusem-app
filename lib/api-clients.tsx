import { formatDate, getDateAndRound } from "./date-manager";
import { createHash } from "crypto";

import type {
  ApiEvent,
  GCalResponse,
  LocationMyTT,
  MyTTResponse,
} from "./types";
import { LeagueId } from "./leagues";

interface IdProps {
  league: LeagueId;
  round: string;
  team1: string;
  team2: string;
}

const createId = ({ league, round, team1, team2 }: IdProps) => {
  const normalize = (s: string) => s?.trim()?.toLowerCase() || "";
  const teamsSorted = [normalize(team1), normalize(team2)].sort();
  const parts = [normalize(league), normalize(round), ...teamsSorted];
  const key = parts.join("|");
  return createHash("md5").update(key).digest("hex");
};

const createTitle = ({ team1, team2 }: Pick<IdProps, "team1" | "team2">) => {
  const normalize = (s: string) => s?.trim()?.toLowerCase() || "";
  const teamsSorted = [normalize(team1), normalize(team2)].sort();
  return teamsSorted.join("/");
};

const getAddressFromMyTT = (location: LocationMyTT) => {
  return `${location.label}, ${location.street}, ${location.zip} ${location.city}, Deutschland`;
};

const getLeagueFromMyTT = (league: string) => {
  if (league.startsWith("D")) return "women";
  else if (league.startsWith("J")) return "youngs";
  else if (league.startsWith("M")) return "young_women";
  else return "adults";
};

export const normalizeMyTT = (raw: MyTTResponse): ApiEvent[] => {
  const flattenedRaw = Object.values(raw).flat();
  return flattenedRaw
    .filter((item) => item.state !== "done")
    .map((item) => {
      const { date, round } = getDateAndRound(item.date);
      const league = getLeagueFromMyTT(item.league_short_name);
      const homeTeam = item.team_home;
      const awayTeam = item.team_away;
      return {
        id: createId({
          league,
          round,
          team1: homeTeam,
          team2: awayTeam,
        }),
        title: createTitle({ team1: homeTeam, team2: awayTeam }),
        league,
        date: date,
        hall: getAddressFromMyTT(item.location),
        homeTeam,
        awayTeam,
      };
    });
};

export const getTeamsFromSumary = (summary: string) => {
  const cleanSummary = summary.replace(/^\([^)]*\)\s*/, "");
  const [homeTeam, awayTeam] = cleanSummary
    .split(/\s+vs\.?\s+/i)
    .map((equipo) => equipo.trim());

  return {
    homeTeam,
    awayTeam,
  };
};

const getRoundFromDescription = (description: string) => {
  if (!description) return "no_round";

  return description.trim().toLocaleLowerCase();
};

export const normalizeGCal = (raw: GCalResponse): ApiEvent[] => {
  return raw.events.map((item) => {
    const { homeTeam, awayTeam } = getTeamsFromSumary(item?.summary as string);
    const round = getRoundFromDescription(item?.description as string);
    const league = item.leagueId;
    return {
      id: createId({
        league,
        round,
        team1: homeTeam,
        team2: awayTeam,
      }),
      title: createTitle({ team1: homeTeam, team2: awayTeam }),
      league,
      date: formatDate(item?.start?.dateTime as string),
      hall: item?.location as string,
      homeTeam,
      awayTeam,
    };
  });
};
