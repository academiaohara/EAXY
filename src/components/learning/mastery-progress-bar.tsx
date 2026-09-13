import { getMasteryStatus } from "@/lib/mastery/status";

type MasteryProgressBarProps = {
  mastery: number;
  hasAttempts: boolean;
};

const STATUS_COLORS: Record<ReturnType<typeof getMasteryStatus>, string> = {
  not_started: "bg-muted-foreground/30",
  struggling: "bg-destructive",
  developing: "bg-amber-500",
  proficient: "bg-cobalt",
  mastered: "bg-emerald-600",
};

export function MasteryProgressBar({ mastery, hasAttempts }: MasteryProgressBarProps) {
  const status = getMasteryStatus(mastery, hasAttempts);
  const percent = hasAttempts ? Math.round(mastery * 100) : 0;

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
        className={`h-full rounded-full transition-all ${STATUS_COLORS[status]}`}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
