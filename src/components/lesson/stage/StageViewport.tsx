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
            "flex min-h-[12rem] w-full min-h-0 flex-1 flex-col overflow-hidden",
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
