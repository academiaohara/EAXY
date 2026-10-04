import { objectSize } from "@/components/lesson/stage/objects/shared";
import { cn } from "@/lib/utils";

export function Cartera({ className, overBudget }: { className?: string; overBudget?: boolean }) {
  return (
    <svg
      viewBox="0 0 80 56"
      className={objectSize(cn("h-12 w-[4.5rem] sm:h-14 sm:w-20", className))}
      aria-hidden
    >
      <rect
        x="8"
        y="16"
        width="64"
        height="36"
        rx="10"
        className={cn(
          overBudget ? "fill-rose-300 stroke-rose-600/50" : "fill-amber-300 stroke-amber-800/40",
        )}
        strokeWidth="2"
      />
      <rect x="8" y="10" width="64" height="12" rx="6" className="fill-amber-500/80" />
      <circle cx="58" cy="34" r="4" className="fill-amber-900/30" />
    </svg>
  );
}
