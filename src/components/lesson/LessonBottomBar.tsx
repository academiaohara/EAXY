"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LessonStepControl } from "@/components/lesson/LessonStepControlContext";

type LessonBottomBarProps = {
  control: LessonStepControl;
};

export function LessonBottomBar({ control }: LessonBottomBarProps) {
  const isCheck = control.label === "Comprobar";

  return (
    <div
      className="border-t border-slate-100 bg-paper-raised px-4 py-3 sm:px-5"
      data-testid="lesson-bottom-bar"
    >
      <Button
        type="button"
        onClick={control.onClick}
        disabled={control.disabled}
        className={cn(
          "w-full rounded-full py-6 text-base font-semibold sm:ml-auto sm:w-auto sm:min-w-[160px]",
          isCheck && control.disabled && "bg-slate-100 text-slate-400 hover:bg-slate-100",
          isCheck && !control.disabled && "bg-cobalt hover:bg-cobalt/90",
        )}
        data-testid={control.testId ?? "lesson-primary-action"}
      >
        {control.label}
      </Button>
    </div>
  );
}
