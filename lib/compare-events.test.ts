import { describe, it, expect } from "vitest";
import { calculateDiff } from "./compare-events";
import { ApiEvent } from "./types";

const makeEvent = (overrides: Partial<ApiEvent> = {}): ApiEvent => ({
  id: "hash-adults-round1-teamx-teamy",
  title: "Test title",
  league: "adults",
  date: "2026-09-21",
  hall: "Hall A",
  homeTeam: "Team X",
  awayTeam: "Team Y",
  ...overrides,
});

describe("calculateDiff", () => {
  it("returns an empty array when both inputs are empty", () => {
    expect(calculateDiff([], [])).toEqual([]);
  });

  it("returns an empty array when all events are identical", () => {
    const a = [makeEvent()];
    const b = [makeEvent()];
    expect(calculateDiff(a, b)).toEqual([]);
  });

  it("includes id and league alongside fields, with league outside the diffed fields", () => {
    const a = [makeEvent({ hall: "Hall A" })];
    const b = [makeEvent({ hall: "Hall B" })];

    expect(calculateDiff(a, b)).toEqual([
      {
        id: "hash-adults-round1-teamx-teamy",
        league: "adults",
        fields: {
          date: "2026-09-21",
          hall: { from: "Hall A", to: "Hall B" },
          homeTeam: "Team X",
          awayTeam: "Team Y",
        },
      },
    ]);
  });

  it("mixes unchanged values and multiple changed fields in one object", () => {
    const a = [makeEvent({ date: "2026-09-21", hall: "Hall A" })];
    const b = [makeEvent({ date: "2026-09-22", hall: "Hall B" })];

    expect(calculateDiff(a, b)).toEqual([
      {
        id: "hash-adults-round1-teamx-teamy",
        league: "adults",
        fields: {
          date: { from: "2026-09-21", to: "2026-09-22" },
          hall: { from: "Hall A", to: "Hall B" },
          homeTeam: "Team X",
          awayTeam: "Team Y",
        },
      },
    ]);
  });

  it("detects a home/away swap even though it doesn't affect the id", () => {
    const a = [makeEvent({ homeTeam: "Team X", awayTeam: "Team Y" })];
    const b = [makeEvent({ homeTeam: "Team Y", awayTeam: "Team X" })];

    expect(calculateDiff(a, b)).toEqual([
      {
        id: "hash-adults-round1-teamx-teamy",
        league: "adults",
        fields: {
          date: "2026-09-21",
          hall: "Hall A",
          homeTeam: { from: "Team X", to: "Team Y" },
          awayTeam: { from: "Team Y", to: "Team X" },
        },
      },
    ]);
  });

  it("matches events by id, regardless of their order in each array", () => {
    const a = [
      makeEvent({ id: "id-1", league: "adults", hall: "Hall A" }),
      makeEvent({ id: "id-2", league: "youngs", homeTeam: "Team X" }),
    ];
    const b = [
      makeEvent({ id: "id-2", league: "youngs", homeTeam: "Team Z" }), // order swapped vs a
      makeEvent({ id: "id-1", league: "adults", hall: "Hall A" }), // unchanged
    ];

    expect(calculateDiff(a, b)).toEqual([
      {
        id: "id-2",
        league: "youngs",
        fields: {
          date: "2026-09-21",
          hall: "Hall A",
          homeTeam: { from: "Team X", to: "Team Z" },
          awayTeam: "Team Y",
        },
      },
    ]);
  });

  it("skips an event whose id is missing from apiB entirely", () => {
    const a = [
      makeEvent({ id: "id-1" }),
      makeEvent({ id: "id-2", hall: "Extra Hall" }),
    ];
    const b = [makeEvent({ id: "id-1" })];

    expect(calculateDiff(a, b)).toEqual([]);
  });

  it("skips ids that exist only in apiB (not visited since we iterate apiA)", () => {
    const a = [makeEvent({ id: "id-1" })];
    const b = [
      makeEvent({ id: "id-1" }),
      makeEvent({ id: "id-2", hall: "Extra Hall" }),
    ];

    expect(calculateDiff(a, b)).toEqual([]);
  });

  it("skips missing ids but still reports modified ones in the same run", () => {
    const a = [
      makeEvent({ id: "id-1", hall: "Hall A" }),
      makeEvent({ id: "id-2", hall: "Extra Hall" }), // no match in b
    ];
    const b = [makeEvent({ id: "id-1", hall: "Hall B" })];

    expect(calculateDiff(a, b)).toEqual([
      {
        id: "id-1",
        league: "adults",
        fields: {
          date: "2026-09-21",
          hall: { from: "Hall A", to: "Hall B" },
          homeTeam: "Team X",
          awayTeam: "Team Y",
        },
      },
    ]);
  });
});
