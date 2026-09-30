import { DiffRow } from "./DiffRow";
import type { FieldValue } from "@/lib/compare-events";
import { DiffSection } from "./DiffSection";

type Variant = "adults" | "women" | "youngs" | "plain";

interface DiffCardProps {
  title: string;
  leagueCategory?: string;
  variant?: Variant;
  date: FieldValue;
  hall: FieldValue;
  homeTeam: FieldValue;
  awayTeam: FieldValue;
}

const variantConfig: Record<Variant, { container: string; header: string }> = {
  adults: {
    container: "border-yellow-200 bg-yellow-50/30",
    header: "border-yellow-200",
  },
  women: {
    container: "border-pink-200 bg-pink-50/30",
    header: "border-pink-200",
  },
  youngs: {
    container: "border-teal-200 bg-teal-50/30",
    header: "border-teal-200",
  },
  plain: { container: "border-gray-200 bg-white", header: "border-gray-200" },
};

export const DiffCard = ({
  title,
  leagueCategory,
  variant = "plain",
  date,
  hall,
  homeTeam,
  awayTeam,
}: DiffCardProps) => {
  return (
    <div
      className={`w-xs border rounded-md ${variantConfig[variant].container}`}
    >
      <div
        className={`px-4 py-2 border-b flex flex-col gap-0.5 ${variantConfig[variant].header}`}
      >
        {leagueCategory && (
          <span className="text-xs text-gray-400">{leagueCategory}</span>
        )}
        <span>{title}</span>
      </div>
      {typeof date === "string" ? (
        <DiffSection title="Date" content={date} variant={variant} />
      ) : (
        <DiffSection
          title="Date"
          modifiedContent={{ to: date.to, from: date.from }}
          variant={variant}
        />
      )}
      {typeof hall === "string" ? (
        <DiffSection title="Hall" content={hall} variant={variant} />
      ) : (
        <DiffSection
          title="Hall"
          modifiedContent={{ to: hall.to, from: hall.from }}
          variant={variant}
        />
      )}
      {typeof homeTeam === "string" ? (
        <DiffSection title="Home Team" content={homeTeam} variant={variant} />
      ) : (
        <DiffSection
          title="Home Team"
          modifiedContent={{ to: homeTeam.to, from: homeTeam.from }}
          variant={variant}
        />
      )}
      {typeof awayTeam === "string" ? (
        <DiffSection title="Away Team" content={awayTeam} variant={variant} />
      ) : (
        <DiffSection
          title="Away Team"
          modifiedContent={{ to: awayTeam.to, from: awayTeam.from }}
          variant={variant}
        />
      )}
    </div>
  );
};
