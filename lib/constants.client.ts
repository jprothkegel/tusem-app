import { env } from "@/env";

export const ADULTS_CALENDAR_ID = env.NEXT_PUBLIC_ADULTS_CALENDAR_ID;
export const WOMEN_CALENDAR_ID = env.NEXT_PUBLIC_WOMEN_CALENDAR_ID;
export const YOUTH_CALENDAR_ID = env.NEXT_PUBLIC_YOUTH_CALENDAR_ID;
export const YOUTH_WOMEN_CALENDAR_ID = env.NEXT_PUBLIC_YOUTH_WOMEN_CALENDAR_ID;

export const CATEGORIES = [
  { id: "adults" as const, label: "Adults", calendarId: ADULTS_CALENDAR_ID },
  { id: "women" as const, label: "Women", calendarId: WOMEN_CALENDAR_ID },
  { id: "youngs" as const, label: "Youngs", calendarId: YOUTH_CALENDAR_ID },
  {
    id: "young_women" as const,
    label: "Young Women",
    calendarId: YOUTH_WOMEN_CALENDAR_ID,
  },
];
