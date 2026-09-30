import { MYTT_GAME_PLAN } from "@/lib/constants.server";
import { getEventsForCalendars } from "@/lib/google-client";
import { calculateDiff } from "@/lib/compare-events";
import { normalizeMyTT, normalizeGCal } from "@/lib/api-clients";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { selectedLeagueIds } = await request.json();

  const [myTTResponse, gCalResponse] = await Promise.all([
    fetch(MYTT_GAME_PLAN, {
      method: "GET",
    }),
    getEventsForCalendars(selectedLeagueIds),
  ]);

  const myTTData = await myTTResponse.json();

  const result = calculateDiff(
    normalizeGCal(gCalResponse),
    normalizeMyTT(myTTData.data),
  );

  return NextResponse.json(result);
}
