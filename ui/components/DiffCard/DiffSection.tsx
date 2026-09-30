import { DiffRow } from "./DiffRow";

type Variant = "adults" | "women" | "youngs" | "plain";

interface Props {
  title: string;
  content?: string;
  modifiedContent?: {
    from: string;
    to: string;
  };
  variant?: Variant;
}

const variantStyles: Record<Variant, string> = {
  adults: "border-yellow-200",
  women: "border-pink-200",
  youngs: "border-teal-200",
  plain: "border-gray-200",
};

export const DiffSection = ({
  title,
  content,
  modifiedContent,
  variant = "plain",
}: Props) => {
  return (
    <div
      className={`flex flex-col gap-1 px-4 py-2 not-last:border-b ${variantStyles[variant]}`}
    >
      <span className="text-xs text-gray-400">{title}</span>
      <div>
        {!modifiedContent && content && <DiffRow content={content} />}
        {modifiedContent && (
          <div className="flex flex-col gap-1">
            <DiffRow variant="subtract" content={modifiedContent.from} />
            <DiffRow variant="add" content={modifiedContent.to} />
          </div>
        )}
      </div>
    </div>
  );
};
