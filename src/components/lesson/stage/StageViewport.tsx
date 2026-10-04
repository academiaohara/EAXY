"use client";

import type { LessonStageTheme } from "@/lib/lesson/types";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type StageViewportProps = {
  theme: LessonStageTheme;
  children: ReactNode;
  className?: string;
  /** Área del módulo SVG / animación */
  stage?: ReactNode;
};

export function StageViewport({ theme, children, className, stage }: StageViewportProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        theme === "board" && "lesson-stage-theme-board",
        className,
      )}
      data-lesson-stage-theme={theme}
    >
      {stage ? (
        <div
          className={cn(
            "w-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6",
            theme === "board" &&
              "border-[color:var(--stage-border)] bg-[color:var(--stage-surface)] text-[color:var(--stage-ink)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
          )}
          data-testid="lesson-stage-surface"
        >
          {stage}
        </div>
      ) : null}
      {children}
    </div>
  );
}
