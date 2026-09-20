type ProgressBarProps = {
  current: number;
  total: number;
};

export function ProgressBar({ current, total }: ProgressBarProps) {
  const progressPercent = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="space-y-2" data-testid="lesson-progress-bar">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Progreso de la lección</span>
        <span>
          Paso {current} de {total}
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-muted">
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
    </div>
  );
}
