import { useState, useCallback } from "react";
import type { ComparisonResult } from "@/lib/compare-events";
import { LEAGUE_BY_ID, type LeagueId } from "@/lib/leagues";

export const useCalendarDiff = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ComparisonResult[] | null>(null);

  const calculate = useCallback(async (categoryIds: LeagueId[]) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/calendar-diff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selectedLeagueIds: categoryIds.map((id) => ({
            calendarId: LEAGUE_BY_ID.get(id)?.calendarId,
            leagueId: id,
          })),
        }),
      });

      if (!response.ok) throw new Error("Failed to calculate calendar diff");

      setResult(await response.json());
    } catch (e) {
      console.error(e);
      setError("Was not possible to calculate the difference. Try again");
    } finally {
      setLoading(false);
    }
  }, []);

  return { calculate, loading, error, result };
};
