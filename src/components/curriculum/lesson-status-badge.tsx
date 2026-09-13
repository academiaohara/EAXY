import { Badge } from "@/components/ui/badge";
import type { LessonProgressStatus } from "@/lib/learning-paths/types";

const STATUS_LABELS: Record<LessonProgressStatus, string> = {
  not_started: "Sin empezar",
  started: "En curso",
  completed: "Completada",
};

const STATUS_VARIANTS: Record<
  LessonProgressStatus,
  "secondary" | "outline" | "default"
> = {
  not_started: "secondary",
  started: "outline",
  completed: "default",
};

type LessonStatusBadgeProps = {
  status: LessonProgressStatus;
};

export function LessonStatusBadge({ status }: LessonStatusBadgeProps) {
  return (
    <Badge variant={STATUS_VARIANTS[status]} data-testid="lesson-status-badge">
      {STATUS_LABELS[status]}
    </Badge>
  );
}
