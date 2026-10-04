import { objectSize } from "@/components/lesson/stage/objects/shared";
import { cn } from "@/lib/utils";

export type FichaColorTone = "cobalt" | "emerald" | "amber" | "rose";

const fills: Record<FichaColorTone, string> = {
  cobalt: "fill-cobalt",
  emerald: "fill-emerald-500",
  amber: "fill-amber-400",
  rose: "fill-rose-400",
};

export function FichaColor({ tone, className }: { tone: FichaColorTone; className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={objectSize(cn("h-8 w-8 sm:h-9 sm:w-9", className))}
      aria-hidden
    >
      <circle cx="16" cy="16" r="13" className={cn(fills[tone], "stroke-slate-900/15")} strokeWidth="2" />
    </svg>
  );
}
