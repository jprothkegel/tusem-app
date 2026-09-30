import { InputHTMLAttributes, useId } from "react";

interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  label?: string;
  size?: "sm" | "md" | "lg";
}

const boxSizes = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

const iconSizes = {
  sm: "h-3 w-3",
  md: "h-3.5 w-3.5",
  lg: "h-4 w-4",
};

export const Checkbox = ({
  label,
  size = "md",
  className = "",
  id,
  disabled,
  ...props
}: CheckboxProps) => {
  const generatedId = useId();
  const checkboxId = id ?? generatedId;

  return (
    <label
      htmlFor={checkboxId}
      className={`inline-flex items-center gap-2 ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${className}`}
    >
      <span className="relative inline-flex">
        <input
          type="checkbox"
          id={checkboxId}
          disabled={disabled}
          className="peer sr-only"
          {...props}
        />
        <span
          className={`${boxSizes[size]} shrink-0 rounded border-2 border-gray-300 bg-white transition-colors
        peer-checked:bg-blue-600 peer-checked:border-blue-600
        peer-focus-visible:ring-2 peer-focus-visible:ring-blue-400 peer-focus-visible:ring-offset-2
        grid place-items-center [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100`}
        >
          <svg
            className={`${iconSizes[size]} text-white transition-opacity`}
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden
          >
            <path
              d="M3 8.5L6.5 12L13 4.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </span>
      {label && (
        <span className="text-sm text-gray-900 select-none">{label}</span>
      )}
    </label>
  );
};
