"use client";

import { ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LessonStepControl } from "@/components/lesson/LessonStepControlContext";

type LessonBottomBarProps = {
  control: LessonStepControl;
};

export function LessonBottomBar({ control }: LessonBottomBarProps) {
  return (
    <div
      className="shrink-0 border-t border-border bg-paper-raised px-4 py-3 sm:px-5"
      data-testid="lesson-bottom-bar"
    >
      <div className="flex justify-end">
        <Button
          type="button"
          onClick={control.onClick}
          disabled={control.disabled}
          data-testid={control.testId ?? "lesson-primary-action"}
        >
          {control.label}
          {control.label !== "Comprobar" ? (
            <ChevronRightIcon data-icon="inline-end" className="size-4" />
          ) : null}
        </Button>
      </div>
    </div>
  );
}
