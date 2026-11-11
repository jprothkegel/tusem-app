import { MYTT_GAME_PLAN } from "@/lib/constants.server";
import { getEventsForCalendars } from "@/lib/google-client";
import { calculateDiff } from "@/lib/compare-events";
import { normalizeMyTT, normalizeGCal } from "@/lib/api-clients";
import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

class UpstreamError extends Error {
  constructor(
    public source: "mytt" | "gcal",
    message: string,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = "UpstreamError";
  }
}

async function fetchMyTT() {
  let res: Response;
  try {
    res = await fetch(MYTT_GAME_PLAN);
  } catch (e) {
    throw new UpstreamError("mytt", "MyTT request failed (network/timeout)", {
      cause: e,
    });
  }

  if (!res.ok) {
    throw new UpstreamError("mytt", `MyTT responded with status ${res.status}`);
  }

  try {
    return await res.json();
  } catch (e) {
    throw new UpstreamError("mytt", "MyTT returned invalid JSON", { cause: e });
  }
}

async function fetchGcal(selectedLeagueIds: any[]) {
  try {
    return await getEventsForCalendars(selectedLeagueIds);
  } catch (e) {
    throw new UpstreamError("gcal", "Google Calendar request failed", {
      cause: e,
    });
  }
}

export async function POST(request: Request) {
  const { selectedLeagueIds } = await request.json();

  try {
    const [myTTResponse, gCalResponse] = await Promise.all([
      fetchMyTT(),
      fetchGcal(selectedLeagueIds),
    ]);

    const result = calculateDiff(
      normalizeGCal(gCalResponse),
      normalizeMyTT(myTTResponse.data),
    );

    return NextResponse.json(result);
  } catch (e) {
    const isUpstream = e instanceof UpstreamError;
    Sentry.captureException(e, {
      tags: {
        feature: "calendar-diff",
        failure_source: isUpstream ? e.source : "internal",
      },
      extra: { selectedLeagueIds },
    });

    return NextResponse.json(
      { error: "Calculation failed" },
      { status: isUpstream ? 502 : 500 },
    );
  }
}
