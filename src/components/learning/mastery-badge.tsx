import { Badge } from "@/components/ui/badge";
import {
  formatMasteryPercent,
  getMasteryState,
  MASTERY_STATE_LABELS,
  type MasteryState,
} from "@/lib/mastery/states";
import { cn } from "@/lib/utils";

const STATE_STYLES: Record<MasteryState, string> = {
  not_started: "bg-muted text-muted-foreground",
  struggling: "bg-destructive/10 text-destructive",
  developing: "bg-amber-100 text-amber-900",
  proficient: "bg-cobalt-tint text-cobalt",
  mastered: "bg-emerald-100 text-emerald-800",
};

type MasteryBadgeProps = {
  mastery: number;
  attemptCount?: number;
  showPercent?: boolean;
  className?: string;
};

export function MasteryBadge({
  mastery,
  attemptCount = 1,
  showPercent = false,
  className,
}: MasteryBadgeProps) {
  const state = getMasteryState(mastery, attemptCount);

  return (
    <Badge className={cn(STATE_STYLES[state], className)} data-testid="mastery-badge">
      {MASTERY_STATE_LABELS[state]}
      {showPercent && state !== "not_started" ? ` — ${formatMasteryPercent(mastery)}` : null}
    </Badge>
  );
}
