import { Badge } from "@/components/ui/badge";
import {
  formatMasteryPercent,
  getMasteryStatus,
  getMasteryStatusLabel,
} from "@/lib/mastery/status";

type MasteryBadgeProps = {
  mastery: number;
  hasAttempts: boolean;
};

const STATUS_VARIANTS: Record<
  ReturnType<typeof getMasteryStatus>,
  "secondary" | "destructive" | "outline" | "default"
> = {
  not_started: "secondary",
  struggling: "destructive",
  developing: "outline",
  proficient: "default",
  mastered: "default",
};

export function MasteryBadge({ mastery, hasAttempts }: MasteryBadgeProps) {
  const status = getMasteryStatus(mastery, hasAttempts);

  return (
    <Badge variant={STATUS_VARIANTS[status]} data-testid="mastery-badge">
      {getMasteryStatusLabel(status)} · {formatMasteryPercent(mastery)}
    </Badge>
  );
}
