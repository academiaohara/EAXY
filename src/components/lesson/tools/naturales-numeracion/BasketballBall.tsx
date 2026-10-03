import { cn } from "@/lib/utils";

type BasketballBallProps = {
  className?: string;
  faded?: boolean;
};

/** Pelota que ocupa todo el círculo (sin anillo exterior). */
export function BasketballBall({ className, faded = false }: BasketballBallProps) {
  return (
    <div
      className={cn(
        "relative aspect-square w-full max-w-[4.5rem] overflow-hidden rounded-full bg-gradient-to-br from-orange-400 via-orange-500 to-orange-700 shadow-md",
        faded && "opacity-25 grayscale",
        className,
      )}
      aria-hidden
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full text-orange-900/35">
        <path d="M50 4v92" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <path d="M4 50h92" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <path
          d="M12 28c20 8 56 8 76 0M12 72c20-8 56-8 76 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        />
      </svg>
    </div>
  );
}
