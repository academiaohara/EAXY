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
};

export function LessonProgressHeader({
  currentIndex,
  total,
  completed,
  visited,
  onGoToStep,
  maxSegments = 16,
}: LessonProgressHeaderProps) {
  const segmentCount = Math.min(total, maxSegments);

  return (
    <div
      className="flex flex-1 items-center gap-1"
      data-testid="lesson-progress-bar"
      role="tablist"
      aria-label={`Pasos de la lección, paso ${currentIndex + 1} de ${total}`}
    >
      {Array.from({ length: segmentCount }, (_, index) => {
        const isCompleted = completed[index];
        const isCurrent = index === currentIndex;
        const isVisited = visited[index];

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
                  : `Paso ${index + 1}${isVisited ? ", visitado" : ""}`
            }
            onClick={() => onGoToStep(index)}
            className={cn(
              "h-2 min-w-2 flex-1 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt/50",
              isCompleted && "bg-emerald-500",
              isCurrent && !isCompleted && "bg-cobalt ring-2 ring-cobalt/30",
              isCurrent && isCompleted && "bg-emerald-500 ring-2 ring-emerald-400/50",
              !isCompleted && !isCurrent && isVisited && "bg-emerald-200",
              !isCompleted && !isCurrent && !isVisited && "bg-slate-200 hover:bg-slate-300",
            )}
          />
        );
      })}
    </div>
  );
}
