import type { LessonStep } from "@/lib/lesson/types";

export type LessonStepPhase = "explanation" | "resolution" | "exploration" | "practice";

const PHASE_BY_STEP_TYPE: Record<LessonStep["type"], LessonStepPhase> = {
  concept: "explanation",
  animated_solution: "resolution",
  interactive_tool: "exploration",
  narrate: "explanation",
  slide: "explanation",
  predict: "practice",
  explore: "exploration",
  reveal: "explanation",
  fill_in_blank: "practice",
  fraction_pick: "practice",
  classify: "practice",
  number_line_pick: "practice",
  divisibility_grid: "practice",
};

export function getLessonStepPhase(step: LessonStep): LessonStepPhase {
  return PHASE_BY_STEP_TYPE[step.type];
}

export const LESSON_STEP_PHASE_LABELS: Record<LessonStepPhase, string> = {
  explanation: "Explicación",
  resolution: "Resolución",
  exploration: "Exploración",
  practice: "Práctica",
};
