"use client";

import { recordLocalExerciseAttempt } from "@/lib/local-progress/storage";
import type { SubmitExerciseAttemptResult } from "@/lib/exercises/types";

export function persistExerciseAttemptLocally(
  exerciseId: string,
  result: SubmitExerciseAttemptResult,
): void {
  if (!result.persistLocally) {
    return;
  }
  recordLocalExerciseAttempt(exerciseId, result.correct);
}
