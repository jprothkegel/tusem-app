import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    MYTT_GAME_PLAN: z.url(),
    GOOGLE_API_KEY: z.string(),
  },

  client: {
    NEXT_PUBLIC_ADULTS_CALENDAR_ID: z.string(),
    NEXT_PUBLIC_WOMEN_CALENDAR_ID: z.string(),
    NEXT_PUBLIC_YOUTH_CALENDAR_ID: z.string(),
    NEXT_PUBLIC_YOUTH_WOMEN_CALENDAR_ID: z.string(),
  },

  runtimeEnv: {
    MYTT_GAME_PLAN: process.env.MYTT_GAME_PLAN,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    NEXT_PUBLIC_ADULTS_CALENDAR_ID: process.env.NEXT_PUBLIC_ADULTS_CALENDAR_ID,
    NEXT_PUBLIC_WOMEN_CALENDAR_ID: process.env.NEXT_PUBLIC_WOMEN_CALENDAR_ID,
    NEXT_PUBLIC_YOUTH_CALENDAR_ID: process.env.NEXT_PUBLIC_YOUTH_CALENDAR_ID,
    NEXT_PUBLIC_YOUTH_WOMEN_CALENDAR_ID:
      process.env.NEXT_PUBLIC_YOUTH_WOMEN_CALENDAR_ID,
  },
  emptyStringAsUndefined: true,
});
