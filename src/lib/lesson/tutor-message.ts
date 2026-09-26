import type { LessonStep } from "@/lib/lesson/types";

/** Texto corto para el globo del tutor según el paso actual. */
export function getStepTutorMessage(step: LessonStep): string {
  if (step.type === "multiple_choice" || step.type === "fill_in_blank") {
    return step.hint ?? step.question;
  }
  return step.title;
}
