import { google } from "googleapis";
import { GOOGLE_API_KEY } from "./constants.server";

const calendar = google.calendar({
  version: "v3",
  auth: GOOGLE_API_KEY,
});

export const getCalendarEvents = async (id: string) => {
  const events = await calendar.events.list({
    calendarId: id,
    singleEvents: true,
  });

  return {
    events: events.data,
  };
};

interface RequestData {
  calendarId: string;
  leagueId: string;
}

export const getEventsForCalendars = async (requestData: RequestData[]) => {
  const results = await Promise.all(
    requestData.map(async (data) => {
      const res = await calendar.events.list({
        calendarId: data.calendarId,
        singleEvents: true,
        timeMin: new Date("2026-08-01T00:00:00").toISOString(),
        timeMax: new Date("2027-05-30T23:59:59").toISOString(),
      });

      return (res.data.items ?? []).map((item) => ({
        id: item.id,
        calendarId: data.calendarId,
        leagueId: data.leagueId,
        summary: item.summary,
        description: item.description,
        start: item.start?.dateTime ?? item.start?.date ?? null,
        end: item.end?.dateTime ?? item.end?.date ?? null,
        ...item,
      }));
    }),
  );

  return {
    events: results.flat(),
  };
};
