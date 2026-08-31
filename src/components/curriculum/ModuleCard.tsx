import Link from "next/link";
import { cn } from "@/lib/cn";
import { getTopicVisual } from "@/lib/topic-icons";
import type { LessonStatus } from "@/lib/course-progress";

interface ModuleCardProps {
  topicId: string;
  title: string;
  courseId: string;
  status: LessonStatus;
  isNew?: boolean;
  gradeLabel?: string;
}

const statusLabels: Record<LessonStatus, string | null> = {
  locked: null,
  available: null,
  in_progress: "En curso",
  completed: "✓",
};

export function ModuleCard({
  topicId,
  title,
  courseId,
  status,
  isNew = false,
  gradeLabel = "1º ESO",
}: ModuleCardProps) {
  const visual = getTopicVisual(topicId);
  const isLocked = status === "locked";
  const statusLabel = statusLabels[status];

  const content = (
    <div
      className={cn(
        "relative flex w-[9.5rem] shrink-0 snap-start flex-col sm:w-[11rem]",
        isLocked && "opacity-60",
      )}
    >
      <div
        className={cn(
          "relative flex aspect-square flex-col rounded-2xl border bg-white p-3 transition sm:rounded-3xl sm:p-4",
          isLocked
            ? "border-slate-200"
            : "border-slate-200 hover:border-indigo-300 hover:shadow-md",
          status === "in_progress" && "ring-2 ring-indigo-400 ring-offset-2",
          status === "completed" && "border-emerald-200 bg-emerald-50/30",
        )}
      >
        <div className="flex items-start justify-between gap-1">
          <span className="text-[10px] font-medium uppercase tracking-wide text-slate-400 sm:text-xs">
            {gradeLabel}
          </span>
          {isNew && !isLocked && (
            <span className="rounded-full bg-emerald-500 px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">
              Nuevo
            </span>
          )}
          {statusLabel && !isNew && (
            <span
              className={cn(
                "text-[10px] font-semibold sm:text-xs",
                status === "completed" ? "text-emerald-600" : "text-indigo-600",
              )}
            >
              {statusLabel}
            </span>
          )}
        </div>

        <div
          className="mx-auto my-2 flex flex-1 items-center justify-center text-4xl sm:my-3 sm:text-5xl"
          style={{ color: visual.color }}
          aria-hidden
        >
          {visual.icon}
        </div>
      </div>

      <p className="mt-2 text-center text-sm font-medium text-slate-800 sm:text-base">
        {title}
      </p>
    </div>
  );

  if (isLocked) {
    return (
      <div className="cursor-not-allowed" title="Completa los temas anteriores">
        {content}
      </div>
    );
  }

  return (
    <Link href={`/curso/${courseId}/tema/${topicId}`} className="block">
      {content}
    </Link>
  );
}
