"use client";

import type { LessonStageTheme } from "@/lib/lesson/types";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type StageViewportProps = {
  theme: LessonStageTheme;
  children?: ReactNode;
  className?: string;
  /** Clases extra en la superficie del escenario (p. ej. ancho compacto). */
  stageClassName?: string;
  /** Teoría o definición encima del escenario */
  header?: ReactNode;
  /** Área del módulo SVG / animación */
  stage?: ReactNode;
};

export function StageViewport({
  theme,
  children,
  className,
  stageClassName,
  header,
  stage,
}: StageViewportProps) {
  return (
    <div
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-4",
        theme === "board" && "lesson-stage-theme-board",
        className,
      )}
      data-lesson-stage-theme={theme}
    >
      {header ? <div className="shrink-0">{header}</div> : null}
      {stage ? (
        <div
          className={cn(
            "flex min-h-0 w-full flex-1 flex-col overflow-hidden",
            theme === "paper" &&
              "rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6",
            theme === "board" &&
              "rounded-xl border border-[color:var(--stage-border)] bg-[color:var(--stage-surface)] p-3 text-[color:var(--stage-ink)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:p-4",
            stageClassName,
          )}
          data-testid="lesson-stage-surface"
        >
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">{stage}</div>
        </div>
      ) : null}
      {children ? <div className="shrink-0">{children}</div> : null}
    </div>
  );
}
