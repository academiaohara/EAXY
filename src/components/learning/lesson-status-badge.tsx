import type { LessonProgressStatus } from "@/lib/content/types";
import { cn } from "cn";

const statusLabels: Record<LessonProgressStatus, string> = {
  not_started: "Sin empezar",
  started: "En curso",
  completed: "Completada",
};

const statusStyles: Record<LessonProgressStatus, string> = {
  not_started: "bg-muted text-muted-foreground",
  started: "bg-cobalt-tint/50 text-cobalt",
  completed: "bg-emerald-100 text-emerald-800",
};

type LessonStatusBadgeProps = {
  status: LessonProgressStatus;
  className?: string;
};

export function LessonStatusBadge({ status, className }: LessonStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2 py-0.5 text-xs font-medium",
        statusStyles[status],
        className,
      )}
      data-testid={`lesson-status-${status}`}
    >
      {statusLabels[status]}
    </span>
  );
}
