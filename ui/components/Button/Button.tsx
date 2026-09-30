import type { ButtonHTMLAttributes } from "react";
import { Spinner } from "../Spinner/Spinner";

type Variant = "primary" | "secondary";

const baseStyles =
  "inline-flex px-4 py-2 items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed cursor-pointer";

const variantStyles: Record<Variant, string> = {
  primary: "bg-rose-600 text-white hover:bg-rose-700",
  secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  isLoading?: boolean;
  buttonLabel: string;
}

export const Button = ({
  variant = "primary",
  isLoading = false,
  className = "",
  disabled,
  buttonLabel,
  ...props
}: ButtonProps) => {
  const classes = [baseStyles, variantStyles[variant]]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} disabled={disabled} {...props}>
      <div className="flex gap-x-2 items-center">
        {isLoading && <Spinner />}
        {buttonLabel}
      </div>
    </button>
  );
};
