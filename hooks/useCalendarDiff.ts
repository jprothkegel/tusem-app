import { useState, useCallback } from "react";
import * as Sentry from "@sentry/nextjs";
import type { ComparisonResult } from "@/lib/compare-events";
import { LEAGUE_BY_ID, type LeagueId } from "@/lib/leagues";

const MESSAGES = {
  upstream:
    "A data source is currently unavailable. Try again in a few minutes.",
  generic: "Was not possible to calculate the difference. Try again.",
  network: "Could not reach the server. Check your connection and try again.",
} as const;

export const useCalendarDiff = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ComparisonResult[] | null>(null);

  const calculate = useCallback(async (categoryIds: LeagueId[]) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      let response: Response;
      try {
        response = await fetch("/api/calendar-diff", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            selectedLeagueIds: categoryIds.map((id) => ({
              calendarId: LEAGUE_BY_ID.get(id)?.calendarId,
              leagueId: id,
            })),
          }),
        });
      } catch (e) {
        Sentry.captureException(e, {
          level: "warning",
          tags: { feature: "calendar-diff", failure_source: "client-network" },
        });
        setError(MESSAGES.network);
        return;
      }

      if (!response.ok) {
        setError(
          response.status === 502 ? MESSAGES.upstream : MESSAGES.generic,
        );
        return;
      }

      try {
        setResult(await response.json());
      } catch (e) {
        Sentry.captureException(e, {
          tags: { feature: "calendar-diff", failure_source: "client-parse" },
        });
        setError(MESSAGES.generic);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { calculate, loading, error, result };
};
