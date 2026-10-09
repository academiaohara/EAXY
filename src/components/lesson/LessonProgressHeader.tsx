"use client";

import { cn } from "@/lib/utils";

export type LessonProgressHeaderProps = {
  /** Índice del paso actual (0-based). */
  currentIndex: number;
  total: number;
  /** Paso superado (actividad hecha o acierto en práctica). */
  completed: boolean[];
  /** Paso visitado al menos una vez. */
  visited: boolean[];
  onGoToStep: (index: number) => void;
  maxSegments?: number;
  className?: string;
};

export function LessonProgressHeader({
  currentIndex,
  total,
  completed,
  visited,
  onGoToStep,
  maxSegments = 16,
  className,
}: LessonProgressHeaderProps) {
  const segmentCount = Math.min(total, maxSegments);

  return (
    <div
      className={cn("flex min-w-0 flex-1 items-center gap-1.5", className)}
      data-testid="lesson-progress-bar"
      role="tablist"
      aria-label={`Pasos de la lección, paso ${currentIndex + 1} de ${total}`}
    >
      {Array.from({ length: segmentCount }, (_, index) => {
        const isCompleted = completed[index];
        const isCurrent = index === currentIndex;
        const isVisited = visited[index];
        const canNavigate = isVisited || isCurrent;

        return (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={isCurrent}
            aria-label={
              isCompleted
                ? `Paso ${index + 1}, completado`
                : isCurrent
                  ? `Paso ${index + 1}, actual`
                  : isVisited
                    ? `Paso ${index + 1}, incompleto`
                    : `Paso ${index + 1}, sin visitar`
            }
            disabled={!canNavigate}
            onClick={() => {
              if (canNavigate) {
                onGoToStep(index);
              }
            }}
            className={cn(
              "h-1.5 min-w-1.5 flex-1 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt/40",
              !canNavigate && "cursor-default",
              isCompleted && !isCurrent && "bg-emerald-500",
              isCurrent &&
                "bg-gradient-to-r from-emerald-500 via-emerald-400 to-[color:var(--cobalt,#4f46e5)] shadow-[0_0_0_1px_rgba(16,185,129,0.25)]",
              !isCompleted && !isCurrent && canNavigate && "bg-slate-300/70",
              !isCompleted && !isCurrent && !canNavigate && "bg-slate-300/35",
            )}
          />
        );
      })}
    </div>
  );
}
