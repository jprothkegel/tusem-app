import { NextResponse } from "next/server";
import { getEventsForCalendars } from "@/lib/google-client";

export async function POST(request: Request) {
  const { calendarIds } = await request.json();

  const result = await getEventsForCalendars(calendarIds);

  return NextResponse.json(result);
}
