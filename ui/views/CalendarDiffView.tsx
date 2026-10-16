"use client";

import { useState } from "react";
import { Checkbox } from "../components/Checkbox/Checkbox";
import { Button } from "../components/Button/Button";
import { DiffCard } from "../components/DiffCard/DiffCard";
import { Spinner } from "../components/Spinner/Spinner";
import { LEAGUES, LEAGUE_BY_ID, type LeagueId } from "@/lib/leagues";
import { getMatchTitle } from "@/lib/match-title";
import { useCalendarDiff } from "@/hooks/useCalendarDiff";

export const CalendarDiffView = () => {
  const [selected, setSelected] = useState<Set<LeagueId>>(
    () => new Set([LEAGUES[0].id]),
  );
  const { calculate, loading, error, result } = useCalendarDiff();

  const toggle = (id: LeagueId) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const canSubmit = selected.size > 0 && !loading;

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex flex-col gap-2 rounded-md border border-gray-200 p-4 md:flex-row">
        {LEAGUES.map(({ id, label }) => (
          <Checkbox
            key={id}
            label={label}
            checked={selected.has(id)}
            onChange={() => toggle(id)}
          />
        ))}
      </div>

      <Button
        buttonLabel="Calculate difference"
        onClick={() => calculate([...selected])}
        disabled={!canSubmit}
      />

      {loading && <Spinner size="xl" />}
      {error && (
        <p role="alert" className="text-red-600">
          {error}
        </p>
      )}
      {result?.length === 0 && (
        <p>You're all good, no differences were found.</p>
      )}

      {result && result.length > 0 && (
        <div className="flex w-full flex-col items-center justify-center gap-2 md:flex-row md:flex-wrap md:items-start">
          {result.map((match) => (
            <DiffCard
              key={match.id}
              leagueLabel={LEAGUE_BY_ID.get(match.league)?.label}
              title={getMatchTitle(match)}
              date={match.fields.date}
              hall={match.fields.hall}
              homeTeam={match.fields.homeTeam}
              awayTeam={match.fields.awayTeam}
              variant={match.league}
            />
          ))}
        </div>
      )}
    </div>
  );
};
