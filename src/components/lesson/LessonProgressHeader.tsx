"use client";

import { cn } from "@/lib/utils";

type LessonProgressHeaderProps = {
  current: number;
  total: number;
  /** Máximo de segmentos visibles (pasos largos se agrupan visualmente). */
  maxSegments?: number;
};

export function LessonProgressHeader({
  current,
  total,
  maxSegments = 12,
}: LessonProgressHeaderProps) {
  const segmentCount = Math.min(total, maxSegments);

  return (
    <div
      className="flex flex-1 items-center gap-1"
      data-testid="lesson-progress-bar"
      aria-label={`Paso ${current} de ${total}`}
    >
      {Array.from({ length: segmentCount }, (_, index) => {
        const stepNum = index + 1;
        const isCompleted = stepNum < current;
        const isCurrent = stepNum === current;

        return (
          <div
            key={index}
            className={cn(
              "h-1.5 min-w-2 flex-1 rounded-full transition-colors duration-300",
              isCompleted && "bg-emerald-500",
              isCurrent && "bg-emerald-500",
              !isCompleted && !isCurrent && "bg-slate-200",
            )}
            aria-hidden
          />
        );
      })}
    </div>
  );
}
