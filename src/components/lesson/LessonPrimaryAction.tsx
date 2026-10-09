"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LessonStepControl } from "@/components/lesson/LessonStepControlContext";

type LessonPrimaryActionProps = {
  control: LessonStepControl;
  /** Pie derecho junto a Saltar cuando los controles de animación van al centro. */
  compact?: boolean;
};

export function LessonPrimaryAction({ control, compact = false }: LessonPrimaryActionProps) {
  return (
    <Button
      type="button"
      onClick={() => control.onClick()}
      disabled={control.disabled}
      className={cn(
        "rounded-full font-semibold",
        compact
          ? "min-w-[7.5rem] px-5 py-2 text-sm sm:min-w-[8.5rem]"
          : "min-w-[11rem] py-6 text-base sm:min-w-[13rem]",
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
