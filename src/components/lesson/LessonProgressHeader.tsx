"use client";

import { motion } from "framer-motion";

interface LessonProgressHeaderProps {
  current: number;
  total: number;
  stars?: number;
}

export function LessonProgressHeader({
  current,
  total,
  stars = 0,
}: LessonProgressHeaderProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-1 items-center gap-1.5">
        {Array.from({ length: total }, (_, i) => {
          const stepNum = i + 1;
          const isCompleted = stepNum < current;
          const isCurrent = stepNum === current;

          return (
            <div key={i} className="flex flex-1 items-center">
              {isCurrent ? (
                <motion.div
                  className="h-1.5 w-full rounded-full bg-emerald-500"
                  layoutId="progress-segment"
                  transition={{ duration: 0.3 }}
                />
              ) : (
                <div
                  className={`h-1.5 w-full rounded-full ${
                    isCompleted ? "bg-emerald-500" : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="flex shrink-0 items-center gap-1 text-sm font-semibold text-emerald-600">
        <span>{stars}</span>
        <span aria-hidden>⭐</span>
      </div>
    </div>
  );
}
