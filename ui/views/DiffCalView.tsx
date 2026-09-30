"use client";

import { useState } from "react";
import { Checkbox } from "../components/Checkbox/Checkbox";
import { Button } from "../components/Button/Button";
import { DiffCard } from "../components/DiffCard/DiffCard";
import {
  ADULTS_CALENDAR_ID,
  WOMEN_CALENDAR_ID,
  YOUTH_CALENDAR_ID,
  YOUTH_WOMEN_CALENDAR_ID,
} from "@/lib/constants.client";
import { ComparisonResult } from "@/lib/compare-events";
import { Spinner } from "../components/Spinner/Spinner";

const CATEGORIES = [
  { id: "adults" as const, label: "Adults", calendarId: ADULTS_CALENDAR_ID },
  { id: "women" as const, label: "Women", calendarId: WOMEN_CALENDAR_ID },
  { id: "youngs" as const, label: "Youngs", calendarId: YOUTH_CALENDAR_ID },
  {
    id: "young_women" as const,
    label: "Young Women",
    calendarId: YOUTH_WOMEN_CALENDAR_ID,
  },
];

export const DiffCalView = () => {
  type CheckedState = Record<string, boolean>;

  const [checked, setChecked] = useState<CheckedState>(() =>
    Object.fromEntries(CATEGORIES.map((f, i) => [f.id, i === 0])),
  );

  const toggle = (key: string) => {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ComparisonResult[]>([]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const selectedLeagueIds = CATEGORIES.filter(
        (category) => checked[category.id],
      ).map((category) => {
        return {
          calendarId: category.calendarId,
          leagueId: category.id,
        };
      });

      if (selectedLeagueIds.length === 0) {
        // nothing selected — bail early or show a message
        return;
      }

      const response = await fetch("/api/calendar-diff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedLeagueIds,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to calculate calendar diff");
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col gap-4">
      <div className="border border-gray-200 rounded-md flex md:flex-row flex-col gap-2 p-4">
        {CATEGORIES.map((category) => (
          <Checkbox
            key={category.id}
            label={category.label}
            checked={checked[category.id]}
            onChange={() => toggle(category.id)}
          />
        ))}
      </div>

      <div>
        <Button buttonLabel="Calculate difference" onClick={handleSubmit} />
      </div>

      {loading && <Spinner size="xl" />}
      {result.length > 0 && (
        <div className="flex flex-col gap-2 md:flex-row md:flex-wrap md:items-start items-center justify-center w-full">
          {result.map((match) => (
            <DiffCard
              key={match.id}
              leagueCategory={
                CATEGORIES.find((category) => category.id === match.league)
                  ?.label
              }
              title={
                typeof match.fields.homeTeam === "string"
                  ? typeof match.fields.awayTeam === "string"
                    ? `${match.fields.homeTeam} vs. ${match.fields.awayTeam}`
                    : `${match.fields.homeTeam} vs. ${match.fields.awayTeam.to}`
                  : typeof match.fields.awayTeam === "string"
                    ? `${match.fields.homeTeam.to} vs. ${match.fields.awayTeam}`
                    : `${match.fields.homeTeam.to} vs. ${match.fields.awayTeam.to}`
              }
              date={match.fields.date}
              hall={match.fields.hall}
              homeTeam={match.fields.homeTeam}
              awayTeam={match.fields.awayTeam}
              variant={
                CATEGORIES.find((category) => category.id === match.league)?.id
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};
