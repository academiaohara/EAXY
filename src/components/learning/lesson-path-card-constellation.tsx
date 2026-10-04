import { cn } from "@/lib/utils";

type ConstellationVariant = "completed" | "active" | "muted";

type LessonPathCardConstellationProps = {
  variant: ConstellationVariant;
  className?: string;
};

const STROKE: Record<ConstellationVariant, string> = {
  completed: "stroke-white",
  active: "stroke-cobalt/35",
  muted: "stroke-slate-300",
};

const FILL: Record<ConstellationVariant, string> = {
  completed: "fill-white",
  active: "fill-cobalt/40",
  muted: "fill-slate-300",
};

/** Decoración lateral tipo constelación para tarjetas de la ruta de lecciones. */
export function LessonPathCardConstellation({
  variant,
  className,
}: LessonPathCardConstellationProps) {
  return (
    <svg
      className={cn(
        "pointer-events-none absolute right-0 top-1/2 h-[88%] w-[min(42%,11rem)] -translate-y-1/2 opacity-90 [mask-image:linear-gradient(to_left,transparent,black_28%)]",
        className,
      )}
      viewBox="0 0 180 100"
      preserveAspectRatio="xMaxYMid meet"
      aria-hidden
    >
      <g className={STROKE[variant]} strokeWidth="1.25" fill="none" opacity={variant === "completed" ? 0.45 : 0.55}>
        <path d="M8 52 L38 28 L72 44 L98 18 L132 36 L168 24" />
        <path d="M38 28 L52 68 L98 18" strokeDasharray="3 4" opacity="0.65" />
        <path d="M72 44 L88 78 L132 36" opacity="0.75" />
      </g>
      <g className={FILL[variant]}>
        <circle cx="38" cy="28" r="2.5" />
        <circle cx="72" cy="44" r="2" />
        <circle cx="98" cy="18" r="2.5" />
        <circle cx="132" cy="36" r="2" />
        <circle cx="52" cy="68" r="1.75" opacity="0.8" />
        <circle cx="88" cy="78" r="1.75" opacity="0.8" />
      </g>
      <g className={FILL[variant]} opacity={variant === "completed" ? 0.5 : 0.65}>
        <path d="M158 14 l3 6 6.5 1 -4.75 4.5 1.25 6.5 -5.75 -3.25 -5.75 3.25 1.25 -6.5 -4.75 -4.5 6.5 -1z" />
        <path d="M118 62 l2.5 5 5.5 0.75 -4 3.75 1 5.5 -4.75 -2.75 -4.75 2.75 1 -5.5 -4 -3.75 5.5 -0.75z" opacity="0.85" />
        <path d="M24 38 l2 4 4.5 0.5 -3.25 3 0.75 4.5 -4 -2.25 -4 2.25 0.75 -4.5 -3.25 -3 4.5 -0.5z" opacity="0.7" />
      </g>
    </svg>
  );
}
