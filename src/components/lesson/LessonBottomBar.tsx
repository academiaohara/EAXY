"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LessonStepControl } from "@/components/lesson/LessonStepControlContext";

type LessonBottomBarProps = {
  control: LessonStepControl;
  /** Barra fija al pie de la pantalla (estilo Brilliant) en lugar de dentro del modal. */
  fixed?: boolean;
};

export function LessonBottomBar({ control, fixed = true }: LessonBottomBarProps) {
  const isCheck = control.label === "Comprobar";

  const bar = (
    <div
      className={cn(
        "flex justify-center px-4 py-3 sm:px-6",
        fixed
          ? "fixed inset-x-0 bottom-0 z-20 border-t border-slate-200/80 bg-[#eef0f3]/95 backdrop-blur-sm"
          : "border-t border-slate-100 bg-paper-raised",
      )}
      data-testid="lesson-bottom-bar"
    >
      <Button
        type="button"
        onClick={control.onClick}
        disabled={control.disabled}
        className={cn(
          "w-full max-w-md rounded-full py-6 text-base font-semibold",
          isCheck && control.disabled && "bg-slate-200 text-slate-400 hover:bg-slate-200",
          isCheck && !control.disabled && "bg-cobalt hover:bg-cobalt/90",
          !isCheck && "bg-cobalt hover:bg-cobalt/90",
        )}
        data-testid={control.testId ?? "lesson-primary-action"}
      >
        {control.label}
      </Button>
    </div>
  );

  return bar;
}
