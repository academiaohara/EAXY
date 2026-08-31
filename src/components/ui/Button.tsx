import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-slate-300",
  secondary:
    "border border-slate-200 bg-white text-slate-800 hover:border-indigo-300 hover:bg-slate-50 disabled:bg-slate-100 disabled:text-slate-400",
  ghost:
    "bg-transparent text-indigo-600 hover:bg-indigo-50 hover:text-indigo-800 disabled:text-slate-400",
};

export function Button({
  children,
  variant = "primary",
  fullWidth = false,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "touch-target inline-flex min-h-11 items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium transition disabled:cursor-not-allowed sm:min-h-12 sm:text-base",
        variantClasses[variant],
        fullWidth && "w-full flex-1",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
