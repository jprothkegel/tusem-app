import type { ComparisonResult } from "@/lib/compare-events";

type TeamField = ComparisonResult["fields"]["homeTeam"];

const getTeamName = (team: TeamField) =>
  typeof team === "string" ? team : team.to;

export const getMatchTitle = ({ fields }: ComparisonResult) =>
  `${getTeamName(fields.homeTeam)} vs. ${getTeamName(fields.awayTeam)}`;
