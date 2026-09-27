"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LessonStepControl } from "@/components/lesson/LessonStepControlContext";

type LessonPrimaryActionProps = {
  control: LessonStepControl;
};

export function LessonPrimaryAction({ control }: LessonPrimaryActionProps) {
  return (
    <Button
      type="button"
      onClick={control.onClick}
      disabled={control.disabled}
      className={cn(
        "min-w-[11rem] rounded-full py-6 text-base font-semibold sm:min-w-[13rem]",
        control.disabled
          ? "bg-slate-200 text-slate-500 disabled:opacity-100"
          : "bg-cobalt hover:bg-cobalt/90",
      )}
      data-testid={control.testId ?? "lesson-primary-action"}
    >
      {control.label}
    </Button>
  );
}
