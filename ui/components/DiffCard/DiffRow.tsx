type Variant = "add" | "subtract" | "regular";

interface RedRowProps {
  content: string;
  variant?: Variant;
}

const baseStyles = "rounded-md flex gap-1";

const variantStyles: Record<Variant, string> = {
  subtract: "bg-red-700/30 text-red-600 py-2 px-4",
  add: "bg-green-700/30 text-green-600 py-2 px-4",
  regular: "bg-transparent border-gray-200 p-0",
};

const rowCharacter: Record<Variant, string> = {
  add: "+",
  subtract: "-",
  regular: "",
};

export const DiffRow = ({ content, variant = "regular" }: RedRowProps) => {
  const classes = [baseStyles, variantStyles[variant]]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <span>{rowCharacter[variant]}</span>
      <span>{content}</span>
    </div>
  );
};
