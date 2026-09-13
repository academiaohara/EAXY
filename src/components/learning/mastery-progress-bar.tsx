import { getMasteryState } from "@/lib/mastery/states";

type MasteryProgressBarProps = {
  mastery: number;
  attemptCount?: number;
};

const STATE_COLORS: Record<ReturnType<typeof getMasteryState>, string> = {
  not_started: "bg-muted-foreground/30",
  struggling: "bg-destructive",
  developing: "bg-amber-500",
  proficient: "bg-cobalt",
  mastered: "bg-emerald-600",
};

export function MasteryProgressBar({
  mastery,
  attemptCount = 0,
}: MasteryProgressBarProps) {
  const state = getMasteryState(mastery, attemptCount);
  const percent = attemptCount > 0 ? Math.round(mastery * 100) : 0;

  return (
    <div
      className="h-2 w-full overflow-hidden rounded-full bg-muted"
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      data-testid="mastery-progress-bar"
    >
      <div
        className={`h-full rounded-full transition-all ${STATE_COLORS[state]}`}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
