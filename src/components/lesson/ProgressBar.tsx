import { cn } from "@/lib/utils";

type ProgressBarProps = {
  current: number;
  total: number;
  xp: number;
  hearts: number;
  maxHearts?: number;
};

export function ProgressBar({
  current,
  total,
  xp,
  hearts,
  maxHearts = 3,
}: ProgressBarProps) {
  const progressPercent = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="space-y-3" data-testid="lesson-progress-bar">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-1" aria-label={`${hearts} vidas restantes`}>
          {Array.from({ length: maxHearts }).map((_, index) => (
            <span
              key={index}
              className={cn(
                "text-lg transition-opacity",
                index < hearts ? "opacity-100" : "opacity-25 grayscale",
              )}
              aria-hidden
            >
              ❤️
            </span>
          ))}
        </div>
        <span className="font-medium text-cobalt" data-testid="lesson-xp">
          {xp} XP
        </span>
      </div>

      <div className="space-y-1">
        <div className="h-2.5 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-cobalt transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
            role="progressbar"
            aria-valuenow={current}
            aria-valuemin={0}
            aria-valuemax={total}
            aria-label={`Paso ${current} de ${total}`}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Paso {current} de {total}
        </p>
      </div>
    </div>
  );
}
