import type { LessonStep } from "@/lib/lesson/types";

export type LessonStepPhase = "explanation" | "resolution";

const RESOLUTION_TYPES = new Set<LessonStep["type"]>(["animated_solution"]);

export function getLessonStepPhase(step: LessonStep): LessonStepPhase {
  return RESOLUTION_TYPES.has(step.type) ? "resolution" : "explanation";
}

export const LESSON_STEP_PHASE_LABELS: Record<LessonStepPhase, string> = {
  explanation: "Explicación",
  resolution: "Resolución",
};
