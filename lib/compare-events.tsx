import { LeagueId } from "./leagues";
import { ApiEvent } from "./types";

export type FieldValue = string | { from: string; to: string };

export type ComparisonResult = {
  id: string;
  league: LeagueId;
  fields: Record<Exclude<keyof ApiEvent, "id" | "league">, FieldValue>;
};

const FIELDS: Exclude<keyof ApiEvent, "id" | "league">[] = [
  "date",
  "hall",
  "homeTeam",
  "awayTeam",
];

export const calculateDiff = (
  apiA: ApiEvent[],
  apiB: ApiEvent[],
): ComparisonResult[] => {
  const differences: ComparisonResult[] = [];
  const mapB = new Map(apiB.map((event) => [event.id, event]));

  for (const eventA of apiA) {
    const eventB = mapB.get(eventA.id);
    if (!eventB) continue;

    const fields = {} as ComparisonResult["fields"];
    let hasChange = false;

    for (const field of FIELDS) {
      if (eventA[field] !== eventB[field]) {
        fields[field] = { from: eventA[field], to: eventB[field] };
        hasChange = true;
      } else {
        fields[field] = eventA[field];
      }
    }

    if (hasChange) {
      differences.push({
        id: eventA.id,
        league: eventA.league,
        fields,
      });
    }
  }

  return differences;
};
