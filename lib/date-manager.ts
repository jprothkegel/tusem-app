export const formatRound = (iso: string): string => {
  const match = iso.match(
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d+)?([+-]\d{2}:\d{2}|Z)$/,
  );

  if (!match) return "";

  const [, , month] = match;
  const numberMonth = Number(month);
  if (numberMonth >= 1 && numberMonth <= 6) {
    return "rueckrunde";
  }
  return "vorrunde";
};

export const getDateAndRound = (iso: string) => {
  return {
    date: formatDate(iso),
    round: formatRound(iso),
  };
};

function parseDate(s: string): Date {
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) throw new Error(`Invalid date: ${s}`);
  return d;
}

export function formatDate(
  input: string | Date,
  timeZone = "Europe/Berlin",
): string {
  const d = typeof input === "string" ? parseDate(input) : input;

  const parts = new Intl.DateTimeFormat("de-DE", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(d);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)!.value;

  return `${get("day")}/${get("month")}/${get("year")}-${get("hour")}:${get("minute")}`;
}

export function isSameInstant(a: string, b: string): boolean {
  return parseDate(a).getTime() === parseDate(b).getTime();
}
